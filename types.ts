import React from 'react';

export interface Perspective {
  id: string;
  name: string;
  role: string;
  description: string;
  icon: React.ReactNode;
  promptFocus: string;
}

export interface AnalysisState {
  isLoading: boolean;
  result: string | null;
  error: string | null;
}

export interface VideoData {
  file: File;
  previewUrl: string;
  base64Data: string;
  mimeType: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  videoName: string;
  perspective: Perspective;
  result: string;
}