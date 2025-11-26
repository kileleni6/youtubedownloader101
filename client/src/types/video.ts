export interface VideoInfo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  formats: VideoFormat[];
  thumbnails: ThumbnailFormat[];
}

export interface VideoFormat {
  format_id: string;
  format: string;
  quality: string;
  ext: string;
  resolution?: string;
  filesize: number;
  filesize_approx?: number;
}

export interface ThumbnailFormat {
  id: string;
  url: string;
  width: number;
  height: number;
  quality: string;
  ext: string;
}

export interface DownloadProgress {
  percent: number;
  downloaded_bytes: number;
  total_bytes: number;
}
