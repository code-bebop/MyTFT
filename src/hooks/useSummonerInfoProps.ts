import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import {
  SummonerInfoPropsT,
  RequireSummonerInfoPropsT,
  OptionalSummonerInfoPropsT
} from "../components/SummonerInfo";

import ensure from "../lib/ensure";
import { RootState } from "../modules";
import { RankEntryT } from "../types/types";
import usePlacementArray from "./usePlacementArray";

const useSummonerInfoProps = (): SummonerInfoPropsT => {
  const [
    summonerInfoProps,
    setSummonerInfoProps
  ] = useState<SummonerInfoPropsT>({
    requireSummonerInfoProps: {
      summonerName: "",
      profileIconId: 0,
      summonerLevel: 0,
      dateDiff: 0,
      placementArray: [0]
    }
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
      const requireSummonerInfoProps: RequireSummonerInfoPropsT = {
        summonerName,
        profileIconId,
        summonerLevel,
        dateDiff,
        placementArray
      };

      if (rankEntry?.length !== 0) {
        const {
          tier: summonerTier,
          rank: summonerRank,
          leaguePoints,
          wins,
          losses
        } = ensure<RankEntryT>(rankEntry[0]);
        const winRate = Number(((wins / (wins + losses)) * 100).toFixed(2));
        const optionalSummonerInfoProps: OptionalSummonerInfoPropsT = {
          summonerTier,
          summonerRank,
          leaguePoints,
          wins,
          losses,
          winRate
        };
        const _summonerInfoProps: SummonerInfoPropsT = {
          requireSummonerInfoProps,
          optionalSummonerInfoProps
        };
        setSummonerInfoProps(_summonerInfoProps);
      } else {
        const _summonerInfoProps: SummonerInfoPropsT = {
          requireSummonerInfoProps
        };
        setSummonerInfoProps(_summonerInfoProps);
      }
    }
  }, [summonerInfo, rankEntry, matchInfoList, placementArray]);

  return summonerInfoProps;
};

export default useSummonerInfoProps;
