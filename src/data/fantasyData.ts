import { CharacterClass, FantasyCharacter, Alignment, EquipmentItem, SignatureAbility } from '../types/character';

import warriorImg from '../assets/images/fantasy_warrior_portrait_1792473463311.jpg';
import mageImg from '../assets/images/fantasy_mage_portrait_1792473465113.jpg';
import rogueImg from '../assets/images/fantasy_rogue_portrait_1792473465753.jpg';
import paladinImg from '../assets/images/fantasy_paladin_portrait_1792473466289.jpg';
import archmageImg from '../assets/images/fantasy_archmage_portrait_1792473465407.jpg';

import cartoonWarriorImg from '../assets/images/cartoon_warrior_game_art_1792474342795.jpg';
import cartoonMageImg from '../assets/images/cartoon_mage_game_art_1792474343605.jpg';
import cartoonRogueImg from '../assets/images/cartoon_rogue_game_art_1792474344108.jpg';
import cartoonPaladinImg from '../assets/images/cartoon_paladin_game_art_1792474345500.jpg';
import cartoonArchmageImg from '../assets/images/cartoon_archmage_game_art_1792474343996.jpg';

export const CLASS_PORTRAITS: Record<CharacterClass, string> = {
  Warrior: warriorImg,
  Mage: mageImg,
  Rogue: rogueImg,
  Paladin: paladinImg,
  Archmage: archmageImg,
};

export const CARTOON_CLASS_PORTRAITS: Record<CharacterClass, string> = {
  Warrior: cartoonWarriorImg,
  Mage: cartoonMageImg,
  Rogue: cartoonRogueImg,
  Paladin: cartoonPaladinImg,
  Archmage: cartoonArchmageImg,
};

export const CLASS_THEMES: Record<
  CharacterClass,
  {
    role: string;
    hitDie: number;
    resourceName: 'Mana' | 'Stamina' | 'Energy' | 'Holy Power' | 'Astral Aether';
    accentColor: string;
    badgeBorder: string;
    tagBg: string;
    textColor: string;
    primaryStats: ['strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma', 'strength' | 'dexterity' | 'constitution' | 'intelligence' | 'wisdom' | 'charisma'];
    description: string;
  }
> = {
  Warrior: {
    role: 'Frontline Vanguard & Master of Arms',
    hitDie: 12,
    resourceName: 'Stamina',
    accentColor: '#b91c1c',
    badgeBorder: 'border-red-700/60',
    tagBg: 'bg-red-950/40 text-red-300 border-red-800/40',
    textColor: 'text-red-400',
    primaryStats: ['strength', 'constitution'],
    description: 'Battlefield juggernaut tempered by iron, shield-wall tactics, and unyielding fortitude.',
  },
  Mage: {
    role: 'Wielder of Arcane & Elemental Mysteries',
    hitDie: 6,
    resourceName: 'Mana',
    accentColor: '#2563eb',
    badgeBorder: 'border-blue-700/60',
    tagBg: 'bg-blue-950/40 text-blue-300 border-blue-800/40',
    textColor: 'text-blue-400',
    primaryStats: ['intelligence', 'wisdom'],
    description: 'Scholar of ancient tomes who channels raw leylines into searing frost, flame, and force.',
  },
  Rogue: {
    role: 'Shadow Infiltrator & Critical Striker',
    hitDie: 8,
    resourceName: 'Energy',
    accentColor: '#059669',
    badgeBorder: 'border-emerald-700/60',
    tagBg: 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40',
    textColor: 'text-emerald-400',
    primaryStats: ['dexterity', 'charisma'],
    description: 'Ghost in the catacombs wielding dual poisoned blades, unmatched agility, and lethal precision.',
  },
  Paladin: {
    role: 'Holy Champion & Divine Aegis',
    hitDie: 10,
    resourceName: 'Holy Power',
    accentColor: '#d97706',
    badgeBorder: 'border-amber-600/60',
    tagBg: 'bg-amber-950/40 text-amber-300 border-amber-800/40',
    textColor: 'text-amber-400',
    primaryStats: ['strength', 'charisma'],
    description: 'Sworn warrior of the Sacred Dawn who smites darkness while blessing allies with divine radiance.',
  },
  Archmage: {
    role: 'Supreme Conduit of Cosmic Reality',
    hitDie: 8,
    resourceName: 'Astral Aether',
    accentColor: '#9333ea',
    badgeBorder: 'border-purple-600/60',
    tagBg: 'bg-purple-950/40 text-purple-300 border-purple-800/40',
    textColor: 'text-purple-400',
    primaryStats: ['intelligence', 'wisdom'],
    description: 'Master of the celestial spires whose mind bridges mortal dimensions and bends time itself.',
  },
};

