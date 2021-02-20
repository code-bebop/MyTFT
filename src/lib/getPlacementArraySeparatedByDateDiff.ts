import { MatchDataSeparatedByDateDiffT } from "../hooks/useMatchDataSeparatedByDateDiff";
import findSearchedSummonerInMatch from "./findSearchedSummonerInMatch";

export interface PlacementArraySeparatedByDateDiffT {
  [dateDiff: string]: number[];
}

const getPlacementArraySeparatedByDateDiff = (
  matchDataSeparatedByDateDiff: MatchDataSeparatedByDateDiffT,
  summonerPuuid: string
): PlacementArraySeparatedByDateDiffT => {
  const placementArraySeparatedByDateDiff: PlacementArraySeparatedByDateDiffT = {};

  Object.keys(matchDataSeparatedByDateDiff).map(key => {
    matchDataSeparatedByDateDiff[key].map(matchInfo => {
      if (summonerPuuid !== undefined) {
        if (!placementArraySeparatedByDateDiff[key]) {
          placementArraySeparatedByDateDiff[key] = [
            findSearchedSummonerInMatch(matchInfo, summonerPuuid).placement
          ];
        } else {
          placementArraySeparatedByDateDiff[
            key
          ] = placementArraySeparatedByDateDiff[key].concat(
            findSearchedSummonerInMatch(matchInfo, summonerPuuid).placement
          );
        }
      }
    });
  });

  placementArraySeparatedByDateDiff;

  return placementArraySeparatedByDateDiff;
};

export default getPlacementArraySeparatedByDateDiff;
