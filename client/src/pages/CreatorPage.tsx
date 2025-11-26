import { useState } from "react";
import ThumbnailEditor from "@/components/ThumbnailEditor";
import HeroSection from "@/components/HeroSection";
import { ThumbnailData } from "shared/schema";

export default function CreatorPage() {
  const [showEditor, setShowEditor] = useState(false);
  const [editorData, setEditorData] = useState<ThumbnailData | undefined>();

  const handleCreateThumbnail = (data: any) => {
    setEditorData(data.template);
    setShowEditor(true);
  };

  const handleGoToDownloader = () => {
    // This will be handled by the parent component
    window.location.href = "/downloader";
  };

  const handleSave = (data: ThumbnailData) => {
    console.log("Saving thumbnail:", data);
    // TODO: Implement save to database
  };

  const handleExport = (format: string, data: ThumbnailData) => {
    console.log("Exporting thumbnail:", format, data);
    // TODO: Implement export functionality
  };

  if (showEditor) {
    return (
      <ThumbnailEditor
        initialData={editorData}
        onSave={handleSave}
        onExport={handleExport}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection 
        onCreateThumbnail={handleCreateThumbnail}
        onGoToDownloader={handleGoToDownloader}
      />
    </div>
  );
}