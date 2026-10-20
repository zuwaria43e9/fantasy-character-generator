import React, { useState } from 'react';
import {
  FantasyCharacter,
  CharacterClass,
} from '../types/character';
import { CLASS_THEMES } from '../data/fantasyData';
import {
  Shield,
  Heart,
  Zap,
  Sparkles,
  Swords,
  Scroll,
  Bookmark,
  Check,
  Copy,
  RefreshCw,
  Share2,
  Gamepad2,
  Palette,
  RotateCcw,
  Feather,
} from 'lucide-react';

interface CharacterCardProps {
  character: FantasyCharacter;
  onSaveToRoster: (char: FantasyCharacter) => void;
  isSaved: boolean;
  onRerollStats: () => void;
  onRerollName: () => void;
  isRolling: boolean;
  onGeneratePortrait: (style: 'cartoon' | 'videogame') => void;
  onRegeneratePortrait: (style: 'cartoon' | 'videogame') => void;
  isGeneratingPortrait: boolean;
  onResetPortraitToClassic: () => void;
  onGenerateBackstory: () => void;
  isGeneratingBackstory: boolean;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onSaveToRoster,
  isSaved,
  onRerollStats,
  onRerollName,
  isRolling,
  onGeneratePortrait,
  onRegeneratePortrait,
  isGeneratingPortrait,
  onResetPortraitToClassic,
  onGenerateBackstory,
  isGeneratingBackstory,
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<'cartoon' | 'videogame'>('cartoon');
  const theme = CLASS_THEMES[character.characterClass];

