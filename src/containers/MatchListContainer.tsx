import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import MatchListItem from "../components/MatchListItem";
import { RootState } from "../modules";
import { matchAsync } from "../modules/match";

const MatchListContainerBlock = styled.ul``;

const MatchListContainer = (): ReactElement => {
  const { summonerInfo, matchIds, matchInfoList } = useSelector(
    (state: RootState) => ({
      summonerInfo: state.summoner.summonerInfo,
      matchIds: state.summoner.matchIds,
      matchInfoList: state.match.matchInfoList
    })
  );
  const dispatch = useDispatch();
  const getMatchResponse = useCallback(() => {
    dispatch(matchAsync.request(matchIds));
  }, [matchIds]);

  return (
    <MatchListContainerBlock>
      {matchInfoList?.map((matchInfo, key) => {
        if (summonerInfo?.puuid !== undefined) {
          return (
            <MatchListItem
              key={key}
              matchInfo={matchInfo}
              puuid={summonerInfo?.puuid}
            />
          );
        }
      })}
      <button onClick={getMatchResponse}>매치 정보 얻어오기</button>
    </MatchListContainerBlock>
  );
};

export default MatchListContainer;
