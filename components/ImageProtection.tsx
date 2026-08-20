"use client";

import { useEffect } from "react";

export function ImageProtection() {
  useEffect(() => {
    const blockImageInteraction = (event: MouseEvent | DragEvent) => {
      const target = event.target;
      if (target instanceof Element && target.closest("img")) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", blockImageInteraction);
    document.addEventListener("dragstart", blockImageInteraction);

    return () => {
      document.removeEventListener("contextmenu", blockImageInteraction);
      document.removeEventListener("dragstart", blockImageInteraction);
    };
  }, []);

  return null;
}
