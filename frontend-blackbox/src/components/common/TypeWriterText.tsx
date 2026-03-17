import { useEffect, useState } from "react";

interface Props {
  text: string;
  speed?: number;
}

export default function TypewriterText({ text, speed = 40 }: Props) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[i]);
      i++;

      if (i >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span className="inline-block w-55">{displayed}</span>;
}
