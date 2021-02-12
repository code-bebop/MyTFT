import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import findSearchedSummoner from "../lib/findSearchedSummoner";
import { RootState } from "../modules";
import { MatchDataSeparatedByDateDiffT } from "./useMatchDataSeparatedByDateDiff";

export interface PlacementArraySeparatedByDateDiffT {
  [k: string]: number[];
}

const usePlacementArraySeparatedByDateDiff = (
  matchDataSeparatedByDateDiff: MatchDataSeparatedByDateDiffT
): PlacementArraySeparatedByDateDiffT => {
  const [
    placementArraySeparatedByDateDiff,
    setPlacementArraySeparatedByDateDiff
  ] = useState({});
  const { summonerPuuid } = useSelector(
    (state: RootState) => ({
      summonerPuuid: state.summoner.summonerInfo?.puuid
    }),
    shallowEqual
  );

  useEffect(() => {
    const _placementSeparatedByDateDiff = {};

    Object.keys(matchDataSeparatedByDateDiff).map(key => {
      matchDataSeparatedByDateDiff[key].map(matchInfo => {
        if (summonerPuuid !== undefined) {
          if (!_placementSeparatedByDateDiff[key]) {
            _placementSeparatedByDateDiff[key] = [
              findSearchedSummoner(matchInfo, summonerPuuid).placement
            ];
          } else {
            _placementSeparatedByDateDiff[key] = _placementSeparatedByDateDiff[
              key
            ].concat(findSearchedSummoner(matchInfo, summonerPuuid).placement);
          }
        }
      });
    });

    setPlacementArraySeparatedByDateDiff(_placementSeparatedByDateDiff);
  }, [summonerPuuid, matchDataSeparatedByDateDiff]);

  return placementArraySeparatedByDateDiff;
};

export default usePlacementArraySeparatedByDateDiff;
