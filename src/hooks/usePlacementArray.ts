import { shallowEqual, useSelector } from "react-redux";
import findSearchedSummonerInMatch from "../lib/findSearchedSummonerInMatch";
import { RootState } from "../modules";

const usePlacementArray = (): number[] => {
  const { summonerPuuid, matchInfoList } = useSelector(
    (state: RootState) => ({
      summonerPuuid: state.summoner.summonerInfo?.puuid,
      matchInfoList: state.matches.matches
    }),
    shallowEqual
  );

  const placementArray: number[] = [];
  if (summonerPuuid !== undefined) {
    matchInfoList?.forEach(matchInfo => {
      placementArray.push(
        findSearchedSummonerInMatch(matchInfo, summonerPuuid).placement
      );
    });
  }

  return placementArray;
};

export default usePlacementArray;
