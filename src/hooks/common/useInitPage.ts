import usePageStore from "@/stores/usePageStore";
import { useEffect } from "react";

const useInitPage = (title: string | null) => {

  const {
    setIsPagePending,
    setPageTitle,
  } = usePageStore();

  useEffect(() => {
    setPageTitle(title);
    setIsPagePending(false);
  }, [])
}

export default useInitPage;