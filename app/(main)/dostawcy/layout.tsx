import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nasi Dostawcy - Partnerzy Biznesowi | MI-KA",
  description: "Współpracujemy z ponad 100 renomowanymi dostawcami z branży instalacyjnej, grzewczej i sanitarnej. Poznaj naszych partnerów biznesowych, dzięki którym możemy oferować produkty najwyższej jakości.",
  keywords: "dostawcy instalacyjni, partnerzy biznesowi, producenci kotłów, producenci instalacji, producenci pomp ciepła, współpraca biznesowa",
};

export default function DostawcyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}