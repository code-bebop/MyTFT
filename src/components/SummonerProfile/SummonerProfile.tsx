import React, { ReactElement } from "react";
import styled from "styled-components";
import useSummonerProfileProps from "../../hooks/useSummonerInfoProps";
import PlacementDistribution from "./PlacementDistribution";
import ProfileInfo from "./ProfileInfo";
import RankMajor from "./RankMajor";

const SummonerProfileBlock = styled.div`
  width: 328px;
  height: 435px;
  background-color: #202b43;
  padding: 23px 20px;
`;

export interface SummonerProfilePropsT {
  requireSummonerProfileProps: RequireSummonerProfilePropsT;
  optionalSummonerProfileProps?: OptionalSummonerProfilePropsT;
}

export interface RequireSummonerProfilePropsT {
  summonerName: string;
  profileIconId: number;
  summonerLevel: number;
  dateDiff: number;
  placementArray: number[];
}

export interface OptionalSummonerProfilePropsT {
  summonerTier: string;
  summonerRank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  winRate: number;
}

const SummonerProfile = (): ReactElement => {
  const {
    requireSummonerProfileProps,
    optionalSummonerProfileProps
  }: SummonerProfilePropsT = useSummonerProfileProps();
  const {
    summonerName,
    profileIconId,
    summonerLevel,
    dateDiff,
    placementArray
  } = requireSummonerProfileProps;

  if (summonerName === "" || summonerName === "Error") {
    return <p>존재하지 않는 소환사</p>;
  }
  if (placementArray.length === 0) {
    return <p>순위 차트에 문제 발생</p>;
  }
  return (
    <SummonerProfileBlock>
      <ProfileInfo
        summonerLevel={summonerLevel}
        summonerName={summonerName}
        dateDiff={dateDiff}
        profileIconId={profileIconId}
      />
      <RankMajor rankProfile={optionalSummonerProfileProps} />
      <PlacementDistribution placementArray={placementArray} />
    </SummonerProfileBlock>
  );
};

export default SummonerProfile;
