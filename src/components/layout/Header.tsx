'use client'

import { KakaoIcon, MenuIcon, PlaneMarker } from "../../assets/svgs";
import usePageAnimateRouter from "@/hooks/common/usePageAnimateRouter";
import Motion from "../motion/Motion";
import usePageStore from "@/stores/usePageStore";
import { useEffect } from "react";
import useUserStore from "@/stores/useUserStore";
import Image from "next/image";
import { getUserRequest } from "@/apis/user";
import { AnimatePresence } from "framer-motion";
import useSidebarStore from "@/stores/useSidebarStore";
import { useRouter } from "next/navigation";

const Header = () => {

  const {
    setIsSidebarOpen,
  } = useSidebarStore();

  const {
    isPagePending,
    pageTitle
  } = usePageStore();

  const {
    user,
    isLoggedIn,
    setUser,
  } = useUserStore();

  const router = useRouter();
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
      <div
        className={`lg:flex flex-row gap-1 hidden mt-[0.5%] text-point cursor-pointer`}
        onClick={() => pageAnimateRouter.push('/')}>
        <p>떠나,봄</p>
        <PlaneMarker className={`h-[32px]`} />
      </div>
      <MenuIcon
        className={`lg:hidden text-point w-7 cursor-pointer`}
        onClick={() => setIsSidebarOpen(true)} />
      <AnimatePresence>
        {pageTitle && !isPagePending ? (
          <Motion.MotionP
            className={`lg:text-[32px] text-[24px] mt-[4px] text-point`}>{pageTitle}
          </Motion.MotionP>
        ) : (
          <Motion.MotionDiv
            className={`lg:hidden text-[24px] flex flex-row gap-1 mt-[0.5%] text-point cursor-pointer`}
            onClick={() => pageAnimateRouter.push('/')}>
            <p>떠나,봄</p>
            <PlaneMarker className={`h-[24px]`} />
          </Motion.MotionDiv>
        )}
      </AnimatePresence>


      {isLoggedIn !== null ? (
        <Motion.MotionDiv className={`lg:w-[127px] w-8 flex justify-end`}>
          {(user ? (
            <Image
              loader={() => user.profileImageUrl as string}
              className={`lg:w-10 w-8 cursor-pointer rounded-full object-cover aspect-square`}
              src={user.profileImageUrl as string}
              width={1000}
              height={1000}
              alt={'프로필'}
              onClick={() => pageAnimateRouter.push(`/mypage`)} />
          ) : (
            <KakaoIcon
              className={`lg:w-10 w-8 cursor-pointer`}
              onClick={() => router.push(`${process.env.NEXT_PUBLIC_DOMAIN}/oauth2/authorization/kakao`)} />
          ))}
        </Motion.MotionDiv>
      ) : (
        <div className={`lg:w-10 w-8`}></div>
      )}
    </div>
  )
}

export default Header;