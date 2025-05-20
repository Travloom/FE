'use client'

import usePlanStore from "@/stores/usePlanStore";
import { KakaoIcon, MenuIcon } from "../../assets/svgs";
import usePageAnimateRouter from "@/hooks/common/usePageAnimateRouter";
import { useParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Motion from "../motion/Motion";

const Header = () => {

  const { planId } = useParams();

  const {
    title
  } = usePlanStore();

  const pageAnimateRouter = usePageAnimateRouter();

  return (
    <div 
      className={`
        lg:px-[60px] lg:h-[80px]
        px-5 h-[60px] top-0 left-0 absolute w-full flex items-center justify-between bg-[rgba(108,92,231,0.15)] text-[32px] border-b border-b-gray-300 shadow-[0_4px_10px_0_rgba(0,0,0,0.1)] transition-all-300-out`}>
      <p
        className={`lg:block hidden mt-[1%] text-point cursor-pointer`}
        onClick={() => pageAnimateRouter.push('/')}>떠나,봄</p>
      <MenuIcon className={`lg:hidden text-point w-7`}/>
      <AnimatePresence>
        {title && planId &&
          <Motion.MotionP
            className={`lg:text-[32px] text-[24px] mt-[1%] text-point`}>{title}
          </Motion.MotionP>}
      </AnimatePresence>
      <KakaoIcon className={`lg:w-10 w-8`} />
    </div>
  )
}

export default Header;