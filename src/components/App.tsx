import React, { ReactElement } from "react";
import axios from "axios";
import { API_KEY } from "../config";

const App = (): ReactElement => {
  interface SummonerResponseT {
    accountId: string,
    id: string,
    name: string,
    profileIconId: number,
    puuid: string,
    revisionDate: number,
    summonerLevel: number
  }

  interface RankEntryResponseT {
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

  const summonerName = "불꽃남자임지웅";  

  const getSummoner = (): Promise<SummonerResponseT> => {
    return new Promise((resolve, reject) => {
        axios
          .get(`/tft/summoner/v1/summoners/by-name/${summonerName}?api_key=${API_KEY}`)
          .then((res) => resolve(res.data))
          .catch((err) => reject(err));
    });
  }
  
  const getRankEntry = async (): Promise<Array<RankEntryResponseT>> => {
    const encryptedSummonerId = await getSummoner()
      .then((res) => res.id)
      .catch((err) => err);    

    return new Promise((resolve, reject) => {
      axios
        .get(`/tft/league/v1/entries/by-summoner/${encryptedSummonerId}?api_key=${API_KEY}`)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  const printRankEntry = async (): Promise<void> => {
    const rankData = await getRankEntry();
  }

  console.log(getSummoner());  
  printRankEntry();

  return (
    <h1>YURU CAMP</h1>
  );
};

export default App;