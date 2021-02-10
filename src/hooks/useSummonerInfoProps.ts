import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { SummonerInfoT } from "../components/SummonerInfo";

import ensure from "../lib/ensure";
import { RootState } from "../modules";
import usePlacementArray from "./usePlacementArray";

const useSummonerInfoProps = (): SummonerInfoT => {
  const [summonerInfoProps, setSummonerInfoProps] = useState<SummonerInfoT>({
    summonerName: "",
    profileIconId: 0,
    summonerLevel: 0,
    dateDiff: 0,
    placementArray: [0]
  });
  const { summonerInfo, rankEntry, matchInfoList } = useSelector(
    (state: RootState) => ({
      summonerInfo: state.summoner.summonerInfo,
      rankEntry: state.summoner.rankEntry,
      matchInfoList: state.match.matchInfoList
    }),
    shallowEqual
  );
  const placementArray = usePlacementArray();

  useEffect(() => {
    if (summonerInfo && rankEntry && placementArray) {
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
          winRate,
          placementArray
        };
        setSummonerInfoProps(temp);
      } else {
        const temp: SummonerInfoT = {
          summonerName,
          profileIconId,
          summonerLevel,
          dateDiff,
          placementArray
        };
        setSummonerInfoProps(temp);
      }
    }
  }, [summonerInfo, rankEntry, matchInfoList, placementArray]);

  return summonerInfoProps;
};

export default useSummonerInfoProps;
