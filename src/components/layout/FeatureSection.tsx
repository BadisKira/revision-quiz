"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Google Authentication",
    content: "Securely connect your Google account with just one click. We use OAuth 2.0 to ensure your data remains protected while providing seamless access to your YouTube subscriptions.",
  },
  {
    title: "YouTube API Integration",
    content: "Automatically sync and manage your YouTube subscriptions. Our platform uses the official YouTube API to fetch your subscription data in real-time, ensuring you never miss updates from your favorite creators.",
  },
  {
    title: "Smart Categorization",
    content: "Create custom categories and organize your subscriptions your way. Use tags, folders, or smart filters to group channels based on content type, viewing preferences, or any other criteria that matters to you.",
  },
  {
    title: "Personalized Feed",
    content: "Experience a customized video feed that prioritizes content based on your categories and viewing habits. Our algorithm learns from your preferences to deliver the most relevant videos first.",
  },
  {
    title: "Cross-Device Sync",
    content: "Access your organized subscriptions from any device. Your categories and preferences are automatically synced across all your devices, providing a seamless experience wherever you go.",
  },
  {
    title: "Advanced Analytics",
    content: "Gain insights into your viewing habits with detailed analytics. Track time spent on different categories, discover viewing patterns, and optimize your content consumption.",
  },
];

export function FeaturesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".features-content", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=100",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="py-24 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how TubeSense helps you take control of your YouTube experience
          </p>
        </div>

        <div className="features-content max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {features.map((feature, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg">
                  {feature.title}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {feature.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}