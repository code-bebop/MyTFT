interface NameWise {
  name: string;
  key?: string;
  type?: string;
  championId?: string;
}

const isChampionsArray = <T extends NameWise>(array: T[]) => {
  return array[0].championId !== undefined;
};
const isTraitsArray = <T extends NameWise>(array: T[]) => {
  return array[0].type !== undefined;
};

const getUniqueObjectArray = <T extends NameWise>(array: T[]): T[] => {
  if (isChampionsArray(array)) {
    return array.filter((item, i) => {
      return (
        array.findIndex(item2 => {
          return item.championId === item2.championId;
        }) === i
      );
    });
  }

  if (isTraitsArray(array)) {
    return array.filter((item, i) => {
      return (
        array.findIndex(item2 => {
          return item.key === item2.key;
        }) === i
      );
    });
  }

  return array.filter((item, i) => {
    return (
      array.findIndex(item2 => {
        return item.name === item2.name;
      }) === i
    );
  });
};

export default getUniqueObjectArray;
