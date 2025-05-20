import usePageStore from "@/stores/usePageStore";
import { usePathname, useRouter } from "next/navigation";

const usePageAnimateRouter = () => {

  const router = useRouter();
  const pathName = usePathname();

  const {
    setIsPagePending,
  } = usePageStore();

  const push = (url: string) => {
    if (pathName !== url){
      setIsPagePending(true)
      setTimeout(() => {
        router.push(url)
      }, 300);
    }
  }

  return { push }
}

export default usePageAnimateRouter;