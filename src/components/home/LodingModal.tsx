import { AnimatePresence } from "framer-motion";
import Motion from "../motion/Motion";
import { HashLoader } from "react-spinners";
import useHomeStore from "@/stores/useHomeStore";
import Portal from "../portal/Portal";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LoadingModal = () => {

  const {
    isCreating
  } = useHomeStore();

  return (
    <Portal>
      <AnimatePresence>
        {isCreating &&
          <Motion.MotionDiv className={`absolute top-0 left-0 w-screen h-screen bg-[rgba(255,255,255,0.6)] z-50 select-none`}>
            <div className={`flex flex-col gap-6 justify-center items-center w-full h-full`}>
              <div className={`h-[160px] flex flex-col justify-center items-center`}>
                <DotLottieReact
                  className={`md:w-[400px] w-[300px]`}
                  src="https://lottie.host/de46bd41-8766-45de-95f9-275c48c550ea/YoSxGNFGod.lottie"
                  loop
                  autoplay
                />
                {/* <HashLoader
                  size={30}
                  color={`#6c5ce7`} /> */}

                <DotLottieReact
                  className={`md:w-[100px] w-[80px]`}
                  src="https://lottie.host/3b5c648c-5b00-4f5b-aa44-18086ceee5bc/Ohvy5asmch.lottie"
                  loop
                  autoplay/>
              </div>
            </div>

          </Motion.MotionDiv>
        }
      </AnimatePresence>
    </Portal>
  )
}

export default LoadingModal;