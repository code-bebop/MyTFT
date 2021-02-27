import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../modules";
import { MatchT } from "../types/types";

export interface MatchDataSeparatedByDateDiffT {
  [dateDiff: string]: MatchT[];
}

const useMatchDataSeparatedByDateDiff = (): MatchDataSeparatedByDateDiffT => {
  const { matches } = useSelector(
    (state: RootState) => ({
      matches: state.matches.matches
    }),
    shallowEqual
  );
  const matchDataSeparatedByDateDiff = {};

  matches?.forEach(match => {
    const dateDiffOfMatch = Math.ceil(
      (new Date().getTime() - new Date(match.info.game_datetime).getTime()) /
        (1000 * 3600 * 24)
    );

    if (!matchDataSeparatedByDateDiff[dateDiffOfMatch]) {
      matchDataSeparatedByDateDiff[dateDiffOfMatch] = new Array(match);
    } else {
      matchDataSeparatedByDateDiff[
        dateDiffOfMatch
      ] = matchDataSeparatedByDateDiff[dateDiffOfMatch].concat(match);
    }
  });

  return matchDataSeparatedByDateDiff;
};

export default useMatchDataSeparatedByDateDiff;
