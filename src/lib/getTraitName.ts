import traitsSet4Update from "../../public/json/traits/traits_set4update.json";
import traitsSet4 from "../../public/json/traits/traits_set4.json";
import getUniqueObjectArray from "./getUniqueObjectArray";

const getTraitName = (traitName: string): string => {
  const traitsArray = [...traitsSet4Update, ...traitsSet4];

  const uniqueTraitsArray = getUniqueObjectArray(traitsArray);
  console.log(uniqueTraitsArray);

  const trait = traitsArray.filter(trait => {
    return trait.key === traitName;
  });

  return trait[0].name;
};

export default getTraitName;
