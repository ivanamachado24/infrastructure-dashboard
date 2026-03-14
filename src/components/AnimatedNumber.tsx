"use client";

import { useEffect, useState, useRef } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
}

export function AnimatedNumber({ value, duration = 1000 }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const startValueRef = useRef(value);

  useEffect(() => {
    let startTimestamp: number;
    let animationFrameId: number;
    const startValue = startValueRef.current;
    const difference = value - startValue;

    if (difference === 0) return;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function: easeOutQuart
      const ease = 1 - Math.pow(1 - progress, 4);
      
      const nextValue = Math.round(startValue + difference * ease);
      setDisplayValue(nextValue);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        startValueRef.current = value;
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      startValueRef.current = Math.round(startValue + difference * (1 - Math.pow(1 - Math.min((performance.now() - startTimestamp) / duration, 1), 4))) || startValue;
    };
  }, [value, duration]);

  return <>{displayValue}</>;
}