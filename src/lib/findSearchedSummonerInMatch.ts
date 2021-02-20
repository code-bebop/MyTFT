import { MatchInfoT, Participant } from "../types/types";
import ensure from "./ensure";

const findSearchedSummonerInMatch = (
  matchInfo: MatchInfoT,
  puuid: string
): Participant => {
  const summoner = ensure<Participant>(
    matchInfo.info.participants.find(participant => {
      return participant.puuid === puuid;
    })
  );

  return summoner;
};

export default findSearchedSummonerInMatch;
