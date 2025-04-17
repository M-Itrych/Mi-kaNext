import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { db } from "@/lib/db";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Pencil, Eye } from "lucide-react";
import { NewsStatusBadge } from "@/components/admin/news-status-badge";

export default async function NewsListPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/auth/login?callbackUrl=/admin/aktualnosci");
  }

  const news = await db.news.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Aktualności</h1>
        <Link href="/admin/aktualnosci/nowa">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Dodaj aktualność
          </Button>
        </Link>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tytuł</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data utworzenia</TableHead>
              <TableHead>Data aktualizacji</TableHead>
              <TableHead className="text-right">Akcje</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Brak aktualności
                </TableCell>
              </TableRow>
            )}
            {news.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>
                  <NewsStatusBadge status={item.status} />
                </TableCell>
                <TableCell>
                  {format(new Date(item.createdAt), "dd MMMM yyyy")}
                </TableCell>
                <TableCell>
                  {format(new Date(item.updatedAt), "dd MMMM yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/aktualnosci/${item.id}`}>
                      <Button variant="outline" size="sm">
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edytuj</span>
                      </Button>
                    </Link>
                    <Link href={`/aktualnosci/${item.id}`} target="_blank">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Podgląd</span>
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}