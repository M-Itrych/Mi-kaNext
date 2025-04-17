"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import Image from "next/image";
import { ArrowLeft, Calendar, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface NewsItem {
  id: string;
  date: Date | string;
  title: string;
  description: string;
  content?: string;
  imageUrl: string | null;
}

export default function NewsDetail() {
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const newsId = params.newsId as string; // Changed from id to newsId to match route
  const router = useRouter();

  // Debug log to see what params we're getting
  useEffect(() => {
    console.log("Component params:", params);
    console.log("Using newsId:", newsId);
  }, [params, newsId]);

  // In a real implementation, uncomment this to fetch from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Exit early if we don't have a valid ID
        if (!newsId) {
          console.error("No newsId available");
          setLoading(false);
          return;
        }
        
        setLoading(true);
        console.log(`Fetching from: /api/news/${newsId}`);
        const response = await fetch(`/api/news/${newsId}`);
        
        console.log("Response status:", response.status);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Received data:", data);
        setNewsItem(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    
    fetchData();
  }, [newsId]);

  // Handle back navigation
  const handleBack = () => {
    router.push("/aktualnosci");
  };

  // Handle print
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Powrót do aktualności
        </Button>
        
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <div className="flex items-center mb-6">
            <Skeleton className="h-4 w-40 mr-4" />
          </div>
          <Skeleton className="h-96 w-full mb-8" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-3/4 mb-8" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-1/2 mb-8" />
        </div>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Artykuł nie został znaleziony</h2>
        <p className="mb-8">Przepraszamy, ale nie możemy znaleźć artykułu, którego szukasz.</p>
        <Button onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Powrót do aktualności
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Powrót do aktualności
          </Button>
          
          <div className="flex items-center space-x-2 print:hidden">
            <Button variant="ghost" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Drukuj
            </Button>
          </div>
        </div>

        <article className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{newsItem.title}</h1>
          
          <div className="flex flex-wrap items-center text-gray-600 mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {format(new Date(newsItem.date), "dd.MM.yyyy")}
            </div>
          </div>
          
          <div className="mb-8 relative h-96 w-full">
            {newsItem.imageUrl && (
              <Image 
                src={newsItem.imageUrl} 
                alt={newsItem.title} 
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 1200px, 1200px"
                priority
              />
            )}
          </div>
          
          {newsItem.content && (
            <div 
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ 
                __html: typeof window !== 'undefined' ? DOMPurify.sanitize(newsItem.content) : newsItem.content 
              }}
            />
          )}
          
          <div className="flex justify-between items-center py-4 border-t border-b my-8 print:hidden">
            <div className="text-gray-600">
              Opublikowano: {format(new Date(newsItem.date), "dd.MM.yyyy")}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}