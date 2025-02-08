"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { Youtube, Layout, Tag, Filter } from "lucide-react";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the main content
      gsap.from(".hero-content", {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power4.out",
      });

      // Animate the floating icons
      const icons = iconsRef.current?.children;
      if (icons) {
        gsap.from(icons, {
          scale: 0,
          opacity: 0,
          rotation: -180,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          delay: 0.5,
        });

        // Convert HTMLCollection to Array before using forEach
        Array.from(icons).forEach((icon: Element) => {
          gsap.to(icon, {
            y: "random(-20, 20)",
            rotation: "random(-15, 15)",
            duration: "random(2, 3)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/95 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center hero-content">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            Organize Your YouTube World
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect your YouTube account, categorize your subscriptions, and enjoy a personalized video feed tailored to your interests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Floating icons */}
        <div ref={iconsRef} className="absolute inset-0 pointer-events-none">
          <Youtube className="absolute top-1/4 left-1/4 text-red-500 h-12 w-12" />
          <Layout className="absolute top-1/3 right-1/4 text-blue-500 h-10 w-10" />
          <Tag className="absolute bottom-1/3 left-1/3 text-green-500 h-8 w-8" />
          <Filter className="absolute bottom-1/4 right-1/3 text-purple-500 h-10 w-10" />
        </div>
      </div>
    </div>
  );
}