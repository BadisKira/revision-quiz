'use client';

import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { SparklesIcon } from 'lucide-react';

export default function UnderConstruction() {
  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl rounded-lg overflow-hidden">
        <CardHeader className="border-b py-4">
          <h1 className="text-3xl font-semibold text-center text-gray-800">
            En cours de construction <SparklesIcon className="h-6 w-6 inline-block ml-2 text-yellow-500" />
          </h1>
        </CardHeader>
        <CardContent className="p-6 text-center">
          <p className="text-lg text-gray-700 leading-relaxed">
            Nous sommes en train de construire quelque chose de génial !  Revenez pour la prochaine version, ça arrive bientôt.
          </p>
        
        </CardContent>
        <CardFooter className="border-t p-4 flex justify-center bg-gray-50">
          <Link href="/dashboard">
            <Button variant="outline" className="">
            {" Retour à l'accueil"}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}