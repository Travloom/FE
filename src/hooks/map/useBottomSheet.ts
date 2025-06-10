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

  const [maxHeight, setMaxHeight] = useState(window.innerHeight - 100 - MIN_HEIGHT);

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
    prevHeight: MIN_HEIGHT,
    isContentAreaTouched: false,
  });

  const {
    currentHeight,
    setCurrentHeight,
  } = useBottomSheetStore();

  const canUserResizeBottomSheet = () => {
    const { touchMove, isContentAreaTouched } = metrics.current;
    const contentEl = content.current;
    const sheetEl = sheet.current;

    if (!sheetEl || !contentEl) return false;

    const isScrollingUp = touchMove.movingDirection === 'up';
    const isScrollingDown = touchMove.movingDirection === 'down';
    const isAtTop = contentEl.scrollTop <= 1;
    const isAtBottom = contentEl.scrollTop + contentEl.clientHeight >= contentEl.scrollHeight - 1;


    if (!isContentAreaTouched) return true;

    if (isAtTop) {
      if (isScrollingDown) return true;
      else if (isScrollingUp) return false;
    }
    else if (isAtBottom) {
      return false;
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

        nextHeight = Math.max(MIN_HEIGHT, Math.min(maxHeight, nextHeight));
        sheet.current!.style.height = `${nextHeight}px`;
      } else {
        document.body.style.overflowY = 'hidden';
      }
    };

    const handleTouchEnd = () => {
      document.body.style.overflowY = 'auto';
      const { touchMove, prevHeight } = metrics.current;

      sheet.current!.style.transition = 'height 0.3s ease';

      let nextHeight = parseInt(sheet.current!.style.height);

      if (canUserResizeBottomSheet()) {

        if (touchMove.movingDirection !== 'none') {

          if (prevHeight === MIN_HEIGHT) {
            if (Math.abs(touchMove.touchOffset) > THRESHOLD) {
              nextHeight = maxHeight;
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
              nextHeight = maxHeight;
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
          if (nextHeight === MIN_HEIGHT) setCurrentHeight(MIN_HEIGHT)
          else if (nextHeight === MID_HEIGHT) setCurrentHeight(MID_HEIGHT)
          else if (nextHeight === maxHeight) setCurrentHeight(maxHeight)
        }
      }

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
    sheetEl.addEventListener('touchmove', handleTouchMove);
    sheetEl.addEventListener('touchend', handleTouchEnd);

    return () => {
      sheetEl.removeEventListener('touchstart', handleTouchStart);
      sheetEl.removeEventListener('touchmove', handleTouchMove);
      sheetEl.removeEventListener('touchend', handleTouchEnd);
    };
  }, [maxHeight]);

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
    const initialUpdateSheetHeight = () => {
      metrics.current.prevHeight = MIN_HEIGHT;
      sheet.current!.style.height = `${MIN_HEIGHT}px`;
    }

    const updateSheetHeight = () => {
      const newMaxHeight = window.innerHeight - 100 - MIN_HEIGHT
      setMaxHeight(newMaxHeight);
      metrics.current.prevHeight = newMaxHeight;
      sheet.current!.style.height = `${newMaxHeight}px`;
    };
    
    initialUpdateSheetHeight();

    window.addEventListener('resize', updateSheetHeight);
    return () => window.removeEventListener('resize', updateSheetHeight);
  }, []);

  useEffect(() => {
    metrics.current.prevHeight = currentHeight;
  }, [currentHeight])

  return { sheet, content };
}
