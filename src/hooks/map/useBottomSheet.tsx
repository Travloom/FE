import { MID_HEIGHT, MIN_HEIGHT, THRESHOLD } from '@/constants/Map';
import useBottomSheetStore from '@/stores/useBottomSheetStore';
import { useRef, useEffect, useState } from 'react';

interface BottomSheetMetrics {
  touchStart: {
    sheetHeight: number;
    touchY: number;
  };
  touchMove: {
    prevTouchY: number;
    touchOffset: number;
    movingDirection: 'none' | 'down' | 'up';
  };
  prevHeight: number;
  isContentAreaTouched: boolean;
}

export default function useBottomSheet() {
  const MAX_HEIGHT = window.innerHeight - 100 - MIN_HEIGHT;
  
  const [sheetHeight, setSheetHeight] = useState(MAX_HEIGHT);
  
  const sheet = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetHeight: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      touchOffset: 0,
      movingDirection: 'none',
    },
    prevHeight: MIN_HEIGHT | MID_HEIGHT | MAX_HEIGHT,
    isContentAreaTouched: false,
  });

  const {
    setCurrentHeight,
  } = useBottomSheetStore();

  const canUserResizeBottomSheet = () => {
    const { touchMove, isContentAreaTouched } = metrics.current;
    const contentEl = content.current;
    const sheetEl = sheet.current;

    if (!sheetEl || !contentEl) return false;

    const isScrollingUp = touchMove.movingDirection === 'up';
    const isScrollingDown = touchMove.movingDirection === 'down';
    const isAtTop = contentEl.scrollTop <= 0;
    const isAtBottom = contentEl.scrollTop + contentEl.clientHeight >= contentEl.scrollHeight - 1;



    if (!isContentAreaTouched) return true;

    if (isAtTop) {
      if (isScrollingDown) return true;
    }
    else if (isAtBottom) {
      if (isScrollingDown) return false;
      else if (isScrollingUp) return false;
    }
    return false;
  };


  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;
      touchStart.sheetHeight = sheet.current!.getBoundingClientRect().height;
      touchStart.touchY = e.touches[0].clientY;

      sheet.current!.style.transition = 'none';
    };

    const handleTouchMove = (e: TouchEvent) => {
      const { touchStart, touchMove } = metrics.current;
      const currentTouch = e.touches[0];

      if (touchMove.prevTouchY === undefined || touchMove.prevTouchY === 0) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (touchMove.prevTouchY < currentTouch.clientY) {
        touchMove.movingDirection = 'down';
      } else if (touchMove.prevTouchY > currentTouch.clientY) {
        touchMove.movingDirection = 'up';
      }

      if (canUserResizeBottomSheet()) {
        e.preventDefault();

        const touchOffset = currentTouch.clientY - touchStart.touchY;
        metrics.current.touchMove.touchOffset = touchOffset;
        let nextHeight = touchStart.sheetHeight - touchMove.touchOffset;

        nextHeight = Math.max(MIN_HEIGHT, Math.min(sheetHeight, nextHeight));
        sheet.current!.style.height = `${nextHeight}px`;
      } else {
        document.body.style.overflowY = 'hidden';
      }
    };

    const handleTouchEnd = () => {
      document.body.style.overflowY = 'auto';
      const { touchMove, prevHeight } = metrics.current;

      sheet.current!.style.transition = 'height 0.3s ease';

      let nextHeight = MIN_HEIGHT;

      if (canUserResizeBottomSheet()) {

        if (touchMove.movingDirection !== 'none') {

          console.log(touchMove.touchOffset)
          if (prevHeight === MIN_HEIGHT) {
            if (Math.abs(touchMove.touchOffset) > THRESHOLD) {
              nextHeight = MAX_HEIGHT;
            }
            else {
              nextHeight = MID_HEIGHT;
            }
          }
          else if (prevHeight === MID_HEIGHT) {
            if (touchMove.movingDirection === 'down') {
              nextHeight = MIN_HEIGHT;
            }
            else if (touchMove.movingDirection === 'up') {
              nextHeight = MAX_HEIGHT;
            }
          }
          else {
            if (Math.abs(touchMove.touchOffset) > THRESHOLD) {
              nextHeight = MIN_HEIGHT;
            }
            else {
              nextHeight = MID_HEIGHT;
            }
          }

          sheet.current!.style.height = `${nextHeight}px`;
        }
      }

      if (nextHeight === MIN_HEIGHT) setCurrentHeight(MIN_HEIGHT)
      else setCurrentHeight(MID_HEIGHT)

      // Reset
      metrics.current = {
        touchStart: {
          sheetHeight: 0,
          touchY: 0,
        },
        touchMove: {
          prevTouchY: 0,
          touchOffset: 0,
          movingDirection: 'none',
        },
        prevHeight: nextHeight,
        isContentAreaTouched: false,
      };
    };

    const sheetEl = sheet.current!;
    sheetEl.addEventListener('touchstart', handleTouchStart);
    sheetEl.addEventListener('touchmove', handleTouchMove, { passive: false });
    sheetEl.addEventListener('touchend', handleTouchEnd);

    return () => {
      sheetEl.removeEventListener('touchstart', handleTouchStart);
      sheetEl.removeEventListener('touchmove', handleTouchMove);
      sheetEl.removeEventListener('touchend', handleTouchEnd);
    };
  }, [sheetHeight]);

  useEffect(() => {
    const handleTouchStart = () => {
      metrics.current.isContentAreaTouched = true;
    };

    const contentEl = content.current!;
    contentEl.addEventListener('touchstart', handleTouchStart);

    return () => {
      contentEl.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  useEffect(() => {
    const updateSheetHeight = () => {
      setSheetHeight(window.innerHeight - 100);
      sheet.current!.style.height = `${MIN_HEIGHT}px`;
    };
    updateSheetHeight();

    window.addEventListener('resize', updateSheetHeight);
    return () => window.removeEventListener('resize', updateSheetHeight);
  }, []);

  return { sheet, content };
}
