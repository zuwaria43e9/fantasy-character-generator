import React from 'react';
import { CharacterClass } from '../types/character';
import { CLASS_THEMES, CLASS_PORTRAITS } from '../data/fantasyData';
import { Dices, Shield, Wand2, Swords } from 'lucide-react';

interface ClassCodexProps {
  selectedClass: CharacterClass | 'All';
  onSelectClass: (c: CharacterClass | 'All') => void;
  onGenerateSpecificClass: (c: CharacterClass) => void;
}

export const ClassCodex: React.FC<ClassCodexProps> = ({
  selectedClass,
  onSelectClass,
  onGenerateSpecificClass,
}) => {
  const classes: CharacterClass[] = ['Warrior', 'Mage', 'Rogue', 'Paladin', 'Archmage'];

  return (
    <section id="classes" className="w-full mt-16 pt-12 border-t border-amber-950/40">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-500 font-cinzel font-bold">
            The Five Callings of Eldoria
          </span>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-stone-100 tracking-wide mt-1">
            Legendary Character Classes
          </h2>
          <p className="text-sm text-stone-400 mt-1 max-w-2xl">
            Each discipline possesses unique attributes, signature armaments, and mythic feats. Filter the generator or invoke a specific class directly.
          </p>
        </div>

        {/* Filter Tab bar */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-900 border border-amber-950/60 rounded-xl overflow-x-auto shrink-0">
          <button
            onClick={() => onSelectClass('All')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              selectedClass === 'All'
                ? 'bg-amber-400 text-stone-950 font-bold shadow-sm'
                : 'text-stone-300 hover:text-amber-200'
            }`}
          >
            All Callings
          </button>
          {classes.map((c) => (
            <button
              key={c}
              onClick={() => onSelectClass(c)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedClass === c
                  ? 'bg-amber-400 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-300 hover:text-amber-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* 5-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {classes.map((cls) => {
          const theme = CLASS_THEMES[cls];
          const portrait = CLASS_PORTRAITS[cls];
          const isCurrentFilter = selectedClass === cls;

          return (
            <div
              key={cls}
              className={`group relative rounded-xl workbench-panel p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 ${
                isCurrentFilter ? 'border-amber-400 ring-1 ring-amber-400/40' : 'border-amber-950/40'
              }`}
            >
              <div>
                {/* Thumbnail */}
                <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-amber-950/40 mb-3 bg-stone-950">
                  <img
                    src={portrait}
                    alt={`${cls} Class portrait`}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span
                    className={`absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold font-cinzel border ${theme.tagBg}`}
                  >
                    d{theme.hitDie} Hit Die
                  </span>
                </div>

                <h3 className="font-cinzel text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                  {cls}
                </h3>
                <p className="text-xs text-amber-400/90 font-medium mt-0.5">
                  {theme.role}
                </p>

                <p className="text-xs text-stone-400 line-clamp-3 mt-2 leading-relaxed">
                  {theme.description}
                </p>

                <div className="mt-3 pt-3 border-t border-stone-800 text-[11px] text-stone-400">
                  <span className="text-stone-500 block text-[10px] uppercase font-bold tracking-wider">
                    Primary Attributes
                  </span>
                  <span className="font-mono text-amber-200">
                    {theme.primaryStats[0].toUpperCase()} · {theme.primaryStats[1].toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onGenerateSpecificClass(cls)}
                className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-cinzel font-bold text-stone-900 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] rounded-lg transition-all"
              >
                <Dices className="w-3.5 h-3.5" />
                <span>Forge {cls}</span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
