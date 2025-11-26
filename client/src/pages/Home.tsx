import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  SparklesIcon, 
  PlayIcon, 
  ImageIcon, 
  DownloadIcon,
  BookTemplateIcon,
  ZapIcon,
  ShieldCheckIcon,
  StarIcon
} from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Create & Download
            <br />
            <span className="bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
              YouTube Content
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            The ultimate toolkit for YouTube creators. Design stunning thumbnails with AI, 
            download videos in any quality, and access thousands of professional templates.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200 text-base px-4 py-2">
              <SparklesIcon className="h-4 w-4 mr-2" />
              AI-Powered Creation
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200 text-base px-4 py-2">
              <DownloadIcon className="h-4 w-4 mr-2" />
              Multi-Format Downloads
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200 text-base px-4 py-2">
              <BookTemplateIcon className="h-4 w-4 mr-2" />
              Professional Templates
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-lg px-8 py-6"
              onClick={() => setLocation("/creator")}
            >
              <SparklesIcon className="h-5 w-5 mr-3" />
              Start Creating with AI
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
              onClick={() => setLocation("/downloader")}
            >
              <PlayIcon className="h-5 w-5 mr-3" />
              Download Videos
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600">Powerful tools for YouTube content creators</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <SparklesIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">AI Thumbnail Creator</h3>
                <p className="text-gray-600 mb-4">
                  Generate eye-catching thumbnails in seconds using advanced AI. No design skills required.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setLocation("/creator")}
                  className="group-hover:bg-purple-50 group-hover:border-purple-200"
                >
                  Try AI Creator
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <PlayIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Video Downloader</h3>
                <p className="text-gray-600 mb-4">
                  Download YouTube videos in multiple qualities from 144p to 4K with file size information.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setLocation("/downloader")}
                  className="group-hover:bg-blue-50 group-hover:border-blue-200"
                >
                  Start Downloading
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <ImageIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Thumbnail Downloads</h3>
                <p className="text-gray-600 mb-4">
                  Extract thumbnails in 6 different resolutions for any YouTube video instantly.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setLocation("/downloader")}
                  className="group-hover:bg-green-50 group-hover:border-green-200"
                >
                  Get Thumbnails
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <BookTemplateIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Template Library</h3>
                <p className="text-gray-600 mb-4">
                  Access hundreds of professionally designed templates for every type of content.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setLocation("/templates")}
                  className="group-hover:bg-yellow-50 group-hover:border-yellow-200"
                >
                  Browse Templates
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <ZapIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
                <p className="text-gray-600 mb-4">
                  Generate thumbnails and download content in seconds, not minutes. Built for speed.
                </p>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  Optimized Performance
                </Badge>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheckIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Safe & Secure</h3>
                <p className="text-gray-600 mb-4">
                  Your content and data are safe. No registration required for basic features.
                </p>
                <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                  Privacy First
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">500K+</div>
              <div className="text-gray-600">Thumbnails Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">1M+</div>
              <div className="text-gray-600">Videos Downloaded</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Template Styles</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">4.9</div>
              <div className="text-gray-600 flex items-center justify-center">
                <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                User Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Level Up Your Content?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who use our tools to make their YouTube content stand out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-lg px-8 py-6"
              onClick={() => setLocation("/creator")}
            >
              <SparklesIcon className="h-5 w-5 mr-3" />
              Create Your First Thumbnail
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6"
              onClick={() => setLocation("/downloader")}
            >
              <DownloadIcon className="h-5 w-5 mr-3" />
              Download Content Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
