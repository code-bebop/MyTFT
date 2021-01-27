import React, { ReactElement } from "react";
import styled from "styled-components";
import { MatchInfoT, Trait } from "../types/types";

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
`;

const TraitBg = styled.div<{ traitStyle: number }>`
  position: absolute;
  top: 0;
  left: 0;
  background: no-repeat url(../public/img/traits/bg.png);
  background-size: auto 22px;
  width: 20px;
  height: 22px;

  background-position: ${props => {
    return `${(props.traitStyle - 1) * -20}px`;
  }};
`;
//
interface TraitListItem {
  trait: Trait;
}

const TraitListItem = React.memo(
  ({ trait }: TraitListItem): ReactElement => {
    return (
      <TraitsBox>
        <TraitBg className="traitBg" traitStyle={trait.style} />
        <img
          src={`../public/img/traits/${trait.name}.svg`}
          alt={`${trait.name}`}
          className="traitImg"
        />
      </TraitsBox>
    );
  }
);
TraitListItem.displayName = "TraitListItem";

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

  const activatedTraits = searchedSummoner?.traits.filter(trait => trait.style);

  return (
    <MatchListItemBlock>
      <p>{searchedSummoner?.placement}위</p>
      <TraitList>
        {activatedTraits?.map((trait, index) => (
          <TraitListItem trait={trait} key={index} />
        ))}
      </TraitList>
    </MatchListItemBlock>
  );
};

export default MatchListItem;
