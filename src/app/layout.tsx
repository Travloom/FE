import Head from "next/head";
import Providers from "./providers";
import "@/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <Head>
        <title>떠나,봄</title>
        <link rel="icon" href="/svgs/favicon.svg"/>
        <meta name="description" content={"AI와 함께하는 스마트 여행 플래너, 떠나,봄"} />
        <meta property="og:title" content={"떠나,봄봄"} />
        <meta property="og:description" content={"AI와 함께하는 스마트 여행 플래너, 떠나,봄"} />
        <meta property="og:image" content="/images/seo_image.png" />
      </Head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
