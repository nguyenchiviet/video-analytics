import React, { useState, useEffect } from 'react';

interface ApiKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (key: string, saveToStorage: boolean) => void;
    initialKey?: string;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSave, initialKey = '' }) => {
    const [key, setKey] = useState(initialKey);
    const [saveToStorage, setSaveToStorage] = useState(true);

    useEffect(() => {
        if (isOpen) {
            setKey(initialKey);
        }
    }, [isOpen, initialKey]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(key, saveToStorage);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-cinematic-900 border border-cinematic-700 rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <span>🔑</span> Cấu hình API Key
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                        ✕
                    </button>
                </div>

                <p className="text-sm text-slate-300">
                    Để sử dụng CineView AI, bạn cần cung cấp Gemini API Key của riêng mình (miễn phí).
                    <br />
                    <a
                        href="https://aistudio.google.com/app/apikey"
                        target="_blank"
                        rel="noreferrer"
                        className="text-cinematic-accent hover:underline mt-1 inline-block"
                    >
                        Lấy API Key tại đây →
                    </a>
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            placeholder="Nhập Gemini API Key (AIza...)"
                            className="w-full px-4 py-3 bg-black border border-cinematic-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cinematic-accent focus:ring-1 focus:ring-cinematic-accent transition-all"
                            autoFocus
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="saveKey"
                            checked={saveToStorage}
                            onChange={(e) => setSaveToStorage(e.target.checked)}
                            className="rounded border-cinematic-700 bg-black text-cinematic-accent focus:ring-cinematic-accent"
                        />
                        <label htmlFor="saveKey" className="text-sm text-slate-400 cursor-pointer select-none">
                            Lưu Key vào trình duyệt (Local Storage)
                        </label>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 text-slate-300 hover:bg-cinematic-800 rounded-lg transition-colors font-medium border border-transparent"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={!key.trim()}
                            className="flex-1 px-4 py-2 bg-cinematic-accent text-cinematic-900 font-bold rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-cyan-500/20"
                        >
                            Lưu & Tiếp tục
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApiKeyModal;
