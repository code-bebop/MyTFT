import React, { ReactElement } from "react";
import { shallowEqual, useSelector } from "react-redux";
import styled from "styled-components";
import MatchListItem from "./MatchListItem/MatchListItem";
import useMatchDataSeparatedByDateDiff, {
  MatchDataSeparatedByDateDiffT
} from "../../hooks/useMatchDataSeparatedByDateDiff";
import { RootState } from "../../modules";
import usePlacementStats, {
  PlacementStatsT
} from "../../hooks/usePlacementStats";

const MatchListContainerBlock = styled.div`
  padding: 30px 0 0;
  margin-left: 16px;
  margin-bottom: 100px;
  background-color: #202b43;
  button {
    color: black;
  }
`;

const MatchDateDiffItem = styled.li`
  padding: 0 24px;
  margin-bottom: 25px;
`;

const MatchListSummary = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  p {
    margin: 0;
  }
`;

const MatchListProfile = styled.div`
  display: flex;
  align-items: center;
  & > p {
    &:first-child {
      font-size: 16px;
      font-weight: bold;
    }
    &:last-child {
      margin-left: 18px;
      font-size: 14px;
      color: #89a0b5;
    }
  }
`;

const MatchListStats = styled.div`
  display: flex;
  & > p {
    font-size: 13px;
    color: #89a0b5;
  }
  p + p {
    margin-left: 24px;
  }
`;

const MatchListTypography = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: #e5ebef;
`;

const MatchListAvgTypography = styled(MatchListTypography)<{ average: number }>`
  color: ${({ average }) => {
    switch (average) {
      case 1:
        return "#E7B767";
      case 2:
        return "#9DA2B1";
      case 3:
        return "#AD8866";
      default:
        return "#576480";
    }
  }};
`;

const LoadingBlock = styled.div`
  background-color: #1a2233;
  padding: 10px 0;
  text-align: center;
  & > p {
    font-size: 72px;
    font-weight: bold;
  }
`;

const MatchListContainer = (): ReactElement => {
  const { summonerInfo, matchesLoading } = useSelector(
    (state: RootState) => ({
      summonerInfo: state.summoner.summonerInfo,
      matchesLoading: state.matches.loading
    }),
    shallowEqual
  );

  if (!summonerInfo) {
    return <p>소환사 정보 없음</p>;
  }

  const matchDataSeparatedByDateDiff: MatchDataSeparatedByDateDiffT =
    useMatchDataSeparatedByDateDiff();
  const placementStats: PlacementStatsT = usePlacementStats(
    matchDataSeparatedByDateDiff
  );

  console.log(matchDataSeparatedByDateDiff);

  return (
    <MatchListContainerBlock>
      {Object.keys(matchDataSeparatedByDateDiff).map(key => {
        return (
          <MatchDateDiffItem key={key}>
            <MatchListSummary>
              <MatchListProfile>
                <p>{key}일 전</p>
                <p>{matchDataSeparatedByDateDiff[key].length} 게임</p>
              </MatchListProfile>
              <MatchListStats>
                <p>
                  평균 순위:
                  <MatchListAvgTypography
                    average={placementStats[key]?.average}
                  >
                    {placementStats[key]?.average}
                  </MatchListAvgTypography>
                </p>
                <p>
                  승:
                  <MatchListTypography>
                    {placementStats[key]?.wins}
                  </MatchListTypography>
                </p>
                <p>
                  4등 이상:
                  <MatchListTypography>
                    {placementStats[key]?.fourthOrHigher}
                  </MatchListTypography>
                </p>
              </MatchListStats>
            </MatchListSummary>
            <ul>
              {matchDataSeparatedByDateDiff[key].map((match, index) => {
                if (summonerInfo?.puuid !== undefined) {
                  return (
                    <MatchListItem
                      key={index}
                      match={match}
                      puuid={summonerInfo.puuid}
                      summonerName={summonerInfo.name}
                    />
                  );
                }
              })}
            </ul>
          </MatchDateDiffItem>
        );
      })}
      {matchesLoading ? <LoadingBlock>. . .</LoadingBlock> : <></>}
    </MatchListContainerBlock>
  );
};

export default MatchListContainer;
