import React, { ReactElement, useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";

import SummonerInfo, { SummonerInfoT } from "../components/SummonerInfo";
import ensure from "../lib/ensure";
import { RootState } from "../modules";
import { Participant } from "../types/types";

const SummonerInfoContainer = (): ReactElement => {
  console.log("SummonerInfoContainer 맨 윗 줄");
  const { summonerInfo, rankEntry, matchInfoList } = useSelector(
    (state: RootState) => ({
      summonerInfo: state.summoner.summonerInfo,
      rankEntry: state.summoner.rankEntry,
      matchInfoList: state.match.matchInfoList
    }),
    shallowEqual
  );

  const usePlacementArray = () => {
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

      console.log("usePlacementArray 실행");
    }, [matchInfoList]);

    return placementArray;
  };

  const placementArray = usePlacementArray();

  const useSummonerInfoProps = () => {
    const [
      summonerInfoProps,
      setSummonerInfoProps
    ] = useState<SummonerInfoT | null>(null);

    useEffect(() => {
      if (summonerInfo && rankEntry && placementArray) {
        const {
          name: summonerName,
          profileIconId,
          summonerLevel,
          revisionDate
        } = ensure(summonerInfo);
        const dateDiff = Math.ceil(
          (new Date().getTime() - new Date(revisionDate).getTime()) /
            (1000 * 3600 * 24)
        );

        if (rankEntry?.length !== 0) {
          const {
            tier: summonerTier,
            rank: summonerRank,
            leaguePoints,
            wins,
            losses
          } = ensure(rankEntry[0]);
          const winRate = Number(((wins / (wins + losses)) * 100).toFixed(2));
          const temp: SummonerInfoT = {
            summonerName,
            profileIconId,
            summonerLevel,
            dateDiff,
            summonerTier,
            summonerRank,
            leaguePoints,
            wins,
            losses,
            winRate,
            placementArray
          };
          setSummonerInfoProps(temp);
        } else {
          const temp: SummonerInfoT = {
            summonerName,
            profileIconId,
            summonerLevel,
            dateDiff,
            placementArray
          };
          setSummonerInfoProps(temp);
        }
      }
      console.log("summonerInfoProps Effect 실행");
    }, [summonerInfo, rankEntry, matchInfoList, placementArray]);

    return summonerInfoProps;
  };

  const summonerInfoProps = useSummonerInfoProps();

  console.log("SummonerInfoContainer 맨 아랫 줄");
  if (!summonerInfoProps || summonerInfoProps.summonerName === "Error") {
    return <p>데이터 없음</p>;
  } else {
    return <SummonerInfo summonerInfoProps={summonerInfoProps} />;
  }
};

export default SummonerInfoContainer;
