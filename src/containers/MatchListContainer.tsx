import React, { ReactElement, useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import MatchListItem from "../components/MatchListItem";
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
  const [matchDateDiffObject, setMatchDateDiffObject] = useState({});

  const { summonerInfo, matchInfoList } = useSelector(
    (state: RootState) => ({
      summonerInfo: state.summoner.summonerInfo,
      matchInfoList: state.match.matchInfoList
    }),
    shallowEqual
  );

  useEffect(() => {
    const _matchDateDiffObject = {};
    matchInfoList?.forEach(matchInfo => {
      const matchDateDiff = Math.ceil(
        (new Date().getTime() -
          new Date(matchInfo.info.game_datetime).getTime()) /
          (1000 * 3600 * 24)
      );

      if (!_matchDateDiffObject[matchDateDiff]) {
        _matchDateDiffObject[matchDateDiff] = new Array(matchInfo);
      } else {
        _matchDateDiffObject[matchDateDiff] = _matchDateDiffObject[
          matchDateDiff
        ].concat(matchInfo);
      }
    });

    setMatchDateDiffObject(_matchDateDiffObject);
  }, [matchInfoList]);

  return (
    <MatchListContainerBlock>
      {Object.keys(matchDateDiffObject).map(key => {
        return (
          <MatchDateDiffItem key={key}>
            <MatchListProfile>
              <p>{key}일 전</p>
              <p>{matchDateDiffObject[key].length} 게임</p>
            </MatchListProfile>
            <ul>
              {matchDateDiffObject[key].map((matchInfo, index) => {
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
      {/* {matchInfoList?.map((matchInfo, key) => {
        if (summonerInfo?.puuid !== undefined) {
          return (
            <MatchListItem
              key={key}
              matchInfo={matchInfo}
              puuid={summonerInfo?.puuid}
            />
          );
        }
      })} */}
    </MatchListContainerBlock>
  );
};

export default MatchListContainer;
