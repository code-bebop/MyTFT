import axios, { AxiosResponse } from "axios";

import {
  SummonerInfoResponseT,
  SummonerResponseT,
  MatchesResponseT,
  MatchesPayloadT,
  MatchT,
  Participant,
  SummonerPayloadT
} from "../types/types";

const TFT_API = axios.create({
  baseURL: `https://codebebop.xyz/api/tft`
});

export const getSummoner = async ({
  name,
  count
}: SummonerPayloadT): Promise<SummonerResponseT> => {
  const summonerResponse: AxiosResponse<SummonerResponseT> = await TFT_API.get(
    `/summoner?name=${name}&count=${count}`
  );

  return summonerResponse.data;
};

export const getSummoners = async (
  participants: Participant[]
): Promise<SummonerInfoResponseT[]> => {
  const summonersInfoResponse: SummonerInfoResponseT[] = await Promise.all(
    participants.map(async participant => {
      const puuid = participant.puuid;
      const summonerInfoResponse: AxiosResponse<SummonerInfoResponseT> =
        await TFT_API.get(`/summoners?puuid=${puuid}`);
      return summonerInfoResponse.data;
    })
  );

  return summonersInfoResponse;
};

export const getMatches = async (
  matchIds: MatchesPayloadT
): Promise<MatchesResponseT> => {
  const matchResponse = await Promise.all(
    matchIds.map(async matchId => {
      const response = await getMatch(matchId);
      return response;
    })
  );

  return matchResponse;
};

export const getMatch = async (matchId: string): Promise<MatchT> => {
  const response: AxiosResponse<MatchT> = await TFT_API.get(
    `/match?matchId=${matchId}`
  );
  return response.data;
};
