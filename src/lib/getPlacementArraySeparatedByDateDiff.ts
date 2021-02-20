import { MatchDataSeparatedByDateDiffT } from "../hooks/useMatchDataSeparatedByDateDiff";
import findSearchedSummoner from "./findSearchedSummoner";

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
            findSearchedSummoner(matchInfo, summonerPuuid).placement
          ];
        } else {
          placementArraySeparatedByDateDiff[
            key
          ] = placementArraySeparatedByDateDiff[key].concat(
            findSearchedSummoner(matchInfo, summonerPuuid).placement
          );
        }
      }
    });
  });

  placementArraySeparatedByDateDiff;

  return placementArraySeparatedByDateDiff;
};

export default getPlacementArraySeparatedByDateDiff;
