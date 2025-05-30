import { useCallback, useRef } from "react";

interface UseLongPressOptions {
  threshold?: number;
  onStart?: () => void;
  onFinish?: () => void;
  onCancel?: () => void;
  cancelOnMovement?: boolean;
}

export function useLongPress(
  callback: () => void,
  {
    threshold = 600,
    onStart,
    onFinish,
    onCancel,
    cancelOnMovement = true,
  }: UseLongPressOptions = {}
) {
  const timerRef = useRef<number | null>(null);
  const isPressedRef = useRef(false);

  const start = useCallback(() => {
    onStart?.();
    isPressedRef.current = true;
    timerRef.current = window.setTimeout(() => {
      if (isPressedRef.current) {
        callback();
        onFinish?.();
      }
    }, threshold);
  }, [callback, threshold, onStart, onFinish]);

  const clear = useCallback((isCanceled: boolean) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (isPressedRef.current) {
      if (isCanceled) {
        onCancel?.();
      } else {
        onFinish?.();
      }
    }

    isPressedRef.current = false;
    timerRef.current = null;
  }, [onCancel, onFinish]);

  return {
    onMouseDown: start,
    onTouchStart: start,
    onMouseMove: () => clear(cancelOnMovement),
    onTouchMove: () => clear(cancelOnMovement),
    onMouseUp: () => clear(false),
    onMouseLeave: () => clear(true),
    onTouchEnd: () => clear(false),
    onTouchCancel: () => clear(true),
  };
}
