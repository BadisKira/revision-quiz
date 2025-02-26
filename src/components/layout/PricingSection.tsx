"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Gratuit",
    price: "0€",
    description: "Pour commencer à s'entraîner",
    features: [
      "3 simulations d'entretien",
      "Retours basiques",
      "Accès aux quiz de la communauté",
    ],
  },
  {
    name: "Pro",
    price: "10€",
    period: "/mois",
    description: "Pour les chercheurs d'emploi actifs",
    features: [
      "Simulations illimitées",
      "Retours détaillés",
      "10 quiz générés par pdf",
      "Statistiques et suividétaillés "
    ],
  },
  {
    name: "Premium",
    price: "19€",
    period: "/mois",
    description: "Pour une préparation intensive",
    features: [
      "Nouvelles fonctionnalités à venir  "
    ],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-background px-4">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Choisissez votre plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {plans.map((plan, index) => (
            <Card key={index} className="pricing-card">
              <CardHeader>
                <CardTitle className="space-y-4">
                  <div className="text-2xl font-bold">{plan.name}</div>
                  <div>
                    <span className="text-2xl font-semibold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-muted-foreground">
                        {plan.period}
                      </span>
                    )}
                  </div>
                </CardTitle>
                <p className="text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className={`w-full mt-8`} disabled={plan.name ==="Premium"}>Choisir {plan.name}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
