import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hurtownia Instalacyjna - Największy wybór w północnej Polsce | MI-KA",
  description: "Oferujemy szeroki wybór komponentów instalacyjnych, techniki grzewczej, wentylacji i rekuperacji. Największy asortyment w północnej Polsce dla instalatorów i klientów indywidualnych.",
  keywords: "hurtownia instalacyjna, technika grzewcza, pompy ciepła, kotły gazowe, instalacje sanitarne, wentylacja, rekuperacja, materiały instalacyjne, Wejherowo, Pomorze",
};

export default function HurtowniaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}