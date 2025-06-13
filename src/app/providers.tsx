'use client'

import NoticeModal from "@/components/common/NoticeModal";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Motion from "@/components/motion/Motion";
import useInitPage from "@/hooks/common/useInitPage";
import usePageStore from "@/stores/usePageStore";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { HashLoader } from "react-spinners";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  const pathName = usePathname();

  const {
    isPagePending
  } = usePageStore();

  useEffect(() => {
  }, [pathName])

  useInitPage(null);

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Sidebar />
      <AnimatePresence mode="wait">
      {isPagePending ? (
        <Motion.MotionDiv key={"loading"} className={`flex justify-center items-center w-full h-full`}>
          <HashLoader
            size={30}
            color={`#6c5ce7`} />
        </Motion.MotionDiv>
      ) : (
        <Motion.MotionDiv key={"page"} className={`h-full`}>
          {children}
        </Motion.MotionDiv>
      )}
      </AnimatePresence>
      <div className={`bg-[url('/images/background.png')] w-screen h-screen fixed top-0 bg-cover bg-center z-[-9999]`} />
      <div className={`z-9999`} id="portal-root" />
      <NoticeModal />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}