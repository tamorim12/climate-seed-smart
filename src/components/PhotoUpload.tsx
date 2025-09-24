import { useState, useCallback } from "react";
import { Upload, Camera, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PhotoUploadProps {
  onPhotoSelect: (file: File) => void;
  isProcessing?: boolean;
}

export default function PhotoUpload({ onPhotoSelect, isProcessing }: PhotoUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, []);

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onPhotoSelect(file);
    }
  };

  const clearSelection = () => {
    setPreview(null);
    setSelectedFile(null);
  };

  return (
    <Card className="relative overflow-hidden">
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg transition-all duration-300",
          dragActive ? "border-primary bg-primary/5" : "border-border",
          preview ? "p-4" : "p-12"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {!preview ? (
          <div className="text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            
            <h3 className="text-lg font-semibold mb-2">Upload Plant Photo</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop your image here, or click to browse
            </p>
            
            <div className="flex gap-3 justify-center">
              <label htmlFor="file-upload">
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleChange}
                  disabled={isProcessing}
                />
                <Button variant="default" asChild>
                  <span className="cursor-pointer">
                    <Camera className="mr-2 h-4 w-4" />
                    Choose Photo
                  </span>
                </Button>
              </label>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">
              Supported formats: JPG, PNG, WEBP (Max 10MB)
            </p>
          </div>
        ) : (
          <div className="relative">
            <img
              src={preview}
              alt="Plant preview"
              className="w-full h-auto max-h-[400px] object-contain rounded-lg"
            />
            
            {!isProcessing && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={clearSelection}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            
            {isProcessing && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-3" />
                  <p className="text-sm font-medium">Analyzing plant...</p>
                  <p className="text-xs text-muted-foreground mt-1">This may take a few seconds</p>
                </div>
              </div>
            )}
            
            {selectedFile && !isProcessing && (
              <div className="mt-3 p-3 bg-muted rounded-md">
                <p className="text-sm font-medium">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}