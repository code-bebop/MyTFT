import { MatchT, Participant } from "../types/types";
import ensure from "./ensure";

const findSearchedSummonerInMatch = (
  match: MatchT,
  puuid: string
): Participant => {
  const summoner = ensure<Participant>(
    match.info.participants.find(participant => {
      return participant.puuid === puuid;
    })
  );

  return summoner;
};

export default findSearchedSummonerInMatch;
