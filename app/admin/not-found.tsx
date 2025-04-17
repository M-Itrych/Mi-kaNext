import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Strona nie znaleziona</h2>
      <p className="mt-2 text-center text-muted-foreground">
        Przepraszamy, strona, której szukasz, nie istnieje lub została przeniesiona.
      </p>
      <div className="mt-8 flex space-x-4">
        <Button asChild>
          <Link href="/admin">Powrót do panelu</Link>
        </Button>
      </div>
    </div>
  );
}