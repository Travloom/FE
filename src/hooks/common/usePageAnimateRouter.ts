import usePageStore from "@/stores/usePageStore";
import { useRouter } from "next/navigation";

const usePageAnimateRouter = () => {

  const router = useRouter();

  const {
    setIsPagePending,
  } = usePageStore();

  const push = (url: string) => {
    setIsPagePending(true)
    setTimeout(() => {
      router.push(url)
    }, 300);
  }

  return { push }
}

export default usePageAnimateRouter;