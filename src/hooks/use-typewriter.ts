import { useState, useEffect, useCallback } from "react";

export function useTypewriter(
  text: string,
  options: { speed?: number; delay?: number } = {},
): [string, boolean] {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { speed = 40, delay = 50 } = options;

  const typeText = useCallback(() => {
    setDisplayedText("");
    setIsTyping(true);
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText((prev) => prev + text.charAt(currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
        setIsTyping(false);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const cleanup = typeText();
      return () => cleanup();
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [delay, typeText]);

  return [displayedText, isTyping];
}
