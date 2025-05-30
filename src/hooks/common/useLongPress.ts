import React, { useCallback, useRef } from "react";

interface UseLongPressOptions {
  threshold?: number;
  onStart?: () => void;
  onFinish?: () => void;
  onCancel?: () => void;
  cancelOnMovement?: boolean;
  movementThreshold?: number;
}

export function useLongPress(
  callback: () => void,
  {
    threshold = 500,
    onStart,
    onFinish,
    onCancel,
    cancelOnMovement = true,
    movementThreshold = 4,
  }: UseLongPressOptions = {}
) {
  const timerRef = useRef<number | null>(null);
  const isPressedRef = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);

  const start = useCallback((e:React.TouchEvent) => {
    onStart?.();
    isPressedRef.current = true;

    const touch = e.touches[0];
    startX.current = touch.clientX;
    startY.current = touch.clientY;

    timerRef.current = window.setTimeout(() => {
      if (isPressedRef.current) {
        callback();
        onFinish?.();
      }
    }, threshold);
  }, [callback, threshold, onStart, onFinish]);

  const handleMove = useCallback((e: React.TouchEvent) => {
    if (!cancelOnMovement || !isPressedRef.current) return ;

    const touch = e.touches[0];
    const dx = touch.clientX - startX.current;
    const dy = touch.clientY - startY.current;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > movementThreshold){
      clear(true);
    }
  }, [cancelOnMovement, movementThreshold])

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
    
    onTouchStart: start,
    onTouchMove: handleMove,
    onTouchEnd: () => clear(false),
    onTouchCancel: () => clear(true),
  };
}
