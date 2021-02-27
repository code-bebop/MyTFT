import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../modules";
import { MatchInfoT } from "../types/types";

export interface MatchDataSeparatedByDateDiffT {
  [dateDiff: string]: MatchInfoT[];
}

const useMatchDataSeparatedByDateDiff = (): MatchDataSeparatedByDateDiffT => {
  const { matchInfoList } = useSelector(
    (state: RootState) => ({
      matchInfoList: state.matches.matches
    }),
    shallowEqual
  );
  const matchDataSeparatedByDateDiff = {};

  matchInfoList?.forEach(matchInfo => {
    const dateDiffOfMatch = Math.ceil(
      (new Date().getTime() -
        new Date(matchInfo.info.game_datetime).getTime()) /
        (1000 * 3600 * 24)
    );

    if (!matchDataSeparatedByDateDiff[dateDiffOfMatch]) {
      matchDataSeparatedByDateDiff[dateDiffOfMatch] = new Array(matchInfo);
    } else {
      matchDataSeparatedByDateDiff[
        dateDiffOfMatch
      ] = matchDataSeparatedByDateDiff[dateDiffOfMatch].concat(matchInfo);
    }
  });

  return matchDataSeparatedByDateDiff;
};

export default useMatchDataSeparatedByDateDiff;
