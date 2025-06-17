import { logOutRequest } from "@/apis/user";
import usePageAnimateRouter from "@/hooks/common/usePageAnimateRouter";
import useSidebarStore from "@/stores/useSidebarStore";
import useUserStore from "@/stores/useUserStore";
import { useRouter } from "next/navigation";

interface SidebarLogButtonProps {
  isLoggedIn: boolean;
}

const SidebarLogButton = ({
  isLoggedIn,
}: SidebarLogButtonProps) => {

  const {
    setUser,
  } = useUserStore();

  const {
    setIsSidebarOpen,
  } = useSidebarStore();
  
  const router = useRouter();
  const pageAnimateRouter = usePageAnimateRouter();

  const logOut = async () => {
    await logOutRequest();
    setIsSidebarOpen(false);
    pageAnimateRouter.replace('/')
    setUser(null)
  }

  const logoutClass = `text-point border-point hover:text-white hover:bg-point`
  const loginClass = `text-red-400 border-red-400 hover:text-white hover:bg-red-400`

  return (
    <div
      className={
        `${isLoggedIn ? loginClass : logoutClass}
        rounded-[8px] w-full py-2.5 text-[16px] border text-center transition-all-300-out cursor-pointer`}
      onClick={isLoggedIn ? logOut : () => router.push(`${process.env.NEXT_PUBLIC_DOMAIN}/oauth2/authorization/kakao`)}>
      {isLoggedIn ? `로그아웃` : `로그인`}
    </div>
  )
}

export default SidebarLogButton;