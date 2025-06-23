import { AnimatePresence } from "framer-motion";
import Portal from "../portal/Portal";
import Motion from "../motion/Motion";
import useCheckModalStore from "@/stores/useCheckModalStore";
import usePageStore from "@/stores/usePageStore";

const CheckModal = () => {

  const {
    isCheckModalOpen,
    checkModalText,
    Fn,

    setIsCheckModalOpen,
    setCheckModalText,
    setFn,
  } = useCheckModalStore();

  const {
    setIsPagePending,
  } = usePageStore();

  const handleYes = () => {
    setIsPagePending(true)
    Fn();
    setIsCheckModalOpen(false)
    setCheckModalText("")
    setFn(() => {})
  }


  return (
    <Portal>
      <AnimatePresence>
        {isCheckModalOpen &&
          <Motion.MotionDiv
            className={`absolute top-0 z-[9999] w-screen h-screen flex items-center justify-center bg-[rgba(0,0,0,0.2)]`}
            onClick={() => setIsCheckModalOpen(false)}>
              <div 
                className={ `
                  lg:text-[16px] text-[14px]
                  flex flex-col gap-6 text-point border-point z-[9999] bg-white p-6 border rounded-[8px] pointer-events-auto select-none`}
                onClick={(e) => e.stopPropagation()}>
                  <p>{checkModalText}</p>
                  <div className={`w-full flex flex-row justify-evenly`}>
                    <p 
                      className={`cursor-pointer text-red-400`}
                      onClick={handleYes}>네</p>
                    <p 
                      className={`cursor-pointer`}
                      onClick={() => setIsCheckModalOpen(false)}>아니요</p>
                  </div>
                
              </div>
          </Motion.MotionDiv>
        }
      </AnimatePresence>
    </Portal>
  )
}

export default CheckModal;