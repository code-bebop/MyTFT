import React, { ReactElement } from "react";
import { ThemeProvider } from "styled-components";

import Search from "../components/Search";
import theme from "../theme";
import Wrapper from "../components/common/Wrapper";

const MainPage = (): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <Search />
      <Wrapper>
        <p>TFT 전적 검색 사이트입니다.</p>
      </Wrapper>
    </ThemeProvider>
  );
};

export default MainPage;
