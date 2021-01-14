import axios from "axios";

import { API_KEY } from "../config";
import { RankEntryPayloadT, RankEntryResponseT, SummonerPayloadT, SummonerResponseT } from "../types/types";

export const getSummoner = ( summonerPayload: SummonerPayloadT ): Promise<SummonerResponseT> => {
  const { summonerName } = summonerPayload;

  return new Promise((resolve, reject) => {
      axios
        .get(`/tft/summoner/v1/summoners/by-name/${summonerName}?api_key=${API_KEY}`)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
  });
}

export const getRankEntry = async ( GetRankEntryPayload: RankEntryPayloadT ): Promise<RankEntryResponseT> => {
  const { encryptedSummonerId } = GetRankEntryPayload;

  return new Promise((resolve, reject) => {
    axios
      .get(`/tft/league/v1/entries/by-summoner/${encryptedSummonerId}?api_key=${API_KEY}`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}