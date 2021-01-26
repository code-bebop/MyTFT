import React, { ReactElement } from "react";
import styled from "styled-components";
import { MatchInfoT } from "../types/types";

const MatchListItemBlock = styled.li``;

const TraitList = styled.div`
  display: flex;
`;

const TraitsBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 22px;
  .traitImg {
    z-index: 1;
    width: 12px;
    height: 15px;
  }
  .traitBg {
    position: absolute;
    top: 0;
    left: 0;
    background: no-repeat url(../public/img/traits/bg.png) -85px 0;
    background-size: auto 22px;
    width: 20px;
    height: 22px;
  }
`;

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
    <MatchListItemBlock>
      <p>{searchedSummoner?.placement}위</p>
      <TraitList>
        <TraitsBox>
          <div className="traitBg" />
          <img
            src={`../public/img/traits/${searchedSummoner?.traits[0].name}.svg`}
            alt="조율자"
            className="traitImg"
          />
        </TraitsBox>
        <TraitsBox>
          <div className="traitBg" />
          <img
            src="../public/img/traits/assassin.svg"
            alt="조율자"
            className="traitImg"
          />
        </TraitsBox>
      </TraitList>
    </MatchListItemBlock>
  );
};

export default MatchListItem;
