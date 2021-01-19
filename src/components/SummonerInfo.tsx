import React, { ReactElement } from "react";
import styled from "styled-components";

const SummonerInfoBlock = styled.div`
  width: 328px;
  height: 435px;
  margin-top: 150px;
  background-color: #202B43;
  padding: 23px 20px;
`;

const SummonerInfoBlockInner = styled.div`
  display: flex;
    height: 58px;
`;

const SummonerProfileIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  border: 2px solid #333E56;
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
  background-color: #131C2E;
  color: #FFF;
  font-size: 12px;
  position: absolute;
  bottom: 0;
  right: -4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SummonerProfileName = styled.div`
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
  letter-spacing: .01em;
`;

export interface SummonerInfoT {
  summonerName: string,
  profileIconId: number,
  summonerLevel: number,
  summonerTier: string,
  summonerRank: string,
  wins: number,
  losses: number,
  winRate: number
}

interface SummonerInfoPropsT {
  summonerInfoProps: SummonerInfoT
}

const SummonerInfo = ({ summonerInfoProps: {summonerName, profileIconId, summonerLevel, summonerRank, summonerTier, wins, losses, winRate} }: SummonerInfoPropsT): ReactElement => {
  return (
    <SummonerInfoBlock>
      <SummonerInfoBlockInner>
        <SummonerProfileIcon>
          <SummonerIcon src={`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/profileicon/${profileIconId}.png`} />
          <SummonerLevel>{summonerLevel}</SummonerLevel>
        </SummonerProfileIcon>
        <SummonerProfileName>
          <SummonerName>{summonerName}</SummonerName>
          <SummonerDate>최근 플레이 날짜: 6일 전</SummonerDate>
        </SummonerProfileName>
      </SummonerInfoBlockInner>
      <p>{summonerTier}</p>
      <p>{summonerRank}</p>
      <p>{wins}</p>
      <p>{losses}</p>
      <p>{winRate}</p>
    </SummonerInfoBlock>
  )
}

export default SummonerInfo;