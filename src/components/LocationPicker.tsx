import { useState, useEffect } from "react";
import { MapPin, Loader2, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
}

interface LocationPickerProps {
  onLocationSelect: (location: LocationData) => void;
}

export default function LocationPicker({ onLocationSelect }: LocationPickerProps) {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [manualInput, setManualInput] = useState({ lat: "", lng: "" });

  const getLocation = () => {
    setIsLoading(true);
    
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Please enter your coordinates manually.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const newLocation: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        
        // Simulate reverse geocoding (in production, call a real API)
        newLocation.address = `Farm location (${newLocation.latitude.toFixed(4)}, ${newLocation.longitude.toFixed(4)})`;
        
        setLocation(newLocation);
        onLocationSelect(newLocation);
        setManualInput({
          lat: newLocation.latitude.toString(),
          lng: newLocation.longitude.toString(),
        });
        
        toast({
          title: "Location detected",
          description: "Your farm location has been identified successfully.",
        });
        
        setIsLoading(false);
      },
      (error) => {
        toast({
          title: "Location error",
          description: "Could not get your location. Please enter manually.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    );
  };

  const handleManualSubmit = () => {
    const lat = parseFloat(manualInput.lat);
    const lng = parseFloat(manualInput.lng);
    
    if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      toast({
        title: "Invalid coordinates",
        description: "Please enter valid latitude (-90 to 90) and longitude (-180 to 180).",
        variant: "destructive",
      });
      return;
    }
    
    const newLocation: LocationData = {
      latitude: lat,
      longitude: lng,
      address: `Farm location (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
    };
    
    setLocation(newLocation);
    onLocationSelect(newLocation);
    
    toast({
      title: "Location set",
      description: "Your farm coordinates have been saved.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Farm Location
        </CardTitle>
        <CardDescription>
          Provide your farm's location for accurate climate and soil data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Auto-detect button */}
        <Button 
          onClick={getLocation} 
          disabled={isLoading}
          variant="field"
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Detecting Location...
            </>
          ) : (
            <>
              <Navigation className="mr-2 h-4 w-4" />
              Auto-Detect My Location
            </>
          )}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or enter manually</span>
          </div>
        </div>

        {/* Manual input */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              type="number"
              step="0.0001"
              placeholder="-1.2921"
              value={manualInput.lat}
              onChange={(e) => setManualInput({ ...manualInput, lat: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              type="number"
              step="0.0001"
              placeholder="36.8219"
              value={manualInput.lng}
              onChange={(e) => setManualInput({ ...manualInput, lng: e.target.value })}
            />
          </div>
        </div>

        <Button 
          onClick={handleManualSubmit}
          variant="outline"
          className="w-full"
          disabled={!manualInput.lat || !manualInput.lng}
        >
          Set Manual Coordinates
        </Button>

        {/* Current location display */}
        {location && (
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-success mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-sm">Location Set</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {location.address}
                </p>
                <p className="text-xs font-mono text-muted-foreground mt-1">
                  Lat: {location.latitude.toFixed(6)}, Lng: {location.longitude.toFixed(6)}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}