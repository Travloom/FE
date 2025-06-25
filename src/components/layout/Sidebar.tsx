import { PlaneMarker } from "@/assets/svgs";
import useSidebarStore from "@/stores/useSidebarStore";
import { AnimatePresence } from "framer-motion";
import SidebarLogButton from "./sidebar/SidebarLogButton";
import useUserStore from "@/stores/useUserStore";
import Motion from "../motion/Motion";
import SidebarItem from "./sidebar/SidebarItem";
import useMobile from "@/hooks/common/useMobile";
import { useEffect } from "react";
import usePageAnimateRouter from "@/hooks/common/usePageAnimateRouter";

const Sidebar = () => {
  const {
    user
  } = useUserStore();

  const {
    isSidebarOpen,
    setIsSidebarOpen,
  } = useSidebarStore();

  const pageAnimateRouter = usePageAnimateRouter();

  const { isUnderTablet } = useMobile();

  useEffect(() => {
    if (!isUnderTablet) {
      setIsSidebarOpen(false)
    }
  }, [isUnderTablet])

  return (
    <>
      <AnimatePresence>
        {isSidebarOpen &&
          <Motion.MotionDiv
            className={`absolute z-[500] bg-[rgba(1,1,1,0.2)] w-screen h-screen lg:hidden`}
            onClick={() => { setIsSidebarOpen(false) }} />
        }
      </AnimatePresence>
      <div
        className={`
          ${isSidebarOpen ? `left-0` : `left-[-300px]`} lg:hidden
          absolute z-[501] w-[300px] h-screen rounded-r-[8px] bg-white border border-gray-200 border-l-0 py-7 transition-all-300-out select-none`}>
        <div className={`flex flex-col gap-5 pb-6 justify-center items-center px-8 border-b border-gray-200`}>
          <div
            className={`flex flex-row gap-1 text-[32px] text-point cursor-pointer`}
            onClick={() => {
              pageAnimateRouter.push("/")
              setIsSidebarOpen(false)
            }}>
            <p>떠나,봄</p>
            <PlaneMarker className={`h-[32px]`} />
          </div>
          <SidebarLogButton isLoggedIn={!!user} />
        </div>
        <SidebarItem text={"새 플랜 생성하기"} uri={"/"} />
        {user &&
          <>
            <SidebarItem text={"마이페이지"} uri={"/mypage"} />
            <SidebarItem text={"캘린더"} uri={"/mypage/calendar"} />
          </>
        }
      </div>
    </>
  )
}

export default Sidebar;