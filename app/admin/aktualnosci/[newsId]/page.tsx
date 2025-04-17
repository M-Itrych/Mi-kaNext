import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { db } from "@/lib/db";
import { NewsForm } from "@/components/admin/news-form";

interface NewsEditPageProps {
  params: { newsId: string };
}

export default async function NewsEditPage({ params }: NewsEditPageProps) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/login?callbackUrl=/admin/aktualnosci");
  }

  const newsItem = await db.news.findUnique({
    where: {
      id: params.newsId,
    },
  });

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Edytuj Aktualność</h1>
        <p className="text-muted-foreground">
          Edytuj tytuł, treść, lub status aktualności
        </p>
      </div>
      <NewsForm initialData={newsItem} />
    </div>
  );
}