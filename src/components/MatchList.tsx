import React, { ReactElement } from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import MatchListItem from "./MatchListItem";
import useMatchDataSeparatedByDateDiff, {
  MatchDataSeparatedByDateDiffT
} from "../hooks/useMatchDataSeparatedByDateDiff";
import { RootState } from "../modules";

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
  const MatchDataSeparatedByDateDiff: MatchDataSeparatedByDateDiffT = useMatchDataSeparatedByDateDiff();
  console.log(MatchDataSeparatedByDateDiff);

  return (
    <MatchListContainerBlock>
      {Object.keys(MatchDataSeparatedByDateDiff).map(key => {
        return (
          <MatchDateDiffItem key={key}>
            <MatchListProfile>
              <p>{key}일 전</p>
              <p>{MatchDataSeparatedByDateDiff[key].length} 게임</p>
            </MatchListProfile>
            <ul>
              {MatchDataSeparatedByDateDiff[key].map((matchInfo, index) => {
                if (summonerInfo?.puuid !== undefined) {
                  return (
                    <li key={index}>
                      <MatchListItem
                        matchInfo={matchInfo}
                        puuid={summonerInfo?.puuid}
                      />
                    </li>
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
