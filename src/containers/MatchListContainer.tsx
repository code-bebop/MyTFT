import React, { ReactElement, useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import MatchListItem from "../components/MatchListItem";
import ensure from "../lib/ensure";
import { RootState } from "../modules";
import { MatchInfoT } from "../types/types";

const MatchListContainerBlock = styled.ul`
  button {
    color: black;
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
    matchInfoList?.forEach((matchInfo, index) => {
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
          <div key={key}>
            <p>{key}일 전</p>
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
          </div>
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
