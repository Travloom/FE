import usePageStore from "@/stores/usePageStore";
import { useEffect } from "react";

const useInitPage = (title: string | null) => {

  const {
    setIsPagePending,
    setPageTitle,
  } = usePageStore();

  useEffect(() => {
    setIsPagePending(false);
  }, []);

  useEffect(() => {
    setPageTitle(title);
  }, [title])
}

export default useInitPage;