// app/not-found.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to homepage after a short delay
    const redirectTimer = setTimeout(() => {
      router.push('/');
    }, 3000); // Redirect after 3 seconds
    
    return () => clearTimeout(redirectTimer);
  }, [router]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-3xl font-bold mb-4">Strona nie została znaleziona</h1>
      <p className="mb-6 text-center">Przekierowujemy Cię na stronę główną za 3 sekundy...</p>
      <button 
        onClick={() => router.push('/')}
        className="px-4 py-2 bg-[#f80] text-white rounded hover:bg-[#f80]/80 transition-colors"
      >
        Przejdź na stronę główną
      </button>
    </div>
  );
}