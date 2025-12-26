import React, { useRef, useState } from 'react';
import { Icons } from '../constants';
import { formatFileSize } from '../utils/fileUtils';

interface VideoUploaderProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onFileSelect, selectedFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSelect(e.target.files[0]);
    }
  };

  const validateAndSelect = (file: File) => {
    // Client-side validation: < 250MB
    if (file.size > 250 * 1024 * 1024) { 
        alert("Để đảm bảo hiệu suất trên trình duyệt, vui lòng chọn video dưới 250MB.");
        return;
    }
    if (!file.type.startsWith('video/')) {
        alert("Vui lòng chọn định dạng video hợp lệ.");
        return;
    }
    onFileSelect(file);
  };

  const triggerInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="video/*"
        onChange={handleChange}
      />
      
      {!selectedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300 cursor-pointer group
            ${dragActive ? 'border-cinematic-accent bg-cinematic-800/80' : 'border-slate-600 hover:border-cinematic-accent hover:bg-cinematic-800/50 bg-cinematic-800/30'}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={triggerInput}
        >
          <div className="flex flex-col items-center gap-4">
            <div className={`p-4 rounded-full bg-cinematic-700 group-hover:bg-cinematic-accent/20 transition-colors duration-300`}>
              <Icons.Upload className={`w-8 h-8 text-slate-300 group-hover:text-cinematic-accent transition-colors`} />
            </div>
            <div>
              <p className="text-lg font-medium text-slate-200">Kéo thả video vào đây</p>
              <p className="text-sm text-slate-400 mt-1">hoặc nhấn để chọn file</p>
            </div>
            <p className="text-xs text-slate-500 mt-2 bg-black/20 px-3 py-1 rounded-full">
              Hỗ trợ MP4, MOV, WebM (Max 250MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 bg-cinematic-800 border border-cinematic-700 rounded-xl">
            <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-2 bg-green-500/20 rounded-lg">
                    <Icons.Film className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-medium text-white truncate max-w-[200px]">{selectedFile.name}</span>
                    <span className="text-xs text-slate-400">{formatFileSize(selectedFile.size)}</span>
                </div>
            </div>
            <button 
                onClick={(e) => { e.stopPropagation(); triggerInput(); }}
                className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg transition-colors"
            >
                Thay đổi
            </button>
        </div>
      )}
    </div>
  );
};

export default VideoUploader;