export const FIRST_NAMES = [
  'Aurelius', 'Valerius', 'Brynhild', 'Morwenna', 'Garrick', 'Zephyra',
  'Thorne', 'Elowen', 'Cassian', 'Aethelgard', 'Vespera', 'Ragnor',
  'Sylas', 'Rowena', 'Darian', 'Lyanna', 'Kaelen', 'Isolde',
  'Orik', 'Seraphina', 'Theron', 'Alastair', 'Baelor', 'Finnegan',
  'Maelis', 'Gideon', 'Gwyneira', 'Brandt', 'Faelar', 'Kallista',
  'Aldric', 'Corvus', 'Elidor', 'Ignis', 'Leona', 'Malakor', 'Nyssa', 'Torin'
];

export const SURNAMES = [
  'Dawnseeker', 'Ironclad', 'Shadowglen', 'Runeveil', 'Starwhisper',
  'Stormbreaker', 'Spellweaver', 'Nightwalker', 'Goldcrest', 'Frostpeak',
  'Oakhaven', 'Ashford', 'Silvermane', 'Bloodthorn', 'Eldermoor',
  'Crownguard', 'Sunstrider', 'Duskfall', 'Emberstone', 'Wyrmslayer',
  'Blackwood', 'Moonfall', 'Deepforge', 'Highspire', 'Ravengrove'
];

export const TITLES = [
  'the Stalwart',
  'of the Iron Vanguard',
  'the Arcane Seeker',
  'the Silent Blade',
  'Bane of Wyrms',
  'Keeper of the Sacred Flame',
  'the Dawnbringer',
  'of the Astral Spire',
  'the Ghost of Greywatch',
  'the Lion of Valdor',
  'the Spell-Forged',
  'Shield of Eldoria',
  'the Relentless',
  'of the Whispering Pines',
  'the Sun-Blessed',
  'Sovereign of Cinders'
];

export const RACES = [
  'High Elf',
  'Mountain Dwarf',
  'Human of the High Realms',
  'Wood Elf',
  'Dragonborn of Emberpeak',
  'Half-Elf Wanderer',
  'Deep Gnome Artificer',
  'Tiefling of the Nether-Gate'
];

export const ALIGNMENTS: Alignment[] = [
  'Lawful Good',
  'Neutral Good',
  'Chaotic Good',
  'Lawful Neutral',
  'True Neutral',
  'Chaotic Neutral',
  'Lawful Evil'
];

export const REALMS = [
  'Kingdom of Eldoria',
  'Iron Fortress of Khar-Drak',
  'Crystalline Spire of Lunaria',
  'Silverwood Expanse',
  'Sunhold Citadel',
  'Shadowfen Catacombs',
  'Vales of Frostmarch',
  'Ashen Peaks of Brimstone'
];

export const TRAITS_POOL = [
  'Stoic Oathbearer', 'Night Vision', 'Master Tactician', 'Dragon Bloodline',
  'Silent Footsteps', 'Photographic Memory', 'Unyielding Will', 'Battle Scarred',
  'Ancient Runecrafter', 'Blessed by Sol', 'Poison Immunity', 'Dual-Wielding Prodigy',
  'Sixth Sense', 'Silver Tongue', 'Astral Resonance', 'Fearless'
];

