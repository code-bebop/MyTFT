import React, { ReactElement, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";

import Search from "../components/Search";
import MatchList from "../components/MatchList/MatchList";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import { matchesAsync } from "../modules/matches";
import SummonerInfo from "../components/SummonerInfo";
import theme from "../theme";

const Wrapper = styled.div`
  width: 100%;
  padding-top: 150px;
  display: flex;
  justify-content: center;
`;

const isLoading = (...loading: boolean[]): boolean => loading.includes(true);
const isNonexistent = (...args: any[]): boolean => {
  return args.includes(null) || args.includes(undefined);
};

const MainPage = (): ReactElement => {
  const {
    summonerInfo,
    matches,
    matchIds,
    summonerLoading,
    matchLoading
  } = useSelector(
    (state: RootState) => ({
      summonerInfo: state.summoner.summonerInfo,
      matches: state.matches.matches,
      matchIds: state.summoner.matchIds,
      summonerLoading: state.summoner.loading,
      matchLoading: state.matches.loading
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (summonerInfo) {
      dispatch(matchesAsync.request(matchIds));
    }
  }, [summonerInfo]);

  if (isLoading(summonerLoading, matchLoading)) {
    return (
      <Wrapper>
        <p>로딩 중...</p>
      </Wrapper>
    );
  }

  if (isNonexistent(summonerInfo, matches)) {
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
    <ThemeProvider theme={theme}>
      <Search />
      <Wrapper>
        <SummonerInfo />
        <MatchList />
      </Wrapper>
    </ThemeProvider>
  );
};

export default MainPage;
