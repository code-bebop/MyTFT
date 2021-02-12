import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../modules";
import { MatchInfoT } from "../types/types";

export interface MatchDataSeparatedByDateDiffT {
  [k: string]: MatchInfoT[];
}

const useMatchDataSeparatedByDateDiff = (): MatchDataSeparatedByDateDiffT => {
  const [
    matchDataSeparatedByDateDiff,
    setMatchDataSeparatedByDateDiff
  ] = useState({});
  const { matchInfoList } = useSelector(
    (state: RootState) => ({
      matchInfoList: state.match.matchInfoList
    }),
    shallowEqual
  );

  useEffect(() => {
    setMatchDataSeparatedByDateDiff({});
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

    setMatchDataSeparatedByDateDiff(_matchDataSeparatedByDateDiff);
  }, [matchInfoList]);

  return matchDataSeparatedByDateDiff;
};

export default useMatchDataSeparatedByDateDiff;
