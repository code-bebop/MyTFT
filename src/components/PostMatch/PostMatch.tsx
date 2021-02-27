import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { matchAsync } from "../../modules/match";

const PostMatch = (): ReactElement => {
  const { matchId } = useParams<{ matchId: string }>();
  const dispatch = useDispatch();
  const dispatchMatch = (matchId: string): void => {
    dispatch(matchAsync.request(matchId));
  };

  return (
    <>
      <p>{matchId}</p>
      <button
        onClick={() => {
          dispatchMatch(matchId);
        }}
      >
        dispatch match
      </button>
    </>
  );
};

export default PostMatch;
