import { Unit } from "../types/types";
import championsSet4Json from "../../public/json/champions/champions_set4.json";
import championsSet4UpdateJson from "../../public/json/champions/champions_set4update.json";
import getUniqueObjectArray from "./getUniqueObjectArray";

const getChampion = (unit: Unit): typeof champion[0] => {
  const championJsonArray = [...championsSet4UpdateJson, ...championsSet4Json];
  const championUniqueJsonArray = getUniqueObjectArray(championJsonArray);

  const champion = championUniqueJsonArray.filter(champion => {
    return champion.championId === unit.character_id;
  });
  return champion[0];
};

export default getChampion;
