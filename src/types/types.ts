export interface SummonerPayloadT {
  summonerName: string;
}

export interface RankEntryPayloadT {
  encryptedSummonerId: string;
}

export interface SummonerInfoResponseT {
  accountId: string;
  id: string;
  name: string;
  profileIconId: number;
  puuid: string;
  revisionDate: number;
  summonerLevel: number;
}

export type RankEntryResponseT = RankEntryT[];

export interface RankEntryT {
  freshBlood: boolean;
  hotStreak: boolean;
  inactive: boolean;
  leagueId: string;
  leaguePoints: number;
  losses: number;
  queueType: string;
  rank: string;
  summonerId: string;
  summonerName: string;
  tier: string;
  veteran: false;
  wins: number;
}

export interface SummonerResponseT {
  summonerInfo: SummonerInfoResponseT;
  rankEntry: RankEntryResponseT;
  matchIds: MatchIdsResponseT;
}

export type MatchIdsResponseT = string[];

export type MatchesPayloadT = string[];

export type MatchesResponseT = MatchT[];

export interface MatchT {
  metadata: Metadata;
  info: Info;
}
export interface Info {
  game_datetime: number;
  game_length: number;
  game_version: string;
  participants: Participant[];
  queue_id: number;
  tft_set_number: number;
}
export interface Participant {
  companion: Companion;
  gold_left: number;
  last_round: number;
  level: number;
  placement: number;
  players_eliminated: number;
  puuid: string;
  time_eliminated: number;
  total_damage_to_players: number;
  traits: Trait[];
  units: Unit[];
}
export interface Companion {
  content_ID: string;
  skin_ID: number;
  species: string;
}
export interface Trait {
  name: string;
  num_units: number;
  style: number;
  tier_current: number;
  tier_total: number;
}
export interface Unit {
  character_id: string;
  items: number[];
  name: string;
  rarity: number;
  tier: number;
  chosen?: string;
}
export interface Metadata {
  data_version: string;
  match_id: string;
  participants: string[];
}
