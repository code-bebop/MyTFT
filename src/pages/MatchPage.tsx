import React, { ReactElement } from "react";
import { RouteComponentProps } from "react-router-dom";

interface MatchParams {
  matchId: string;
}

const MatchPage = ({
  match
}: RouteComponentProps<MatchParams>): ReactElement => {
  return <p>{match.params.matchId}</p>;
};

export default MatchPage;
