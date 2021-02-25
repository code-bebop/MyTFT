interface DefaultThemeT {
  colors: {
    tier: {
      iron: string;
      bronze: string;
      silver: string;
      gold: string;
      platinum: string;
      diamond: string;
    };
    placement: {
      first: string;
      second: string;
      third: string;
      fourth: string;
      default: string;
    };
  };
}

const colors = {
  tier: {
    iron: "#325173",
    bronze: "#B97452",
    silver: "#9FBDC3",
    gold: "#F1A64E",
    platinum: "#63B7B4",
    diamond: "#6F88EE"
  },
  placement: {
    first: "#E7B767",
    second: "#9DA2B1",
    third: "#AD8866",
    fourth: "#778B9D",
    default: "#576480"
  }
};

const theme: DefaultThemeT = {
  colors
};

export default theme;
