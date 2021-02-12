import { useEffect, useState } from "react";
import ensure from "../lib/ensure";
import { Participant, MatchInfoT } from "../types/types";

const useSearchedSummoner = (
  matchInfo: MatchInfoT,
  puuid: string
): Participant => {
  const [searchedSummoner, setSearchedSummoner] = useState(
    matchInfo.info.participants[0]
  );

  useEffect(() => {
    const summoner = ensure<Participant>(
      matchInfo.info.participants.find(participant => {
        return participant.puuid === puuid;
      })
    );

    setSearchedSummoner(summoner);
  }, [searchedSummoner, setSearchedSummoner, matchInfo]);

  return searchedSummoner;
};

export default useSearchedSummoner;
