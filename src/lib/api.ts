import axios from "axios";

import { API_KEY } from "../config";
import { RankEntryResponseT, SummonerPayloadT, SummonerResponseT } from "../types/types";

export const getSummoner = ( summonerPayload: SummonerPayloadT ): Promise<SummonerResponseT> => {
  return new Promise((resolve, reject) => {
      axios
        .get(`/tft/summoner/v1/summoners/by-name/${summonerPayload.summonerName}?api_key=${API_KEY}`)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
  });
}

export const getRankEntry = async ( summonerName: SummonerPayloadT ): Promise<Array<RankEntryResponseT>> => {
  const encryptedSummonerId = await getSummoner(summonerName)
    .then((res) => res.id)
    .catch((err) => err);

  return new Promise((resolve, reject) => {
    axios
      .get(`/tft/league/v1/entries/by-summoner/${encryptedSummonerId}?api_key=${API_KEY}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}