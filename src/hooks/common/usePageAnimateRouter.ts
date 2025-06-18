import usePageStore from "@/stores/usePageStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const usePageAnimateRouter = () => {

  const router = useRouter();
  const pathName = usePathname();

  const {
    setIsPagePending,
    setPageTitle,
  } = usePageStore();

  const push = (url: string) => {
    if (pathName !== url){
      setPageTitle(null)
      setIsPagePending(true)
      setTimeout(() => {
        router.push(url)
      }, 300);
    }
  }

  const replace = (url: string) => {
    if (pathName !== url){
      setIsPagePending(true)
      setTimeout(() => {
        router.replace(url)
      }, 300);
    }
  }

  useEffect(() => {
    setIsPagePending(false);
  }, [pathName])

  return { push, replace }
}

export default usePageAnimateRouter;