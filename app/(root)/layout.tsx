import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
        <div className="min-h-[calc(100vh-119.59px)]">
          {children}
        </div>
      <Footer />
    </div>
  );
}