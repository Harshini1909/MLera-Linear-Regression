"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Learning Path", href: "/content" },
  { label: "Build", href: "/build" },
  { label: "Challenges", href: "#" },
  { label: "My Courses", href: "#" },
  { label: "Achievements", href: "#" },
  { label: "Buddy", href: "#" },
  { label: "Lexicon", href: "#" },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              MLera
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    pathname === item.href ? "text-primary" : "text-foreground hover:text-primary",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-secondary"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <div className="w-10 h-10 rounded-full bg-gradient-primary" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
