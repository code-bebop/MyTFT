import { shallowEqual, useSelector } from "react-redux";
import getPlacementArraySeparatedByDateDiff, {
  PlacementArraySeparatedByDateDiffT
} from "../lib/getPlacementArraySeparatedByDateDiff";
import { RootState } from "../modules";
import { MatchDataSeparatedByDateDiffT } from "./useMatchDataSeparatedByDateDiff";

export interface PlacementStatsT {
  [k: string]: {
    average: number;
    wins: number;
    fourthOrHigher: number;
  };
}

const isPlacementFirst = (placement: number): boolean => placement === 1;
const isPlacementFourthOrHigher = (placement: number): boolean =>
  placement <= 4;
const getAveragePlacementArraySeparatedByDateDiff = (
  placemntArraySeparatedByDateDiff: PlacementArraySeparatedByDateDiffT,
  dateDiffOfMatch: string
): number => {
  return Number(
    (
      placemntArraySeparatedByDateDiff[dateDiffOfMatch]?.reduce((acc, val) => {
        return acc + val;
      }) / placemntArraySeparatedByDateDiff[dateDiffOfMatch]?.length
    ).toFixed(1)
  );
};

const usePlacementStats = (
  matchDataSeparatedByDateDiff: MatchDataSeparatedByDateDiffT
): PlacementStatsT => {
  const { summonerPuuid } = useSelector(
    (state: RootState) => ({
      summonerPuuid: state.summoner.summonerInfo?.puuid
    }),
    shallowEqual
  );
  const placementStsts: PlacementStatsT = {};

  if (summonerPuuid !== undefined) {
    const placementArraySeparatedByDateDiff: PlacementArraySeparatedByDateDiffT = getPlacementArraySeparatedByDateDiff(
      matchDataSeparatedByDateDiff,
      summonerPuuid
    );

    Object.keys(matchDataSeparatedByDateDiff).map(dateDiffOfMatch => {
      const average = getAveragePlacementArraySeparatedByDateDiff(
        placementArraySeparatedByDateDiff,
        dateDiffOfMatch
      );
      const wins = placementArraySeparatedByDateDiff[dateDiffOfMatch]?.filter(
        isPlacementFirst
      ).length;
      const fourthOrHigher = placementArraySeparatedByDateDiff[
        dateDiffOfMatch
      ]?.filter(isPlacementFourthOrHigher).length;

      placementStsts[dateDiffOfMatch] = {
        average,
        wins,
        fourthOrHigher
      };
    });
  }

  return placementStsts;
};

export default usePlacementStats;
