import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  TypeIcon, 
  ImageIcon, 
  ShapesIcon,
  StickerIcon,
  UploadIcon,
  PaletteIcon,
  SparklesIcon,
  DownloadIcon,
  UndoIcon,
  RedoIcon,
  SaveIcon,
  ShareIcon
} from "lucide-react";
import { ThumbnailElement, ThumbnailData } from "shared/schema";

interface ThumbnailEditorProps {
  initialData?: ThumbnailData;
  onSave: (data: ThumbnailData) => void;
  onExport: (format: string, data: ThumbnailData) => void;
}

export default function ThumbnailEditor({ initialData, onSave, onExport }: ThumbnailEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [thumbnailData, setThumbnailData] = useState<ThumbnailData>(
    initialData || {
      canvas: {
        width: 1280,
        height: 720,
        backgroundColor: "#ffffff"
      },
      elements: [],
      metadata: {
        title: "Untitled Thumbnail",
        style: "minimal"
      }
    }
  );
  
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("text");

  // Font options
  const fonts = [
    "Inter", "Arial", "Times New Roman", "Georgia", "Verdana", 
    "Helvetica", "Comic Sans MS", "Impact", "Trebuchet MS", "Courier New"
  ];

  // Color schemes
  const colorSchemes = [
    { name: "Classic", colors: ["#000000", "#ffffff", "#ff0000", "#0066cc"] },
    { name: "Modern", colors: ["#1a1a1a", "#f5f5f5", "#6366f1", "#ec4899"] },
    { name: "Gaming", colors: ["#7c3aed", "#06b6d4", "#f59e0b", "#10b981"] },
    { name: "Professional", colors: ["#374151", "#f9fafb", "#3b82f6", "#059669"] }
  ];

  // Stickers/Icons
  const stickers = [
    { id: "fire", symbol: "🔥", category: "popular" },
    { id: "rocket", symbol: "🚀", category: "popular" },
    { id: "star", symbol: "⭐", category: "popular" },
    { id: "heart", symbol: "❤️", category: "popular" },
    { id: "thumbs-up", symbol: "👍", category: "popular" },
    { id: "lightning", symbol: "⚡", category: "popular" },
    { id: "crown", symbol: "👑", category: "premium" },
    { id: "diamond", symbol: "💎", category: "premium" }
  ];

  const addTextElement = () => {
    const newElement: ThumbnailElement = {
      id: Date.now().toString(),
      type: "text",
      x: 100,
      y: 100,
      width: 300,
      height: 80,
      zIndex: thumbnailData.elements.length + 1,
      content: "Your Text Here",
      style: {
        fontSize: 48,
        fontFamily: "Inter",
        fontWeight: "bold",
        color: "#000000",
        textAlign: "center"
      }
    };

    setThumbnailData(prev => ({
      ...prev,
      elements: [...prev.elements, newElement]
    }));
    setSelectedElement(newElement.id);
  };

  const addStickerElement = (sticker: typeof stickers[0]) => {
    const newElement: ThumbnailElement = {
      id: Date.now().toString(),
      type: "sticker",
      x: 200,
      y: 200,
      width: 80,
      height: 80,
      zIndex: thumbnailData.elements.length + 1,
      content: sticker.symbol
    };

    setThumbnailData(prev => ({
      ...prev,
      elements: [...prev.elements, newElement]
    }));
    setSelectedElement(newElement.id);
  };

  const updateElement = (elementId: string, updates: Partial<ThumbnailElement>) => {
    setThumbnailData(prev => ({
      ...prev,
      elements: prev.elements.map(el => 
        el.id === elementId ? { ...el, ...updates } : el
      )
    }));
  };

  const deleteElement = (elementId: string) => {
    setThumbnailData(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== elementId)
    }));
    setSelectedElement(null);
  };

  const selectedElementData = selectedElement 
    ? thumbnailData.elements.find(el => el.id === selectedElement)
    : null;

  const handleExport = (format: string) => {
    onExport(format, thumbnailData);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar - Tools */}
      <div className="w-80 bg-white border-r overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Editor Tools</h2>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 m-4">
            <TabsTrigger value="text" className="text-xs">
              <TypeIcon className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="images" className="text-xs">
              <ImageIcon className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="shapes" className="text-xs">
              <ShapesIcon className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger value="stickers" className="text-xs">
              <StickerIcon className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text" className="p-4 space-y-4">
            <div className="space-y-3">
              <Button onClick={addTextElement} className="w-full">
                <TypeIcon className="h-4 w-4 mr-2" />
                Add Text
              </Button>
              
              {selectedElementData?.type === "text" && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Text Properties</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-xs">Content</Label>
                      <Input
                        value={selectedElementData.content || ""}
                        onChange={(e) => updateElement(selectedElement!, { content: e.target.value })}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Font</Label>
                      <Select 
                        value={selectedElementData.style?.fontFamily || "Inter"}
                        onValueChange={(value) => updateElement(selectedElement!, { 
                          style: { ...selectedElementData.style, fontFamily: value }
                        })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fonts.map(font => (
                            <SelectItem key={font} value={font}>{font}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label className="text-xs">Size: {selectedElementData.style?.fontSize || 48}px</Label>
                      <Slider
                        value={[selectedElementData.style?.fontSize || 48]}
                        onValueChange={([value]) => updateElement(selectedElement!, {
                          style: { ...selectedElementData.style, fontSize: value }
                        })}
                        min={12}
                        max={120}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs">Color</Label>
                      <input
                        type="color"
                        value={selectedElementData.style?.color || "#000000"}
                        onChange={(e) => updateElement(selectedElement!, {
                          style: { ...selectedElementData.style, color: e.target.value }
                        })}
                        className="mt-1 w-full h-8 rounded border"
                      />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="images" className="p-4 space-y-4">
            <Button className="w-full" variant="outline">
              <UploadIcon className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
            <div className="text-sm text-gray-500 text-center">
              Background images and overlays coming soon
            </div>
          </TabsContent>

          <TabsContent value="shapes" className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">Rectangle</Button>
              <Button variant="outline" size="sm">Circle</Button>
              <Button variant="outline" size="sm">Triangle</Button>
              <Button variant="outline" size="sm">Arrow</Button>
            </div>
          </TabsContent>

          <TabsContent value="stickers" className="p-4 space-y-4">
            <div className="grid grid-cols-4 gap-2">
              {stickers.map(sticker => (
                <Button
                  key={sticker.id}
                  variant="outline"
                  size="sm"
                  onClick={() => addStickerElement(sticker)}
                  className="aspect-square text-xl"
                >
                  {sticker.symbol}
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <UndoIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <RedoIcon className="h-4 w-4" />
            </Button>
            <div className="h-4 w-px bg-gray-300 mx-2" />
            <Badge variant="secondary">
              {thumbnailData.canvas.width} × {thumbnailData.canvas.height}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => onSave(thumbnailData)}>
              <SaveIcon className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button size="sm" onClick={() => handleExport("png")}>
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Canvas Container */}
        <div className="flex-1 p-8 overflow-auto bg-gray-100">
          <div className="max-w-4xl mx-auto">
            <div 
              className="relative bg-white rounded-lg shadow-lg overflow-hidden"
              style={{ 
                aspectRatio: `${thumbnailData.canvas.width}/${thumbnailData.canvas.height}`,
                backgroundColor: thumbnailData.canvas.backgroundColor
              }}
            >
              <canvas
                ref={canvasRef}
                width={thumbnailData.canvas.width}
                height={thumbnailData.canvas.height}
                className="w-full h-full"
              />
              
              {/* Element Overlays */}
              {thumbnailData.elements.map(element => (
                <div
                  key={element.id}
                  className={`absolute border-2 cursor-move ${
                    selectedElement === element.id 
                      ? 'border-blue-500 bg-blue-50/20' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  style={{
                    left: `${(element.x / thumbnailData.canvas.width) * 100}%`,
                    top: `${(element.y / thumbnailData.canvas.height) * 100}%`,
                    width: `${(element.width / thumbnailData.canvas.width) * 100}%`,
                    height: `${(element.height / thumbnailData.canvas.height) * 100}%`,
                    zIndex: element.zIndex
                  }}
                  onClick={() => setSelectedElement(element.id)}
                >
                  {element.type === "text" && (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        fontSize: `${(element.style?.fontSize || 48) * 0.8}px`,
                        fontFamily: element.style?.fontFamily || "Inter",
                        fontWeight: element.style?.fontWeight || "bold",
                        color: element.style?.color || "#000000",
                        textAlign: element.style?.textAlign as any || "center"
                      }}
                    >
                      {element.content}
                    </div>
                  )}
                  
                  {element.type === "sticker" && (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      {element.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - AI Suggestions & Templates */}
      <div className="w-80 bg-white border-l overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">AI Suggestions</h2>
        </div>
        
        <div className="p-4 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center">
                <SparklesIcon className="h-4 w-4 mr-2" />
                Color Schemes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {colorSchemes.map(scheme => (
                  <div key={scheme.name} className="flex items-center justify-between">
                    <span className="text-sm">{scheme.name}</span>
                    <div className="flex space-x-1">
                      {scheme.colors.map(color => (
                        <div 
                          key={color}
                          className="w-4 h-4 rounded border"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                <PaletteIcon className="h-4 w-4 mr-2" />
                Change Background
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <SparklesIcon className="h-4 w-4 mr-2" />
                AI Enhance
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                <ShareIcon className="h-4 w-4 mr-2" />
                Share Template
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}