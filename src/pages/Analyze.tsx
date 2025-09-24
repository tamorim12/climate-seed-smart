import { useState } from "react";
import PhotoUpload from "@/components/PhotoUpload";
import LocationPicker from "@/components/LocationPicker";
import CropRecommendation from "@/components/CropRecommendation";
import { Button } from "@/components/ui/button";
import { Sparkles, ChevronRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockRecommendations = [
  {
    name: "Maize (Corn)",
    confidence: 92,
    reason: "Excellent match for current soil conditions and rainfall patterns",
    plantingTime: "March-April",
    harvestTime: "July-August",
    waterRequirement: "Moderate",
    soilType: "Loamy",
    companionCrops: ["Beans", "Squash", "Pumpkins"],
    benefits: ["High yield potential", "Good market demand", "Suitable for intercropping"],
  },
  {
    name: "Sweet Potatoes",
    confidence: 85,
    reason: "Drought-resistant and well-suited to your climate zone",
    plantingTime: "April-May",
    harvestTime: "August-October",
    waterRequirement: "Low",
    soilType: "Sandy loam",
    companionCrops: ["Parsley", "Oregano", "Beans"],
    benefits: ["Drought tolerant", "High nutritional value", "Good storage capability"],
  },
  {
    name: "Cassava",
    confidence: 78,
    reason: "Resilient crop that thrives in variable weather conditions",
    plantingTime: "March-May",
    harvestTime: "12-18 months",
    waterRequirement: "Low",
    soilType: "Well-drained",
    companionCrops: ["Groundnuts", "Vegetables", "Maize"],
    benefits: ["Very drought resistant", "Long storage life", "Multiple uses"],
  },
];

export default function Analyze() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [location, setLocation] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const handlePhotoSelect = (file: File) => {
    setPhoto(file);
  };

  const handleLocationSelect = (loc: any) => {
    setLocation(loc);
  };

  const handleAnalyze = async () => {
    if (!photo || !location) {
      toast({
        title: "Missing information",
        description: "Please upload a photo and provide your location.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setIsAnalyzing(false);
      toast({
        title: "Analysis complete!",
        description: "We've identified the best crops for your farm.",
      });
    }, 3000);
  };

  return (
    <div className="container py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analyze Your Farm</h1>
        <p className="text-muted-foreground">
          Upload a plant photo and provide your location to get personalized crop recommendations
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <PhotoUpload onPhotoSelect={handlePhotoSelect} isProcessing={isAnalyzing} />
        <LocationPicker onLocationSelect={handleLocationSelect} />
      </div>

      {photo && location && !recommendations.length && (
        <div className="flex justify-center mb-8">
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            size="lg"
            variant="field"
            className="min-w-[200px]"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="mr-2 h-5 w-5 animate-pulse" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Get Recommendations
                <ChevronRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Recommended Crops</h2>
            <p className="text-muted-foreground">
              Based on your location's climate, soil, and current conditions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((crop, index) => (
              <CropRecommendation key={index} crop={crop} rank={index + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}