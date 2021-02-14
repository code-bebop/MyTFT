import { useLayoutEffect, useState } from "react";
import { MatchInfoT, Participant, Trait } from "../types/types";

const useActivatedTraits = (
  searchedSummoner: Participant,
  matchInfo: MatchInfoT
): Trait[] => {
  const [activatedTraits, setActivatedTraits] = useState(
    searchedSummoner.traits
  );

  useLayoutEffect(() => {
    const activatedTraits = searchedSummoner.traits
      .filter(trait => trait.style)
      .sort((a, b) => {
        return a.style < b.style ? 1 : a.style > b.style ? -1 : 0;
      })
      .slice(0, 4);

    setActivatedTraits(activatedTraits);
  }, [searchedSummoner, matchInfo]);

  return activatedTraits;
};

export default useActivatedTraits;
