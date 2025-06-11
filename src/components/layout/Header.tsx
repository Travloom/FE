'use client'

import { KakaoIcon, MenuIcon } from "../../assets/svgs";
import usePageAnimateRouter from "@/hooks/common/usePageAnimateRouter";
import Motion from "../motion/Motion";
import usePageStore from "@/stores/usePageStore";
import { useEffect } from "react";
import useUserStore from "@/stores/useUserStore";
import Image from "next/image";
import { getUserRequest } from "@/apis/user";
import { AnimatePresence } from "framer-motion";

const Header = () => {

  const {
    isPagePending,
    pageTitle
  } = usePageStore();

  const {
    user,
    setUser,
  } = useUserStore();

  const pageAnimateRouter = usePageAnimateRouter();

  useEffect(() => {
    const setUserInfo = async () => {
      const user = await getUserRequest()
      setUser(user);
    }
    setUserInfo();
  }, [])

  return (
    <div
      className={`
        lg:px-[60px] lg:h-[80px]
        px-5 h-[60px] top-0 left-0 absolute w-full flex items-center justify-between bg-[rgba(108,92,231,0.15)] text-[32px] select-none border-b border-b-gray-300 shadow-[0_4px_10px_0_rgba(0,0,0,0.1)] transition-all-300-out`}>
      <p
        className={`lg:block hidden mt-[0.5%] text-point cursor-pointer`}
        onClick={() => pageAnimateRouter.push('/')}>떠나,봄</p>
      <MenuIcon className={`lg:hidden text-point w-7`} />
      <AnimatePresence>
        {pageTitle && !isPagePending &&
          <Motion.MotionP
            className={`lg:text-[32px] text-[24px] mt-[1%] text-point`}>{pageTitle}
          </Motion.MotionP>}
      </AnimatePresence>

        {user ? (
          <Motion.MotionDiv>
            <Image
              className={`lg:w-10 w-8 cursor-pointer rounded-full object-cover aspect-square`}
              src={user.profileImageUrl as string}
              width={1000}
              height={1000}
              alt={'프로필'}
              onClick={() => pageAnimateRouter.push(`/mypage`)} />
          </Motion.MotionDiv>
        ) : (
          <Motion.MotionDiv>
            <KakaoIcon
              className={`lg:w-10 w-8 cursor-pointer`}
              onClick={() => pageAnimateRouter.push(`${process.env.NEXT_PUBLIC_DOMAIN}/oauth2/authorization/kakao`)} />
          </Motion.MotionDiv>
        )
        }
    </div>
  )
}

export default Header;