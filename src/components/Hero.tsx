import { Button } from "@/components/ui/button";
import { Upload, MapPin, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-field">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute h-full w-full bg-[radial-gradient(circle_500px_at_50%_200px,hsl(142_45%_35%_/_0.3),transparent)]" />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          {/* Floating badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-background/10 backdrop-blur-sm px-4 py-2 text-sm text-primary-foreground">
            <Sparkles className="h-4 w-4" />
            AI-Powered Crop Intelligence
          </div>

          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tighter text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Smart Farming Starts with{" "}
              <span className="text-accent">Smart Decisions</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-primary-foreground/90 md:text-xl">
              Combine NASA satellite data, AI plant recognition, and local agronomy expertise to get
              personalized crop recommendations for your farm.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="hero"
              size="lg"
              onClick={() => navigate("/analyze")}
              className="group"
            >
              <Upload className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Upload Plant Photo
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="bg-background/10 backdrop-blur-sm border-primary-foreground/20 text-primary-foreground hover:bg-background/20"
            >
              <MapPin className="mr-2 h-5 w-5" />
              View Climate Data
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12 pt-8 border-t border-primary-foreground/10">
            <div className="space-y-2">
              <p className="text-3xl font-bold text-primary-foreground">98%</p>
              <p className="text-sm text-primary-foreground/80">Accuracy Rate</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-primary-foreground">50K+</p>
              <p className="text-sm text-primary-foreground/80">Farmers Helped</p>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-primary-foreground">150+</p>
              <p className="text-sm text-primary-foreground/80">Crop Varieties</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-20 fill-background"
          preserveAspectRatio="none"
        >
          <path d="M0,64 C240,96 480,32 720,48 C960,64 1200,96 1440,64 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  );
}