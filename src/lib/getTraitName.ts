import traits from "../../public/traits.json";

const getTraitName = (traitName: string): string => {
  const trait = traits.filter(trait => {
    return trait.key === traitName;
  });
  return trait[0].name;
};

export default getTraitName;
