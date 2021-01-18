import React, { ReactElement } from "react";
import styled from "styled-components";

const SummonerInfoBlock = styled.div`
  width: 328px;
  height: 435px;
  margin-top: 150px;
  background-color: #202B43;
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
      <img src={`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/profileicon/${profileIconId}.png`} />
      <p>{summonerName}</p>
      <p>{summonerLevel}</p>
      <p>{summonerTier}</p>
      <p>{summonerRank}</p>
      <p>{wins}</p>
      <p>{losses}</p>
      <p>{winRate}</p>
    </SummonerInfoBlock>
  )
}

export default SummonerInfo;