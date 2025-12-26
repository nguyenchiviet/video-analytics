import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import VideoUploader from './components/VideoUploader';
import PerspectiveSelector from './components/PerspectiveSelector';
import AnalysisDisplay from './components/AnalysisDisplay';
import HistoryList from './components/HistoryList';
import { VideoData, Perspective, HistoryItem } from './types';
import { fileToBase64 } from './utils/fileUtils';
import { analyzeVideo } from './services/geminiService';

import ApiKeyModal from './components/ApiKeyModal';

export default function App() {
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [selectedPerspective, setSelectedPerspective] = useState<Perspective | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progressMessage, setProgressMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Tabs & History
  const [activeTab, setActiveTab] = useState<'analyze' | 'history'>('analyze');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // API Key Check
  const [apiKey, setApiKey] = useState<string>("");
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);

  // Load history & Key on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('cineview_history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }

      // Check for key in localStorage (persistent) or sessionStorage (session)
      // Or fallback to env if user ran with one (optional, but good for dev)
      const savedKey = localStorage.getItem('gemini_api_key') || sessionStorage.getItem('gemini_api_key') || process.env.API_KEY || "";
      if (savedKey) {
        setApiKey(savedKey);
      } else {
        // If no key immediately, verify if we want to show modal?
        // Maybe wait until they try to interact, OR show it in header.
      }
    } catch (e) {
      console.error("Failed to load initial data", e);
    }
  }, []);

  // Clean up object URL
  useEffect(() => {
    return () => {
      if (videoData?.previewUrl) {
        URL.revokeObjectURL(videoData.previewUrl);
      }
    };
  }, [videoData]);

  const saveHistory = (newItem: HistoryItem) => {
    const updated = [newItem, ...history].slice(0, 20); // Keep last 20
    setHistory(updated);
    localStorage.setItem('cineview_history', JSON.stringify(updated));
  };

  const handleClearHistory = () => {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử?")) {
      setHistory([]);
      localStorage.removeItem('cineview_history');
    }
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    // Switch to analyze tab and show result
    // Note: We can't restore the video file itself effectively without re-upload,
    // so we show the result and perspective, but maybe clear the video if it doesn't match?
    // For now, let's just show the result.
    setAnalysisResult(item.result);
    setSelectedPerspective(item.perspective);
    setActiveTab('analyze');
    // If current video doesn't match history item, maybe we should warn or just show result?
    // Let's keep it simple: just show result. The video player might show previous video or empty if none.
  };

  const handleSaveApiKey = (key: string, saveToStorage: boolean) => {
    setApiKey(key);
    if (saveToStorage) {
      localStorage.setItem('gemini_api_key', key);
      sessionStorage.removeItem('gemini_api_key');
    } else {
      sessionStorage.setItem('gemini_api_key', key);
      localStorage.removeItem('gemini_api_key');
    }
  };

  const handleFileSelect = async (file: File) => {
    try {
      setError(null);
      setAnalysisResult(null);
      // setSelectedPerspective(null); // Keep perspective if user wants to retry with same? No, reset is better.
      setSelectedPerspective(null);

      const previewUrl = URL.createObjectURL(file);
      const base64Data = await fileToBase64(file);

      setVideoData({
        file,
        previewUrl,
        base64Data,
        mimeType: file.type
      });
    } catch (err) {
      setError("Không thể xử lý file video này.");
      console.error(err);
    }
  };

  const handlePerspectiveSelect = async (perspective: Perspective) => {
    if (!videoData || isAnalyzing) return;

    // Check API Key
    if (!apiKey) {
      setIsKeyModalOpen(true);
      return;
    }

    setSelectedPerspective(perspective);
    setIsAnalyzing(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeVideo(
        apiKey,
        videoData.base64Data,
        videoData.mimeType,
        perspective,
        (msg) => setProgressMessage(msg)
      );
      setAnalysisResult(result);

      // Save to history
      saveHistory({
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        videoName: videoData.file.name,
        perspective,
        result
      });

    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi khi phân tích.");
      // If unauthorized, maybe clear key?
      if (err.message && (err.message.includes("401") || err.message.includes("API Key"))) {
        setIsKeyModalOpen(true); // Prompt to fix key
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cinematic-900 text-slate-200">
      <Header apiKey={apiKey} onOpenKeyModal={() => setIsKeyModalOpen(true)} />

      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        onSave={handleSaveApiKey}
        initialKey={apiKey}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* API Key Check Warning could go here */}

        {/* Tabs */}
        <div className="flex items-center justify-center mb-8">
          <div className="bg-cinematic-800 p-1 rounded-xl flex gap-1 border border-cinematic-700">
            <button
              onClick={() => setActiveTab('analyze')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'analyze'
                ? 'bg-cinematic-accent text-cinematic-900 shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-cinematic-700'
                }`}
            >
              Phân Tích
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'history'
                ? 'bg-cinematic-accent text-cinematic-900 shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-cinematic-700'
                }`}
            >
              Lịch Sử ({history.length})
            </button>
          </div>
        </div>

        {activeTab === 'analyze' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in-up">

            {/* Left Column: Input & Controls */}
            <div className="lg:col-span-5 space-y-8">
              <section>
                <h2 className="text-xl font-bold text-white mb-4">1. Tải Video</h2>
                <VideoUploader
                  onFileSelect={handleFileSelect}
                  selectedFile={videoData?.file || null}
                />

                {videoData && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-cinematic-700 bg-black shadow-lg">
                    <video
                      src={videoData.previewUrl}
                      controls
                      className="w-full aspect-video object-contain"
                    />
                  </div>
                )}
              </section>

              {videoData && (
                <section className="animate-fade-in-up">
                  <h2 className="text-xl font-bold text-white mb-4">2. Chọn Chế Độ Phân Tích</h2>
                  <PerspectiveSelector
                    selectedPerspective={selectedPerspective}
                    onSelect={handlePerspectiveSelect}
                    disabled={isAnalyzing}
                  />
                </section>
              )}

              {error && (
                <div className="p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-xl text-sm">
                  ⚠️ {error}
                </div>
              )}
            </div>

            {/* Right Column: Results */}
            <div className="lg:col-span-7">
              <h2 className="text-xl font-bold text-white mb-4">3. Kết Quả Phân Tích</h2>
              {selectedPerspective || isAnalyzing || analysisResult ? (
                <AnalysisDisplay
                  result={analysisResult}
                  perspective={selectedPerspective}
                  isLoading={isAnalyzing}
                  statusMessage={progressMessage}
                />
              ) : (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-cinematic-700 rounded-xl bg-cinematic-800/30 text-slate-500">
                  <div className="text-6xl mb-4 opacity-50">🎬</div>
                  <p className="max-w-xs text-center">
                    Vui lòng tải video và chọn một góc nhìn để bắt đầu phân tích.
                  </p>
                </div>
              )}
            </div>

          </div>
        ) : (
          <div className="animate-fade-in-up max-w-4xl mx-auto">
            <HistoryList
              history={history}
              onSelect={handleSelectHistoryItem}
              onClear={handleClearHistory}
            />
          </div>
        )}
      </main>

      <footer className="py-6 border-t border-cinematic-800 text-center text-slate-500 text-sm">
        <p>© 2026 Bloom CineView AI. Designed for Filmmakers.</p>
      </footer>
    </div>
  );
}
