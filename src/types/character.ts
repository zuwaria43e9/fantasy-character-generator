export type CharacterClass = 'Warrior' | 'Mage' | 'Rogue' | 'Paladin' | 'Archmage';

export type Alignment =
  | 'Lawful Good'
  | 'Neutral Good'
  | 'Chaotic Good'
  | 'Lawful Neutral'
  | 'True Neutral'
  | 'Chaotic Neutral'
  | 'Lawful Evil'
  | 'Neutral Evil'
  | 'Chaotic Evil';

export interface AttributeStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface EquipmentItem {
  name: string;
  type: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
  attributeBonus: string;
}

export interface SignatureAbility {
  name: string;
  type: 'Passive' | 'Spell' | 'Strike' | 'Aura' | 'Ultimate';
  cost: string;
  description: string;
}

export interface FantasyCharacter {
  id: string;
  name: string;
  title: string;
  characterClass: CharacterClass;
  race: string;
  gender: 'Male' | 'Female' | 'Mystic';
  alignment: Alignment;
  level: number;
  stats: AttributeStats;
  hitPoints: number;
  energyOrMana: number;
  armorClass: number;
  combatPower: number;
  signatureWeapon: EquipmentItem;
  relic: EquipmentItem;
  signatureAbility: SignatureAbility;
  backstory: string;
  originRealm: string;
  traits: string[];
  portraitUrl: string;
  portraitStyle?: 'classic' | 'cartoon' | 'videogame' | 'custom';
  isCustomPortrait?: boolean;
  crestIcon: string;
  favorite?: boolean;
  createdAt: number;
}
