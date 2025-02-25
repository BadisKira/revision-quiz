"use client";

import { useEffect, useState } from "react";
import { Brain, Menu, X } from "lucide-react";
import { Link } from "@/i18n/routing";
import { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import SignInButton from "../shared/SignInButton";
import SignOutButton from "../shared/SignOutButton";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User>();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    async function getAuthentificatedUserData() {
      const { data, error } = await createClient().auth.getSession();
      if (error) {
        throw error;
      }
      setUser(data.session?.user);
    }
    getAuthentificatedUserData();
  }, []);

  return (
    <nav className="fixed w-full bg-background/80 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">
                <div className="flex items-center gap-2">
                  <Brain className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold">TechQuizIA</span>
                </div>
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                href="#features"
                className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium"
              >
                Fonctionnalités
              </Link>
              <Link
                href="#testimonials"
                className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium"
              >
                Témoignages
              </Link>
              <Link
                href="#pricing"
                className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium"
              >
                Plan
              </Link>
              {user && (
              <Link
                href="dashboard"
                className="text-foreground hover:text-foreground/80 block px-3 py-2 rounded-md text-base font-medium"
              >
                Tableau de bord
              </Link>
            )}
              {!user ? <SignInButton /> : <SignOutButton />}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-foreground/80 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="#features"
              className="text-foreground hover:text-foreground/80 block px-3 py-2 rounded-md text-base font-medium"
            >
              Fonctionnalités
            </Link>
            <Link
              href="#testimonials"
              className="text-foreground hover:text-foreground/80 block px-3 py-2 rounded-md text-base font-medium"
            >
              Témoignages
            </Link>
            <Link
              href="#pricing"
              className="text-foreground hover:text-foreground/80 block px-3 py-2 rounded-md text-base font-medium"
            >
              Plan
            </Link>
            {user && (
              <Link
                href="dashboard"
                className="text-foreground hover:text-foreground/80 block px-3 py-2 rounded-md text-base font-medium"
              >
                Tableau de bord
              </Link>
            )}
            {!user ? <SignInButton /> : <SignOutButton  />}
          </div>
        </div>
      )}
    </nav>
  );
}
