import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  SparklesIcon, 
  PlayIcon, 
  WandIcon,
  ImageIcon,
  RefreshCwIcon,
  DownloadIcon,
  ShareIcon
} from "lucide-react";

interface HeroSectionProps {
  onCreateThumbnail: (data: any) => void;
  onGoToDownloader: () => void;
}

export default function HeroSection({ onCreateThumbnail, onGoToDownloader }: HeroSectionProps) {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewThumbnails, setPreviewThumbnails] = useState<any[]>([]);

  const thumbnailStyles = [
    { 
      id: "minimal", 
      name: "Minimal", 
      description: "Clean, simple design with focus on text",
      color: "bg-blue-100 text-blue-800"
    },
    { 
      id: "bold", 
      name: "Bold", 
      description: "High contrast, attention-grabbing design",
      color: "bg-red-100 text-red-800" 
    },
    { 
      id: "professional", 
      name: "Professional", 
      description: "Business-like, sophisticated appearance",
      color: "bg-gray-100 text-gray-800"
    },
    { 
      id: "gaming", 
      name: "Gaming", 
      description: "Vibrant colors and gaming elements",
      color: "bg-purple-100 text-purple-800"
    },
    { 
      id: "educational", 
      name: "Educational", 
      description: "Clear, informative layout for tutorials",
      color: "bg-green-100 text-green-800"
    },
    { 
      id: "lifestyle", 
      name: "Lifestyle", 
      description: "Warm, personal touch for vlogs",
      color: "bg-yellow-100 text-yellow-800"
    }
  ];

  const handleGenerate = async () => {
    if (!videoUrl && !videoTitle) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation - In real implementation, this would call an AI service
    setTimeout(() => {
      const mockThumbnails = [
        {
          id: 1,
          url: "/api/placeholder/640/360",
          style: selectedStyle || "minimal",
          title: videoTitle || "Generated Thumbnail"
        },
        {
          id: 2,
          url: "/api/placeholder/640/360",
          style: selectedStyle || "minimal", 
          title: videoTitle || "Generated Thumbnail"
        },
        {
          id: 3,
          url: "/api/placeholder/640/360",
          style: selectedStyle || "minimal",
          title: videoTitle || "Generated Thumbnail"
        }
      ];
      
      setPreviewThumbnails(mockThumbnails);
      setIsGenerating(false);
    }, 3000);
  };

  const handleEdit = (thumbnail: any) => {
    onCreateThumbnail({
      template: thumbnail,
      videoUrl,
      videoTitle,
      style: selectedStyle
    });
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Headline */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Create YouTube Thumbnails with{" "}
            <span className="bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
              AI
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Generate eye-catching thumbnails in seconds. No design skills required. 
            Plus download videos and existing thumbnails.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
              <SparklesIcon className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
              <ImageIcon className="h-3 w-3 mr-1" />
              Professional Templates
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">
              <DownloadIcon className="h-3 w-3 mr-1" />
              Download Ready
            </Badge>
          </div>
        </div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Input & Controls */}
          <div className="space-y-6">
            <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <WandIcon className="h-5 w-5 mr-2 text-purple-600" />
                Create Your Thumbnail
              </h3>
              
              <div className="space-y-4">
                {/* YouTube URL Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    YouTube URL (Optional)
                  </label>
                  <Input
                    placeholder="https://youtube.com/watch?v=..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Paste a YouTube URL to auto-extract title and generate thumbnails
                  </p>
                </div>

                {/* Video Title Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video Title
                  </label>
                  <Textarea
                    placeholder="Enter your video title or description..."
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    className="w-full min-h-[80px]"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Describe your video content for better AI generation
                  </p>
                </div>

                {/* Style Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thumbnail Style
                  </label>
                  <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose a style..." />
                    </SelectTrigger>
                    <SelectContent>
                      {thumbnailStyles.map((style) => (
                        <SelectItem key={style.id} value={style.id}>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className={style.color}>
                              {style.name}
                            </Badge>
                            <span className="text-sm text-gray-600">
                              {style.description}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={(!videoUrl && !videoTitle) || isGenerating}
                  className="w-full bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCwIcon className="h-4 w-4 mr-2 animate-spin" />
                      Generating AI Thumbnails...
                    </>
                  ) : (
                    <>
                      <SparklesIcon className="h-4 w-4 mr-2" />
                      Generate with AI
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-4 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <h4 className="font-medium mb-3">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onGoToDownloader}
                  className="flex items-center justify-center"
                >
                  <PlayIcon className="h-4 w-4 mr-2" />
                  Download Videos
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onCreateThumbnail({ mode: 'templates' })}
                  className="flex items-center justify-center"
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Browse Templates
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Side - Preview Area */}
          <div className="space-y-6">
            <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <ImageIcon className="h-5 w-5 mr-2 text-blue-600" />
                Live Preview
              </h3>
              
              {previewThumbnails.length > 0 ? (
                <div className="space-y-4">
                  {/* Main Preview */}
                  <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 font-medium">
                          Main Preview
                        </p>
                        <p className="text-sm text-gray-400">
                          1280 x 720 pixels
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail Variations */}
                  <div>
                    <h4 className="font-medium mb-3">AI Generated Variations</h4>
                    <div className="grid grid-cols-3 gap-3">
                      {previewThumbnails.map((thumb) => (
                        <div key={thumb.id} className="relative group">
                          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                            <div className="h-full flex items-center justify-center">
                              <ImageIcon className="h-6 w-6 text-gray-400" />
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleEdit(thumb)}
                              className="bg-white text-black hover:bg-gray-100"
                            >
                              Edit
                            </Button>
                            <Button size="sm" variant="outline">
                              <DownloadIcon className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <SparklesIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 font-medium mb-2">
                      {isGenerating ? "AI is creating your thumbnails..." : "Your thumbnails will appear here"}
                    </p>
                    <p className="text-sm text-gray-400">
                      {isGenerating ? "This may take a few seconds" : "Enter a title or URL and click Generate"}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}