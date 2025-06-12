'use client'

import NoticeModal from "@/components/common/NoticeModal";
import Header from "@/components/layout/Header";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      {children}
      <div className={`bg-[url('/images/background.png')] w-screen h-screen fixed top-0 bg-cover bg-center z-[-9999]`} />
      <div className={`z-9999`} id="portal-root" />
      <NoticeModal />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}