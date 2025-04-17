import { Metadata } from "next";

export const metadata: Metadata = {
    title: "O Nas - MI-KA - Od 2008 roku na rynku instalacyjnym | MI-KA",
    description: "MI-KA działa na rynku od 2008 roku, oferując nowoczesne systemy grzewcze i artykuły instalacyjno-sanitarne. Jesteśmy członkiem grupy PHI, co daje nam większe możliwości w zakresie współpracy z dostawcami.",
    keywords: "MI-KA, o firmie, hurtownia instalacyjna, biuro projektowe, serwis techniczny, grupa PHI, historia firmy, misja firmy",
  };
  

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}