import React, { ReactElement, useEffect } from "react";
import styled from "styled-components";
import { hot } from "react-hot-loader";

import SearchContainer from "../containers/SearchContainer";
import SummonerInfoContainer from "../containers/SummonerInfoContainer";
import MatchListContainer from "../containers/MatchListContainer";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import { matchAsync } from "../modules/match";

const Wrapper = styled.div`
  width: 100%;
  padding-top: 50px;
  display: flex;
  justify-content: center;
`;

const App = (): ReactElement => {
  console.log("App 렌더링");

  const { summonerInfo, matchInfoList, matchIds } = useSelector(
    (state: RootState) => ({
      summonerInfo: state.summoner.summonerInfo,
      matchInfoList: state.match.matchInfoList,
      matchIds: state.summoner.matchIds
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
      <SearchContainer />
      {summonerInfo && matchInfoList ? (
        <Wrapper>
          <SummonerInfoContainer />
          <MatchListContainer />
        </Wrapper>
      ) : (
        <Wrapper>
          <p>아직 아님</p>
        </Wrapper>
      )}
    </>
  );
};

export default hot(module)(App);
