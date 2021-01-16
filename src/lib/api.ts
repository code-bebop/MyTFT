import axios, { AxiosResponse } from "axios";

import { API_KEY } from "../config";
import { RankEntryResponseT, SummonerPayloadT, SummonerInfoResponseT, SummonerResponseT } from "../types/types";

export const getSummoner = ( summonerPayload: SummonerPayloadT ): Promise<SummonerResponseT> => {
  const { summonerName } = summonerPayload;

  const TFT_API = axios.create({
    baseURL: `/tft`,
    headers: {
      "X-Riot-Token": API_KEY
    }
  })

  return new Promise((resolve, reject) => {
      TFT_API
        .get(`/summoner/v1/summoners/by-name/${summonerName}`)
        .then((summonerInfoResponse: AxiosResponse<Promise<SummonerInfoResponseT>>): Promise<SummonerInfoResponseT> => {
          return new Promise((resolve) => {
            resolve(summonerInfoResponse.data);
          })
        })
        .then((summonerInfoResponseData: SummonerInfoResponseT) => {
          const encryptedSummonerId = summonerInfoResponseData.id;
          
          TFT_API
            .get(`/league/v1/entries/by-summoner/${encryptedSummonerId}`)
            .then((rankEntryResponse: AxiosResponse<RankEntryResponseT>) => {
              resolve({
                summonerInfo: summonerInfoResponseData,
                rankEntry: rankEntryResponse.data
              })
            })
        })
        .catch((err) => reject(err));
  });
}