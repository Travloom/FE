import usePageStore from "@/stores/usePageStore";
import { useEffect } from "react";

const useInitPage = (title: string | null) => {

  const {
    setIsPagePending,
    setTitle,
  } = usePageStore();

  useEffect(() => {
    setIsPagePending(false);
    setTitle(title);
  }, []);
}

export default useInitPage;