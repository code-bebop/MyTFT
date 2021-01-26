import React, { ReactElement } from "react";
import { MatchInfoT, MatchResponseT } from "../types/types";

export interface MatchListItemPropsT {
  matchInfo: MatchInfoT;
  puuid: string;
}

const MatchListItem = ({
  matchInfo,
  puuid
}: MatchListItemPropsT): ReactElement => {
  const searchedSummoner = matchInfo.info.participants.find(participant => {
    return participant.puuid === puuid;
  });

  return (
    <>
      <p>{searchedSummoner?.placement}</p>
    </>
  );
};

export default MatchListItem;
