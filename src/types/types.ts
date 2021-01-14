export interface SummonerPayloadT {
  summonerName: string
}

export interface RankEntryPayloadT {
  encryptedSummonerId: string
}

export interface SummonerResponseT {
  accountId: string,
  id: string,
  name: string,
  profileIconId: number,
  puuid: string,
  revisionDate: number,
  summonerLevel: number
}

export interface RankEntryResponseT {
  freshBlood: boolean,
  hotStreak: boolean,
  inactive: boolean,
  leagueId: string,
  leaguePints: number,
  losses: number,
  queueType: string,
  rank: string,
  summonerId: string,
  summonerName: string,
  tier: string,
  veteran: false,
  wins: number
}