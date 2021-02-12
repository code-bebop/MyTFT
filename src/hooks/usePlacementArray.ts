import { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import ensure from "../lib/ensure";
import { RootState } from "../modules";
import { Participant } from "../types/types";

const usePlacementArray = (): number[] => {
  const { summonerInfo, matchInfoList } = useSelector(
    (state: RootState) => ({
      summonerInfo: state.summoner.summonerInfo,
      matchInfoList: state.match.matchInfoList
    }),
    shallowEqual
  );

  const [placementArray, setPlacementArray] = useState<number[]>([]);

  useEffect(() => {
    const _placementArray: number[] = [];

    matchInfoList?.forEach(matchInfo => {
      _placementArray.push(
        ensure<Participant>(
          matchInfo.info.participants.find(participant => {
            return participant.puuid === summonerInfo?.puuid;
          })
        ).placement
      );
    });

    setPlacementArray(_placementArray);
  }, [matchInfoList]);

  return placementArray;
};

export default usePlacementArray;
