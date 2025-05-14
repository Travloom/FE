import Header from "@/components/layout/Header";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`relative`}>
        <Header/>
        {children}
        <div className={`bg-[url('/images/background.png')] w-screen h-screen fixed top-0 bg-cover bg-center z-[-9999]`}/>
      </body>
    </html>
  );
}
