import React, { ReactElement } from "react";
import styled from "styled-components";

const SummonerInfoBlock = styled.div`
  width: 328px;
  height: 435px;
  margin-top: 150px;
  background-color: #202B43;
`;

interface SummonerInfoProps {
  summonerInfoProps: {
    summonerName: string,
    profileIconId: number
    summonerTier: string,
    summonerRank: string
  }
}

const SummonerInfo = ({ summonerInfoProps: {summonerName, profileIconId, summonerRank, summonerTier} }: SummonerInfoProps): ReactElement => {
  return (
    <SummonerInfoBlock>
      <img src={`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/profileicon/${profileIconId}.png`} />
      <p>{summonerName}</p>
      <p>{summonerTier}</p>
      <p>{summonerRank}</p>
    </SummonerInfoBlock>
  )
}

export default SummonerInfo;