const CLASS_WEAPONS: Record<CharacterClass, EquipmentItem[]> = {
  Warrior: [
    { name: 'Reforged Sunsteel Greatsword', type: 'Two-Handed Blade', rarity: 'Legendary', attributeBonus: '+4 STR, +12 Slashing Dmg' },
    { name: 'Lionheart War Cleaver', type: 'Heavy Halberd', rarity: 'Epic', attributeBonus: '+3 STR, +8 Armor Pierce' },
    { name: 'Gilded Vanguard Broadsword', type: 'One-Handed Sword', rarity: 'Rare', attributeBonus: '+2 STR, +2 DEF' },
  ],
  Mage: [
    { name: 'Stave of the Cobalt Comet', type: 'Arcane Focus Staff', rarity: 'Legendary', attributeBonus: '+4 INT, +15% Spell Crit' },
    { name: 'Crystal Orb of Solitude', type: 'Orb of Channeling', rarity: 'Epic', attributeBonus: '+3 INT, +25 Mana Cap' },
    { name: 'Ashwood Wand of Embers', type: 'Focus Wand', rarity: 'Rare', attributeBonus: '+2 INT, +6 Fire Spell Power' },
  ],
  Rogue: [
    { name: 'Twin Whispering Stilettos', type: 'Dual Daggers', rarity: 'Legendary', attributeBonus: '+4 DEX, +20% Critical Strike' },
    { name: 'Nightshade Recurve Bow', type: 'Composite Shortbow', rarity: 'Epic', attributeBonus: '+3 DEX, +8 Bleed Dmg' },
    { name: 'Silver-Edged Dirks', type: 'Throwing Daggers', rarity: 'Rare', attributeBonus: '+2 DEX, +5 Agility' },
  ],
  Paladin: [
    { name: 'Sun-Forged Radiance War-Hammer', type: 'Blessed Warhammer', rarity: 'Legendary', attributeBonus: '+3 STR, +3 CHA, Radiant Smite' },
    { name: 'Aegis of the Dawn Sovereign', type: 'Holy Tower Shield', rarity: 'Epic', attributeBonus: '+4 AC, +10 Holy Resist' },
    { name: 'Silvercrest Broadblade', type: 'Righteous Longsword', rarity: 'Rare', attributeBonus: '+2 STR, +2 CHA' },
  ],
  Archmage: [
    { name: 'Singularity Spire of Chronos', type: 'Mythic Staff', rarity: 'Mythic', attributeBonus: '+5 INT, Time-Dilation Mastery' },
    { name: 'Orb of the Astral Nexus', type: 'Celestial Conduit', rarity: 'Legendary', attributeBonus: '+4 INT, +3 WIS, Free Blink' },
    { name: 'Codex of Infinite Leylines', type: 'Tome of Reality', rarity: 'Epic', attributeBonus: '+3 INT, Spell Chain Burst' },
  ],
};

const CLASS_RELICS: Record<CharacterClass, EquipmentItem[]> = {
  Warrior: [
    { name: 'Pendant of Iron Vigor', type: 'Ancestral Medallion', rarity: 'Epic', attributeBonus: '+15 Max HP, Immune to Stagger' },
    { name: 'Girdle of the Mountain Titan', type: 'Heavy War Belt', rarity: 'Rare', attributeBonus: '+2 CON' },
  ],
  Mage: [
    { name: 'Tear of the Arcane Seraph', type: 'Enchanted Brooch', rarity: 'Legendary', attributeBonus: 'Spell Mana Cost -15%' },
    { name: 'Ring of Prismatic Ward', type: 'Silver Ring', rarity: 'Rare', attributeBonus: '+12 Elemental Resistance' },
  ],
  Rogue: [
    { name: 'Cloak of Shifting Shadows', type: 'Enchanted Cowl', rarity: 'Legendary', attributeBonus: '+20% Stealth in Low Light' },
    { name: 'Band of the Cat Burglar', type: 'Engraved Ring', rarity: 'Rare', attributeBonus: '+3 Initiative' },
  ],
  Paladin: [
    { name: 'Censer of the Pure Dawn', type: 'Sacred Reliquary', rarity: 'Legendary', attributeBonus: 'Allies receive +2 AC within 15ft' },
    { name: 'Golden Chalice of Devotion', type: 'Holy Trinket', rarity: 'Epic', attributeBonus: 'Heals +20% more potent' },
  ],
  Archmage: [
    { name: 'Hourglass of the Void Weaver', type: 'Temporal Relic', rarity: 'Mythic', attributeBonus: 'Allows rewinding 1 turn per encounter' },
    { name: 'Stellar Diadem of Clairvoyance', type: 'Astral Crown', rarity: 'Legendary', attributeBonus: 'Detects hidden magic & illusions' },
  ],
};

