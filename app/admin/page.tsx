import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Panel Administracyjny | MI-KA",
  description: "Panel administracyjny dla strony MI-KA",
};

async function getStats() {
  const newsCount = await db.news.count();
  const publishedNewsCount = await db.news.count({ where: { status: "PUBLISHED" } });
  const draftNewsCount = await db.news.count({ where: { status: "DRAFT" } });
  const archivedNewsCount = await db.news.count({ where: { status: "ARCHIVED" } });

  return {
    newsCount,
    publishedNewsCount,
    draftNewsCount,
    archivedNewsCount,
  };
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/login?callbackUrl=/admin");
  }

  const stats = await getStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Panel Administracyjny</h1>
        <p className="text-muted-foreground">
          Witaj, {session?.user?.name || session?.user?.email}! Zarządzaj treścią swojej strony.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Wszystkie Aktualności</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newsCount}</div>
            <p className="text-xs text-muted-foreground">
              Łączna liczba aktualności w systemie
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Opublikowane</CardTitle>
            <FileText className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.publishedNewsCount}</div>
            <p className="text-xs text-muted-foreground">
              Aktualności widoczne na stronie
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Wersje Robocze</CardTitle>
            <FileText className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.draftNewsCount}</div>
            <p className="text-xs text-muted-foreground">
              Aktualności w przygotowaniu
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Zarchiwizowane</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.archivedNewsCount}</div>
            <p className="text-xs text-muted-foreground">
              Ukryte aktualności
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Szybkie Linki</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle>Zarządzaj Aktualnościami</CardTitle>
              <CardDescription>
                Dodawaj, edytuj i publikuj aktualności na swojej stronie
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle>Ustawienia</CardTitle>
              <CardDescription>
                Zmień ustawienia konta i strony
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}