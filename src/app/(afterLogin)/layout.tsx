'use client'

import Motion from "@/components/motion/Motion";
import usePageAnimateRouter from "@/hooks/common/usePageAnimateRouter";
import usePageStore from "@/stores/usePageStore";
import useUserStore from "@/stores/useUserStore";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function AfterLoginLayout({ children }: { children: React.ReactNode }) {

  const {
    isLoggedIn
  } = useUserStore();

  const {
    isPagePending,
  } = usePageStore();

  const pageAnimateRouter = usePageAnimateRouter();

  useEffect(() => {
    if (isLoggedIn !== null && !isLoggedIn && !isPagePending) {
      pageAnimateRouter.replace(`${process.env.NEXT_PUBLIC_DOMAIN}/oauth2/authorization/kakao`)
    }
  }, [isLoggedIn, isPagePending])

  return (
    <AnimatePresence>
      {isLoggedIn &&
        <Motion.MotionDiv className={`h-full`}>
          {children}
        </Motion.MotionDiv>
      }
    </AnimatePresence>
  );
}
