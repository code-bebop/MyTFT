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
        <p>데이터가 없는 상태</p>
      </Wrapper>
    </ThemeProvider>
  );
};

export default MainPage;
