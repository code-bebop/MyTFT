import React, { ReactElement, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMatch } from "../lib/api";
import { RootState } from "../modules";
import { matchAsync } from "../modules/match";

const MatchListContainer = (): ReactElement => {
  const { matchIds } = useSelector((state: RootState) => ({
    matchIds: state.summoner.matchIds
  }));
  const dispatch = useDispatch();
  const getMatchResponse = useCallback(() => {
    dispatch(matchAsync.request(matchIds));
  }, [matchIds]);

  return (
    <>
      <p>매치 리스트</p>
      <button onClick={getMatchResponse}>매치 정보 얻어오기</button>
    </>
  );
};

export default MatchListContainer;
