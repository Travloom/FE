import { AnimatePresence } from "framer-motion";
import Portal from "../portal/Portal";
import Motion from "../motion/Motion";
import useAlertModalStore from "@/stores/useAlertModalStore";
import { useEffect } from "react";

const AlertModal = () => {

  const {
    isAlertModalOpen,
    setIsAlertModalOpen,
    AlertModalText,
    setAlertModalText,
  } = useAlertModalStore();

  useEffect(() => {
    if (isAlertModalOpen) {
      const timer = setTimeout(() => {
        setIsAlertModalOpen(false);
        setAlertModalText("");
      },  1500);
      return (() => clearTimeout(timer))
    }
  }, [isAlertModalOpen])

  return (
    <Portal>
      <AnimatePresence>
        {isAlertModalOpen &&
          <Motion.MotionDiv
            className={`absolute top-0 z-[9999] w-screen h-screen flex items-center justify-center pointer-events-none`}>
              <div className={`lg:text-[16px] text-[14px] z-[9999] text-red-400 bg-white py-8 px-6 border border-red-400 rounded-[8px] pointer-events-auto select-none`}>
                {AlertModalText}
              </div>
          </Motion.MotionDiv>
        }
      </AnimatePresence>
    </Portal>
  )
}

export default AlertModal;