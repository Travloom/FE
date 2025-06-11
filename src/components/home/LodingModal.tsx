import { AnimatePresence } from "framer-motion";
import Motion from "../motion/Motion";
import { HashLoader } from "react-spinners";
import useHomeStore from "@/stores/useHomeStore";
import Portal from "../portal/Portal";

const LoadingModal = () => {

  const {
    isCreating
  } = useHomeStore();

  return (
    <Portal>
      <AnimatePresence>
        {isCreating &&
          <Motion.MotionDiv className={`absolute top-0 left-0 w-screen h-screen bg-[rgba(255,255,255,0.6)] z-50`}>
            <div className={`flex flex-col gap-6 justify-center items-center w-full h-full`}>
              <HashLoader
                size={30}
                color={`#6c5ce7`} />
              <p className={`lg:text-[16px] text-[14px] text-point transition-all-300-out`}>플랜 생성 중</p>
            </div>

          </Motion.MotionDiv>
        }
      </AnimatePresence>
    </Portal>
  )
}

export default LoadingModal;