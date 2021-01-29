const ensure = <T>(argument: T | null | undefined): T => {
  if (argument === undefined || argument === null) {
    throw new TypeError("타입이 null 혹은 undefined 입니다.");
  }
  return argument;
};

export default ensure;
