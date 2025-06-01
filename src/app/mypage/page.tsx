'use client'

import { logOutRequest } from "@/apis/user";
import Motion from "@/components/motion/Motion";
import useInitPage from "@/hooks/common/useInitPage";
import usePageStore from "@/stores/usePageStore";
import useUserStore from "@/stores/useUserStore";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Mypage() {

  const router = useRouter();

  const {
    user,
  } = useUserStore();

  const {
    isPagePending,
  } = usePageStore()

  const logOut = async () => {
    const logoutUrl = await logOutRequest();
    router.push(logoutUrl)
  }

  useInitPage('마이페이지')

  return (
    <>
      <AnimatePresence>
        {!isPagePending &&
          <Motion.MotionDiv
            className={`
              lg:p-[60px] lg:pt-[140px]
              pt-[70px] gap-2.5 flex flex-col h-full transition-all-300-out`}>
            <div 
              className={`  
                lg:text-[20px] 
                md:text-[18px]
                text-[16px] w-full h-full p-2.5 flex flex-col gap-2.5 bg-white rounded-[8px] border border-gray-300 transition-all-300-out`}>
              <div
                className={`
                  lg:px-6
                  md:px-5 md:py-4
                  px-4 py-3 flex justify-between items-center w-full rounded-[8px] border border-gray-300 transition-all-300-out`}>
                <div
                  className={`flex flex-col gap-1`}>
                  <p>{user?.name} 님</p>
                  <p className={`text-gray-500`}>{user?.email}</p>
                </div>
                <button
                  className={`
                    lg:text-[18px] 
                    md:text-[16px]
                    text-[14px] text-white bg-[#F37E7E] px-5 py-2.5 rounded-[8px] h-fit w-fit transition-all-300-out`}
                  onClick={logOut}>로그아웃</button>
              </div>

              {/* 지난 여행 */}
              <div 
                className={`
                  lg:px-6
                  md:px-5 md:py-4
                  px-4 py-3 flex flex-col grow justify-between items-center w-full gap-5 rounded-[8px] border border-gray-300 transition-all-300-out`}>
                <div className={`border-b border-gray-200 w-full pb-2`}>
                  <p className={`w-fit cursor-pointer`}>지난 여행 &gt;</p>
                </div>
                <div className={`h-full`}>
                  <p
                    className={`
                      lg:text-[18px]
                      md:text-[16px] 
                      text-[14px] text-gray-200 h-full flex justify-center items-center text-center transition-all-300-out`}>여행 기록이 없어요. 여행을 떠나보세요!</p>
                </div>
              </div>

              {/* 나의 플랜 */}
              <div 
                className={`
                  lg:px-6
                  md:px-5 md:py-4
                  px-4 py-3 flex flex-col grow justify-between items-center w-full gap-5 rounded-[8px] border border-gray-300 transition-all-300-out`}>
                <div className={`border-b border-gray-200 w-full pb-2`}>
                  <p className={`w-fit cursor-pointer`}>나의 플랜 &gt;</p>
                </div>
                <div className={`h-full`}>
                  <p 
                    className={`
                      lg:text-[18px]
                      md:text-[16px] 
                      text-[14px] text-gray-200 h-full flex justify-center items-center text-center transition-all-300-out`}>여행 계획을 세워보세요!</p>
                </div>
              </div>

              {/* 캘린더 */}
              <div 
                className={`
                  lg:px-6
                  md:px-5 md:py-4
                  px-4 py-3 flex flex-col justify-between items-center w-full gap-5 rounded-[8px] border border-gray-300 transition-all-300-out`}>
                <div className={`w-full`}>
                  <p className={`w-fit cursor-pointer`}>캘린더 바로가기 &gt;</p>
                </div>
              </div>
            </div>
          </Motion.MotionDiv>
        }
      </AnimatePresence>
    </>
  )
}
