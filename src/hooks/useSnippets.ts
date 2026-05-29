import {
  createSnippet,
  deleteSnippet,
  getSnippet,
  listSnippets,
  toggleFavorite,
  updateSnippet,
  type CreateSnippetInput,
  type ListOptions,
} from "@/services/snippets";
import { pruneUnusedTags, setSnippetTags } from "@/services/tags";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { tagsKeys } from "./useTags";

export const snippetsKeys = {
  all: ["snippets"] as const,
  lists: () => [...snippetsKeys.all, "list"] as const,
  list: (filters: ListOptions) =>
    [...snippetsKeys.lists(), filters] as const,
  details: () => [...snippetsKeys.all, "detail"] as const,
  detail: (id: string) => [...snippetsKeys.details(), id] as const,
};

export function useSnippets(filters: ListOptions = {}) {
  return useQuery({
    queryKey: snippetsKeys.list(filters),
    queryFn: () => listSnippets(filters),
  });
}

export function useSnippet(id: string) {
  return useQuery({
    queryKey: snippetsKeys.detail(id),
    queryFn: () => getSnippet(id),
    enabled: !!id,
  });
}

export function useCreateSnippet() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateSnippetInput & { tags?: string[] }) => {
      const { tags, ...snippetInput } = input;
      const snippet = await createSnippet(snippetInput);
      if (tags && tags.length > 0) {
        await setSnippetTags(snippet.id, tags);
      }
      return snippet;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: snippetsKeys.lists() });
      qc.invalidateQueries({ queryKey: tagsKeys.all });
    },
  });
}

export function useToggleFavorite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: toggleFavorite,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: snippetsKeys.lists() });
      qc.invalidateQueries({ queryKey: snippetsKeys.details() });
    },
  });
}

export function useUpdateSnippet() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (
      input: CreateSnippetInput & { id: string; tags?: string[] },
    ) => {
      const { id, tags, ...fields } = input;
      await updateSnippet(id, fields);
      if (tags) await setSnippetTags(id, tags);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: snippetsKeys.lists() });
      qc.invalidateQueries({ queryKey: snippetsKeys.details() });
      qc.invalidateQueries({ queryKey: tagsKeys.all });
    },
  });
}

export function useDeleteSnippet() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await deleteSnippet(id);
      await pruneUnusedTags();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: snippetsKeys.lists() });
      qc.invalidateQueries({ queryKey: tagsKeys.all });
    },
  });
}
