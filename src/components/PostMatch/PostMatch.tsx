import React, { ReactElement } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const PostMatch = (): ReactElement => {
  const { matchId } = useParams<{ matchId: string }>();

  return <p>{matchId}</p>;
};

export default PostMatch;
