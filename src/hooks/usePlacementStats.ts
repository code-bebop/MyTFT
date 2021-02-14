import { useEffect, useState } from "react";
import { MatchDataSeparatedByDateDiffT } from "./useMatchDataSeparatedByDateDiff";
import { PlacementArraySeparatedByDateDiffT } from "./usePlacementArraySeparatedByDateDiff";

interface PlacementStatsT {
  [k: string]: {
    average: number;
    wins: number;
    fourthOrHigher: number;
  };
}

const usePlacementStats = (
  matchDataSeparatedByDateDiff: MatchDataSeparatedByDateDiffT,
  placemntArraySeparatedByDateDiff: PlacementArraySeparatedByDateDiffT
): PlacementStatsT => {
  const [placementStsts, setPlacementStats] = useState({});

  useEffect(() => {
    const _placementStats = {};
    Object.keys(matchDataSeparatedByDateDiff).map(key => {
      const average = (
        placemntArraySeparatedByDateDiff[key]?.reduce((acc, val) => {
          return acc + val;
        }) / placemntArraySeparatedByDateDiff[key]?.length
      ).toFixed(1);

      const wins = placemntArraySeparatedByDateDiff[key]?.filter(
        placement => placement === 1
      ).length;

      const fourthOrHigher = placemntArraySeparatedByDateDiff[key]?.filter(
        placement => placement <= 4
      ).length;

      _placementStats[key] = {
        average,
        wins,
        fourthOrHigher
      };
    });

    setPlacementStats(_placementStats);
  }, [matchDataSeparatedByDateDiff, placemntArraySeparatedByDateDiff]);

  return placementStsts;
};

export default usePlacementStats;
