import React from 'react';
import { HistoryItem } from '../types';

interface HistoryListProps {
    history: HistoryItem[];
    onSelect: (item: HistoryItem) => void;
    onClear: () => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onSelect, onClear }) => {
    if (history.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-slate-500 bg-cinematic-900/50 rounded-xl border border-cinematic-800">
                <span className="text-4xl mb-3 opacity-50">📜</span>
                <p>Chưa có lịch sử phân tích nào.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Lịch Sử Phân Tích ({history.length})</h3>
                <button
                    onClick={onClear}
                    className="px-4 py-2 text-sm text-red-400 hover:text-white hover:bg-red-900/50 rounded-lg transition-colors border border-transparent hover:border-red-800"
                >
                    Xóa tất cả
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {history.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => onSelect(item)}
                        className="group cursor-pointer bg-cinematic-800 hover:bg-cinematic-700 border border-cinematic-700 hover:border-cinematic-accent/50 rounded-xl p-4 transition-all duration-300 shadow-md hover:shadow-xl"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-cinematic-900 rounded-lg group-hover:bg-cinematic-800 transition-colors">
                                    <span className="text-xl">{typeof item.perspective.icon === 'string' ? item.perspective.icon : '🎬'}</span>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white group-hover:text-cinematic-accent transition-colors line-clamp-1">
                                        {item.videoName}
                                    </h4>
                                    <p className="text-sm text-cinematic-accent">
                                        {item.perspective.name}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-cinematic-700/50 flex items-center justify-between text-xs text-slate-400">
                            <span>{new Date(item.timestamp).toLocaleString('vi-VN')}</span>
                            <span className="group-hover:translate-x-1 transition-transform">Xem lại →</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HistoryList;
