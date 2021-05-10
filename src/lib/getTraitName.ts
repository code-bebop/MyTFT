import traitsSet5Json from "../../public/json/traits/traits_set5.json";
import traitsSet4UpdateJson from "../../public/json/traits/traits_set4update.json";
import traitsSet4Json from "../../public/json/traits/traits_set4.json";
import getUniqueObjectArray from "./getUniqueObjectArray";

const getTraitName = (traitName: string): string => {
  const traitsJsonArray = [
    ...traitsSet5Json,
    ...traitsSet4UpdateJson,
    ...traitsSet4Json
  ];
  const uniqueTraitsJsonArray = getUniqueObjectArray(traitsJsonArray);

  const trait = uniqueTraitsJsonArray.filter(trait => {
    return trait.key === traitName;
  });

  return trait[0].name;
};

export default getTraitName;
