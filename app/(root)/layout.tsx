import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" h-[calc(100vh-159.58px)] min-h-[calc(100vh-159.58px)]">
      <Header />
      {children}
      <Footer />
    </div>
  );
}