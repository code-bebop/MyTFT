import axios, { AxiosResponse } from "axios";

import {
  SummonerInfoResponseT,
  SummonerResponseT,
  MatchesResponseT,
  MatchesPayloadT,
  MatchT,
  Participant
} from "../types/types";

const TFT_API = axios.create({
  baseURL: `https://codebebop.tk/api/tft`
});

export const getSummoner = async (name: string): Promise<SummonerResponseT> => {
  const summonerResponse: AxiosResponse<SummonerResponseT> = await TFT_API.get(
    `/summoner?name=${name}`
  );

  // const encryptedSummonerId = summonerInfoResponse.data.id;
  // const puuid = summonerInfoResponse.data.puuid;

  // const rankEntryResponse: AxiosResponse<RankEntryResponseT> = await TFT_API.get(
  //   `/league/v1/entries/by-summoner/${encryptedSummonerId}`
  // );
  // const matchIdsResponse: AxiosResponse<MatchIdsResponseT> = await TFT_API.get(
  //   `/match/v1/matches/by-puuid/${puuid}/ids?count=20`
  // );

  // const summonerResponse: SummonerResponseT = {
  //   summonerInfo: summonerInfoResponse.data,
  //   rankEntry: rankEntryResponse.data,
  //   matchIds: matchIdsResponse.data
  // };

  return summonerResponse.data;
};

export const getSummoners = async (
  participants: Participant[]
): Promise<SummonerInfoResponseT[]> => {
  const summonersInfoResponse: SummonerInfoResponseT[] = await Promise.all(
    participants.map(async participant => {
      const puuid = participant.puuid;
      const summonerInfoResponse: AxiosResponse<SummonerInfoResponseT> = await TFT_API.get(
        `/summoners?puuid=${puuid}`
      );
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

// export const getMatch = async (
//   matchIdList: MatchPayloadT
// ): Promise<MatchResponseT[]> => {
//   let startIndex = 0;
//   let endIndex = 10;
//   const slicedMatchIdList = matchIdList.slice(startIndex, endIndex);
//   const matchResponse = await Promise.all(
//     slicedMatchIdList.map(
//       async (matchId): Promise<MatchResponseT> => {
//         const response: AxiosResponse<MatchResponseT> = await TFT_API.get(
//           `/match/v1/matches/${matchId}`
//         );
//         return response.data;
//       }
//     )
//   );
//   startIndex = endIndex;
//   endIndex += 20;

//   return matchResponse;
// };
