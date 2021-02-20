import { useEffect, useRef } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../modules";
import { MatchInfoT } from "../types/types";

export interface MatchDataSeparatedByDateDiffT {
  [dateDiff: string]: MatchInfoT[];
}

const useMatchDataSeparatedByDateDiff = (): MatchDataSeparatedByDateDiffT => {
  const matchDataSeparatedByDateDiff = useRef<MatchDataSeparatedByDateDiffT>(
    {}
  );
  const { matchInfoList } = useSelector(
    (state: RootState) => ({
      matchInfoList: state.match.matchInfoList
    }),
    shallowEqual
  );

  useEffect(() => {
    const _matchDataSeparatedByDateDiff = {};
    matchInfoList?.forEach(matchInfo => {
      const dateDiffOfMatch = Math.ceil(
        (new Date().getTime() -
          new Date(matchInfo.info.game_datetime).getTime()) /
          (1000 * 3600 * 24)
      );

      if (!_matchDataSeparatedByDateDiff[dateDiffOfMatch]) {
        _matchDataSeparatedByDateDiff[dateDiffOfMatch] = new Array(matchInfo);
      } else {
        _matchDataSeparatedByDateDiff[
          dateDiffOfMatch
        ] = _matchDataSeparatedByDateDiff[dateDiffOfMatch].concat(matchInfo);
      }
    });

    matchDataSeparatedByDateDiff.current = _matchDataSeparatedByDateDiff;
  }, [matchInfoList]);

  return matchDataSeparatedByDateDiff.current;
};

export default useMatchDataSeparatedByDateDiff;
