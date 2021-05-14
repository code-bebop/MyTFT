import React, { ReactElement, useEffect, useState } from "react";
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
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const {
    summonerInfo,
    matches,
    matchIds,
    count,
    summonerLoading,
    matchesLoading,
    summonerError,
    matchesError
  } = useSelector(
    (state: RootState) => ({
      summonerInfo: state.summoner.summonerInfo,
      matches: state.matches.matches,
      matchIds: state.summoner.matchIds,
      count: state.summoner.count + 15,
      summonerLoading: state.summoner.loading,
      matchesLoading: state.matches.loading,
      summonerError: state.summoner.error,
      matchesError: state.matches.error
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const useMatchListScrollHandler = () => {
    const getDocumentHeight = () => {
      const body = document.body;
      const html = document.documentElement;

      return Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
    };

    const getScrollTop = () => {
      return window.pageYOffset !== undefined
        ? window.pageYOffset
        : (document.documentElement || document.body).scrollTop;
    };

    useEffect(() => {
      const scrollHandler = async () => {
        if (getScrollTop() >= getDocumentHeight() - window.innerHeight) {
          setFirstLoading(false);
          dispatch(summonerAsync.request({ name: summonerName, count: count }));
        }
      };

      window.addEventListener("scroll", scrollHandler);

      return () => {
        window.removeEventListener("scroll", scrollHandler);
      };
    }, [count]);
  };
  useMatchListScrollHandler();

  useEffect(() => {
    if (summonerInfo?.name !== summonerName) {
      dispatch(matchesInitialize());
      dispatch(summonerInitialize());
      dispatch(summonerAsync.request({ name: summonerName, count: count }));
    }
  }, [dispatch, summonerName]);
  useEffect(() => {
    if (summonerInfo?.name === summonerName) {
      const _matchIds = matchIds.slice(-15);
      dispatch(matchesAsync.request(_matchIds));
    }
  }, [summonerInfo, dispatch]);

  if (isLoading(summonerLoading, matchesLoading) && firstLoading) {
    return (
      <Wrapper>
        <p>로딩 중...</p>
      </Wrapper>
    );
  }

  if (!summonerInfo?.name) {
    return (
      <>
        <Search />
        <Wrapper>
          <p>존재하지 않는 소환사 이름입니다.</p>
        </Wrapper>
      </>
    );
  }

  if (matchesError) {
    return (
      <>
        <Search />
        <Wrapper>
          <p>
            데이터 요쳥량이 너무 많습니다.
            <br />본 TFT 전적 사이트는 포트폴리오용으로 제작되어 Riot API중
            무료로 사용 가능한 personal API를 사용하고 있습니다. 그러므로 혀용된
            API 요청량(2분당 100회의 요청 가능)을 넘으면 오류가 반환됩니다.{" "}
            <br /> 최대 2분동안 기다리신 뒤 전적 검색을 시도하시면 정상적으로
            이용 가능합니다.
          </p>
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
