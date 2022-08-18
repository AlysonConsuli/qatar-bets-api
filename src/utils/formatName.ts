const formatName = (name: string) => {
  name = name.trim().toLowerCase();
  if (name !== "admin") {
    const arr = name.split(" ");
    name = arr
      .map((word) => {
        if (word.length > 2) {
          return word[0].toUpperCase() + word.substring(1);
        }
        return word;
      })
      .join(" ");
  }
  return name;
};

export const formats = {
  formatName,
};
