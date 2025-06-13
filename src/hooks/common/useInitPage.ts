import usePageStore from "@/stores/usePageStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const useInitPage = (title: string | null) => {

  const pathName = usePathname();

  const {
    setIsPagePending,
    setPageTitle,
  } = usePageStore();

  useEffect(() => {
    setIsPagePending(false);
  }, [pathName])

  useEffect(() => {
    setPageTitle(title);
  }, [pathName, title])
}

export default useInitPage;