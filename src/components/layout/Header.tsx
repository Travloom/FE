'use client'

import usePlanStore from "@/stores/usePlanStore";
import { KakaoIcon } from "../../assets/svgs";
import usePageAnimateRouter from "@/hooks/usePageAnimateRouter";
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
    <div className={`top-0 left-0 absolute w-full px-[60px] h-[100px] flex items-center justify-between bg-[rgba(108,92,231,0.15)] text-[40px] border-b border-b-gray-300 shadow-[0_4px_10px_0_rgba(0,0,0,0.1)]`}>
      <p
        className={`mt-[1%] text-point cursor-pointer`}
        onClick={() => pageAnimateRouter.push('/')}>떠나,봄</p>
      <AnimatePresence>
        {title && planId &&
          <Motion.MotionP
            className={`mt-[1%] text-point`}>{title}
          </Motion.MotionP>}
      </AnimatePresence>
      <KakaoIcon className={`w-12`} />
    </div>
  )
}

export default Header;