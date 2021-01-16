import React, { ReactElement } from "react";
import { useSelector } from "react-redux";

import SummonerInfo from "../components/SummonerInfo";
import { RootState } from "../modules";

const SummonerInfoContainer = (): ReactElement => {
  const { summonerInfo, rankEntry } = useSelector((state: RootState) => ({
    summonerInfo: state.summoner.summonerInfo,
    rankEntry: state.summoner.rankEntry
  }))
  const summonerName: string = summonerInfo?.name as string;
  const profileIconId: number = summonerInfo?.profileIconId as number;
  const summonerTier = rankEntry?.[0].tier as string;
  const summonerRank = rankEntry?.[0].rank as string;
  const summonerInfoProps = {summonerName, profileIconId, summonerTier, summonerRank}

  if (!summonerInfo || summonerInfo.name === "Error") {
    return (
      <p>데이터 없음</p>
    ) 
  }
  return (
    <SummonerInfo summonerInfoProps={summonerInfoProps} />
  )
}

export default SummonerInfoContainer;