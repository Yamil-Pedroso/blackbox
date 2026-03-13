function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

export function getRandomGradient() {
  const c1 = getRandomColor();
  const c2 = getRandomColor();
  const angle = Math.floor(Math.random() * 360);

  return `linear-gradient(${angle}deg, ${c1}, ${c2})`;
}
