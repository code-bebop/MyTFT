interface NameWise {
  name: string;
  championId?: string;
}

const hasChampionId = <T extends NameWise>(array: T[]) => {
  return array[0].championId !== undefined;
};

const getUniqueObjectArray = <T extends NameWise>(array: T[]): T[] => {
  if (!hasChampionId(array)) {
    return array.filter((item, i) => {
      return (
        array.findIndex(item2 => {
          return item.name === item2.name;
        }) === i
      );
    });
  }

  return array.filter((item, i) => {
    return (
      array.findIndex(item2 => {
        return item.championId === item2.championId;
      }) === i
    );
  });
};

export default getUniqueObjectArray;
