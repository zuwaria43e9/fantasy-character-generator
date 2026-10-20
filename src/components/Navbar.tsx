import React from 'react';
import { Volume2, VolumeX, Bookmark, Dices } from 'lucide-react';

interface NavbarProps {
  soundMuted: boolean;
  onToggleSound: () => void;
  rosterCount: number;
  onOpenRoster: () => void;
  onQuickGenerate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  soundMuted,
  onToggleSound,
  rosterCount,
  onOpenRoster,
  onQuickGenerate,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-amber-900/40 bg-[#0e0b08]/92 backdrop-blur-md shadow-lg shadow-black/40">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Brand wordmark (single text element) */}
        <a
          href="#generator"
          className="font-fantasy-name text-xl font-black tracking-wider text-amber-200 transition-colors hover:text-amber-100 whitespace-nowrap shrink-0 drop-shadow-sm"
        >
          Realm of Legends
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-300">
          <a
            href="#generator"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            Character Forge
          </a>
          <a
            href="#classes"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            Classes & Lore
          </a>
          <a
            href="#roster"
            onClick={(e) => {
              e.preventDefault();
              onOpenRoster();
            }}
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span>Hall of Heroes</span>
            {rosterCount > 0 && (
              <span className="font-mono text-xs tabular-nums text-amber-400 font-semibold">
                ({rosterCount})
              </span>
            )}
          </a>
          <a
            href="#compendium"
            className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
          >
            Rules of Combat
          </a>
        </nav>

        {/* Zone 3: 1 primary action group */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleSound}
            aria-label={soundMuted ? 'Unmute medieval sound effects' : 'Mute medieval sound effects'}
            title={soundMuted ? 'Audio muted' : 'Audio enabled'}
            className="p-2 text-stone-400 hover:text-amber-300 transition-colors border border-amber-950/50 rounded-lg bg-stone-900/60"
          >
            {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          <button
            onClick={onOpenRoster}
            className="hidden sm:flex items-center gap-2 px-3 py-2 text-xs font-medium text-stone-300 bg-stone-900/80 hover:bg-stone-800 border border-amber-950/60 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span>Roster ({rosterCount})</span>
          </button>

          <button
            onClick={onQuickGenerate}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-wide text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-sm shadow-amber-950/40 transition-all active:scale-[0.98] whitespace-nowrap shrink-0 font-cinzel"
          >
            <Dices className="w-3.5 h-3.5 text-stone-950" />
            <span>Roll Legend</span>
          </button>
        </div>
      </div>
    </header>
  );
};
