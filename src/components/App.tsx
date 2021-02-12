import React, { ReactElement, useEffect } from "react";
import styled from "styled-components";
import { hot } from "react-hot-loader";

import Search from "../components/Search";
import MatchList from "./MatchList";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import { matchAsync } from "../modules/match";
import SummonerInfo from "./SummonerInfo";

const Wrapper = styled.div`
  width: 100%;
  padding-top: 50px;
  display: flex;
  justify-content: center;
`;

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

  console.log(summonerInfo && matchInfoList ? "true" : "false");
  return (
    <>
      <Search />
      {summonerLoading || matchLoading ? (
        <Wrapper>
          <p>로딩 중...</p>
        </Wrapper>
      ) : (
        summonerInfo &&
        matchInfoList && (
          <Wrapper>
            <SummonerInfo />
            <MatchList />
          </Wrapper>
        )
      )}
    </>
  );
};

export default hot(module)(App);
