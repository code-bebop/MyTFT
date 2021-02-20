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

const getWinRate = (wins: number, losses: number): number =>
  Number(((wins / (wins + losses)) * 100).toFixed(2));

const getDateDiffBetweenRevisionDateAndPresent = (
  revisionDate: number
): number =>
  Math.ceil(
    (new Date().getTime() - new Date(revisionDate).getTime()) /
      (1000 * 3600 * 24)
  );

const useSummonerInfoProps = (): SummonerInfoPropsT => {
  const { summonerInfo, rankEntry } = useSelector(
    (state: RootState) => ({
      summonerInfo: state.summoner.summonerInfo,
      rankEntry: state.summoner.rankEntry
    }),
    shallowEqual
  );
  const placementArray = usePlacementArray();
  let summonerInfoProps: SummonerInfoPropsT = {
    requireSummonerInfoProps: {
      summonerName: "",
      profileIconId: 0,
      summonerLevel: 0,
      dateDiff: 0,
      placementArray: [0]
    }
  };

  if (summonerInfo && rankEntry && placementArray) {
    const {
      name: summonerName,
      profileIconId,
      summonerLevel,
      revisionDate
    } = ensure(summonerInfo);
    const dateDiff = getDateDiffBetweenRevisionDateAndPresent(revisionDate);
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
      const winRate = getWinRate(wins, losses);
      const optionalSummonerInfoProps: OptionalSummonerInfoPropsT = {
        summonerTier,
        summonerRank,
        leaguePoints,
        wins,
        losses,
        winRate
      };
      summonerInfoProps = {
        requireSummonerInfoProps,
        optionalSummonerInfoProps
      };
    } else {
      summonerInfoProps = {
        requireSummonerInfoProps
      };
    }
  }

  return summonerInfoProps;
};

export default useSummonerInfoProps;
