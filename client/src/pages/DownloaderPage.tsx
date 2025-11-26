import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PlayIcon, DownloadIcon, ImageIcon } from "lucide-react";
import VideoPreview from "@/components/VideoPreview";
import ThumbnailDownloader from "@/components/ThumbnailDownloader";
import Instructions from "@/components/Instructions";
import { VideoInfo } from "@/types/video";

export default function DownloaderPage() {
  const [url, setUrl] = useState("");
  const [videoData, setVideoData] = useState<VideoInfo | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { toast } = useToast();

  const updateDownloadProgress = (progress: number) => {
    setDownloadProgress(progress);
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid YouTube URL",
      });
      return;
    }

    setIsFetching(true);
    setVideoData(null);

    try {
      const response = await fetch("/api/videos/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch video information");
      }

      const data = await response.json();
      setVideoData(data);
      
      toast({
        title: "Success",
        description: "Video information loaded successfully",
      });
    } catch (error) {
      console.error("Error fetching video info:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to fetch video information",
      });
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            YouTube Video & Thumbnail Downloader
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Download YouTube videos in various qualities and get access to all available thumbnail formats.
          </p>
        </div>

        {/* URL Input Section */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <PlayIcon className="h-6 w-6 mr-2 text-red-600" />
              Enter YouTube URL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUrlSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 text-lg py-6"
                disabled={isFetching}
              />
              <Button 
                type="submit" 
                disabled={isFetching || !url.trim()}
                className="bg-red-600 hover:bg-red-700 px-8 py-6 text-lg"
              >
                {isFetching ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Fetching...
                  </>
                ) : (
                  <>
                    <DownloadIcon className="h-5 w-5 mr-2" />
                    Fetch
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Video Content */}
        {videoData && (
          <div className="space-y-6">
            {/* Thumbnail Downloader */}
            <ThumbnailDownloader videoData={videoData} />
            
            {/* Video Preview and Download */}
            <VideoPreview
              videoData={videoData}
              downloadProgress={downloadProgress}
              isDownloading={isDownloading}
              setIsDownloading={setIsDownloading}
              updateDownloadProgress={updateDownloadProgress}
            />
          </div>
        )}

        {/* Instructions */}
        {!videoData && <Instructions />}

        {/* Features Section */}
        {!videoData && (
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <PlayIcon className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Video Downloads</h3>
              <p className="text-gray-600">
                Download videos in multiple qualities from 144p to 4K resolution
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <ImageIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Thumbnail Access</h3>
              <p className="text-gray-600">
                Get thumbnails in 6 different resolutions for any use case
              </p>
            </Card>
            
            <Card className="text-center p-6">
              <DownloadIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">File Size Info</h3>
              <p className="text-gray-600">
                See exact file sizes before downloading to manage your storage
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}