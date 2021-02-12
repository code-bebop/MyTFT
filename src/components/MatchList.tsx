import React, { ReactElement, useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import MatchListItem from "./MatchListItem";
import useMatchDataSeparatedByDateDiff, {
  MatchDataSeparatedByDateDiffT
} from "../hooks/useMatchDataSeparatedByDateDiff";
import { RootState } from "../modules";
import usePlacementArray from "../hooks/usePlacementArray";
import { Participant } from "../types/types";
import ensure from "../lib/ensure";
import useSearchedSummoner from "../hooks/useSearchedSummoner";
import usePlacementArraySeparatedByDateDiff, {
  PlacementArraySeparatedByDateDiffT
} from "../hooks/usePlacementArraySeparatedByDateDiff";

const MatchListContainerBlock = styled.ul`
  padding: 30px 24px 0;
  margin-left: 16px;
  background-color: #202b43;
  button {
    color: black;
  }
`;

const MatchDateDiffItem = styled.li`
  margin-bottom: 25px;
`;

const MatchListProfile = styled.div`
  display: flex;
  margin-bottom: 10px;
  p {
    margin: 0;
    line-height: 1;
    &:first-child {
      font-size: 16px;
      font-weight: bold;
    }
    &:last-child {
      padding-left: 18px;
      font-size: 14px;
      color: #89a0b5;
    }
  }
`;

const MatchListContainer = (): ReactElement => {
  console.log("MatchListContainer 렌더링");

  const { summonerInfo } = useSelector(
    (state: RootState) => ({
      summonerInfo: state.summoner.summonerInfo
    }),
    shallowEqual
  );

  const matchDataSeparatedByDateDiff: MatchDataSeparatedByDateDiffT = useMatchDataSeparatedByDateDiff();
  console.log(matchDataSeparatedByDateDiff);
  const placemntArraySeparatedByDateDiff: PlacementArraySeparatedByDateDiffT = usePlacementArraySeparatedByDateDiff(
    matchDataSeparatedByDateDiff
  );
  console.log(placemntArraySeparatedByDateDiff);

  return (
    <MatchListContainerBlock>
      {Object.keys(matchDataSeparatedByDateDiff).map(key => {
        return (
          <MatchDateDiffItem key={key}>
            <MatchListProfile>
              <p>{key}일 전</p>
              <p>{matchDataSeparatedByDateDiff[key].length} 게임</p>
              <p>
                평균 순위:
                {(
                  placemntArraySeparatedByDateDiff[key]?.reduce((acc, val) => {
                    return acc + val;
                  }) / placemntArraySeparatedByDateDiff[key]?.length
                ).toFixed(1)}
              </p>
            </MatchListProfile>
            <ul>
              {matchDataSeparatedByDateDiff[key].map((matchInfo, index) => {
                if (summonerInfo?.puuid !== undefined) {
                  return (
                    <MatchListItem
                      key={index}
                      matchInfo={matchInfo}
                      puuid={summonerInfo?.puuid}
                    />
                  );
                }
              })}
            </ul>
          </MatchDateDiffItem>
        );
      })}
    </MatchListContainerBlock>
  );
};

export default MatchListContainer;
