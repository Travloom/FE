'use client'

import usePageAnimateRouter from "@/hooks/common/usePageAnimateRouter";
import usePageStore from "@/stores/usePageStore";
import useUserStore from "@/stores/useUserStore";
import { useEffect } from "react";

export default function AfterLoginLayout({ children }: { children: React.ReactNode }) {

  const {
    user
  } = useUserStore();

  const {
    isPagePending,
  } = usePageStore();

  const pageAnimateRouter = usePageAnimateRouter();

  useEffect(() => {
    if (!user && !isPagePending) {
      pageAnimateRouter.replace(`${process.env.NEXT_PUBLIC_DOMAIN}/oauth2/authorization/kakao`)
    }
  }, [user, isPagePending])

  return (
    <>
      {children}
    </>
  );
}
