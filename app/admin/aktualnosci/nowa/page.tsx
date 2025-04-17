import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NewsForm } from "@/components/admin/news-form";

export default async function NewNewsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/login?callbackUrl=/admin/aktualnosci/nowa");
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Dodaj Nową Aktualność</h1>
        <p className="text-muted-foreground">
          Utwórz nową aktualność, która pojawi się na Twojej stronie
        </p>
      </div>
      <NewsForm />
    </div>
  );
}