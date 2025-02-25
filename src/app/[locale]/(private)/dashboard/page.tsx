import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Target,Trophy } from "lucide-react";
import { getData } from "@/app/actions/dashboard/getData";
import { DashboardStats } from "@/type/stats";
import { NumberDaysFromDate } from "@/lib/utils";

const statsDesc = {
  completedQuizzes: {
    title: "Quiz Complétés",
    icon: Trophy,
    description: "+3 cette semaine",
  },
  avgScore: {
    title: "Score Moyen",
    icon: Target,
    description: "+5% vs dernière semaine",
  },
};


export default async function DashboardPage() {
  const { stats, recentAchievements } = (await getData()) as DashboardStats;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <Button className="gap-2"></Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {Object.keys(stats).map((key) => {
            const typedKey = key as keyof typeof statsDesc; 

            const stat = {
              title: statsDesc[typedKey].title,
              value: stats[typedKey as keyof typeof stats], 
              description: statsDesc[typedKey].description,
              icon: statsDesc[typedKey].icon,
            };
          return (
            <Card key={key}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quiz Récents</CardTitle>
          <CardDescription>Vos {recentAchievements ?  recentAchievements.length : 0} derniers quiz complétés</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(recentAchievements && recentAchievements.length> 0) && recentAchievements.map((quiz) => (
              <div
                key={quiz.theme}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{quiz.theme}</h3>
                    <p className="text-sm text-muted-foreground">{quiz.tags}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{quiz.score} %</p>
                  <p className="text-sm text-muted-foreground">
                  {NumberDaysFromDate(quiz.created_at)} jours
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
