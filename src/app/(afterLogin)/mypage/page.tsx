'use client'

import { logOutRequest } from "@/apis/user";
import Motion from "@/components/motion/Motion";
import PlanList from "@/components/mypage/PlanList";
import usePageAnimateRouter from "@/hooks/common/usePageAnimateRouter";
import usePageStore from "@/stores/usePageStore";
import useUserStore from "@/stores/useUserStore";
import { AnimatePresence } from "framer-motion";

export default function Mypage() {

  const {
    user,
    isLoggedIn,
    setUser,
  } = useUserStore();

  const {
    isPagePending,
  } = usePageStore()

  const pageAnimateRouter = usePageAnimateRouter();

  const logOut = async () => {
    await logOutRequest();
    setUser(null)
    pageAnimateRouter.replace('/')
  }

  return (
    <AnimatePresence>
      {!isPagePending && isLoggedIn && 
        <Motion.MotionDiv
          className={`
              lg:p-[60px] lg:pt-[140px]
              pt-[70px] gap-2.5 flex flex-col h-full transition-all-300-out`}>
          <div
            className={`  
                lg:text-[20px] lg:rounded-[8px]
                md:text-[18px]
                text-[16px] w-full h-full p-2.5 flex flex-col gap-2.5 bg-white border border-gray-300 transition-all-300-out select-none`}>
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
                    text-[14px] text-red-400 bg-white hover:text-white hover:bg-red-400 border border-red-400 px-5 py-2.5 rounded-[8px] h-fit w-fit transition-all-300-out`}
                onClick={logOut}>로그아웃</button>
            </div>

            <div className={`flex flex-col h-full overflow-auto grow rounded-[8px] border border-gray-300 p-2.5 no-scroll`}>

              {/* 캘린더 */}
              <div
                className={`
                  lg:px-6
                  md:px-5 md:py-4
                  px-4 py-3 flex flex-col justify-between items-center w-full gap-5 rounded-[8px] border border-gray-300 transition-all-300-out`}>
                <div className={`w-full`}>
                  <p className={`w-fit cursor-pointer`} onClick={() => pageAnimateRouter.push('/mypage/calendar')}>캘린더 바로가기 &gt;</p>
                </div>
              </div>

              {/* 지난 여행 */}
              <PlanList requestQuery={{
                before: new Date(),
              }} />

              {/* 나의 플랜 */}
              <PlanList requestQuery={{
                after: new Date(),
              }} />
            </div>
          </div>
        </Motion.MotionDiv>
      }
    </AnimatePresence>
  )
}