const CLASS_ABILITIES: Record<CharacterClass, SignatureAbility[]> = {
  Warrior: [
    { name: 'Vanguard Tempest Strike', type: 'Strike', cost: '30 Stamina', description: 'Leaps into the fray, cleaving through physical armor and knocking foes prone with devastating force.' },
    { name: 'Iron Bastion Stance', type: 'Passive', cost: 'None', description: 'Reduces incoming physical damage by 25% and grants immunity to forced displacement.' },
  ],
  Mage: [
    { name: 'Glacial Supernova', type: 'Spell', cost: '45 Mana', description: 'Detonates a crystal of flash-frozen arcane energy, freezing enemies in place and dealing massive burst damage.' },
    { name: 'Arcane Mirror Image', type: 'Spell', cost: '25 Mana', description: 'Conjures three illusionary reflections to absorb lethal strikes while channeling rituals.' },
  ],
  Rogue: [
    { name: 'Umbral Shadowstep', type: 'Strike', cost: '35 Energy', description: 'Dissolves into dark mist and emerges behind the priority mark with guaranteed critical bleed damage.' },
    { name: 'Venomous Fan of Knives', type: 'Strike', cost: '20 Energy', description: 'Fires an arc of poisoned blades in a 180-degree sweep, blinding targets for 2 rounds.' },
  ],
  Paladin: [
    { name: 'Judgment of the Radiant Dawn', type: 'Ultimate', cost: '3 Holy Power', description: 'Summons a beam of concentrated celestial fury that cleanses all afflictions and incinerates corrupt foes.' },
    { name: 'Aura of Sanctified Aegis', type: 'Aura', cost: 'Passive', description: 'Surrounds nearby allies with divine radiance, mitigating dark and necrotic damage by 30%.' },
  ],
  Archmage: [
    { name: 'Singularity Event', type: 'Ultimate', cost: '60 Aether', description: 'Opens a micro-rift in space-time that pulls all adversaries into an inescapable vortex of collapsing cosmic energy.' },
    { name: 'Chrono Rift Blink', type: 'Spell', cost: '20 Aether', description: 'Phases outside the fabric of time to instantly reposition anywhere across the battlefield.' },
  ],
};

export const BACKSTORY_TEMPLATES = [
  (c: FantasyCharacter) =>
    `Born within the rugged borders of ${c.originRealm}, ${c.name} discovered their calling early in life. As a recognized ${c.characterClass}, they took a sacred oath to defend the realm against encroaching shadows, wielding ${c.signatureWeapon.name} with peerless discipline.`,
  (c: FantasyCharacter) =>
    `Known throughout tavern songs as "${c.title}", ${c.name} fled the ruins of an ancient sanctuary in ${c.originRealm}. Guided by ${c.relic.name}, this ${c.race} ${c.characterClass} now wanders the frontier seeking vengeance and ancient forgotten truths.`,
  (c: FantasyCharacter) =>
    `A solitary legend from ${c.originRealm}, ${c.name} survived the catastrophic Siege of the Cinder Gate. Harnessing their signature feat, ${c.signatureAbility.name}, they carved a bloody reputation that now inspires the next generation of guild adventurers.`,
  (c: FantasyCharacter) =>
    `Whispers tell that ${c.name} was chosen by the celestial court of ${c.originRealm}. Bound to the ${c.alignment} code, this ${c.characterClass} wields ${c.signatureWeapon.name} while balancing mortal honor and otherworldly conflict.`,
  (c: FantasyCharacter) =>
    `Once an exiled noble of ${c.originRealm}, ${c.name} forged a new destiny in the perilous frontier. Armed with ${c.signatureWeapon.name} and the enigmatic ${c.relic.name}, they fight relentlessly to restore their family's fallen crest.`,
  (c: FantasyCharacter) =>
    `Discovered as a youth amidst the glowing runestones of ${c.originRealm}, ${c.name} displayed an innate mastery over ${c.signatureAbility.name}. Today, guild scholars revere them as "${c.title}", a stalwart guardian against the gathering dark.`,
  (c: FantasyCharacter) =>
    `Trained by the secretive order of ${c.originRealm}, ${c.name} swore fealty only to the forgotten gods. With ${c.relic.name} tucked beneath their mantle, they execute impossible missions where steel and sorcery collide.`,
  (c: FantasyCharacter) =>
    `After an alchemical cataclysm shattered their homeland in ${c.originRealm}, ${c.name} took up ${c.signatureWeapon.name} to hunt the architects of ruin. Their relentless pursuit has earned them the moniker "${c.title}" across every tavern in the kingdoms.`
];

