import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function cleanMarkdownJSON(input: string): string {
  const cleaned = input.replace(/```json\s*/gi, "").replace(/\s*```/gi, "");
  return cleaned.trim();
}

export function formatDate(dateStr:string) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${day}/${month}/${year} à ${hours}h${minutes}`;
}

export function NumberDaysFromDate(dateStr:string) {
  const date = Math.round(new Date(dateStr).getTime() / 1000);
  const today = Math.round(Date.now() /1000);
  const diff = today - date ;

  return Math.floor(diff / (24 * 3600));
}