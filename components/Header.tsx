import React from 'react';
import { Icons } from '../constants';

interface HeaderProps {
  apiKey?: string;
  onOpenKeyModal?: () => void;
}

const Header: React.FC<HeaderProps> = ({ apiKey, onOpenKeyModal }) => {
  const hasKey = !!apiKey;

  return (
    <header className="w-full py-6 px-8 flex items-center justify-between border-b border-cinematic-700 bg-cinematic-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-cinematic-accent rounded-lg text-cinematic-900">
          <Icons.Film className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">CineView AI</h1>
          <p className="text-xs text-cinematic-accent font-medium uppercase tracking-widest">Phân Tích Điện Ảnh Đa Chiều</p>
        </div>
      </div>
      <div className="flex items-center gap-6 text-sm text-slate-400">
        <div className="hidden md:flex items-center gap-2">
          <span>Powered by Bloom Media</span>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        </div>

        {onOpenKeyModal && (
          <button
            onClick={onOpenKeyModal}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${hasKey
              ? 'border-cinematic-700 hover:border-cinematic-accent bg-cinematic-800/50 text-slate-300'
              : 'border-red-500/50 bg-red-900/20 text-red-200 animate-pulse'
              }`}
            title={hasKey ? "Key đã được cấu hình" : "Chưa cấu hình API Key"}
          >
            <span className="text-lg">🔑</span>
            <span className="hidden sm:inline font-medium">
              {hasKey ? 'API Key OK' : 'Nhập API Key'}
            </span>
            <span className={`w-2 h-2 rounded-full ${hasKey ? 'bg-green-500' : 'bg-red-500'}`}></span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
