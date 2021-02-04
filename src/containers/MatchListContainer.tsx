import React, { ReactElement } from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import MatchListItem from "../components/MatchListItem";
import { RootState } from "../modules";

const MatchListContainerBlock = styled.ul`
  button {
    color: black;
  }
`;

const MatchListContainer = (): ReactElement => {
  console.log("MatchListContainer 렌더링");

  const { summonerInfo, matchInfoList } = useSelector(
    (state: RootState) => ({
      summonerInfo: state.summoner.summonerInfo,
      matchInfoList: state.match.matchInfoList
    }),
    shallowEqual
  );

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
    </MatchListContainerBlock>
  );
};

export default MatchListContainer;
