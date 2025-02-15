"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Bot, Brain, LineChart, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "IA Conversationnelle Avancée",
    description: "Notre IA s'adapte à votre niveau et au poste visé pour des simulations d'entretien réalistes.",
    icon: Bot
  },
  {
    title: "Analyse Détaillée",
    description: "Recevez des retours détaillés sur vos réponses et votre communication non verbale.",
    icon: Brain
  },
  {
    title: "Suivi de Progression",
    description: "Visualisez votre évolution et identifiez vos points d'amélioration.",
    icon: LineChart
  },
  {
    title: "Communauté Active",
    description: "Échangez avec d'autres candidats et partagez vos expériences.",
    icon: Users
  }
];

export default function FeaturesSection() {
 
  return (
    <section id="features" className="py-24 bg-background px-4">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Fonctionnalités Principales
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {features.map((feature, index) => (
            <AccordionItem value={`item-${index}`} key={index} className="feature-item">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xl font-semibold">{feature.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-16">
                {feature.description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}