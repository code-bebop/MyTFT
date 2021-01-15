import React, { ReactElement } from "react";
import { useSelector } from "react-redux";

import SummonerInfo from "../components/SummonerInfo";
import { RootState } from "../modules";

const SummonerInfoContainer = (): ReactElement => {
  const { summonerInfo } = useSelector((state: RootState) => ({
    summonerInfo: state.summoner.summonerInfo
  }))
  const summonerName: string = summonerInfo?.name as string;
  const profileIconId: number = summonerInfo?.profileIconId as number;

  if (!summonerInfo || summonerInfo.name === "Error") {
    return (
      <p>데이터 없음</p>
    ) 
  }
  return (
    <SummonerInfo summonerName={summonerName} profileIconId={profileIconId} />
  )
}

export default SummonerInfoContainer;