  const handleCopy = () => {
    const text = `
=== ${character.name.toUpperCase()} ===
${character.title}
Class: ${character.characterClass} · Level ${character.level}
Race: ${character.race} · Alignment: ${character.alignment}
Origin: ${character.originRealm}

--- ATTRIBUTES ---
STR: ${character.stats.strength} (${character.stats.strength >= 10 ? '+' : ''}${Math.floor((character.stats.strength - 10) / 2)})
DEX: ${character.stats.dexterity} (${character.stats.dexterity >= 10 ? '+' : ''}${Math.floor((character.stats.dexterity - 10) / 2)})
CON: ${character.stats.constitution} (${character.stats.constitution >= 10 ? '+' : ''}${Math.floor((character.stats.constitution - 10) / 2)})
INT: ${character.stats.intelligence} (${character.stats.intelligence >= 10 ? '+' : ''}${Math.floor((character.stats.intelligence - 10) / 2)})
WIS: ${character.stats.wisdom} (${character.stats.wisdom >= 10 ? '+' : ''}${Math.floor((character.stats.wisdom - 10) / 2)})
CHA: ${character.stats.charisma} (${character.stats.charisma >= 10 ? '+' : ''}${Math.floor((character.stats.charisma - 10) / 2)})

--- COMBAT METRICS ---
Hit Points: ${character.hitPoints} HP
${theme.resourceName}: ${character.energyOrMana}
Armor Class: ${character.armorClass} AC
Combat Power: ${character.combatPower}

--- EQUIPMENT & ABILITIES ---
Weapon: ${character.signatureWeapon.name} (${character.signatureWeapon.rarity} ${character.signatureWeapon.type})
Relic: ${character.relic.name} (${character.relic.rarity})
Signature Feat: ${character.signatureAbility.name} [${character.signatureAbility.cost}]
- ${character.signatureAbility.description}

--- BACKSTORY ---
${character.backstory}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const getModifier = (val: number) => {
    const mod = Math.floor((val - 10) / 2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'Mythic':
        return 'text-amber-300 bg-amber-950/60 border-amber-600/50';
      case 'Legendary':
        return 'text-orange-300 bg-orange-950/60 border-orange-600/50';
      case 'Epic':
        return 'text-purple-300 bg-purple-950/60 border-purple-600/50';
      default:
        return 'text-blue-300 bg-blue-950/60 border-blue-600/50';
    }
  };

  return (
    <article
      aria-label={`${character.name}, a ${character.race} ${character.characterClass}`}
      className={`relative w-full rounded-2xl workbench-panel overflow-hidden transition-all duration-300 ${
        isRolling ? 'opacity-70 scale-[0.99] filter blur-[0.5px]' : 'opacity-100 scale-100'
      } ${theme.badgeBorder} shadow-2xl shadow-black/90`}
    >
      {/* Alchemical brass corner brackets */}
      <div className="brass-corner top-2 left-2 border-t-2 border-l-2 border-amber-500/70" />
      <div className="brass-corner top-2 right-2 border-t-2 border-r-2 border-amber-500/70" />
      <div className="brass-corner bottom-2 left-2 border-b-2 border-l-2 border-amber-500/70" />
      <div className="brass-corner bottom-2 right-2 border-b-2 border-r-2 border-amber-500/70" />

      {/* Decorative medieval top filigree band */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-800 via-amber-400 to-amber-800 shadow-sm" />

      {/* Main Grid: Visual Column + Attribute & Lore Sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left Column: Character Portrait & Hero Emblem (5 cols) */}
        <div className="lg:col-span-5 relative flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-amber-950/40 bg-stone-950/80 p-6 sm:p-8">
          <div>
            {/* Top kicker: unboxed metadata */}
            <div className="flex items-center justify-between gap-2 text-xs text-stone-400 mb-3">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold uppercase tracking-wider text-amber-400/90">
                  Level {character.level}
                </span>
                <span aria-hidden="true" className="text-stone-600">·</span>
                <span>{character.race}</span>
              </div>
              <span className="font-mono text-xs tabular-nums text-stone-400">
                PWR {character.combatPower}
              </span>
            </div>

            {/* Portrait Container with Zero-Broken-Image Policy Fallback */}
            <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-amber-900/30 bg-stone-900 shadow-inner group">
              <img
                src={character.portraitUrl}
                alt={`Portrait of ${character.name}, a ${character.characterClass}`}
                referrerPolicy="no-referrer"
                className={`h-full w-full object-cover object-top transition-all duration-700 group-hover:scale-105 ${
                  isGeneratingPortrait ? 'opacity-40 scale-95 blur-sm' : 'opacity-100 scale-100'
                }`}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.parentElement?.querySelector('.image-fallback');
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />

              {/* Styled CSS/SVG Fallback Container */}
              <div className="image-fallback hidden absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950">
                <Shield className="w-16 h-16 text-amber-500/60 mb-2" />
                <span className="font-cinzel text-lg font-bold text-amber-200">{character.name}</span>
                <span className="text-xs text-stone-400 mt-1">{character.characterClass} of {character.originRealm}</span>
              </div>

              {/* Generating Loading Overlay */}
              {isGeneratingPortrait && (
                <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center z-20 animate-in fade-in">
                  <div className="relative mb-3">
                    <Palette className="w-10 h-10 text-amber-400 animate-bounce" />
                    <Sparkles className="w-5 h-5 text-amber-300 absolute -top-1 -right-2 animate-spin" />
                  </div>
                  <span className="font-cinzel text-sm font-bold text-amber-200">
                    Forging Portrait...
                  </span>
                  <span className="text-[11px] text-stone-400 mt-1">
                    Rendering {selectedStyle === 'cartoon' ? 'cartoon cell-shading' : 'video game concept art'}
                  </span>
                </div>
              )}

              {/* Style Badge top-left */}
              <div className="absolute top-3 left-3 z-10">
                <span className="px-2 py-0.5 rounded text-[10px] font-cinzel font-bold tracking-wider bg-black/70 backdrop-blur-xs text-amber-300 border border-amber-900/40">
                  {character.portraitStyle === 'cartoon'
                    ? '✦ Cartoon RPG Style'
                    : character.portraitStyle === 'videogame'
                    ? '✦ Video Game Style'
                    : 'Classic Oil Art'}
                </span>
              </div>

              {/* Class Emblem Overlay Badge at bottom of portrait */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-stone-950 via-stone-950/85 to-transparent p-4 flex items-end justify-between z-10">
                <div>
                  <span className="text-xs uppercase tracking-widest text-amber-300 font-cinzel font-semibold">
                    {character.alignment}
                  </span>
                  <p className="text-xs text-stone-300 font-medium truncate max-w-[200px]">
                    {character.originRealm}
                  </p>
                </div>
                <div
                  className={`px-3 py-1 rounded text-xs font-bold font-cinzel tracking-wider border ${theme.tagBg}`}
                >
                  {character.characterClass}
                </div>
              </div>
            </div>

            {/* Character Portrait Studio Control Bar */}
            <div className="mt-3.5 p-3 rounded-xl border border-amber-950/50 bg-stone-900/80">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-xs font-cinzel font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-amber-400" />
                  <span>Portrait Studio</span>
                </span>

                {/* Style Selector Tabs */}
                <div className="flex items-center gap-1 p-0.5 bg-stone-950 border border-amber-950/60 rounded-md">
                  <button
                    onClick={() => setSelectedStyle('cartoon')}
                    className={`px-2 py-0.5 text-[10px] font-medium rounded transition-colors ${
                      selectedStyle === 'cartoon'
                        ? 'bg-amber-400 text-stone-950 font-bold'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Cartoon
                  </button>
                  <button
                    onClick={() => setSelectedStyle('videogame')}
                    className={`px-2 py-0.5 text-[10px] font-medium rounded transition-colors ${
                      selectedStyle === 'videogame'
                        ? 'bg-amber-400 text-stone-950 font-bold'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Video Game
                  </button>
                </div>
              </div>

              {/* Action Buttons: Generate Portrait & Regenerate Portrait */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onGeneratePortrait(selectedStyle)}
                  disabled={isGeneratingPortrait}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-cinzel font-bold rounded-lg text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  <Gamepad2 className="w-3.5 h-3.5 text-stone-950" />
                  <span>Generate Portrait</span>
                </button>

                <button
                  onClick={() => onRegeneratePortrait(selectedStyle)}
                  disabled={isGeneratingPortrait}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-cinzel font-bold rounded-lg text-amber-200 bg-stone-850 hover:bg-stone-800 border border-amber-900/60 hover:border-amber-500/60 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingPortrait ? 'animate-spin' : ''}`} />
                  <span>Regenerate Portrait</span>
                </button>
              </div>

              {/* Revert to classic option if current portrait is customized */}
              {(character.portraitStyle === 'cartoon' || character.portraitStyle === 'videogame') && (
                <div className="mt-2 text-right">
                  <button
                    onClick={onResetPortraitToClassic}
                    className="inline-flex items-center gap-1 text-[11px] text-stone-400 hover:text-amber-300 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Revert to Classic Oil Painting</span>
                  </button>
                </div>
              )}
            </div>

            {/* Combat Vitals Strip */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="rounded-lg bg-stone-900/80 border border-amber-950/40 p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-xs text-red-400 mb-0.5">
                  <Heart className="w-3.5 h-3.5" />
                  <span className="font-medium">Hit Points</span>
                </div>
                <div className="font-mono text-lg font-bold tabular-nums text-stone-100">
                  {character.hitPoints}
                </div>
                <span className="text-[10px] text-stone-500">Max HP</span>
              </div>

              <div className="rounded-lg bg-stone-900/80 border border-amber-950/40 p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-xs text-blue-400 mb-0.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span className="font-medium">{theme.resourceName}</span>
                </div>
                <div className="font-mono text-lg font-bold tabular-nums text-stone-100">
                  {character.energyOrMana}
                </div>
                <span className="text-[10px] text-stone-500">Resource</span>
              </div>

              <div className="rounded-lg bg-stone-900/80 border border-amber-950/40 p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-xs text-amber-400 mb-0.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span className="font-medium">Armor</span>
                </div>
                <div className="font-mono text-lg font-bold tabular-nums text-stone-100">
                  {character.armorClass}
                </div>
                <span className="text-[10px] text-stone-500">AC Rating</span>
              </div>
            </div>

            {/* Distinctive Traits */}
            <div className="mt-4 pt-4 border-t border-amber-950/40">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 block mb-2">
                Innate Heroic Traits
              </span>
              <div className="flex flex-wrap gap-2">
                {character.traits.map((trait, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-md bg-stone-900 border border-amber-900/20 text-stone-300"
                  >
                    ✦ {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Character Actions */}
          <div className="mt-6 pt-4 border-t border-amber-950/40 flex items-center justify-between gap-3">
            <button
              onClick={() => onSaveToRoster(character)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                isSaved
                  ? 'bg-amber-950/60 border-amber-600 text-amber-200'
                  : 'bg-stone-900 hover:bg-stone-850 border-amber-950/60 text-stone-300 hover:text-amber-300'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{isSaved ? 'In Roster' : 'Save to Roster'}</span>
            </button>

            <button
              onClick={handleCopy}
              title="Copy character sheet to clipboard"
              className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium rounded-lg bg-stone-900 hover:bg-stone-850 border border-amber-950/60 text-stone-300 hover:text-amber-200 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Character Details, Stats Sheet & Abilities (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-b from-stone-900/90 to-stone-950/90">
          <div>
            {/* Header: Name and Epithet */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-amber-950/40">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-fantasy-name text-3xl sm:text-4xl font-black tracking-wide gold-foil-text drop-shadow-md">
                    {character.name}
                  </h2>
                  <button
                    onClick={onRerollName}
                    title="Reroll name only"
                    className="p-1.5 text-stone-400 hover:text-amber-300 transition-colors rounded hover:bg-stone-800"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="font-cinzel text-sm sm:text-base text-amber-400/90 font-medium tracking-wide mt-0.5">
                  {character.title}
                </p>
                <p className="text-xs text-stone-400 mt-1 max-w-xl">
                  {theme.description}
                </p>
              </div>

              {/* Class & Alignment Stamp */}
              <div className="shrink-0 text-left sm:text-right">
                <span className={`inline-block px-3 py-1.5 text-xs font-bold font-cinzel rounded-md border ${theme.tagBg}`}>
                  {character.characterClass}
                </span>
                <span className="block text-[11px] text-stone-400 mt-1">
                  {theme.role}
                </span>
              </div>
            </div>

            {/* Attributes Grid (6 Core RPG Stats) */}
            <div className="my-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-cinzel text-xs font-bold uppercase tracking-wider text-stone-300">
                  RPG Attributes & Modifiers
                </h3>
                <button
                  onClick={onRerollStats}
                  className="flex items-center gap-1 text-[11px] font-medium text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reroll Stats (4d6)</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(
                  [
                    { key: 'strength', label: 'Strength', val: character.stats.strength, desc: 'Physical power' },
                    { key: 'dexterity', label: 'Dexterity', val: character.stats.dexterity, desc: 'Agility & reflex' },
                    { key: 'constitution', label: 'Constitution', val: character.stats.constitution, desc: 'Vitality & endurance' },
                    { key: 'intelligence', label: 'Intelligence', val: character.stats.intelligence, desc: 'Arcane lore & reason' },
                    { key: 'wisdom', label: 'Wisdom', val: character.stats.wisdom, desc: 'Perception & insight' },
                    { key: 'charisma', label: 'Charisma', val: character.stats.charisma, desc: 'Presence & leadership' },
                  ] as const
                ).map((attr) => {
                  const isPrimary = theme.primaryStats.includes(attr.key);
                  return (
                    <div
                      key={attr.key}
                      className={`relative rounded-xl border p-3 bg-stone-900/60 transition-colors ${
                        isPrimary
                          ? 'border-amber-600/50 bg-amber-950/20'
                          : 'border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className={`font-medium ${isPrimary ? 'text-amber-300 font-semibold' : 'text-stone-300'}`}>
                          {attr.label.substring(0, 3).toUpperCase()}
                        </span>
                        <span className="font-mono font-bold text-xs tabular-nums text-amber-400">
                          {getModifier(attr.val)}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="font-mono text-xl font-bold tabular-nums text-stone-100">
                          {attr.val}
                        </span>
                        <span className="text-[10px] text-stone-400 truncate max-w-[80px]">
                          {attr.desc}
                        </span>
                      </div>
                      {/* Stat bar */}
                      <div className="w-full bg-stone-800 rounded-full h-1 mt-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            isPrimary ? 'bg-amber-400' : 'bg-stone-500'
                          }`}
                          style={{ width: `${Math.min(100, (attr.val / 20) * 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Signature Gear & Ability */}
            <div className="space-y-3.5 my-6">
              <h3 className="font-cinzel text-xs font-bold uppercase tracking-wider text-stone-300">
                Equipment & Signature Feat
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Signature Weapon */}
                <div className="rounded-xl border border-stone-800 bg-stone-900/70 p-3.5">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="flex items-center gap-1.5 text-stone-400 font-medium">
                      <Swords className="w-3.5 h-3.5 text-amber-400" />
                      Weapon
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getRarityBadge(character.signatureWeapon.rarity)}`}>
                      {character.signatureWeapon.rarity}
                    </span>
                  </div>
                  <h4 className="font-cinzel text-sm font-bold text-stone-100">
                    {character.signatureWeapon.name}
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {character.signatureWeapon.type} · <span className="text-amber-300">{character.signatureWeapon.attributeBonus}</span>
                  </p>
                </div>

                {/* Relic */}
                <div className="rounded-xl border border-stone-800 bg-stone-900/70 p-3.5">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="flex items-center gap-1.5 text-stone-400 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Ancestral Relic
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${getRarityBadge(character.relic.rarity)}`}>
                      {character.relic.rarity}
                    </span>
                  </div>
                  <h4 className="font-cinzel text-sm font-bold text-stone-100">
                    {character.relic.name}
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    {character.relic.type} · <span className="text-amber-300">{character.relic.attributeBonus}</span>
                  </p>
                </div>
              </div>

              {/* Signature Ability */}
              <div className="rounded-xl border border-amber-950/60 bg-stone-900/80 p-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span className="font-cinzel font-bold text-amber-200">
                      {character.signatureAbility.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-stone-400 font-mono text-[11px]">{character.signatureAbility.cost}</span>
                    <span className="px-2 py-0.5 rounded bg-stone-800 text-[10px] font-medium text-stone-300">
                      {character.signatureAbility.type}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {character.signatureAbility.description}
                </p>
              </div>
            </div>

            {/* Character Backstory & Origin Feature */}
            <div className="rounded-xl border border-amber-950/70 bg-stone-950/70 p-4 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-2.5 pb-2.5 border-b border-amber-950/40">
                <div className="flex items-center gap-1.5 text-xs font-cinzel font-bold uppercase tracking-wider text-amber-300">
                  <Scroll className="w-4 h-4 text-amber-400" />
                  <span>Origin Chronicle</span>
                </div>

                {/* Prominent 'Generate Backstory' Button */}
                <button
                  onClick={onGenerateBackstory}
                  disabled={isGeneratingBackstory}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-cinzel font-bold text-stone-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-[0.98] rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  <Feather className={`w-3.5 h-3.5 text-stone-950 ${isGeneratingBackstory ? 'animate-bounce' : ''}`} />
                  <span>{isGeneratingBackstory ? 'Weaving Origin Lore...' : 'Generate Backstory'}</span>
                </button>
              </div>

              {/* Backstory text display with loading transition */}
              <div className={`relative min-h-[50px] flex items-center transition-opacity duration-300 ${
                isGeneratingBackstory ? 'opacity-40 animate-pulse' : 'opacity-100'
              }`}>
                <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed italic font-serif pl-3 border-l-2 border-amber-600/50">
                  "{character.backstory}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
