import React, { ReactElement } from "react";
import styled from "styled-components";
import { hot } from "react-hot-loader";

import SearchContainer from "../containers/SearchContainer";
import SummonerInfoContainer from "../containers/SummonerInfoContainer";
import MatchListContainer from "../containers/MatchListContainer";

const Wrapper = styled.div`
  width: 100%;
  padding-top: 50px;
  display: flex;
  justify-content: center;
`;

const App = (): ReactElement => {
  return (
    <>
      <SearchContainer />
      <Wrapper>
        <SummonerInfoContainer />
        <MatchListContainer />
      </Wrapper>
    </>
  );
};

export default hot(module)(App);
