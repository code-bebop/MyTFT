import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import SummonerInfo, { SummonerInfoT } from "../components/SummonerInfo";
import { RootState } from "../modules";

const SummonerInfoContainer = (): ReactElement => {
  const [summonerInfoProps, setSummonerInfoProps] = useState<SummonerInfoT|null>(null);

  const { summonerInfo, rankEntry } = useSelector((state: RootState) => ({
    summonerInfo: state.summoner.summonerInfo,
    rankEntry: state.summoner.rankEntry?.[0]
  }))
  
  useEffect(() => {
    if (summonerInfo && rankEntry) {
      const { name: summonerName, profileIconId, summonerLevel } = summonerInfo!;
      const { tier: summonerTier, rank: summonerRank, wins, losses } = rankEntry!;
      const winRate = wins / (wins + losses) * 100;
      const temp: SummonerInfoT = {
          summonerName,
          profileIconId,
          summonerLevel,
          summonerTier,
          summonerRank,
          wins,
          losses,
          winRate
      }
      setSummonerInfoProps(temp);
    }
  }, [summonerInfo || rankEntry]);
 

  if (!summonerInfoProps || summonerInfoProps.summonerName === "Error") {
    return (
      <p>데이터 없음</p>
    ) 
  }
  return (
    <SummonerInfo summonerInfoProps={summonerInfoProps} />
  )
}

export default SummonerInfoContainer;