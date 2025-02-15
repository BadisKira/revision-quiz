export interface Achievement {
    id: string;         
    quiz_id: string;    
    user_id: string;    
    result: string;     
    score: number;      
    created_at: Date;
  }
  
export interface CreateAchievementBody {
  quiz_id: string;    
  user_id: string;    
  result: string;     
  score: number;      
  created_at?: Date;
}