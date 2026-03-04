import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

const CursorFollower = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringMagnetic, setIsHoveringMagnetic] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const labelRef = useRef("");

  const cursorX = useSpring(0, { damping: 25, stiffness: 300 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 300 });
  const dotX = useSpring(0, { damping: 35, stiffness: 400 });
  const dotY = useSpring(0, { damping: 35, stiffness: 400 });

  useEffect(() => {
    // Hide on touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const onMouseEnterInteractive = (e: Event) => {
      const target = e.target as HTMLElement;
      const magnetic = target.closest("[data-magnetic]");
      if (magnetic) {
        setIsHoveringMagnetic(true);
        labelRef.current = magnetic.getAttribute("data-cursor-label") || "";
      }
      setIsHovering(true);
    };

    const onMouseLeaveInteractive = () => {
      setIsHovering(false);
      setIsHoveringMagnetic(false);
      labelRef.current = "";
    };

    const onMouseLeaveWindow = () => setIsVisible(false);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeaveWindow);

    const interactiveSelectors = "a, button, [data-magnetic], input, textarea, [role='button']";
    const elements = document.querySelectorAll(interactiveSelectors);
    elements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    // MutationObserver to handle dynamic elements
    const observer = new MutationObserver(() => {
      const newEls = document.querySelectorAll(interactiveSelectors);
      newEls.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnterInteractive);
        el.addEventListener("mouseleave", onMouseLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeaveWindow);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
      observer.disconnect();
    };
  }, [cursorX, cursorY, dotX, dotY]);

  // Don't render on touch
  const isTouchDevice = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div
          animate={{
            width: isHovering ? (isHoveringMagnetic ? 64 : 48) : 32,
            height: isHovering ? (isHoveringMagnetic ? 64 : 48) : 32,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="rounded-full border border-foreground/30 -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          animate={{
            width: isHovering ? 6 : 5,
            height: isHovering ? 6 : 5,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.15 }}
          className="rounded-full bg-foreground -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>
    </>
  );
};

export default CursorFollower;
