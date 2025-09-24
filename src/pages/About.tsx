import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Users, Globe, Award } from "lucide-react";

export default function About() {
  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">About CropSmart</h1>
        <p className="text-muted-foreground">
          Empowering smallholder farmers with AI-driven agricultural intelligence
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              CropSmart combines NASA satellite data, artificial intelligence, and local agricultural
              knowledge to provide smallholder farmers with actionable, site-specific crop recommendations.
              Our platform helps farmers make informed decisions that increase yields, reduce risks, and
              promote sustainable farming practices.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle>50,000+</CardTitle>
              <CardDescription>Farmers Served</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Globe className="h-8 w-8 text-primary mb-2" />
              <CardTitle>15</CardTitle>
              <CardDescription>Countries Covered</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Award className="h-8 w-8 text-primary mb-2" />
              <CardTitle>98%</CardTitle>
              <CardDescription>Accuracy Rate</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}