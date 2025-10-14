export function formatName(name) {
  return name
    .split(" ")
    .map((w) => {
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");
}
