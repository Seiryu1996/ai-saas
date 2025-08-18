"use client";

import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">AI Creator</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('features')}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            機能
          </button>
          <button 
            onClick={() => scrollToSection('use-cases')}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            活用事例
          </button>
          <button 
            onClick={() => scrollToSection('pricing')}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            料金
          </button>
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
            ダッシュボード
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/sign-in">ログイン</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">無料で始める</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col space-y-4 mt-8">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-left py-2 text-lg font-medium hover:text-primary transition-colors"
              >
                機能
              </button>
              <button 
                onClick={() => scrollToSection('use-cases')}
                className="text-left py-2 text-lg font-medium hover:text-primary transition-colors"
              >
                活用事例
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-left py-2 text-lg font-medium hover:text-primary transition-colors"
              >
                料金
              </button>
              <Link 
                href="/dashboard" 
                className="text-left py-2 text-lg font-medium hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                ダッシュボード
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="ghost" asChild>
                  <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)}>
                    ログイン
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)}>
                    無料で始める
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;