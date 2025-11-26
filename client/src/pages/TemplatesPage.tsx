import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  SearchIcon, 
  FilterIcon, 
  PlayIcon, 
  CrownIcon,
  SparklesIcon,
  ImageIcon,
  DownloadIcon
} from "lucide-react";

interface Template {
  id: string;
  name: string;
  category: string;
  preview_url: string;
  is_premium: boolean;
  downloads: number;
  rating: number;
}

export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock templates data - in real app this would come from the database
  const templates: Template[] = [
    {
      id: "1",
      name: "Bold Gaming Thumbnail",
      category: "gaming",
      preview_url: "/api/placeholder/640/360",
      is_premium: false,
      downloads: 1250,
      rating: 4.8
    },
    {
      id: "2", 
      name: "Professional Business",
      category: "professional",
      preview_url: "/api/placeholder/640/360",
      is_premium: true,
      downloads: 890,
      rating: 4.9
    },
    {
      id: "3",
      name: "Minimal Clean Design",
      category: "minimal",
      preview_url: "/api/placeholder/640/360", 
      is_premium: false,
      downloads: 2100,
      rating: 4.7
    },
    {
      id: "4",
      name: "Educational Tutorial",
      category: "educational",
      preview_url: "/api/placeholder/640/360",
      is_premium: false,
      downloads: 675,
      rating: 4.6
    },
    {
      id: "5",
      name: "Lifestyle Vlog Style",
      category: "lifestyle",
      preview_url: "/api/placeholder/640/360",
      is_premium: true,
      downloads: 430,
      rating: 4.8
    },
    {
      id: "6",
      name: "Tech Review Template",
      category: "professional",
      preview_url: "/api/placeholder/640/360",
      is_premium: false,
      downloads: 980,
      rating: 4.5
    }
  ];

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "gaming", name: "Gaming" },
    { id: "professional", name: "Professional" },
    { id: "minimal", name: "Minimal" },
    { id: "educational", name: "Educational" },
    { id: "lifestyle", name: "Lifestyle" },
    { id: "bold", name: "Bold" }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      gaming: "bg-purple-100 text-purple-800",
      professional: "bg-gray-100 text-gray-800",
      minimal: "bg-blue-100 text-blue-800",
      educational: "bg-green-100 text-green-800",
      lifestyle: "bg-yellow-100 text-yellow-800",
      bold: "bg-red-100 text-red-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const handleUseTemplate = (template: Template) => {
    // Navigate to editor with template data
    console.log("Using template:", template);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Thumbnail Templates
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our collection of professionally designed templates to create stunning thumbnails in minutes.
          </p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <FilterIcon className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map(template => (
            <Card key={template.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  </div>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleUseTemplate(template)}
                      className="bg-white text-black hover:bg-gray-100"
                    >
                      <PlayIcon className="h-4 w-4 mr-2" />
                      Use Template
                    </Button>
                    <Button size="sm" variant="outline">
                      <DownloadIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Premium Badge */}
                  {template.is_premium && (
                    <Badge className="absolute top-2 right-2 bg-yellow-500 text-yellow-900">
                      <CrownIcon className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg truncate">{template.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    ⭐ {template.rating}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className={getCategoryColor(template.category)}>
                    {template.category}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {template.downloads.toLocaleString()} downloads
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-red-50 to-purple-50 border-0">
          <CardContent className="p-8 text-center">
            <SparklesIcon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Can't find what you're looking for?</h3>
            <p className="text-gray-600 mb-6">
              Use our AI-powered thumbnail creator to generate custom thumbnails from scratch
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700"
            >
              <SparklesIcon className="h-5 w-5 mr-2" />
              Try AI Creator
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}