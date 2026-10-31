import React, { useState } from 'react';
import { Play, RotateCcw, Settings, Grid, Flag, X, AlertTriangle } from 'lucide-react';
import { soundCtrl } from '../utils/sound';

export interface PauseMenuModalProps {
  onResume: () => void;
  onRestart: () => void;
  onOpenSettings: () => void;
  onExitToHub: () => void;
  onEndGame: () => void;
}

export const PauseMenuModal: React.FC<PauseMenuModalProps> = ({
  onResume,
  onRestart,
  onOpenSettings,
  onExitToHub,
  onEndGame
}) => {
  const [showEndGameConfirm, setShowEndGameConfirm] = useState<boolean>(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in select-none">
      <div className="relative max-w-sm w-full bg-slate-900 border-2 border-purple-500/70 rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center">
        {/* Close / Resume 'X' */}
        <button
          onClick={() => { soundCtrl.playSelect(); onResume(); }}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-black text-white tracking-wider uppercase mb-1">
          Game Paused
        </h2>
        <p className="text-xs text-purple-300 font-medium mb-6">
          Take a breath. Your choices matter.
        </p>

        {!showEndGameConfirm ? (
          <div className="w-full space-y-3">
            {/* Resume */}
            <button
              onClick={() => { soundCtrl.playSelect(); onResume(); }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-sm shadow flex items-center justify-center gap-2 transition active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Resume Adventure</span>
            </button>

            {/* Restart Mission */}
            <button
              onClick={() => { soundCtrl.playSelect(); onRestart(); }}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart Mission</span>
            </button>

            {/* Settings */}
            <button
              onClick={() => { soundCtrl.playSelect(); onOpenSettings(); }}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Game Settings & Names</span>
            </button>

            {/* Exit to Hub */}
            <button
              onClick={() => { soundCtrl.playSelect(); onExitToHub(); }}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Exit to Mission Hub</span>
            </button>

            {/* End Game */}
            <button
              onClick={() => { soundCtrl.playSelect(); setShowEndGameConfirm(true); }}
              className="w-full py-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 font-bold text-xs transition"
            >
              End Game & View Report Card
            </button>
          </div>
        ) : (
          <div className="w-full space-y-4 animate-in fade-in">
            <div className="p-3 bg-rose-950/60 border border-rose-500/50 rounded-xl text-xs text-rose-200 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>Are you sure you want to conclude and view your final SHERO safety report card?</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowEndGameConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
              >
                Cancel
              </button>
              <button
                onClick={() => { soundCtrl.playSelect(); onEndGame(); }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow transition active:scale-95"
              >
                Yes, View Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
