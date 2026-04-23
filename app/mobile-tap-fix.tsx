"use client";

import { useEffect } from "react";

const TAP_MOVE_LIMIT = 12;
const DUPLICATE_CLICK_WINDOW = 700;

type TouchStart = {
  target: EventTarget | null;
  x: number;
  y: number;
};

function findTappable(target: EventTarget | null) {
  if (!(target instanceof Element)) return null;

  return target.closest<HTMLElement>("button, a, [role='button']");
}

function isDisabled(element: HTMLElement) {
  if (element.getAttribute("aria-disabled") === "true") return true;
  if (element instanceof HTMLButtonElement) return element.disabled;

  return false;
}

export function MobileTapFix() {
  useEffect(() => {
    if (!("ontouchstart" in window) && navigator.maxTouchPoints < 1) return;

    let touchStart: TouchStart | null = null;
    let suppressNativeClickUntil = 0;

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      if (!touch) return;

      touchStart = {
        target: event.target,
        x: touch.clientX,
        y: touch.clientY,
      };
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (!touchStart) return;

      const touch = event.changedTouches[0];
      if (!touch) {
        touchStart = null;
        return;
      }

      const moved =
        Math.abs(touch.clientX - touchStart.x) > TAP_MOVE_LIMIT ||
        Math.abs(touch.clientY - touchStart.y) > TAP_MOVE_LIMIT;

      const tappable = findTappable(touchStart.target);
      touchStart = null;

      if (moved || !tappable || isDisabled(tappable)) return;

      event.preventDefault();
      suppressNativeClickUntil = Date.now() + DUPLICATE_CLICK_WINDOW;
      tappable.click();
    };

    const onClick = (event: MouseEvent) => {
      if (!event.isTrusted || Date.now() > suppressNativeClickUntil) return;

      const tappable = findTappable(event.target);
      if (!tappable) return;

      event.preventDefault();
      event.stopImmediatePropagation();
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    document.addEventListener("touchend", onTouchEnd, { passive: false, capture: true });
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("touchstart", onTouchStart, true);
      document.removeEventListener("touchend", onTouchEnd, true);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  return null;
}
