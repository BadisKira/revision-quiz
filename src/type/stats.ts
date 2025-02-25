export interface DashboardStats {
  stats: {
    avgScore: number;
    completedQuizzes: number;
  };
  recentAchievements: Array<{
    tags: string;
    type: string;
    score: number;
    theme: string;
    is_public: boolean;
    created_at: string;
  }>;
}
