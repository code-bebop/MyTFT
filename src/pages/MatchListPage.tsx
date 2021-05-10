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
    matchLoading,
    count
  } = useSelector(
    (state: RootState) => ({
      summonerInfo: state.summoner.summonerInfo,
      matches: state.matches.matches,
      matchIds: state.summoner.matchIds,
      summonerLoading: state.summoner.loading,
      matchLoading: state.matches.loading,
      count: state.summoner.count + 15
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  console.log(matches);

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
          console.log("scrollHandler 실행");
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
      console.log("state 초기화 및 summoner 요청");
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

  // if (isLoading(summonerLoading, matchLoading)) {
  //   return (
  //     <Wrapper>
  //       <p>로딩 중...</p>
  //     </Wrapper>
  //   );
  // }

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
        <SummonerProfile />
        <MatchList />
      </Wrapper>
    </ThemeProvider>
  );
};

export default MatchListPage;
