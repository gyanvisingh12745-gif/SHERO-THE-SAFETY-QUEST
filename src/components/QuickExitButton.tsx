import React, { useState } from 'react';
import { ShieldAlert, Search, RefreshCw, X } from 'lucide-react';
import { soundCtrl } from '../utils/sound';
import { speechCtrl } from '../utils/speech';

export const QuickExitButton: React.FC = () => {
  const [isMasked, setIsMasked] = useState<boolean>(false);

  const handleQuickExit = () => {
    // Immediately kill all audio & speech
    soundCtrl.stopBGM();
    speechCtrl.stop();
    setIsMasked(true);
  };

  if (isMasked) {
    return (
      <div className="fixed inset-0 z-50 bg-white text-slate-800 p-6 flex flex-col font-sans select-none overflow-y-auto">
        {/* Fake Search / Weather Portal */}
        <header className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-blue-600">DailyInfo</span>
            <span className="text-xs text-slate-500">| Weather & News</span>
          </div>
          <button
            onClick={() => setIsMasked(false)}
            className="text-xs text-slate-400 hover:text-slate-600 p-1 border rounded"
            title="Resume"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </header>

        <main className="max-w-2xl mx-auto py-12 text-left space-y-6">
          <div className="relative">
            <input
              type="text"
              readOnly
              value="Today's weather forecast and metropolitan news"
              className="w-full pl-10 pr-4 py-3 rounded-full border border-slate-300 bg-slate-50 text-slate-600 text-sm focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          </div>

          <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-blue-900">New Delhi / National Capital Region</div>
              <div className="text-2xl font-black text-slate-800 mt-1">26°C · Partly Cloudy</div>
              <div className="text-xs text-slate-500 mt-1">Humidity 58% · Wind 12 km/h</div>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-400/80 flex items-center justify-center text-white text-2xl shadow">
              ☀️
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Headlines</div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
              City transit authorities announce weekend maintenance schedule for Line 3.
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
              Annual botanical showcase opens at central gardens with free public admissions.
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <button
      onClick={handleQuickExit}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-600 hover:bg-rose-500 active:scale-95 text-white font-extrabold text-[11px] uppercase tracking-wider shadow-lg transition border border-rose-300"
      title="Quick Exit (Instantly hides game and silences audio)"
    >
      <ShieldAlert className="w-3.5 h-3.5" />
      <span>Quick Exit</span>
    </button>
  );
};
