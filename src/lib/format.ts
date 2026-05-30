export const fileExtension = (name: string): string =>
  name.split(".").pop()?.toLowerCase() ?? "";

export const formatFileSize = (bytes: number): string => {
  if (!bytes) return "0 B";
  const kb = bytes / 1024;
  if (kb < 1) return `${bytes} B`;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
};
