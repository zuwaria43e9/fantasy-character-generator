import React, { useState } from 'react';
import { FantasyCharacter } from '../types/character';
import { CLASS_THEMES } from '../data/fantasyData';
import {
  X,
  Trash2,
  Download,
  Eye,
  Bookmark,
  Heart,
  Shield,
  Zap,
  Check,
} from 'lucide-react';

interface RosterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  roster: FantasyCharacter[];
  onSelectCharacter: (char: FantasyCharacter) => void;
  onRemoveCharacter: (id: string) => void;
  onClearRoster: () => void;
}

export const RosterDrawer: React.FC<RosterDrawerProps> = ({
  isOpen,
  onClose,
  roster,
  onSelectCharacter,
  onRemoveCharacter,
  onClearRoster,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleExport = () => {
    const dataStr = JSON.stringify(roster, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hall_of_heroes_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md h-full workbench-panel border-l border-amber-900/60 shadow-2xl flex flex-col justify-between overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Hall of Heroes Roster"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-amber-950/50 flex items-center justify-between bg-stone-950/80">
          <div>
            <span className="text-xs font-cinzel font-bold text-amber-500 uppercase tracking-widest">
              Adventurers Roster
            </span>
            <h2 className="font-fantasy-name text-2xl font-bold text-amber-100 flex items-center gap-2 mt-0.5">
              <span>Hall of Heroes</span>
              <span className="font-mono text-xs tabular-nums text-amber-400">
                ({roster.length})
              </span>
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Hall of Heroes"
            className="p-2 text-stone-400 hover:text-stone-100 transition-colors rounded-lg hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Character List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {roster.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-stone-400">
              <Bookmark className="w-12 h-12 text-stone-600 mb-3 stroke-[1.5]" />
              <h3 className="font-cinzel text-lg font-bold text-stone-200">
                No Heroes Enshrined Yet
              </h3>
              <p className="text-xs text-stone-400 mt-1 max-w-xs leading-relaxed">
                Click "Save to Roster" on any generated character to preserve their legends in your company.
              </p>
            </div>
          ) : (
            roster.map((hero) => {
              const theme = CLASS_THEMES[hero.characterClass];
              return (
                <div
                  key={hero.id}
                  className="group relative rounded-xl border border-stone-800 bg-stone-950/60 hover:bg-stone-950 hover:border-amber-700/60 p-4 transition-all duration-200"
                >
                  <div className="flex items-start gap-3.5">
                    {/* Thumbnail */}
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-amber-950/50 bg-stone-900">
                      <img
                        src={hero.portraitUrl}
                        alt={hero.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-fantasy-name text-base font-bold text-amber-100 truncate group-hover:text-amber-300 transition-colors">
                          {hero.name}
                        </h4>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${theme.tagBg}`}>
                          {hero.characterClass}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 truncate">
                        {hero.title}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-stone-400 mt-2">
                        <span>Lvl {hero.level}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums text-red-400">{hero.hitPoints} HP</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums text-amber-400">{hero.armorClass} AC</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-3 pt-3 border-t border-stone-850 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        onSelectCharacter(hero);
                        onClose();
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-200 bg-stone-900 hover:bg-stone-800 border border-amber-900/40 rounded-lg transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Legend</span>
                    </button>
                    <button
                      onClick={() => onRemoveCharacter(hero.id)}
                      title="Remove hero from roster"
                      className="p-1.5 text-stone-500 hover:text-red-400 transition-colors rounded-lg hover:bg-stone-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        {roster.length > 0 && (
          <div className="p-4 border-t border-amber-950/50 bg-stone-950/80 flex items-center justify-between gap-3">
            <button
              onClick={handleExport}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg bg-stone-900 hover:bg-stone-800 border border-amber-950/60 text-stone-300 hover:text-amber-200 transition-colors"
            >
              {downloadSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
              <span>{downloadSuccess ? 'Exported JSON' : 'Export Roster'}</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to dismiss all heroes from your roster?')) {
                  onClearRoster();
                }
              }}
              className="py-2 px-3 text-xs font-semibold text-stone-400 hover:text-red-400 transition-colors"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
