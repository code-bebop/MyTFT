import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import SummonerInfo, { SummonerInfoT } from "../components/SummonerInfo";
import ensure from "../lib/ensure";
import { RootState } from "../modules";

const SummonerInfoContainer = (): ReactElement => {
  const [
    summonerInfoProps,
    setSummonerInfoProps
  ] = useState<SummonerInfoT | null>(null);

  const { summonerInfo, rankEntry } = useSelector((state: RootState) => ({
    summonerInfo: state.summoner.summonerInfo,
    rankEntry: state.summoner.rankEntry
  }));

  useEffect(() => {
    if (summonerInfo && rankEntry) {
      const {
        name: summonerName,
        profileIconId,
        summonerLevel,
        revisionDate
      } = ensure(summonerInfo);
      const dateDiff = Math.ceil(
        (new Date().getTime() - new Date(revisionDate).getTime()) /
          (1000 * 3600 * 24)
      );

      if (rankEntry?.length !== 0) {
        const {
          tier: summonerTier,
          rank: summonerRank,
          leaguePoints,
          wins,
          losses
        } = ensure(rankEntry[0]);
        const winRate = Number(((wins / (wins + losses)) * 100).toFixed(2));
        const temp: SummonerInfoT = {
          summonerName,
          profileIconId,
          summonerLevel,
          dateDiff,
          summonerTier,
          summonerRank,
          leaguePoints,
          wins,
          losses,
          winRate
        };
        setSummonerInfoProps(temp);
      } else {
        const temp: SummonerInfoT = {
          summonerName,
          profileIconId,
          summonerLevel,
          dateDiff
        };
        setSummonerInfoProps(temp);
      }
    }
  }, [summonerInfo, rankEntry]);

  if (!summonerInfoProps || summonerInfoProps.summonerName === "Error") {
    return <p>데이터 없음</p>;
  }
  return <SummonerInfo summonerInfoProps={summonerInfoProps} />;
};

export default SummonerInfoContainer;
