interface NameWise {
  name: string;
}

const getUniqueObjectArray = <T extends NameWise>(array: T[]): T[] => {
  return array.filter((item, i) => {
    return (
      array.findIndex(item2 => {
        return item.name === item2.name;
      }) === i
    );
  });
};

export default getUniqueObjectArray;
