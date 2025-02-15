"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const testimonials = [
  {
    name: "Marie L.",
    role: "Développeuse Full Stack",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    content: "Grâce à cette plateforme, j'ai gagné en confiance et décroché mon poste de rêve. Les simulations sont incroyablement réalistes !"
  },
  {
    name: "Thomas R.",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    content: "L'analyse détaillée de mes réponses m'a permis d'identifier mes points faibles et de m'améliorer rapidement."
  },
  {
    name: "Sophie M.",
    role: "UX Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    content: "Un outil indispensable pour la préparation aux entretiens. Les retours personnalisés sont particulièrement pertinents."
  }
];

export default function Testimonials() {
  return (
    <section  id="testimonials" className="py-24 bg-secondary/50 px-4">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
         {" Ce qu'en disent nos utilisateurs"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="testimonial-card">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ')[0][0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}