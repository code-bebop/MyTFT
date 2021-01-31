import axios, { AxiosResponse } from "axios";

import { API_KEY } from "../config";
import {
  RankEntryResponseT,
  SummonerPayloadT,
  SummonerInfoResponseT,
  SummonerResponseT,
  MatchsResponseT,
  MatchResponseT,
  MatchPayloadT
} from "../types/types";

const TFT_API = axios.create({
  baseURL: `/tft`,
  headers: {
    "X-Riot-Token": API_KEY
  }
});

export const getSummoner = async (
  summonerPayload: SummonerPayloadT
): Promise<SummonerResponseT> => {
  const { summonerName } = summonerPayload;

  const summonerInfoResponse: AxiosResponse<SummonerInfoResponseT> = await TFT_API.get(
    `/summoner/v1/summoners/by-name/${summonerName}`
  );

  const encryptedSummonerId = summonerInfoResponse.data.id;
  const puuid = summonerInfoResponse.data.puuid;

  const rankEntryResponse: AxiosResponse<RankEntryResponseT> = await TFT_API.get(
    `/league/v1/entries/by-summoner/${encryptedSummonerId}`
  );
  const matchsResponse: AxiosResponse<MatchsResponseT> = await TFT_API.get(
    `/match/v1/matches/by-puuid/${puuid}/ids?count=20`
  );

  const summonerResponse: SummonerResponseT = {
    summonerInfo: summonerInfoResponse.data,
    rankEntry: rankEntryResponse.data,
    matchIds: matchsResponse.data
  };

  return summonerResponse;
};

export const getMatch = async (
  matchIdList: MatchPayloadT
): Promise<MatchResponseT[]> => {
  const matchResponse = await Promise.all(
    matchIdList.map(
      async (matchId): Promise<MatchResponseT> => {
        const response: AxiosResponse<MatchResponseT> = await TFT_API.get(
          `/match/v1/matches/${matchId}`
        );
        return response.data;
      }
    )
  );

  return matchResponse;
};
