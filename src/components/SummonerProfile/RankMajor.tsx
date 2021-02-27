import React, { ReactElement, useRef } from "react";
import styled from "styled-components";
import useStrokeSummonerLpGui from "../../hooks/useStrokeSummonerLpGui";
import { OptionalSummonerProfilePropsT } from "./SummonerProfile";

const RankMajorBlock = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

const SummonerRankWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  justify-content: space-between;
  padding-top: 15px;
  padding-bottom: 25px;
  box-sizing: border-box;
  height: 106px;
  p {
    margin: 0;
    font-size: 12px;
    font-weight: bolder;
    color: #89a0b5;
  }
`;

const SummonerRankEmblem = styled.img`
  width: 50px;
  height: 50px;
`;

const SummonerRankEmblemWrapper = styled.div`
  width: 114px;
  height: 114px;
  border-radius: 114px;
  border: 4px solid #333e56;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  position: relative;
  box-sizing: border-box;
`;

const SummonerLPCanvas = styled.canvas`
  position: absolute;
  top: -3px;
  left: -3px;
  transform: rotate(-90deg);
`;

const SummonerRankWithTier = styled.h2<{ tier: string }>`
  font-size: 20px;
  font-weight: bold;
  color: ${({ tier, theme }) => {
    switch (tier) {
      case "IRON":
        return theme.colors.tier.iron;
      case "BRONZE":
        return theme.colors.tier.bronze;
      case "SILVER":
        return theme.colors.tier.silver;
      case "GOLD":
        return theme.colors.tier.gold;
      case "PLATINUM":
        return theme.colors.tier.platinum;
      case "DIAMOND":
        return theme.colors.tier.diamond;
      default:
        return "white";
    }
  }};
  margin: 0px;
`;

interface RankMajorPropsT {
  rankProfile?: OptionalSummonerProfilePropsT;
}

const RankMajor = ({ rankProfile }: RankMajorPropsT): ReactElement => {
  if (rankProfile === undefined) {
    return (
      <RankMajorBlock>
        <SummonerRankEmblemWrapper>
          <p>
            랭크정보 <br /> 없음
          </p>
        </SummonerRankEmblemWrapper>
      </RankMajorBlock>
    );
  }

  const {
    summonerTier,
    summonerRank,
    leaguePoints,
    wins,
    losses,
    winRate
  } = rankProfile;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useStrokeSummonerLpGui(canvasRef, leaguePoints, summonerTier);

  return (
    <RankMajorBlock>
      <SummonerRankEmblemWrapper>
        <SummonerLPCanvas ref={canvasRef} width="114px" height="114px" />
        <SummonerRankEmblem
          src={`../public/img/rank/Emblem_${summonerTier}.png`}
        />
      </SummonerRankEmblemWrapper>
      <SummonerRankWrapper>
        <SummonerRankWithTier tier={summonerTier}>
          {summonerTier} {summonerRank}
        </SummonerRankWithTier>
        <p>{leaguePoints} LP</p>
        <p>
          {wins}승 {losses}패 {winRate}%
        </p>
      </SummonerRankWrapper>
    </RankMajorBlock>
  );
};

export default RankMajor;
