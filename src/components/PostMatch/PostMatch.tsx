import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { RootState } from "../../modules";
import { matchAsync } from "../../modules/match";
import { summonerAsync } from "../../modules/summoner";
import { WrapperBlock } from "../common/Wrapper";
import Header from "./Header";
import Players from "./Players";
import SortRow from "./SortRow";

const PostMatchWrapper = styled(WrapperBlock)`
  width: 1016px;
  flex-direction: column;
  margin: 0 auto;
`;

const PostMatch = (): ReactElement => {
  const { name, matchId } = useParams<{ name: string; matchId: string }>();
  const { summonerInfo, match } = useSelector((state: RootState) => ({
    summonerInfo: state.summoner.summonerInfo,
    match: state.match.match
  }));
  const dispatch = useDispatch();
  const dispatchMatchRequest = (matchId: string): void => {
    dispatch(matchAsync.request(matchId));
  };
  const dispatchSummonerRequest = (name: string): void => {
    dispatch(summonerAsync.request(name));
  };
  useEffect(() => {
    dispatchSummonerRequest(name);
    dispatchMatchRequest(matchId);
  }, [matchId]);

  return (
    <PostMatchWrapper>
      <Header />
      <SortRow />
      <Players />
    </PostMatchWrapper>
  );
};

export default PostMatch;
