"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot } from "lucide-react";
import gsap from "gsap";
import { useRouter } from "@/i18n/routing";

export default function HeroSection() {
  const heroRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".fade-in", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      });

      gsap.to(".slide-in-left", {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
      });

      gsap.to(".slide-in-right", {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="py-24 md:py-24 min-h-[calc(100vh-2rem)] flex items-center justify-center bg-gradient-to-b from-background to-secondary/20"
    >
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <h1 className="fade-in text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {"              Maîtrisez vos entretiens avec l'IA"}{" "}
            </h1>
            <p className="fade-in text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              {
                "Préparez-vous efficacement aux entretiens d'embauche grâce à notre plateforme d'entraînement alimentée par l'IA."
              }
            </p>
            <div className="fade-in flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="group w-full sm:w-auto"
                onClick={() => {
                  router.push("/dashboard");
                }}
              >
                Commencer gratuitement
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                En savoir plus
              </Button>
            </div>
          </div>
          <div className="relative mt-8 lg:mt-0">
            <div className="slide-in-right bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 mx-auto max-w-[90%] lg:max-w-none">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">
                  Assistant IA
                </h3>
              </div>
              <div className="space-y-4">
                <p className="p-3 bg-primary/10 rounded-lg text-sm sm:text-base">
                  Bonjour ! Je suis votre coach IA. Prêt à simuler un entretien
                  ?
                </p>
                <p className="p-3 bg-secondary rounded-lg text-sm sm:text-base">
                  {
                    "                  Oui, je souhaite m'entraîner pour un poste de développeur."
                  }{" "}
                </p>
                <p className="p-3 bg-primary/10 rounded-lg text-sm sm:text-base">
                  Parfait ! Commençons par les questions techniques...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
