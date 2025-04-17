// polityka/page.tsx
'use client';

import { Card } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PolitykaPage() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <Card className="max-w-4xl mx-auto bg-white shadow-md p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-6">Polityka Prywatności</h1>
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Jak przetwarzamy Państwa dane?</h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {/* Section 1 */}
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium text-slate-700">
                Zakres danych
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Przetwarzamy następujące kategorie Państwa danych: dane identyfikacyjne (imię, nazwisko), 
                dane kontaktowe (adres, numer telefonu, adres poczty elektronicznej).
              </AccordionContent>
            </AccordionItem>

            {/* Section 2 */}
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium text-slate-700">
                Administrator
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Administratorem Państwa danych osobowych jest MI-KA SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ 
                z siedzibą w Gościcinie, NIP 5882507688, REGON 527457728 („Spółka").
              </AccordionContent>
            </AccordionItem>

            {/* Section 3 */}
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium text-slate-700">
                Kontakt ze specjalistą ds. ochrony danych Spółki
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Mogą Państwo skontaktować się ze specjalistą ds. ochrony danych Spółki w formie 
                tradycyjnej na adres siedziby Spółki z dopiskiem „Inspektor Ochrony Danych" lub 
                w formie elektronicznej na adres e-mail: administracja@mi-ka.pl.
              </AccordionContent>
            </AccordionItem>

            {/* Section 4 */}
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-medium text-slate-700">
                Cele i podstawa przetwarzania
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                <p className="mb-2">Państwa dane osobowe przetwarzane będą w następującym celu:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Podjęcia kontaktu i udzielenia odpowiedzi na zapytanie 
                    (podstawa prawna: art. 6 ust. 1 lit. f RODO).
                  </li>
                  <li>
                    Analitycznym – lepszego doboru usług do potrzeb naszych klientów, ogólnej optymalizacji naszych 
                    produktów, optymalizacji procesów obsługi, budowania wiedzy o naszych klientach będących 
                    realizacją naszego prawnie uzasadnionego interesu (podstawa prawna: art. 6 ust. 1 lit. f RODO).
                  </li>
                  <li>
                    Archiwalnym (dowodowych) będących realizacją naszego prawnie uzasadnionego interesu 
                    zabezpieczenia informacji na wypadek prawnej potrzeby wykazania faktów 
                    (podstawa prawna: art. 6 ust. 1 lit. f RODO).
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* Section 5 */}
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-medium text-slate-700">
                Odbiorcy danych
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Odbiorcą Państwa danych osobowych będą: podmioty świadczące usługi informatyczne.
              </AccordionContent>
            </AccordionItem>

            {/* Section 6 */}
            <AccordionItem value="item-6">
              <AccordionTrigger className="text-lg font-medium text-slate-700">
                Okres przechowywania
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Dane przetwarzane na podstawie prawnie uzasadnionego interesu administratora danych 
                możemy przetwarzać do czasu wypełnienia prawnie uzasadnionych interesów Spółki 
                stanowiących podstawę tego przetwarzania lub do czasu wniesienia przez Państwa 
                sprzeciwu wobec takiego przetwarzania.
              </AccordionContent>
            </AccordionItem>

            {/* Section 7 */}
            <AccordionItem value="item-7">
              <AccordionTrigger className="text-lg font-medium text-slate-700">
                Pouczenie o prawach
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Przysługuje Państwu prawo dostępu do treści swoich danych oraz prawo ich sprostowania, 
                usunięcia, ograniczenia przetwarzania, prawo do przenoszenia danych, prawo wniesienia 
                sprzeciwu wobec przetwarzania danych, prawo wniesienia sprzeciwu wobec profilowania, 
                prawo do cofnięcia zgody w dowolnym momencie bez podania przyczyny, bez wpływu na 
                zgodność z prawem przetwarzania, którego dokonano na podstawie zgody przed jej cofnięciem.
              </AccordionContent>
            </AccordionItem>

            {/* Section 8 */}
            <AccordionItem value="item-8">
              <AccordionTrigger className="text-lg font-medium text-slate-700">
                Prawo do skargi
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Przysługuje Państwu prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych, 
                gdy uznają Państwo, iż przetwarzanie danych osobowych Państwa dotyczących narusza przepisy RODO.
              </AccordionContent>
            </AccordionItem>

            {/* Section 9 */}
            <AccordionItem value="item-9">
              <AccordionTrigger className="text-lg font-medium text-slate-700">
                Prawo do sprzeciwu
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                W każdej chwili przysługuje Państwu prawo do wniesienia sprzeciwu wobec przetwarzania 
                Państwa danych na podstawie prawnie uzasadnionego interesu, opisanego powyżej. Przestaniemy 
                przetwarzać Państwa dane w tych celach, chyba że będziemy w stanie wykazać, że w stosunku 
                do tych danych istnieją dla nas ważne prawnie uzasadnione podstawy, które są nadrzędne 
                wobec Państwa interesów, praw i wolności, lub dane będą nam niezbędne do ewentualnego 
                ustalenia, dochodzenia lub obrony roszczeń.
              </AccordionContent>
            </AccordionItem>

            {/* Section 10 */}
            <AccordionItem value="item-10">
              <AccordionTrigger className="text-lg font-medium text-slate-700">
                Zautomatyzowane podejmowanie decyzji
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Państwa dane osobowe nie podlegają zautomatyzowanemu podejmowaniu decyzji, 
                w tym profilowaniu związanym z automatycznym podejmowaniem decyzji.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-8 text-sm text-slate-500 text-center">
            Ostatnia aktualizacja: Kwiecień 2025
          </div>
        </Card>
      </main>
      
    </div>
  );
}