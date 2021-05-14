import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { RootState } from "../../modules";
import { matchAsync } from "../../modules/match";
import { summonerAsync } from "../../modules/summoner";
import { summonersAsync } from "../../modules/summoners";
import { Participant } from "../../types/types";
import { WrapperBlock } from "../common/Wrapper";
import Header from "./Header";
import Players from "./Players";
import SortRow from "./SortRow";

const LoadingMessage = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 72px;
  font-weight: bold;
`;
const PostMatchWrapper = styled(WrapperBlock)`
  width: 1016px;
  flex-direction: column;
  margin: 0 auto;
  padding-top: 70px;
`;

const PostMatch = (): ReactElement => {
  const { name, matchId } = useParams<{ name: string; matchId: string }>();
  const { match, matchLoading, summonerInfoArray } = useSelector(
    (state: RootState) => ({
      match: state.match.match,
      matchLoading: state.match.loading,
      summonerInfoArray: state.summoners.summonersInfo
    })
  );
  const dispatch = useDispatch();
  const dispatchMatchRequest = (matchId: string): void => {
    dispatch(matchAsync.request(matchId));
  };
  const dispatchSummonerRequest = (name: string): void => {
    dispatch(summonerAsync.request({ name, count: 15 }));
  };
  const dispatchSummonersRequest = (participants: Participant[]) => {
    dispatch(summonersAsync.request(participants));
  };
  useEffect(() => {
    dispatchSummonerRequest(name);
    dispatchMatchRequest(matchId);
  }, [matchId]);
  useEffect(() => {
    if (match !== null) {
      dispatchSummonersRequest(match.info.participants);
    }
  }, [match]);

  match?.info.participants.map((participant, index) => {
    const summonerInfo = summonerInfoArray?.find(
      summonerInfo => summonerInfo.puuid === participant.puuid
    );
    if (summonerInfo === undefined) {
      return <></>;
    }
  });

  if (matchLoading) {
    return <LoadingMessage>. . .</LoadingMessage>;
  }

  return (
    <PostMatchWrapper>
      <Header />
      <SortRow />
      <Players />
    </PostMatchWrapper>
  );
};

export default PostMatch;
