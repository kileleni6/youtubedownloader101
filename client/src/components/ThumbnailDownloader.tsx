import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { VideoInfo, ThumbnailFormat } from "@/types/video";
import { useToast } from "@/hooks/use-toast";
import { ImageIcon, DownloadIcon } from "lucide-react";

interface ThumbnailDownloaderProps {
  videoData: VideoInfo;
}

export default function ThumbnailDownloader({ videoData }: ThumbnailDownloaderProps) {
  const [downloading, setDownloading] = useState<string | null>(null);
  const { toast } = useToast();

  const handleThumbnailDownload = async (thumbnail: ThumbnailFormat) => {
    if (downloading) return;
    
    setDownloading(thumbnail.id);
    
    try {
      const response = await apiRequest("POST", "/api/thumbnails/download", {
        videoId: videoData.id,
        thumbnailId: thumbnail.id
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to download thumbnail");
      }
      
      // Get the response as blob
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${videoData.title.replace(/[^a-z0-9]/gi, '_')}_${thumbnail.quality}.${thumbnail.ext}`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Thumbnail downloaded",
        description: `${thumbnail.quality} quality thumbnail saved to your downloads folder.`,
      });
    } catch (error) {
      console.error("Error downloading thumbnail:", error);
      toast({
        variant: "destructive",
        title: "Download Error",
        description: error instanceof Error ? error.message : "Failed to download thumbnail",
      });
    } finally {
      setDownloading(null);
    }
  };

  const formatQuality = (quality: string): string => {
    const qualityMap: { [key: string]: string } = {
      "lowest": "120p",
      "low": "180p", 
      "medium": "360p",
      "high": "480p",
      "hd": "720p",
      "maxres": "1080p"
    };
    return qualityMap[quality] || quality;
  };

  const getQualityColor = (quality: string): string => {
    const colorMap: { [key: string]: string } = {
      "lowest": "bg-gray-100 text-gray-800",
      "low": "bg-blue-100 text-blue-800",
      "medium": "bg-green-100 text-green-800",
      "high": "bg-yellow-100 text-yellow-800",
      "hd": "bg-orange-100 text-orange-800",
      "maxres": "bg-red-100 text-red-800"
    };
    return colorMap[quality] || "bg-gray-100 text-gray-800";
  };

  if (!videoData.thumbnails || videoData.thumbnails.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <ImageIcon className="h-5 w-5 mr-2" />
          Thumbnail Downloads
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {videoData.thumbnails.map((thumbnail) => (
            <div
              key={thumbnail.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-3">
                <img
                  src={thumbnail.url}
                  alt={`${formatQuality(thumbnail.quality)} thumbnail`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge 
                    variant="secondary" 
                    className={getQualityColor(thumbnail.quality)}
                  >
                    {formatQuality(thumbnail.quality)}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {thumbnail.width}x{thumbnail.height}
                  </span>
                </div>
                
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => handleThumbnailDownload(thumbnail)}
                  disabled={downloading === thumbnail.id}
                >
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  {downloading === thumbnail.id ? "Downloading..." : "Download"}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Different resolutions are available for various uses - lower resolutions for web previews, higher resolutions for printing or detailed viewing.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}