export function generateCharacterBackstory(char: FantasyCharacter): string {
  const template = getRandomItem(BACKSTORY_TEMPLATES);
  return template(char);
}

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function buildPortraitPrompt(
  character: FantasyCharacter,
  style: 'cartoon' | 'videogame' = 'cartoon'
): string {
  const styleDescription =
    style === 'videogame'
      ? 'Vibrant 3D video game character concept art, stylized cell-shading, dynamic hero pose, clean bold outlines, cinematic game lighting, artstation trending'
      : 'Vibrant modern cartoon fantasy hero portrait, rich colorful cell-shading, expressive facial features, bold clean ink outlines, Disney/Blizzard animation style';

  return `${styleDescription} of a ${character.race} ${character.characterClass} named ${character.name}, known as "${character.title}". Wielding ${character.signatureWeapon.name}, wearing class-appropriate ${character.characterClass} gear from ${character.originRealm}. Epic background with subtle atmospheric magic particles, 1:1 square avatar portrait.`;
}

// 4d6 drop lowest roll simulator for D&D / RPG feel (10-18 range typically)
function rollAttribute(): number {
  const rolls = [getRandomInt(1, 6), getRandomInt(1, 6), getRandomInt(1, 6), getRandomInt(1, 6)];
  rolls.sort((a, b) => a - b);
  return rolls[1] + rolls[2] + rolls[3];
}

export function generateRandomCharacter(preferredClass?: CharacterClass): FantasyCharacter {
  const charClass = preferredClass || getRandomItem<CharacterClass>(['Warrior', 'Mage', 'Rogue', 'Paladin', 'Archmage']);
  const firstName = getRandomItem(FIRST_NAMES);
  const surname = getRandomItem(SURNAMES);
  const title = getRandomItem(TITLES);
  const race = getRandomItem(RACES);
  const alignment = getRandomItem(ALIGNMENTS);
  const originRealm = getRandomItem(REALMS);
  const level = getRandomInt(4, 12);

  // Roll stats
  const stats = {
    strength: rollAttribute(),
    dexterity: rollAttribute(),
    constitution: rollAttribute(),
    intelligence: rollAttribute(),
    wisdom: rollAttribute(),
    charisma: rollAttribute(),
  };

  // Boost primary class attributes
  const theme = CLASS_THEMES[charClass];
  stats[theme.primaryStats[0]] = Math.max(stats[theme.primaryStats[0]], getRandomInt(15, 19));
  stats[theme.primaryStats[1]] = Math.max(stats[theme.primaryStats[1]], getRandomInt(13, 17));

  // Compute HP & Resource
  const conMod = Math.floor((stats.constitution - 10) / 2);
  const hitPoints = theme.hitDie * level + conMod * level + 15;
  const energyOrMana = 60 + level * 8 + (charClass === 'Mage' || charClass === 'Archmage' ? stats.intelligence * 2 : 0);

  // Compute Armor Class
  const dexMod = Math.floor((stats.dexterity - 10) / 2);
  let armorClass = 10;
  if (charClass === 'Warrior') armorClass = 17 + Math.min(2, dexMod);
  else if (charClass === 'Paladin') armorClass = 18 + Math.min(2, dexMod);
  else if (charClass === 'Rogue') armorClass = 14 + dexMod;
  else armorClass = 11 + Math.max(0, dexMod) + (charClass === 'Archmage' ? 3 : 1);

  // Combat rating estimation
  const totalStats = Object.values(stats).reduce((a, b) => a + b, 0);
  const combatPower = totalStats * 12 + level * 45;

  // Equipment & Ability
  const signatureWeapon = getRandomItem(CLASS_WEAPONS[charClass]);
  const relic = getRandomItem(CLASS_RELICS[charClass]);
  const signatureAbility = getRandomItem(CLASS_ABILITIES[charClass]);

  // Traits (2 distinct)
  const shuffledTraits = [...TRAITS_POOL].sort(() => 0.5 - Math.random());
  const traits = [shuffledTraits[0], shuffledTraits[1]];

  const tempChar: Partial<FantasyCharacter> = {
    name: `${firstName} ${surname}`,
    title,
    characterClass: charClass,
    race,
    alignment,
    originRealm,
    signatureWeapon,
    relic,
    signatureAbility,
  };

  const backstory = getRandomItem(BACKSTORY_TEMPLATES)(tempChar as FantasyCharacter);

  return {
    id: `char_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: `${firstName} ${surname}`,
    title,
    characterClass: charClass,
    race,
    gender: 'Mystic',
    alignment,
    level,
    stats,
    hitPoints,
    energyOrMana,
    armorClass,
    combatPower,
    signatureWeapon,
    relic,
    signatureAbility,
    backstory,
    originRealm,
    traits,
    portraitUrl: CLASS_PORTRAITS[charClass],
    crestIcon: charClass,
    createdAt: Date.now(),
  };
}
