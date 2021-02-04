import React, { ReactElement, useEffect, useRef } from "react";
import styled from "styled-components";
import ensure from "../lib/ensure";
import PlacementChart from "./PlacementChart";

const SummonerInfoBlock = styled.div`
  width: 328px;
  height: 435px;
  margin-top: 150px;
  background-color: #202b43;
  padding: 23px 20px;
`;

const BundleBlock = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

const SummonerIconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  border: 2px solid #333e56;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-right: 15px;
`;

const SummonerIcon = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 23px;
`;

const SummonerLevel = styled.p`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: #131c2e;
  color: #fff;
  font-size: 12px;
  position: absolute;
  bottom: 0;
  right: -4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

const ColumnFlexBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  p {
    margin: 0;
  }
`;

const SummonerName = styled.p`
  font-size: 22px;
  font-weight: bold;
`;

const SummonerDate = styled.p`
  font-size: 14px;
  letter-spacing: 0.01em;
`;

const SummonerRankWrapper = styled(ColumnFlexBlock)`
  justify-content: space-between;
  padding-top: 15px;
  padding-bottom: 25px;
  box-sizing: border-box;
  height: 106px;
  p {
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
  color: ${({ tier }) => {
    switch (tier) {
      case "IRON":
        return "#325173";
      case "BRONZE":
        return "#B97452";
      case "SILVER":
        return "#9FBDC3";
      case "GOLD":
        return "#F1A64E";
      case "PLATINUM":
        return "#63b7b4";
      case "DIAMOND":
        return "#6F88EE";
      default:
        return "white";
    }
  }};
  margin: 0px;
`;

export interface SummonerInfoT {
  summonerName: string;
  profileIconId: number;
  summonerLevel: number;
  dateDiff: number;
  summonerTier?: string;
  summonerRank?: string;
  leaguePoints?: number;
  wins?: number;
  losses?: number;
  winRate?: number;
  placementArray: number[];
}

interface SummonerInfoPropsT {
  summonerInfoProps: SummonerInfoT;
}

const SummonerInfo = ({
  summonerInfoProps: {
    summonerName,
    profileIconId,
    summonerLevel,
    dateDiff,
    summonerRank,
    summonerTier,
    leaguePoints,
    wins,
    losses,
    winRate,
    placementArray
  }
}: SummonerInfoPropsT): ReactElement => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current && leaguePoints && summonerTier) {
      const ctx = ensure<CanvasRenderingContext2D>(
        canvasRef.current.getContext("2d")
      );
      switch (summonerTier) {
        case "IRON":
          ctx.strokeStyle = "#325173";
          break;
        case "BRONZE":
          ctx.strokeStyle = "#B97452";
          break;
        case "SILVER":
          ctx.strokeStyle = "#9FBDC3";
          break;
        case "GOLD":
          ctx.strokeStyle = "#F1A64E";
          break;
        case "PLATINUM":
          ctx.strokeStyle = "#63b7b4";
          break;
        case "DIAMOND":
          ctx.strokeStyle = "#6F88EE";
          break;
        default:
          ctx.strokeStyle = "white";
      }
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(
        114 / 2,
        114 / 2,
        110 / 2,
        0,
        Math.PI * ((2 * leaguePoints) / 100)
      );
      ctx.stroke();
    }
  }, [canvasRef, leaguePoints, summonerTier]);

  return (
    <SummonerInfoBlock>
      <BundleBlock>
        <SummonerIconWrapper>
          <SummonerIcon
            src={`http://ddragon.leagueoflegends.com/cdn/11.2.1/img/profileicon/${profileIconId}.png`}
          />
          <SummonerLevel>{summonerLevel}</SummonerLevel>
        </SummonerIconWrapper>
        <ColumnFlexBlock>
          <SummonerName>{summonerName}</SummonerName>
          <SummonerDate>최근 플레이 날짜: {dateDiff}일 전</SummonerDate>
        </ColumnFlexBlock>
      </BundleBlock>
      {summonerTier ? (
        <BundleBlock>
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
        </BundleBlock>
      ) : (
        <BundleBlock>
          <SummonerRankEmblemWrapper>
            <p>
              랭크정보 <br /> 없음
            </p>
          </SummonerRankEmblemWrapper>
        </BundleBlock>
      )}
      {placementArray.length !== 0 && (
        <PlacementChart placementArray={placementArray} />
      )}
    </SummonerInfoBlock>
  );
};

export default SummonerInfo;
