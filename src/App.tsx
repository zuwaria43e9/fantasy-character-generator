import { useState, useEffect, useCallback } from 'react';
import { CharacterClass, FantasyCharacter } from './types/character';
import {
  generateRandomCharacter,
  CLASS_THEMES,
  CLASS_PORTRAITS,
  CARTOON_CLASS_PORTRAITS,
  buildPortraitPrompt,
  generateCharacterBackstory,
  FIRST_NAMES,
  SURNAMES,
  TITLES,
} from './data/fantasyData';
import { playDiceRollSound, playHeroicFanfare, isAudioMuted, setAudioMuted } from './utils/audio';
import { Navbar } from './components/Navbar';
import { CharacterCard } from './components/CharacterCard';
import { ClassCodex } from './components/ClassCodex';
import { RosterDrawer } from './components/RosterDrawer';
import { Dices, Sparkles, Shield, Bookmark, RefreshCw, Scroll, BookOpen, FlaskConical } from 'lucide-react';
import workbenchBg from './assets/images/alchemist_workbench_dark_1792474824459.jpg';

const LOCAL_STORAGE_KEY = 'realm_of_legends_roster';

export default function App() {
  const [character, setCharacter] = useState<FantasyCharacter>(() => generateRandomCharacter());
  const [selectedClassFilter, setSelectedClassFilter] = useState<CharacterClass | 'All'>('All');
  const [isRolling, setIsRolling] = useState(false);
  const [soundMuted, setSoundMutedState] = useState(false);
  const [roster, setRoster] = useState<FantasyCharacter[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isRosterOpen, setIsRosterOpen] = useState(false);
  const [history, setHistory] = useState<FantasyCharacter[]>([]);
  const [isGeneratingPortrait, setIsGeneratingPortrait] = useState(false);
  const [isGeneratingBackstory, setIsGeneratingBackstory] = useState(false);

  // Keep local storage in sync
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(roster));
    } catch {
      // Ignore quota errors
    }
  }, [roster]);

  const toggleSound = () => {
    const next = !soundMuted;
    setSoundMutedState(next);
    setAudioMuted(next);
  };

  const handleGenerate = useCallback((targetClass?: CharacterClass) => {
    setIsRolling(true);
    playDiceRollSound();

    setTimeout(() => {
      const preferred = targetClass || (selectedClassFilter === 'All' ? undefined : selectedClassFilter);
      const newChar = generateRandomCharacter(preferred);
      setCharacter(newChar);
      setHistory((prev) => [newChar, ...prev.slice(0, 9)]);
      setIsRolling(false);
      playHeroicFanfare();
    }, 280);
  }, [selectedClassFilter]);

  // Keyboard shortcut: Spacebar to generate character
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && (e.target as HTMLElement)?.tagName !== 'INPUT' && (e.target as HTMLElement)?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        handleGenerate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGenerate]);

  const handleSaveToRoster = (char: FantasyCharacter) => {
    setRoster((prev) => {
      const exists = prev.some((c) => c.id === char.id);
      if (exists) {
        return prev.filter((c) => c.id !== char.id);
      }
      return [char, ...prev];
    });
  };

  const isCurrentCharacterSaved = roster.some((c) => c.id === character.id);

  const handleRerollStats = () => {
    playDiceRollSound();
    setCharacter((prev) => {
      const rolled = generateRandomCharacter(prev.characterClass);
      return {
        ...prev,
        stats: rolled.stats,
        hitPoints: rolled.hitPoints,
        energyOrMana: rolled.energyOrMana,
        armorClass: rolled.armorClass,
        combatPower: rolled.combatPower,
      };
    });
  };

  const handleRerollName = () => {
    playDiceRollSound();
    const fName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const sName = SURNAMES[Math.floor(Math.random() * SURNAMES.length)];
    const title = TITLES[Math.floor(Math.random() * TITLES.length)];
    setCharacter((prev) => ({
      ...prev,
      name: `${fName} ${sName}`,
      title,
    }));
  };

  const handleGeneratePortrait = async (style: 'cartoon' | 'videogame' = 'cartoon') => {
    setIsGeneratingPortrait(true);
    playDiceRollSound();

    const prompt = buildPortraitPrompt(character, style);
    try {
      const res = await fetch('/api/generate-portrait', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, style }),
      });
      const data = await res.json();
      if (data.success && data.imageUrl) {
        setCharacter((prev) => {
          const updated = {
            ...prev,
            portraitUrl: data.imageUrl,
            portraitStyle: style,
            isCustomPortrait: true,
          };
          // Also update roster if hero was saved
          setRoster((r) => r.map((c) => (c.id === updated.id ? updated : c)));
          return updated;
        });
        playHeroicFanfare();
        setIsGeneratingPortrait(false);
        return;
      }
    } catch {
      // Fallback silently
    }

    // High fidelity cartoon/video game portrait fallback
    setTimeout(() => {
      const cartoonAsset = CARTOON_CLASS_PORTRAITS[character.characterClass];
      setCharacter((prev) => {
        const updated = {
          ...prev,
          portraitUrl: cartoonAsset,
          portraitStyle: style,
          isCustomPortrait: true,
        };
        setRoster((r) => r.map((c) => (c.id === updated.id ? updated : c)));
        return updated;
      });
      playHeroicFanfare();
      setIsGeneratingPortrait(false);
    }, 450);
  };

  const handleRegeneratePortrait = async (style: 'cartoon' | 'videogame' = 'cartoon') => {
    await handleGeneratePortrait(style);
  };

  const handleResetPortraitToClassic = () => {
    playDiceRollSound();
    setCharacter((prev) => {
      const classicAsset = CLASS_PORTRAITS[prev.characterClass];
      const updated = {
        ...prev,
        portraitUrl: classicAsset,
        portraitStyle: 'classic' as const,
        isCustomPortrait: false,
      };
      setRoster((r) => r.map((c) => (c.id === updated.id ? updated : c)));
      return updated;
    });
  };

  const handleGenerateBackstory = async () => {
    setIsGeneratingBackstory(true);
    playDiceRollSound();

    try {
      const res = await fetch('/api/generate-backstory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: character.name,
          characterClass: character.characterClass,
          race: character.race,
          title: character.title,
          originRealm: character.originRealm,
          signatureWeapon: character.signatureWeapon,
          relic: character.relic,
          signatureAbility: character.signatureAbility,
        }),
      });
      const data = await res.json();
      if (data.success && data.backstory) {
        setCharacter((prev) => {
          const updated = { ...prev, backstory: data.backstory };
          setRoster((r) => r.map((c) => (c.id === updated.id ? updated : c)));
          return updated;
        });
        playHeroicFanfare();
        setIsGeneratingBackstory(false);
        return;
      }
    } catch {
      // Fallback to procedural generator
    }

    setTimeout(() => {
      const newBackstory = generateCharacterBackstory(character);
      setCharacter((prev) => {
        const updated = { ...prev, backstory: newBackstory };
        setRoster((r) => r.map((c) => (c.id === updated.id ? updated : c)));
        return updated;
      });
      playHeroicFanfare();
      setIsGeneratingBackstory(false);
    }, 320);
  };

  return (
    <div className="relative min-h-screen bg-[#080605] text-[#e8e2d5] flex flex-col font-sans overflow-x-hidden">
      {/* Dark textured ancient alchemist's workbench background layer */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-screen filter brightness-95 contrast-125"
        style={{ backgroundImage: `url(${workbenchBg})` }}
      />
      {/* Atmospheric dark vignette and warm amber alchemical glow overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#0e0a07]/80 via-[#0a0705]/90 to-[#070504]/98" />

      {/* Navigation Top Bar */}
      <div className="relative z-40">
        <Navbar
          soundMuted={soundMuted}
          onToggleSound={toggleSound}
          rosterCount={roster.length}
          onOpenRoster={() => setIsRosterOpen(true)}
          onQuickGenerate={() => handleGenerate()}
        />
      </div>

      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section & Primary Generator Action */}
        <section id="generator" className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-800/40 bg-stone-950/80 backdrop-blur-xs text-xs font-cinzel text-amber-300 mb-4 shadow-inner">
            <FlaskConical className="w-3.5 h-3.5 text-amber-400" />
            <span>Alchemist's Crucible · Transmutatio Heroica</span>
          </div>

          <h1 className="font-fantasy-name text-3xl sm:text-5xl font-black tracking-wider text-amber-100 gold-foil-text" style={{ textWrap: 'balance' }}>
            Transmute Your Champion
          </h1>

          <p className="mt-3 text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl mx-auto" style={{ textWrap: 'balance' }}>
            At this ancient alchemist's workbench, arcane distillations and transmuted runes forge living champions. Each roll awakens a legend with unique titles, RPG attributes, and ancestral relics.
          </p>

          {/* Class Calling Filter & Selector */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-stone-900/90 border border-amber-950/60 rounded-xl max-w-xl mx-auto">
            <button
              onClick={() => setSelectedClassFilter('All')}
              className={`px-3 py-1.5 text-xs font-cinzel font-semibold rounded-lg transition-all ${
                selectedClassFilter === 'All'
                  ? 'bg-amber-400 text-stone-950 shadow-md font-bold'
                  : 'text-stone-300 hover:text-amber-200'
              }`}
            >
              Random Any Class
            </button>
            {(['Warrior', 'Mage', 'Rogue', 'Paladin', 'Archmage'] as CharacterClass[]).map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClassFilter(cls)}
                className={`px-3 py-1.5 text-xs font-cinzel font-semibold rounded-lg transition-all ${
                  selectedClassFilter === cls
                    ? 'bg-amber-400 text-stone-950 shadow-md font-bold'
                    : 'text-stone-300 hover:text-amber-200'
                }`}
              >
                {cls}
              </button>
            ))}
          </div>

          {/* Prominent 'Generate Character' Primary Button */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => handleGenerate()}
              disabled={isRolling}
              aria-label="Generate Character"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base sm:text-lg font-cinzel font-extrabold tracking-wider text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 border border-amber-200/50 shadow-xl shadow-amber-950/50 active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <Dices
                className={`w-6 h-6 text-stone-950 transition-transform duration-500 ${
                  isRolling ? 'rotate-180 scale-125' : 'group-hover:rotate-45'
                }`}
              />
              <span className="whitespace-nowrap uppercase">
                {isRolling ? 'Forging Champion...' : 'Generate Character'}
              </span>
              <span className="hidden sm:inline-block ml-1 px-1.5 py-0.5 text-[10px] font-mono font-normal tracking-normal text-stone-900/80 bg-amber-200/60 rounded">
                Space
              </span>
            </button>

            <button
              onClick={() => handleSaveToRoster(character)}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl text-sm font-semibold border transition-all ${
                isCurrentCharacterSaved
                  ? 'bg-amber-950/60 border-amber-600 text-amber-200'
                  : 'bg-stone-900 hover:bg-stone-850 border-amber-950/60 text-stone-200 hover:text-amber-300'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isCurrentCharacterSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{isCurrentCharacterSaved ? 'Saved in Roster' : 'Save Hero'}</span>
            </button>
          </div>
        </section>

        {/* Primary Character Sheet Display */}
        <div className="w-full">
          <CharacterCard
            character={character}
            onSaveToRoster={handleSaveToRoster}
            isSaved={isCurrentCharacterSaved}
            onRerollStats={handleRerollStats}
            onRerollName={handleRerollName}
            isRolling={isRolling}
            onGeneratePortrait={handleGeneratePortrait}
            onRegeneratePortrait={handleRegeneratePortrait}
            isGeneratingPortrait={isGeneratingPortrait}
            onResetPortraitToClassic={handleResetPortraitToClassic}
            onGenerateBackstory={handleGenerateBackstory}
            isGeneratingBackstory={isGeneratingBackstory}
          />
        </div>

        {/* Session Rolls History Bar (Quick recall) */}
        {history.length > 1 && (
          <div className="mt-8 p-4 rounded-xl border border-stone-800 bg-stone-950/60">
            <div className="flex items-center justify-between text-xs text-stone-400 mb-3">
              <span className="font-cinzel font-semibold uppercase tracking-wider text-amber-400/90">
                Recent Rolls (This Session)
              </span>
              <span className="font-mono text-[11px] tabular-nums">
                {history.length} Characters Generated
              </span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin">
              {history.map((h) => {
                const isSelected = h.id === character.id;
                const theme = CLASS_THEMES[h.characterClass];
                return (
                  <button
                    key={h.id}
                    onClick={() => setCharacter(h)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border text-left shrink-0 transition-all ${
                      isSelected
                        ? 'border-amber-400 bg-stone-900 ring-1 ring-amber-400/30'
                        : 'border-stone-800 bg-stone-900/60 hover:bg-stone-900 hover:border-stone-750'
                    }`}
                  >
                    <img
                      src={h.portraitUrl}
                      alt={h.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-md object-cover border border-amber-950/40"
                    />
                    <div className="min-w-0">
                      <div className="font-cinzel text-xs font-bold text-stone-200 truncate max-w-[130px]">
                        {h.name}
                      </div>
                      <div className="text-[10px] text-stone-400 flex items-center gap-1">
                        <span className={theme.textColor}>{h.characterClass}</span>
                        <span aria-hidden="true">·</span>
                        <span>Lvl {h.level}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Class Lore & Callings Showcase */}
        <ClassCodex
          selectedClass={selectedClassFilter}
          onSelectClass={setSelectedClassFilter}
          onGenerateSpecificClass={(cls) => {
            setSelectedClassFilter(cls);
            handleGenerate(cls);
          }}
        />

        {/* Medieval Fantasy Lore & RPG Mechanics Section */}
        <section id="compendium" className="w-full mt-16 pt-12 border-t border-amber-950/40">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-widest text-amber-500 font-cinzel font-bold">
              Rules of Eldoria
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-stone-100 tracking-wide mt-1">
              Character Creation & RPG Mechanics
            </h2>
            <p className="text-sm text-stone-400 mt-1">
              Every adventurer rolled follows classic tabletop RPG generation standards, ensuring both authentic flavor and balanced play.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-5">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Dices className="w-4 h-4" />
                <h3 className="font-cinzel text-base font-bold text-stone-100">
                  4d6 Drop Lowest Rolling
                </h3>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Attributes are generated by rolling four 6-sided dice and discarding the lowest value. Core primary attributes for your chosen class are given favored focus to guarantee heroic potency.
              </p>
            </div>

            <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-5">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Shield className="w-4 h-4" />
                <h3 className="font-cinzel text-base font-bold text-stone-100">
                  Armor & Hit Die Scaling
                </h3>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Warriors command d12 Hit Dice with heavy plate armor, while Archmages weave ethereal wards and cosmic spellcraft. Every class balances durability against tactical versatility.
              </p>
            </div>

            <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-5">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Scroll className="w-4 h-4" />
                <h3 className="font-cinzel text-base font-bold text-stone-100">
                  Unique Titles & Heraldry
                </h3>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Beyond numbers, heroes are anchored in living lore. From the Crystalline Spires to the Ashen Peaks, each character sheet compiles ancestral weapons, relics, and narrative chronicles.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Roster Drawer / Hall of Heroes Modal */}
      <RosterDrawer
        isOpen={isRosterOpen}
        onClose={() => setIsRosterOpen(false)}
        roster={roster}
        onSelectCharacter={(char) => setCharacter(char)}
        onRemoveCharacter={(id) => setRoster((prev) => prev.filter((c) => c.id !== id))}
        onClearRoster={() => setRoster([])}
      />

      {/* Footer */}
      <footer className="mt-20 border-t border-amber-950/40 bg-stone-950 py-8 text-center text-xs text-stone-400">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-cinzel tracking-wider text-stone-400">
            Realm of Legends · Medieval Fantasy Character Forge
          </p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800 font-mono text-[11px] text-amber-300">Space</kbd> to roll</span>
            <span aria-hidden="true">·</span>
            <span>Classes: Warrior, Mage, Rogue, Paladin, Archmage</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
