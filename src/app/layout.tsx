import Providers from "./providers";
import "@/styles/globals.css";

export const metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_WEB_DOMAIN}`),
  title: '떠나,봄',
  description: 'AI와 함께하는 스마트 여행 플래너, 떠나,봄',
  icons: {
    icon: '/svgs/favicon.svg',
  },
  openGraph: {
    title: '떠나,봄',
    description: 'AI와 함께하는 스마트 여행 플래너, 떠나,봄',
    url: 'https://travloom.store',
    siteName: '떠나,봄',
    images: [
      {
        url: './images/seo_image.png',
        width: 1200,
        height: 630,
        alt: '떠나,봄 서비스 소개 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
