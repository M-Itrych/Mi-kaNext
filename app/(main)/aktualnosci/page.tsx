"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Calendar } from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

interface NewsItem {
  id: string;
  date: Date | string;
  title: string;
  description: string;
  imageUrl: string | null;
}

type SortOption = "newest" | "oldest" | "title";

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  
  const itemsPerPage = 6;

  // In a real implementation, uncomment this to fetch from API
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(`/api/news`);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }
  //       const data = await response.json();
  //       setNews(data);
  //     } catch (error) {
  //       console.error("Error fetching news:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   
  //   fetchData();
  // }, []);

  // Mock data for demonstration
  useEffect(() => {
    const mockData: NewsItem[] = [
      {
        id: "1",
        date: new Date("2025-03-15"),
        title: "Company Expansion to European Markets",
        description: "We're excited to announce our expansion into several European markets, including Germany, France, and Spain. This strategic move allows us to better serve our growing international customer base and tap into new opportunities.",
        imageUrl: "/api/placeholder/800/500"
      },
      {
        id: "2",
        date: new Date("2025-03-10"),
        title: "New Product Launch Event",
        description: "Join us next month for the unveiling of our revolutionary new product line that will change how you work. The virtual event will feature demonstrations, Q&A sessions, and special offers for early adopters.",
        imageUrl: "/api/placeholder/800/500"
      },
      {
        id: "3",
        date: new Date("2025-03-05"),
        title: "Annual Charity Drive Results",
        description: "Thanks to the generosity of our employees and partners, we've raised over $50,000 for local charities during our annual charity drive. These funds will support education initiatives and community development programs.",
        imageUrl: "/api/placeholder/800/500"
      },
      {
        id: "4",
        date: new Date("2025-02-28"),
        title: "Industry Award Recognition",
        description: "We're proud to announce that our company has been recognized with three industry awards for innovation, customer service, and sustainability efforts. These accolades reflect our team's dedication to excellence.",
        imageUrl: "/api/placeholder/800/500"
      },
      {
        id: "5",
        date: new Date("2025-02-20"),
        title: "Partnership with Tech Giant",
        description: "We've entered into a strategic partnership with a leading technology company to develop integrated solutions for the healthcare sector. This collaboration will combine our expertise to address critical industry challenges.",
        imageUrl: "/api/placeholder/800/500"
      },
      {
        id: "6",
        date: new Date("2025-02-15"),
        title: "Sustainability Initiative Launch",
        description: "Our company is launching a comprehensive sustainability program focused on reducing our carbon footprint, minimizing waste, and promoting eco-friendly practices throughout our operations and supply chain.",
        imageUrl: "/api/placeholder/800/500"
      },
      {
        id: "7",
        date: new Date("2025-02-10"),
        title: "Employee Recognition Program",
        description: "Introducing our revamped employee recognition program designed to celebrate outstanding contributions and promote a culture of appreciation. The program includes peer nominations and quarterly awards.",
        imageUrl: "/api/placeholder/800/500"
      },
      {
        id: "8",
        date: new Date("2025-02-05"),
        title: "Quarterly Financial Results",
        description: "We're pleased to report strong financial performance for Q4 2024, with revenue growth exceeding market expectations. This success positions us well for continued expansion and investment in 2025.",
        imageUrl: "/api/placeholder/800/500"
      }
    ];
    
    setNews(mockData);
    setLoading(false);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
  };

  // Filter and sort news
  const filteredNews = news.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedNews = [...filteredNews].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedNews.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedNews.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-3">Aktualności</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bądź na bieżąco i dowiedz się co aktualnie dzieje się w Naszej Firmie.
          </p>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Szukaj aktualności..."
              className="pl-10"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <Select value={sortBy} onValueChange={(value: string) => handleSortChange(value as SortOption)}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sortuj według" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Najnowsze</SelectItem>
              <SelectItem value="oldest">Najstarsze</SelectItem>
              <SelectItem value="title">Alfabetycznie</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* News grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-4 w-1/4 mb-2" />
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            {sortedNews.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900">Brak wyników</h3>
                <p className="mt-1 text-gray-500">Nie znaleziono aktualności spełniających kryteria wyszukiwania.</p>
                <Button 
                  className="mt-4" 
                  variant="outline" 
                  onClick={() => setSearchTerm("")}
                >
                  Wyczyść wyszukiwanie
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentItems.map((item) => (
                  <Link href={`/aktualnosci/${item.id}`} key={item.id} passHref>
                    <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 h-full">
                      <div className="h-48 overflow-hidden relative">
                        {item.imageUrl && (
                          <Image 
                            src={item.imageUrl} 
                            alt={item.title} 
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 hover:scale-105"
                          />
                        )}
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <Calendar className="h-4 w-4 mr-1" />
                          {format(new Date(item.date), "dd.MM.yyyy")}
                        </div>
                        <CardTitle className="text-xl line-clamp-2">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-3">
                          {item.description}
                        </CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button variant="link" className="p-0 h-auto text-[#f80] font-medium">
                          Czytaj więcej
                        </Button>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                          e.preventDefault();
                          setCurrentPage(prev => prev - 1);
                        }} 
                      />
                    </PaginationItem>
                  )}
                  
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            href="#"
                            isActive={pageNumber === currentPage}
                            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                              e.preventDefault();
                              setCurrentPage(pageNumber);
                            }}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      (pageNumber === currentPage - 2 && currentPage > 3) ||
                      (pageNumber === currentPage + 2 && currentPage < totalPages - 2)
                    ) {
                      return (
                        <PaginationItem key={pageNumber} className="flex items-center justify-center px-4">
                          ...
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}
                  
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext 
                        href="#" 
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                          e.preventDefault();
                          setCurrentPage(prev => prev + 1);
                        }} 
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </main>
    </div>
  );
}