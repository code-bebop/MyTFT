import axios, { AxiosResponse } from "axios";

import { API_KEY } from "../config";
import { RankEntryResponseT, SummonerPayloadT, SummonerInfoResponseT, SummonerResponseT } from "../types/types";

export const getSummoner = ( summonerPayload: SummonerPayloadT ): Promise<SummonerResponseT> => {
  const { summonerName } = summonerPayload;

  return new Promise((resolve, reject) => {
      axios
        .get(`/tft/summoner/v1/summoners/by-name/${summonerName}?api_key=${API_KEY}`)
        .then((summonerInfoResponse: AxiosResponse<Promise<SummonerInfoResponseT>>): Promise<SummonerInfoResponseT> => {
          return new Promise((resolve, reject) => {
            resolve(summonerInfoResponse.data);
          })
        })
        .then((summonerInfoResponseData: SummonerInfoResponseT) => {
          const encryptedSummonerId = summonerInfoResponseData.id;
          axios
            .get(`/tft/league/v1/entries/by-summoner/${encryptedSummonerId}?api_key=${API_KEY}`)
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