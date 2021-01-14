import React, { ReactElement } from "react";
import styled from "styled-components";

const SummonerInfoBlock = styled.div`
  width: 328px;
  height: 435px;
  margin-top: 150px;
  background-color: #202B43;
`;

interface SummonerInfoProps {
  summonerName: string,
  profileIconId: number
}

const SummonerInfo = ({ summonerName, profileIconId }: SummonerInfoProps): ReactElement => {
  return (
    <SummonerInfoBlock>
      <img src={`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/profileicon/${profileIconId}.png`} />
      <p>{summonerName}</p>
    </SummonerInfoBlock>
  )
}

export default SummonerInfo;