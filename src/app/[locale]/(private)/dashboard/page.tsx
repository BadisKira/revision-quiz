"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {  Brain, Target, Clock, Trophy } from "lucide-react";

const stats = [
  {
    title: "Quiz Complétés",
    value: "24",
    icon: Trophy,
    description: "+3 cette semaine",
  },
  {
    title: "Temps Total",
    value: "12h",
    icon: Clock,
    description: "2h cette semaine",
  },
  {
    title: "Score Moyen",
    value: "85%",
    icon: Target,
    description: "+5% vs dernière semaine",
  },
];

const recentQuizzes = [
  {
    title: "JavaScript Avancé",
    category: "Programmation",
    score: "90%",
    date: "Il y a 2 jours",
  },
  {
    title: "React Hooks",
    category: "Frontend",
    score: "85%",
    date: "Il y a 3 jours",
  },
  {
    title: "SQL Basics",
    category: "Base de données",
    score: "95%",
    date: "Il y a 5 jours",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <Button className="gap-2">
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quiz Récents</CardTitle>
          <CardDescription>Vos 3 derniers quiz complétés</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentQuizzes.map((quiz) => (
              <div
                key={quiz.title}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{quiz.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {quiz.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{quiz.score}</p>
                  <p className="text-sm text-muted-foreground">{quiz.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
