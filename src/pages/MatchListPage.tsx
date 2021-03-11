import React, { ReactElement, useEffect } from "react";
import { ThemeProvider } from "styled-components";

import Search from "../components/Search";
import MatchList from "../components/MatchList/MatchList";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import {
  initialize as matchesInitialize,
  matchesAsync
} from "../modules/matches";
import SummonerProfile from "../components/SummonerProfile/SummonerProfile";
import theme from "../theme";
import Wrapper from "../components/common/Wrapper";
import {
  initialize as summonerInitialize,
  summonerAsync
} from "../modules/summoner";
import { useParams } from "react-router-dom";

const isLoading = (...loading: boolean[]): boolean => loading.includes(true);
const isNonexistent = (...args: any[]): boolean => {
  return args.includes(null) || args.includes(undefined);
};

const MatchListPage = (): ReactElement => {
  const { summonerName } = useParams<{ summonerName: string }>();
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
    dispatch(matchesInitialize());
    dispatch(summonerInitialize());
    dispatch(summonerAsync.request(summonerName));
  }, [dispatch, summonerName]);
  useEffect(() => {
    if (summonerInfo?.name === summonerName) {
      dispatch(matchesAsync.request(matchIds));
    }
  }, [summonerInfo]);

  const onSearchMe = () => {
    dispatch(summonerAsync.request("불꽃남자임지웅"));
  };

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
      </>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Search />
      <Wrapper>
        <SummonerProfile />
        <MatchList />
      </Wrapper>
    </ThemeProvider>
  );
};

export default MatchListPage;
