import React from 'react';
import { PERSPECTIVES } from '../constants';
import { Perspective } from '../types';

interface PerspectiveSelectorProps {
  selectedPerspective: Perspective | null;
  onSelect: (p: Perspective) => void;
  disabled: boolean;
}

const PerspectiveSelector: React.FC<PerspectiveSelectorProps> = ({ selectedPerspective, onSelect, disabled }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
        <span className="w-1 h-6 bg-cinematic-accent rounded-full"></span>
        Chọn Góc Nhìn Phân Tích
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {PERSPECTIVES.map((p) => {
            const isSelected = selectedPerspective?.id === p.id;
            return (
                <button
                    key={p.id}
                    onClick={() => onSelect(p)}
                    disabled={disabled}
                    className={`
                        relative flex flex-col items-start p-4 rounded-xl border transition-all duration-200 text-left
                        ${isSelected 
                            ? 'bg-cinematic-accent border-cinematic-accent text-cinematic-900 shadow-lg shadow-cinematic-accent/20' 
                            : 'bg-cinematic-800/40 border-cinematic-700 text-slate-300 hover:border-cinematic-500 hover:bg-cinematic-800'
                        }
                        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    `}
                >
                    <div className={`mb-3 p-2 rounded-lg ${isSelected ? 'bg-black/10' : 'bg-slate-700/50'}`}>
                        {p.icon}
                    </div>
                    <div className="font-bold text-sm mb-1">{p.name}</div>
                    <div className={`text-xs ${isSelected ? 'text-cinematic-900/80' : 'text-slate-400'} line-clamp-2`}>
                        {p.description}
                    </div>
                </button>
            )
        })}
      </div>
    </div>
  );
};

export default PerspectiveSelector;
