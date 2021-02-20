import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import getPlacementArraySeparatedByDateDiff, {
  PlacementArraySeparatedByDateDiffT
} from "../lib/getPlacementArraySeparatedByDateDiff";
import { RootState } from "../modules";
import { MatchDataSeparatedByDateDiffT } from "./useMatchDataSeparatedByDateDiff";

interface PlacementStatsT {
  [k: string]: {
    average: number;
    wins: number;
    fourthOrHigher: number;
  };
}

const usePlacementStats = (
  matchDataSeparatedByDateDiff: MatchDataSeparatedByDateDiffT
): PlacementStatsT => {
  const [placementStsts, setPlacementStats] = useState({});
  const { summonerPuuid } = useSelector(
    (state: RootState) => ({
      summonerPuuid: state.summoner.summonerInfo?.puuid
    }),
    shallowEqual
  );

  const isPlacement1st = (placement: number): boolean => placement === 1;
  const isPlacementFourthOrHigher = (placement: number): boolean =>
    placement <= 4;
  const getAveragePlacementArraySeparatedByDateDiff = (
    placemntArraySeparatedByDateDiff: PlacementArraySeparatedByDateDiffT,
    dateDiffOfMatch: string
  ): string => {
    return (
      placemntArraySeparatedByDateDiff[dateDiffOfMatch]?.reduce((acc, val) => {
        return acc + val;
      }) / placemntArraySeparatedByDateDiff[dateDiffOfMatch]?.length
    ).toFixed(1);
  };

  useEffect(() => {
    if (summonerPuuid !== undefined) {
      const placementArraySeparatedByDateDiff: PlacementArraySeparatedByDateDiffT = getPlacementArraySeparatedByDateDiff(
        matchDataSeparatedByDateDiff,
        summonerPuuid
      );
      const _placementStats = {};

      Object.keys(matchDataSeparatedByDateDiff).map(dateDiffOfMatch => {
        const average = getAveragePlacementArraySeparatedByDateDiff(
          placementArraySeparatedByDateDiff,
          dateDiffOfMatch
        );
        const wins = placementArraySeparatedByDateDiff[dateDiffOfMatch]?.filter(
          isPlacement1st
        ).length;
        const fourthOrHigher = placementArraySeparatedByDateDiff[
          dateDiffOfMatch
        ]?.filter(isPlacementFourthOrHigher).length;

        _placementStats[dateDiffOfMatch] = {
          average,
          wins,
          fourthOrHigher
        };
      });

      setPlacementStats(_placementStats);
    }
  }, [matchDataSeparatedByDateDiff, summonerPuuid]);

  return placementStsts;
};

export default usePlacementStats;
