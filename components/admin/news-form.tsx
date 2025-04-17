"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { NewsStatus } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import RichTextToolbar from "./rich-text-toolbar";
import { FileUpload } from "@/components/admin/file-upload";

const newsFormSchema = z.object({
  title: z.string().min(1, "Tytuł jest wymagany"),
  description: z.string().min(1, "Opis jest wymagany"),
  imageUrl: z.string().nullable().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
});

type NewsFormValues = z.infer<typeof newsFormSchema>;

interface NewsFormProps {
  initialData?: {
    id: string;
    title: string;
    description: string;
    content?: string | null;
    imageUrl?: string | null;
    status: NewsStatus;
  } | null;
}

export function NewsForm({ initialData }: NewsFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Process the initial image URL for display if it's a local uploaded file
  const processedImageUrl = initialData?.imageUrl && 
    initialData.imageUrl.startsWith('/uploaded-files/') 
    ? `/api${initialData.imageUrl}` 
    : initialData?.imageUrl;

  const form = useForm<NewsFormValues>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      imageUrl: initialData?.imageUrl || null,
      status: initialData?.status || "DRAFT",
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: initialData?.content || "",
  });
  
  async function onDelete() {
    if (!initialData) return;
    
    try {
      setIsDeleting(true);
      
      const response = await fetch(`/api/news/${initialData.id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Wystąpił błąd podczas usuwania aktualności");
      }
      
      toast.success("Aktualność została usunięta");
      router.push("/admin/aktualnosci");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Wystąpił błąd podczas usuwania");
    } finally {
      setIsDeleting(false);
    }
  }

  async function onSubmit(data: NewsFormValues) {
    try {
      setIsSaving(true);
      
      const content = editor?.getHTML() || "";
      
      // Process imageUrl to store the original path without /api/ prefix
      let submissionData = {...data};
      if (submissionData.imageUrl?.startsWith('/api/uploaded-files/')) {
        submissionData.imageUrl = submissionData.imageUrl.replace('/api', '');
      }
      
      if (initialData) {
        // Update existing news
        const response = await fetch(`/api/news/${initialData.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...submissionData,
            content,
          }),
        });

        if (!response.ok) {
          throw new Error("Wystąpił błąd podczas aktualizacji aktualności");
        }
        
        toast.success("Aktualność została zaktualizowana");
      } else {
        // Create new news
        const response = await fetch("/api/news", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...submissionData,
            content,
          }),
        });

        if (!response.ok) {
          throw new Error("Wystąpił błąd podczas tworzenia aktualności");
        }
        
        toast.success("Aktualność została utworzona");
      }
      
      router.push("/admin/aktualnosci");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Wystąpił błąd podczas zapisywania");
    } finally {
      setIsSaving(false);
    }
  }
  
  // Use effect to handle updates to FileUpload value
  useEffect(() => {
    // Watch for changes in imageUrl from the form
    const subscription = form.watch((value, { name }) => {
      if (name === 'imageUrl' && value.imageUrl) {
        // If this is an API URL but the form contains the direct path, update it
        if (!value.imageUrl.startsWith('/api/') && value.imageUrl.startsWith('/uploaded-files/')) {
          form.setValue('imageUrl', `/api${value.imageUrl}`);
        }
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);
  
  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="content" className="w-full">
            <TabsList>
              <TabsTrigger value="content">Treść</TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="space-y-6">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zdjęcie główne</FormLabel>
                      <FormControl>
                        <FileUpload 
                          value={field.value}
                          onChange={(url) => {
                            // If we get a direct path from the FileUpload, convert it to API path
                            if (url && url.startsWith('/uploaded-files/')) {
                              field.onChange(`/api${url}`);
                            } else {
                              field.onChange(url);
                            }
                          }}
                          disabled={isSaving}
                        />
                      </FormControl>
                      <FormDescription>
                        Dodaj zdjęcie główne aktualności
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Wybierz status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="DRAFT">Wersja robocza</SelectItem>
                          <SelectItem value="PUBLISHED">Opublikowany</SelectItem>
                          <SelectItem value="ARCHIVED">Zarchiwizowany</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Ustaw status aktualności. Tylko opublikowane aktualności są widoczne na stronie.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tytuł</FormLabel>
                      <FormControl>
                        <Input placeholder="Wpisz tytuł aktualności..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Opis</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Krótki opis aktualności..." 
                          {...field} 
                          rows={3}
                        />
                      </FormControl>
                      <FormDescription>
                        Ten opis pojawi się na liście aktualności
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-2">
                  <FormLabel>Treść</FormLabel>
                  <Card>
                    <CardContent className="p-0">
                      <div className="border-b pl-4 pb-4">
                        {editor && <RichTextToolbar editor={editor} />}
                      </div>
                      <div className="min-h-[300px] p-4">
                        <EditorContent editor={editor} className="prose prose-sm max-w-none h-full" />
                      </div>
                    </CardContent>
                  </Card>
                  <FormDescription>
                    Napisz treść swojej aktualności używając edytora tekstu sformatowanego
                  </FormDescription>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="settings" className="space-y-6">
              
            </TabsContent>
          </Tabs>
          
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/aktualnosci")}
            >
              Anuluj
            </Button>
            <div className="flex gap-2">
              {initialData && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" type="button" disabled={isDeleting}>
                      {isDeleting ? "Usuwanie..." : "Usuń"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Czy na pewno chcesz usunąć?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Ta operacja jest nieodwracalna. Spowoduje to trwałe usunięcie aktualności
                        z bazy danych.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Anuluj</AlertDialogCancel>
                      <AlertDialogAction onClick={onDelete}>Usuń</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Zapisywanie..." : "Zapisz"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}