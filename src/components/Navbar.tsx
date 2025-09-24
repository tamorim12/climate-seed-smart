import { Link, useLocation } from "react-router-dom";
import { Leaf, Home, Camera, BarChart3, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/analyze", label: "Analyze", icon: Camera },
    { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { path: "/about", label: "About", icon: Info },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-earth flex items-center justify-center">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl bg-gradient-earth bg-clip-text text-transparent">
            CropSmart
          </span>
        </Link>

        <div className="ml-auto flex items-center space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "hidden sm:flex",
                    isActive && "shadow-glow"
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="icon"
                  className="flex sm:hidden"
                >
                  <Icon className="h-4 w-4" />
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}