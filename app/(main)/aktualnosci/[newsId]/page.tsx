"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import DOMPurify from "dompurify";
import Image from "next/image";
import { ArrowLeft, Calendar, Printer } from "lucide-react";
import { Card } from "@/components/ui/card";
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
  // Removed related news state
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  // In a real implementation, uncomment this to fetch from API
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(`/api/news/${id}`);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }
  //       const data = await response.json();
  //       setNewsItem(data);
  //       
  //       // Related news fetching removed
  //     } catch (error) {
  //       console.error("Error fetching news:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   
  //   if (typeof window !== 'undefined') {
  //     window.scrollTo(0, 0);
  //   }
  //   
  //   fetchData();
  // }, [id]);

  // Mock data for demonstration
  useEffect(() => {
    setLoading(true);
    
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    
    // Mock single news item
    const mockNewsItem: NewsItem = {
      id: id,
      date: new Date("2025-03-15"),
      title: "Company Expansion to European Markets",
      description: "We're excited to announce our expansion into several European markets, including Germany, France, and Spain. This strategic move allows us to better serve our growing international customer base and tap into new opportunities.",
      content: `
        <p>We are thrilled to announce a significant milestone in our company's journey - our expansion into the European market. After months of careful planning and preparation, we are now ready to establish a strong presence in key European countries including Germany, France, and Spain.</p>
        
        <p>This strategic expansion comes as a response to the growing demand for our products and services in Europe, and it represents a pivotal step in our global growth strategy. By establishing local operations in these markets, we aim to better serve our existing European customers while also tapping into new opportunities for collaboration and innovation.</p>
        
        <h2>New European Headquarters</h2>
        
        <p>As part of this expansion, we are opening our European headquarters in Berlin, Germany. This central location will serve as our hub for all European operations, allowing us to coordinate our activities across the continent effectively. The Berlin office will host a diverse team of professionals working across various departments, from sales and marketing to customer support and technical development.</p>
        
        <p>Additionally, we are establishing satellite offices in Paris, France, and Madrid, Spain, to ensure we have a local presence in these important markets. These offices will focus on building relationships with local clients and partners, providing tailored solutions that meet the specific needs of each market.</p>
        
        <h2>Investment in Local Talent</h2>
        
        <p>We believe that our success in Europe will depend on our ability to understand and adapt to local market conditions. To this end, we are committed to investing in local talent in each of our European locations. We are currently in the process of hiring professionals who not only have the skills and experience we need but also understand the local business environment and culture.</p>
        
        <p>Our European team will work closely with our existing teams around the world, sharing knowledge and best practices to ensure we maintain the high standards of quality and service that our customers expect from us. We are particularly excited about the diverse perspectives and ideas that our new European colleagues will bring to our company.</p>
        
        <h2>Looking Ahead</h2>
        
        <p>This European expansion is just the beginning of a new chapter in our company's story. We see enormous potential for growth and innovation in Europe, and we are committed to making the necessary investments to realize this potential. We are also exploring opportunities to expand into other European countries in the near future, with a particular focus on the Nordic region and Eastern Europe.</p>
        
        <p>We would like to thank our customers, partners, and employees for their continued support and trust in our company. We are confident that this expansion will enable us to serve you better and create new opportunities for collaboration and growth.</p>
        
        <p>Stay tuned for more updates on our European journey in the coming months!</p>
      `,
      imageUrl: "/api/placeholder/1200/600"
    };
    
    // Related news mock data removed
    
    setTimeout(() => {
      setNewsItem(mockNewsItem);
      setLoading(false);
    }, 800);
  }, [id]);

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