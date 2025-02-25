"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, LoaderCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CreateQuizBody, QuizDifficulty } from "@/type/quiz";
import { useState } from "react";
import { useUser } from "@/lib/context/ClientProvider";
import { useQuiz } from "@/lib/context/QuizProvider";
import { useRouter } from "@/i18n/routing";

const formSchema = z.object({
  theme: z.string().min(2, {
    message: "Le thème doit contenir au moins 2 caractères.",
  }),
  context: z.string().max(250, {
    message: 'Le contexte doit contenir au maximum 250 caractères."',
  }),
  tags: z.string(),
  is_public: z.boolean().default(false),
  questionCount: z.string({
    required_error: "Veuillez sélectionner un nombre de questions.",
  }),
  difficulty: z
    .enum(["Facile", "Intermédiare", "Difficile"])
    .default("Intermédiare"),
});

export default function CreateQuizForm() {
  const { user } = useUser();
  const apiUrl = process.env.NEXT_PUBLIC_URL! + "/api";
  const { setQuiz } = useQuiz();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme: "",
      context: "",
      tags: "",
      is_public: false,
      questionCount: "10",
      difficulty: "Intermédiare" as QuizDifficulty,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const requestCreateQuiz: CreateQuizBody = {
      id_creator: user.id,
      is_public: values.is_public,
      tags: values.tags,
      type: "IA",
      theme: values.theme,
      context: values.context,
      questionCount: parseInt(values.questionCount),
      difficulty: values.difficulty as QuizDifficulty,
    };

    try {
      const response = await fetch(`${apiUrl}/quizzes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestCreateQuiz),
      });

      if (response.ok) {
        const data = await response.json();
        setQuiz(data);
        router.push("/dashboard/quiz/" + data.id);
      }
    } catch (error) {
      console.log("Une erreur s'est produite ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full px-4 py-8 mx-auto max-w-7xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-full shadow-none">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <CardTitle className="text-xl">Nouveau Quiz</CardTitle>
                </div>
                <FormField
                  control={form.control}
                  name="is_public"
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <FormLabel className="text-sm text-muted-foreground m-0">
                        Public
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-primary"
                        />
                      </FormControl>
                    </div>
                  )}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thème</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: Spring boot"
                            {...field}
                            className="h-9"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: Java, kotlin, programmation..."
                            {...field}
                            className="h-9"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="questionCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre de questions</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="2">2 questions</SelectItem>
                              <SelectItem value="10">10 questions</SelectItem>
                              <SelectItem value="15">15 questions</SelectItem>
                              <SelectItem value="20">20 questions</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="difficulty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Difficulté</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Sélectionnez" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Facile">Facile</SelectItem>
                              <SelectItem value="Intermédiare">
                                Intermédiare
                              </SelectItem>
                              <SelectItem value="Difficile">
                                Difficile
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="context"
                  render={({ field }) => (
                    <FormItem className="h-full">
                      <FormLabel>Contexte</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Décrivez le contexte du quiz..."
                          className="h-[calc(100%-2rem)]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full mt-6" disabled={loading}>
                {loading ? (
                  <div className="flex items-center justify-center gap-6">
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    <span>{"Génération du quiz ..."}</span>
                  </div>
                ) : (
                  "Créer le quiz"
                )}
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
