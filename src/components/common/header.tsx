"use client";

import { Coffee, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect} from "react";


export const Header = ()=> {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed w-full z-50 transition-all duration-300 ${
            scrolled ? 'bg-amber-950/90 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.25)] border-b border-amber-400/30' : 'bg-transparent'
          }`}>
            <nav className="container mx-auto px-4 py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="rounded-full bg-amber-300/20 p-1.5 sm:p-2 border border-amber-200/30">
                    <Coffee className="h-5 w-5 sm:h-6 sm:w-6 text-amber-200" />
                  </div>
                  <span className="text-lg sm:text-2xl font-semibold tracking-wide text-amber-50">Warkop Bangboy</span>
                </div>
                
                <div className="hidden md:flex items-center space-x-8">
                  <Link href="#home" className="text-amber-50/90 hover:text-amber-200 transition-colors">Beranda</Link>
                  <Link href="/menu-list" className="text-amber-50/90 hover:text-amber-200 transition-colors">Menu</Link>
                  <Link href="#about" className="text-amber-50/90 hover:text-amber-200 transition-colors">Tentang</Link>
                  <Link href="#about" className="text-amber-50/90 hover:text-amber-200 transition-colors">Kontak</Link>
                </div>
    
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden text-amber-100 p-1"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
    
              {/* Mobile Menu */}
              {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-amber-950/95 backdrop-blur-md border-b border-amber-400/20">
                  <div className="flex flex-col space-y-4 p-4">
                    <Link href="#home" className="text-amber-50 hover:text-amber-200 transition-colors">Beranda</Link>
                    <Link href="/menu-list" className="text-amber-50 hover:text-amber-200 transition-colors">Menu</Link>
                    <Link href="#about" className="text-amber-50 hover:text-amber-200 transition-colors">Tentang</Link>
                    <Link href="#contact" className="text-amber-50 hover:text-amber-200 transition-colors">Kontak</Link>
                  </div>
                </div>
              )}
            </nav>
          </header>
    
    )
}
