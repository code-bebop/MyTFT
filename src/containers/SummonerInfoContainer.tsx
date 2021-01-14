import React, { ReactElement } from "react";
import { useSelector } from "react-redux";

import SummonerInfo from "../components/SummonerInfo";
import { RootState } from "../modules";

const SummonerInfoContainer = (): ReactElement => {
  const { summoner } = useSelector((state: RootState) => ({
    summoner: state.summoner.response
  }))
  const summonerName: string = summoner?.name as string;
  const profileIconId: number = summoner?.profileIconId as number;

  if (!summoner) {
    return (
      <p>데이터 없음</p>
    ) 
  }
  return (
    <SummonerInfo summonerName={summonerName} profileIconId={profileIconId} />
  )
}

export default SummonerInfoContainer;