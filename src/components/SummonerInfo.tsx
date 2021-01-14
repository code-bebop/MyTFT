import React, { ReactElement } from "react";

interface SummonerInfoProps {
  summonerName: string,
  profileIconId: number
}

const SummonerInfo = ({ summonerName, profileIconId }: SummonerInfoProps): ReactElement => {
  return (
    <>
      <img src={`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/profileicon/${profileIconId}.png`} />
      <p>{summonerName}</p>
    </>
  )
}

export default SummonerInfo;