import { TrendingUp, Droplets, Sun, Wind, Calendar, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface CropData {
  name: string;
  confidence: number;
  reason: string;
  plantingTime: string;
  harvestTime: string;
  waterRequirement: string;
  soilType: string;
  companionCrops: string[];
  benefits: string[];
}

interface CropRecommendationProps {
  crop: CropData;
  rank: number;
}

export default function CropRecommendation({ crop, rank }: CropRecommendationProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-success";
    if (confidence >= 60) return "text-warning";
    return "text-muted-foreground";
  };

  const getRankBadge = (rank: number) => {
    const badges = ["🥇 Best Match", "🥈 Great Option", "🥉 Good Choice"];
    return badges[rank - 1] || `#${rank} Option`;
  };

  return (
    <Card className="overflow-hidden hover:shadow-large transition-shadow duration-300">
      <CardHeader className="bg-gradient-earth pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl text-primary-foreground">{crop.name}</CardTitle>
            <CardDescription className="text-primary-foreground/80 mt-1">
              {crop.reason}
            </CardDescription>
          </div>
          <Badge className="bg-background/20 text-primary-foreground border-0">
            {getRankBadge(rank)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-4">
        {/* Confidence Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Confidence Score
            </span>
            <span className={`font-bold ${getConfidenceColor(crop.confidence)}`}>
              {crop.confidence}%
            </span>
          </div>
          <Progress value={crop.confidence} className="h-2" />
        </div>

        {/* Key Information Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Planting</p>
              <p className="text-sm font-medium">{crop.plantingTime}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Sun className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Harvest</p>
              <p className="text-sm font-medium">{crop.harvestTime}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Droplets className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Water Need</p>
              <p className="text-sm font-medium">{crop.waterRequirement}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Wind className="h-4 w-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Soil Type</p>
              <p className="text-sm font-medium">{crop.soilType}</p>
            </div>
          </div>
        </div>

        {/* Companion Crops */}
        <div className="space-y-2">
          <p className="text-sm font-medium flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" />
            Companion Crops
          </p>
          <div className="flex flex-wrap gap-2">
            {crop.companionCrops.map((companion, index) => (
              <Badge key={index} variant="secondary">
                {companion}
              </Badge>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="pt-3 border-t">
          <p className="text-sm font-medium mb-2">Key Benefits</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            {crop.benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-success mt-1">•</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}