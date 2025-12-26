import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Perspective } from '../types';

interface AnalysisDisplayProps {
    result: string | null;
    perspective: Perspective | null;
    isLoading: boolean;
    statusMessage?: string;
}

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ result, perspective, isLoading, statusMessage }) => {
    if (!result && !isLoading) return null;

    return (
        <div className="w-full mt-8 animate-fade-in-up">
            <div className="bg-cinematic-800 rounded-xl border border-cinematic-700 overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="px-6 py-4 border-b border-cinematic-700 bg-cinematic-900/50 flex items-center justify-between">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-cinematic-accent border-t-transparent rounded-full animate-spin"></div>
                                {statusMessage || "Đang phân tích..."}
                            </>
                        ) : (
                            <>
                                <span className="text-cinematic-accent">✦</span>
                                Kết quả phân tích: {perspective?.name}
                            </>
                        )}
                    </h3>
                    {result && !isLoading && (
                        <button
                            onClick={() => {
                                const blob = new Blob([result], { type: 'text/markdown;charset=utf-8' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `cineview-analysis-${perspective?.role}-${new Date().toISOString().split('T')[0]}.md`;
                                document.body.appendChild(a);
                                a.click();
                                document.body.removeChild(a);
                                URL.revokeObjectURL(url);
                            }}
                            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-cinematic-900 bg-cinematic-accent hover:bg-white rounded-lg transition-colors shadow-lg hover:shadow-cyan-400/20"
                            title="Tải kết quả về máy"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                                <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                            </svg>
                            Tải về
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 min-h-[300px] bg-cinematic-900/20">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-full py-12 space-y-6">
                            <div className="relative w-20 h-20">
                                <div className="absolute inset-0 border-4 border-cinematic-700 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-cinematic-accent rounded-full border-t-transparent animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-2xl">🎬</span>
                                </div>
                            </div>
                            <p className="text-slate-400 animate-pulse text-sm">AI đang xem video và viết báo cáo...</p>
                        </div>
                    ) : (
                        <article className="prose prose-invert prose-slate max-w-none prose-headings:text-cinematic-accent prose-a:text-blue-400 prose-strong:text-white">
                            <ReactMarkdown>{result || ""}</ReactMarkdown>
                        </article>
                    )}
                </div>
            </div>
        </div >
    );
};

export default AnalysisDisplay;
