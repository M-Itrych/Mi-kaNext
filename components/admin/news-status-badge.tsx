import { Badge } from "@/components/ui/badge";

interface NewsStatusBadgeProps {
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}

export function NewsStatusBadge({ status }: NewsStatusBadgeProps) {
  switch (status) {
    case "PUBLISHED":
      return (
        <Badge variant="default" className="bg-green-500 hover:bg-green-600">
          Opublikowany
        </Badge>
      );
    case "DRAFT":
      return (
        <Badge variant="outline" className="text-amber-500 border-amber-500">
          Wersja robocza
        </Badge>
      );
    case "ARCHIVED":
      return (
        <Badge variant="secondary">
          Zarchiwizowany
        </Badge>
      );
    default:
      return null;
  }
}