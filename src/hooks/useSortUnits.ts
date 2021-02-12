import { Participant } from "../types/types";

const useSortUnits = (summoner: Participant): void => {
  if (summoner.units.length < 9) {
    for (let i = summoner.units.length; i < 9; i++) {
      summoner.units.push({
        character_id: "",
        items: [],
        name: "",
        rarity: 0,
        tier: 0
      });
    }
  }

  summoner.units.sort((a, b) => {
    return a.rarity < b.rarity ? 1 : a.rarity > b.rarity ? -1 : 0;
  });
};

export default useSortUnits;
