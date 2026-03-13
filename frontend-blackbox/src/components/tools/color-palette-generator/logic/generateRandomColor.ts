export function generateRandomColor() {
  const random = Math.floor(Math.random() * 16777215);
  return `#${random.toString(16).padStart(6, "0")}`;
}
