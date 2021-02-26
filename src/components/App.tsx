import React, { ReactElement, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { hot } from "react-hot-loader";

import Search from "../components/Search";
import MatchList from "./MatchList/MatchList";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import { matchAsync } from "../modules/match";
import SummonerInfo from "./SummonerInfo";
import theme from "../theme";

const Wrapper = styled.div`
  width: 100%;
  padding-top: 50px;
  display: flex;
  justify-content: center;
`;

const isLoading = (...loading: boolean[]): boolean => loading.includes(true);
const isNonexistent = (...args: any[]): boolean => {
  return args.includes(null) || args.includes(undefined);
};

const App = (): ReactElement => {
  console.log("App 렌더링");

  const {
    summonerInfo,
    matchInfoList,
    matchIds,
    summonerLoading,
    matchLoading
  } = useSelector(
    (state: RootState) => ({
      summonerInfo: state.summoner.summonerInfo,
      matchInfoList: state.match.matchInfoList,
      matchIds: state.summoner.matchIds,
      summonerLoading: state.summoner.loading,
      matchLoading: state.match.loading
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (summonerInfo) {
      dispatch(matchAsync.request(matchIds));
    }
  }, [summonerInfo]);

  if (isLoading(summonerLoading, matchLoading)) {
    return (
      <Wrapper>
        <p>로딩 중...</p>
      </Wrapper>
    );
  }

  if (isNonexistent(summonerInfo, matchInfoList)) {
    return (
      <>
        <Search />
        <Wrapper>
          <p>데이터가 없는 상태</p>
        </Wrapper>
      </>
    );
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Search />
        <Wrapper>
          <SummonerInfo />
          <MatchList />
        </Wrapper>
      </ThemeProvider>
    </>
  );
};

export default hot(module)(App);
