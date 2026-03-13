"use client";

import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
}

export function AnimatedNumber({ value, duration = 1000 }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let startTimestamp: number;
    let animationFrameId: number;
    const startValue = displayValue;
    const difference = value - startValue;

    if (difference === 0) return;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function: easeOutQuart
      const ease = 1 - Math.pow(1 - progress, 4);
      
      setDisplayValue(Math.round(startValue + difference * ease));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration, displayValue]);

  return <>{displayValue}</>;
}