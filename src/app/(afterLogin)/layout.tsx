'use client'

import useInitPage from "@/hooks/common/useInitPage";
import usePageAnimateRouter from "@/hooks/common/usePageAnimateRouter";
import usePageStore from "@/stores/usePageStore";
import useUserStore from "@/stores/useUserStore";
import { useEffect } from "react";

export default function AfterLoginLayout({ children }: { children: React.ReactNode }) {

  const {
    isLoggedIn
  } = useUserStore();

  const {
    isPagePending,
  } = usePageStore();

  const pageAnimateRouter = usePageAnimateRouter();

  useEffect(() => {
    if (isLoggedIn !== null && !isLoggedIn && !isPagePending) {
      pageAnimateRouter.replace(`${process.env.NEXT_PUBLIC_DOMAIN}/oauth2/authorization/kakao`)
    }
  }, [isLoggedIn, isPagePending])

  useInitPage("마이페이지");

  return (
    <>
      {children}
    </>
  );
}
