'use client'

import { AnimatePresence } from "framer-motion";
import Portal from "../portal/Portal";
import Motion from "../motion/Motion";
import useNoticeModalStore from "@/stores/useAlertModalStore";
import { useEffect } from "react";

const NoticeModal = () => {

  const {
    isNoticeModalOpen,
    setIsNoticeModalOpen,
    noticeModalText,
    setNoticeModalText,
    isAlert,
    setIsAlert,
  } = useNoticeModalStore();

  useEffect(() => {
    if (isNoticeModalOpen) {
      const timer = setTimeout(() => {
        setIsNoticeModalOpen(false);
        setNoticeModalText("");
        setIsAlert(false);
      },  1500);
      
      return (() => clearTimeout(timer))
    }
  }, [isNoticeModalOpen])

  return (
    <Portal>
      <AnimatePresence>
        {isNoticeModalOpen &&
          <Motion.MotionDiv
            className={`absolute top-0 z-[9999] w-screen h-screen flex items-center justify-center pointer-events-none`}>
              <div 
                className={`
                  ${isAlert ? `text-red-400 border-red-400` : `text-point border-point`}
                  lg:text-[16px] text-[14px] z-[9999]  bg-white p-6 border rounded-[8px] pointer-events-auto select-none`}>
                {noticeModalText}
              </div>
          </Motion.MotionDiv>
        }
      </AnimatePresence>
    </Portal>
  )
}

export default NoticeModal;