import { NavBar } from "@/components/navigation/NavBar";
import MainPageFooter from "@/components/navigation/MainPageFooter";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div className="relative min-h-screen flex flex-col">
          <NavBar />
          <div className="flex-grow">{children}</div>
          <MainPageFooter />
        </div>
  );
}
