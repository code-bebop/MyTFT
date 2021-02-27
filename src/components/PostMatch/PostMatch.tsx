import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../../modules";
import { matchAsync } from "../../modules/match";
import Wrapper from "../common/Wrapper";

const PostMatch = (): ReactElement => {
  const { matchId } = useParams<{ matchId: string }>();
  const { match } = useSelector((state: RootState) => ({
    match: state.match.match
  }));
  const dispatch = useDispatch();
  const dispatchMatch = (matchId: string): void => {
    dispatch(matchAsync.request(matchId));
  };

  return (
    <Wrapper>
      <p>{matchId}</p>
      <button
        onClick={() => {
          dispatchMatch(matchId);
        }}
      >
        dispatch match
      </button>
    </Wrapper>
  );
};

export default PostMatch;
