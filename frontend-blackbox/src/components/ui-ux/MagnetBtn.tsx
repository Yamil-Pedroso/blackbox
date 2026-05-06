import { useState, useEffect, useRef, type ReactNode } from "react";
import { motion, type MotionStyle } from "framer-motion";

interface Props {
  children: ReactNode;
  style: MotionStyle;
}

const MagnetBtn = ({ children, style }: Props) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = btnRef.current?.getBoundingClientRect();

      if (!rect) return;

      // Mouse position
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Button center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Distance between mouse and button center
      const dx = mouseX - centerX;
      const dy = mouseY - centerY;

      // Real geometric distance
      const distance = Math.hypot(dx, dy);

      // Magnetic zone
      if (distance < 150) {
        // Attraction strength
        const moveX = dx * 0.12;
        const moveY = dy * 0.12;

        // Limit max movement
        const MAX_MOVE = 30;

        const limitedX = Math.max(-MAX_MOVE, Math.min(moveX, MAX_MOVE));

        const limitedY = Math.max(-MAX_MOVE, Math.min(moveY, MAX_MOVE));

        setPosition({
          x: limitedX,
          y: limitedY,
        });
      } else {
        setPosition({
          x: 0,
          y: 0,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.button
      ref={btnRef}
      initial={{ x: 0, y: 0, scale: 1 }}
      animate={{
        x: position.x,
        y: position.y,
        scale: position.x !== 0 || position.y !== 0 ? 1.08 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 12,
      }}
      style={style}
    >
      {children}
    </motion.button>
  );
};

export default MagnetBtn;
