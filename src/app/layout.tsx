'use client'

import Header from "@/components/layout/Header";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence } from "framer-motion";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body className={`relative`}>
        <AnimatePresence>
          <QueryClientProvider client={queryClient}>
            <Header />
            {children}
            <div className={`bg-[url('/images/background.png')] w-screen h-screen fixed top-0 bg-cover bg-center z-[-9999]`} />
            <div className={`z-9999`} id="portal-root" />
          </QueryClientProvider>
        </AnimatePresence>
      </body>
    </html>
  );
}
