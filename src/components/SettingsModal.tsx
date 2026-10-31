import React, { useState } from 'react';
import { ArrowLeft, Settings as SettingsIcon, Volume2, Eye, Shield, Trash2, CheckCircle, Users, Sparkles } from 'lucide-react';
import { storage, AppSettings } from '../utils/storage';
import { soundCtrl } from '../utils/sound';
import { playerNames, CustomNamesState } from '../utils/playerNames';

interface SettingsProps {
  onBack: () => void;
}

export const SettingsModal: React.FC<SettingsProps> = ({ onBack }) => {
  const [settings, setSettings] = useState<AppSettings>(storage.getSettings());
  const [names, setNames] = useState<CustomNamesState>(playerNames.getNames());
  const [savedNotice, setSavedNotice] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'names'>('general');

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    storage.saveSettings(updated);
    if (key === 'music' || key === 'sfx') {
      if (!value) soundCtrl.stopBGM();
    }
    soundCtrl.playSelect();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  const handleNameChange = (key: keyof CustomNamesState, value: string) => {
    const updated = { ...names, [key]: value.slice(0, 16) };
    setNames(updated);
    playerNames.updateAllNames({ [key]: value.slice(0, 16) });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  const handleClearSafeCircle = () => {
    if (window.confirm('Delete all stored Trusted Contacts and Personal Safety Plan from this browser?')) {
      storage.clearSafeCircleData();
      soundCtrl.playSelect();
      alert('SafeCircle personal data deleted from local storage.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto select-none bg-slate-950/90 backdrop-blur-md">
      <div className="relative z-10 p-4 sm:p-8 max-w-2xl w-full mx-auto my-auto">
        {/* Top Header */}
        <header className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <button
            onClick={() => { soundCtrl.playSelect(); onBack(); }}
            onMouseEnter={() => soundCtrl.playHover()}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white transition border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-wider flex items-center gap-2 justify-center">
              <SettingsIcon className="w-5 h-5 text-purple-400" />
              <span>GAME SETTINGS</span>
            </h2>
            <p className="text-xs text-purple-300">Audio, Custom Names & Visual Preferences</p>
          </div>

          <div className="w-16" />
        </header>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setActiveTab('general')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              activeTab === 'general'
                ? 'bg-purple-600 text-white shadow'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>General & Audio</span>
          </button>
          <button
            onClick={() => setActiveTab('names')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              activeTab === 'names'
                ? 'bg-pink-600 text-white shadow'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Character Names</span>
          </button>
        </div>

        {/* TAB 1: General & Audio */}
        {activeTab === 'general' && (
          <main className="space-y-4 animate-in fade-in">
            {/* Audio Section */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                <span>Audio & Voice Settings</span>
              </h3>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">Atmospheric Ambient Music</div>
                  <div className="text-[11px] text-slate-400">Synthesizer anime mood soundscape</div>
                </div>
                <button
                  onClick={() => updateSetting('music', !settings.music)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${settings.music ? 'bg-emerald-500' : 'bg-slate-800'}`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${settings.music ? 'right-1' : 'left-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div>
                  <div className="text-xs font-semibold text-white">Sound Effects (SFX)</div>
                  <div className="text-[11px] text-slate-400">Chimes, buzzers, confetti party popper</div>
                </div>
                <button
                  onClick={() => updateSetting('sfx', !settings.sfx)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${settings.sfx ? 'bg-emerald-500' : 'bg-slate-800'}`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${settings.sfx ? 'right-1' : 'left-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div>
                  <div className="text-xs font-semibold text-white">Spoken Character Dialogue (TTS)</div>
                  <div className="text-[11px] text-slate-400">Web Speech API voice playback</div>
                </div>
                <button
                  onClick={() => updateSetting('voice', !settings.voice)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${settings.voice ? 'bg-emerald-500' : 'bg-slate-800'}`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${settings.voice ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
            </div>

            {/* Visuals & Quality */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>Accessibility & Rendering Quality</span>
              </h3>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">Adaptive Quality</div>
                  <div className="text-[11px] text-slate-400">Graphic detail and particle count</div>
                </div>
                <div className="flex gap-1.5">
                  {(['low', 'high'] as const).map(q => (
                    <button
                      key={q}
                      onClick={() => updateSetting('vfxIntensity', q)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize ${
                        settings.vfxIntensity === q ? 'bg-cyan-500 text-black font-bold' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {q === 'high' ? 'High' : 'Auto/Low'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div>
                  <div className="text-xs font-semibold text-white">Reduced Motion</div>
                  <div className="text-[11px] text-slate-400">Tones down screen shakes and pulses</div>
                </div>
                <button
                  onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${settings.reducedMotion ? 'bg-emerald-500' : 'bg-slate-800'}`}
                >
                  <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${settings.reducedMotion ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
            </div>

            {/* Privacy Section */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Purge Saved Game Data</div>
                <div className="text-[11px] text-slate-400">Resets local storage history and progress</div>
              </div>
              <button
                onClick={handleClearSafeCircle}
                className="px-3 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-300 font-bold text-xs flex items-center gap-1.5 border border-rose-800/50 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </main>
        )}

        {/* TAB 2: Custom Character Names */}
        {activeTab === 'names' && (
          <main className="space-y-4 animate-in fade-in">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-pink-400" />
                    <span>Dynamic Character Naming</span>
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Names apply immediately across all dialogue, speech bubbles, HUD, and voice tags.
                  </p>
                </div>
              </div>

              {/* Hero */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div>
                  <div className="text-xs font-bold text-purple-300">The Heroine ({'{hero}'})</div>
                  <div className="text-[11px] text-slate-400">Purple hoodie, courageous lead</div>
                </div>
                <input
                  type="text"
                  maxLength={16}
                  value={names.hero}
                  onChange={e => handleNameChange('hero', e.target.value)}
                  placeholder="Hero"
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-purple-500/50 text-xs font-bold text-white text-right w-36 focus:outline-none focus:border-pink-500"
                />
              </div>

              {/* Helped Woman */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div>
                  <div className="text-xs font-bold text-pink-300">The Helped Woman ({'{helpedWoman}'})</div>
                  <div className="text-[11px] text-slate-400">Part B adult woman helped</div>
                </div>
                <input
                  type="text"
                  maxLength={16}
                  value={names.helpedWoman}
                  onChange={e => handleNameChange('helpedWoman', e.target.value)}
                  placeholder="Didi"
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-pink-500/50 text-xs font-bold text-white text-right w-36 focus:outline-none focus:border-purple-400"
                />
              </div>

              {/* Bold Friend */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div>
                  <div className="text-xs font-bold text-teal-300">Bold Friend ({'{friendBold}'})</div>
                  <div className="text-[11px] text-slate-400">Teal jacket, energetic ally</div>
                </div>
                <input
                  type="text"
                  maxLength={16}
                  value={names.friendBold}
                  onChange={e => handleNameChange('friendBold', e.target.value)}
                  placeholder="Bold Friend"
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-bold text-white text-right w-36 focus:outline-none focus:border-teal-400"
                />
              </div>

              {/* Kind Friend */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div>
                  <div className="text-xs font-bold text-blue-300">Kind Friend ({'{friendKind}'})</div>
                  <div className="text-[11px] text-slate-400">Blue outfit, calm supportive senior</div>
                </div>
                <input
                  type="text"
                  maxLength={16}
                  value={names.friendKind}
                  onChange={e => handleNameChange('friendKind', e.target.value)}
                  placeholder="Kind Friend"
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-bold text-white text-right w-36 focus:outline-none focus:border-blue-400"
                />
              </div>

              {/* Lively Friend */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div>
                  <div className="text-xs font-bold text-yellow-300">Lively Friend ({'{friendLively}'})</div>
                  <div className="text-[11px] text-slate-400">Yellow hoodie, street-smart friend</div>
                </div>
                <input
                  type="text"
                  maxLength={16}
                  value={names.friendLively}
                  onChange={e => handleNameChange('friendLively', e.target.value)}
                  placeholder="Lively Friend"
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-bold text-white text-right w-36 focus:outline-none focus:border-yellow-400"
                />
              </div>

              {/* Sweet Friend */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <div>
                  <div className="text-xs font-bold text-pink-300">Sweet Friend ({'{friendSweet}'})</div>
                  <div className="text-[11px] text-slate-400">Pink outfit, loyal caring roommate</div>
                </div>
                <input
                  type="text"
                  maxLength={16}
                  value={names.friendSweet}
                  onChange={e => handleNameChange('friendSweet', e.target.value)}
                  placeholder="Sweet Friend"
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-bold text-white text-right w-36 focus:outline-none focus:border-pink-400"
                />
              </div>
            </div>
          </main>
        )}

        {savedNotice && (
          <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 font-semibold mt-4">
            <CheckCircle className="w-4 h-4" />
            <span>Saved to device storage.</span>
          </div>
        )}
      </div>
    </div>
  );
};
