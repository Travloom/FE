import usePageStore from "@/stores/usePageStore";
import { useEffect } from "react";

const useInitPage = (title: string | null) => {

  const {
    setPageTitle,
  } = usePageStore();

  useEffect(() => {
    setPageTitle(title);
  }, [title])
}

export default useInitPage;