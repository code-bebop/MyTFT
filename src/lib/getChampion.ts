import { Unit } from "../types/types";
import champions from "../../public/json/champions/champions_set4update.json";

const getChampion = (unit: Unit): typeof champion[0] => {
  const champion = champions.filter(champion => {
    return champion.championId === unit.character_id;
  });
  return champion[0];
};

export default getChampion;
