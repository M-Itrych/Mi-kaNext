'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Send, Mail, User, Phone } from 'lucide-react';
import * as emailjs from '@emailjs/browser';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Form schema with validation
const formSchema = z.object({
  email: z.string().email({
    message: 'Proszę podać prawidłowy adres email.',
  }),
  name: z.string().min(2, {
    message: 'Imię musi mieć co najmniej 2 znaki.',
  }),
  phone: z.string().min(9, {
    message: 'Proszę podać prawidłowy numer telefonu.',
  }),
  message: z.string().min(10, {
    message: 'Wiadomość musi mieć co najmniej 10 znaków.',
  }),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Musisz wyrazić zgodę na przetwarzanie danych.',
  }),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  // Initialize form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      phone: '',
      message: '',
      consent: false,
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    try {
      // Create template parameters object for EmailJS
      const templateParams = {
        email_from: values.email,
        name_from: values.name,
        phone_from: values.phone,
        message: values.message
      };
      
      // Send email using EmailJS with your credentials
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      
      // Show success message
      toast.success('Dziękujemy za wiadomość! Skontaktujemy się z Tobą tak szybko, jak to możliwe.');
      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Napisz do Nas</CardTitle>
          <CardDescription>
            Skontaktuj się z nami, a z chęcią Ci pomożemy!
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="py-8 text-center">
              <h3 className="text-xl font-medium text-green-600">
                Dziękujemy za wiadomość! Skontaktujemy się z Tobą tak szybko, jak to możliwe.
              </h3>
              <Button 
                className="mt-4" 
                variant="outline" 
                onClick={() => setIsSubmitted(false)}
              >
                Wyślij kolejną wiadomość
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:border-primary">
                          <Mail className="ml-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Adres Email" 
                            {...field} 
                            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:border-primary">
                          <User className="ml-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Imię" 
                            {...field} 
                            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:border-primary">
                          <Phone className="ml-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="Numer Telefonu" 
                            {...field} 
                            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0" 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Treść Wiadomości"
                          className="min-h-32 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          Wyrażam zgodę na przetwarzanie moich danych osobowych według zasad
                          określonych w Polityce prywatności przez: MI-KA sp z o.o. Wiem, że w
                          każdej chwili mogę odwołać zgodę.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full bg-[#f80] hover:bg-[#f80]/80" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="mr-2">Wysyłanie...</span>
                      <Send className="h-4 w-4 animate-pulse" />
                    </>
                  ) : (
                    <>
                      <span className="mr-2">Wyślij Wiadomość</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}