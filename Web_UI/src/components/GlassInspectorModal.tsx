import React from 'react';
import { Sliders, Sun, Sparkles, X, Check, RefreshCw } from 'lucide-react';
import { GlassSettings } from '../types';

interface GlassInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GlassSettings;
  onUpdateSettings: (newSettings: Partial<GlassSettings>) => void;
  onResetSettings: () => void;
}

export const GlassInspectorModal: React.FC<GlassInspectorModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetSettings
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg apple-glass-card bg-black/90 rounded-2xl p-6 border border-white/20 shadow-2xl text-white">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/15">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/10 text-white border border-white/20">
              <Sliders className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Glassmorphism Inspector</h3>
              <p className="text-xs text-white/60">Tune blur, opacity, and border properties</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Controls */}
        <div className="mt-5 space-y-4">
          {/* Backdrop Blur Slider */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-white/80">Backdrop Blur ({settings.blurPx}px)</span>
              <span className="text-white/60 font-mono">24-36px</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              value={settings.blurPx}
              onChange={(e) => onUpdateSettings({ blurPx: Number(e.target.value) })}
              className="w-full accent-white cursor-pointer h-1.5 bg-white/20 rounded-lg"
            />
          </div>

          {/* Panel Translucency Opacity */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-white/80">Panel Opacity ({settings.opacityPercent}%)</span>
              <span className="text-white/60 font-mono">5-15%</span>
            </div>
            <input
              type="range"
              min="2"
              max="40"
              value={settings.opacityPercent}
              onChange={(e) => onUpdateSettings({ opacityPercent: Number(e.target.value) })}
              className="w-full accent-white cursor-pointer h-1.5 bg-white/20 rounded-lg"
            />
          </div>

          {/* Subtle Border Opacity */}
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-white/80">White Border Opacity ({settings.borderOpacityPercent}%)</span>
              <span className="text-white/60 font-mono">15-25%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={settings.borderOpacityPercent}
              onChange={(e) => onUpdateSettings({ borderOpacityPercent: Number(e.target.value) })}
              className="w-full accent-white cursor-pointer h-1.5 bg-white/20 rounded-lg"
            />
          </div>

          {/* Subtle Motion Physics Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-xs font-medium text-white">Subtle Motion Physics</span>
            </div>
            <button
              onClick={() => onUpdateSettings({ ambientLightMotion: !settings.ambientLightMotion })}
              className={`w-10 h-5 rounded-full transition-colors relative p-0.5 border border-white/30 ${
                settings.ambientLightMotion ? 'bg-white' : 'bg-white/10'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  settings.ambientLightMotion ? 'translate-x-5 bg-black' : 'translate-x-0 bg-white'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/15">
          <button
            onClick={onResetSettings}
            className="flex items-center gap-1 text-xs text-white/60 hover:text-white transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-white/90 transition-colors flex items-center gap-1"
          >
            <Check className="w-3.5 h-3.5 text-black" />
            <span>Apply Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

