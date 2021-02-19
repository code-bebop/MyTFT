import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import getPlacementArraySeparatedByDateDiff, {
  PlacementArraySeparatedByDateDiffT
} from "../lib/getPlacementArray";
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

  useEffect(() => {
    if (summonerPuuid !== undefined) {
      const placemntArraySeparatedByDateDiff: PlacementArraySeparatedByDateDiffT = getPlacementArraySeparatedByDateDiff(
        matchDataSeparatedByDateDiff,
        summonerPuuid
      );

      const _placementStats = {};
      Object.keys(matchDataSeparatedByDateDiff).map(dateDiffOfMatch => {
        const average = (
          placemntArraySeparatedByDateDiff[dateDiffOfMatch]?.reduce(
            (acc, val) => {
              return acc + val;
            }
          ) / placemntArraySeparatedByDateDiff[dateDiffOfMatch]?.length
        ).toFixed(1);

        const wins = placemntArraySeparatedByDateDiff[dateDiffOfMatch]?.filter(
          placement => placement === 1
        ).length;

        const fourthOrHigher = placemntArraySeparatedByDateDiff[
          dateDiffOfMatch
        ]?.filter(placement => placement <= 4).length;

        _placementStats[dateDiffOfMatch] = {
          average,
          wins,
          fourthOrHigher
        };
      });

      setPlacementStats(_placementStats);
    }
  }, [matchDataSeparatedByDateDiff]);

  return placementStsts;
};

export default usePlacementStats;
