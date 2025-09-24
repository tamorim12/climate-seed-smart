import { useState, useEffect } from "react";
import ClimateData from "@/components/ClimateData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, TrendingUp, Cloud, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [climateData, setClimateData] = useState({
    temperature: 28,
    rainfall: 125,
    humidity: 65,
    windSpeed: 12,
    uvIndex: 7,
    ndvi: 0.72,
  });

  const [selectedRegion, setSelectedRegion] = useState("Central Kenya");

  // Simulate data fetching
  useEffect(() => {
    // In production, fetch real data from NASA POWER API
    const interval = setInterval(() => {
      setClimateData((prev) => ({
        ...prev,
        temperature: prev.temperature + (Math.random() - 0.5) * 2,
        humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 5)),
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const regions = ["Central Kenya", "Western Kenya", "Coastal Region", "Rift Valley"];

  return (
    <div className="container py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Climate Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time climate and vegetation data from NASA satellites
        </p>
      </div>

      {/* Region Selector */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Select Region
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {regions.map((region) => (
              <Button
                key={region}
                variant={selectedRegion === region ? "default" : "outline"}
                onClick={() => setSelectedRegion(region)}
              >
                {region}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Climate Metrics */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Cloud className="h-5 w-5 text-primary" />
          Current Conditions - {selectedRegion}
        </h2>
        <ClimateData {...climateData} />
      </div>

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="forecast" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="forecast">7-Day Forecast</TabsTrigger>
          <TabsTrigger value="trends">Historical Trends</TabsTrigger>
          <TabsTrigger value="alerts">Weather Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="forecast">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Weekly Weather Forecast
              </CardTitle>
              <CardDescription>
                Precipitation and temperature predictions for the next 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(7)].map((_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() + i);
                  const temp = 25 + Math.random() * 10;
                  const rain = Math.random() * 100;
                  
                  return (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="text-sm">
                          <p className="font-medium">
                            {date.toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric" })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Temp</p>
                          <p className="font-medium">{temp.toFixed(1)}°C</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Rain</p>
                          <p className="font-medium">{rain.toFixed(0)}%</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Historical Climate Trends
              </CardTitle>
              <CardDescription>
                Analysis of climate patterns over the past 12 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gradient-sky/10">
                  <h4 className="font-medium mb-2">Rainfall Patterns</h4>
                  <p className="text-sm text-muted-foreground">
                    Average rainfall has increased by 15% compared to last year, with peak precipitation in April-May.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-gradient-sunrise/10">
                  <h4 className="font-medium mb-2">Temperature Variations</h4>
                  <p className="text-sm text-muted-foreground">
                    Temperatures remain stable with a slight warming trend of +0.5°C over the past season.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-gradient-earth/10">
                  <h4 className="font-medium mb-2">Vegetation Health</h4>
                  <p className="text-sm text-muted-foreground">
                    NDVI scores indicate healthy vegetation growth with optimal conditions for crop cultivation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle>Weather Alerts & Advisories</CardTitle>
              <CardDescription>
                Important weather notifications for your region
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border-l-4 border-warning bg-warning/10">
                  <h4 className="font-medium text-warning">Moderate Drought Risk</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Below-average rainfall expected in the next 2 weeks. Consider water conservation measures.
                  </p>
                </div>
                <div className="p-4 rounded-lg border-l-4 border-info bg-info/10">
                  <h4 className="font-medium text-info">Optimal Planting Window</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Current conditions are ideal for planting maize and beans. Soil moisture levels are optimal.
                  </p>
                </div>
                <div className="p-4 rounded-lg border-l-4 border-success bg-success/10">
                  <h4 className="font-medium text-success">Good Growing Conditions</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Temperature and humidity levels are favorable for crop growth. No severe weather expected.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}