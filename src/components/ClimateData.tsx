import { Cloud, Thermometer, Droplets, Wind, Sun, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ClimateDataProps {
  temperature: number;
  rainfall: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  ndvi: number;
}

export default function ClimateData({
  temperature,
  rainfall,
  humidity,
  windSpeed,
  uvIndex,
  ndvi,
}: ClimateDataProps) {
  const climateMetrics = [
    {
      icon: Thermometer,
      label: "Temperature",
      value: `${temperature}°C`,
      description: "Average daily",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: Droplets,
      label: "Rainfall",
      value: `${rainfall}mm`,
      description: "Monthly average",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Cloud,
      label: "Humidity",
      value: `${humidity}%`,
      description: "Current level",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10",
    },
    {
      icon: Wind,
      label: "Wind Speed",
      value: `${windSpeed} km/h`,
      description: "Average speed",
      color: "text-gray-500",
      bgColor: "bg-gray-500/10",
    },
    {
      icon: Sun,
      label: "UV Index",
      value: uvIndex.toString(),
      description: "Solar radiation",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      icon: TrendingUp,
      label: "Vegetation Index",
      value: ndvi.toFixed(2),
      description: "NDVI Score",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {climateMetrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index} className="hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
              <div className={`p-2 rounded-full ${metric.bgColor}`}>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}