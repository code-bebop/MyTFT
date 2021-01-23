import axios, { AxiosResponse } from "axios";

import { API_KEY } from "../config";
import { RankEntryResponseT, SummonerPayloadT, SummonerInfoResponseT, SummonerResponseT } from "../types/types";

export const getSummoner = async (summonerPayload: SummonerPayloadT): Promise<SummonerResponseT> => {
  const { summonerName } = summonerPayload;

  const TFT_API = axios.create({
    baseURL: `/tft`,
    headers: {
      "X-Riot-Token": API_KEY
    }
  })

  const summonerInfoResponse: AxiosResponse<SummonerInfoResponseT> = await TFT_API.get(`/summoner/v1/summoners/by-name/${summonerName}`);
  const encryptedSummonerId = summonerInfoResponse.data.id;
  const rankEntryResponse: AxiosResponse<RankEntryResponseT[]> = await TFT_API.get(`/league/v1/entries/by-summoner/${encryptedSummonerId}`);

  const summonerResponse: SummonerResponseT = {
    summonerInfo: summonerInfoResponse.data,
    rankEntry: rankEntryResponse.data
  };

  return summonerResponse;
}