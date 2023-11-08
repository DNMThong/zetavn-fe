export const convertTextContent = (text: string): string[] => {
  const pattern = /(@\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(pattern);
  const result = parts.filter(function (part) {
    return part !== "" && part !== null && part !== undefined;
  });
  return result;
};

export const getInfoMention = (
  text: string
): {
  display: string;
  id: string;
} | null => {
  const regex = /\@\[([^\]]+)\]\(([^)]+)\)/;
  const matches = text.match(regex);

  if (matches) {
    return {
      display: matches[1] as string,
      id: matches[2] as string,
    };
  }

  return null;
};
