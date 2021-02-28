import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { RootState } from "../../modules";
import { matchAsync } from "../../modules/match";
import Wrapper from "../common/Wrapper";
import Header from "./Header";

const PostMatch = (): ReactElement => {
  const { matchId } = useParams<{ matchId: string }>();
  const { summonerInfo, match } = useSelector((state: RootState) => ({
    summonerInfo: state.summoner.summonerInfo,
    match: state.match.match
  }));
  const dispatch = useDispatch();
  const dispatchMatch = (matchId: string): void => {
    dispatch(matchAsync.request(matchId));
  };

  return (
    <Wrapper>
      <Header />
    </Wrapper>
  );
};

export default PostMatch;
