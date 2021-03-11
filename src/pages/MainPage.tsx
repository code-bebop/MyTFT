import React, { ReactElement } from "react";
import { ThemeProvider } from "styled-components";

import Search from "../components/Search";
import theme from "../theme";
import Wrapper from "../components/common/Wrapper";
import { useHistory } from "react-router";

const MainPage = (): ReactElement => {
  const history = useHistory();
  const onSearchMe = () => {
    history.push(`/match/불꽃남자임지웅`);
  };

  return (
    <ThemeProvider theme={theme}>
      <button
        onClick={() => {
          onSearchMe();
        }}
      >
        나 검색
      </button>
      <Search />
      <Wrapper>
        <p>데이터가 없는 상태</p>
      </Wrapper>
    </ThemeProvider>
  );
};

export default MainPage;
