import React, { ReactElement } from "react";
import styled from "styled-components";
import { MatchInfoT, Trait, Unit } from "../types/types";

const MatchListItemBlock = styled.li``;

// Trait 관련 컴포넌트 시작

const TraitList = styled.div`
  display: flex;
`;

const TraitBox = styled.div`
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
interface TraitListItemPropsT {
  trait: Trait;
}

const TraitListItem = React.memo(
  ({ trait }: TraitListItemPropsT): ReactElement => {
    return (
      <TraitBox>
        <TraitBg className="traitBg" traitStyle={trait.style} />
        <img
          src={`../public/img/traits/${trait.name}.svg`}
          alt={`${trait.name}`}
          className="traitImg"
        />
      </TraitBox>
    );
  }
);
TraitListItem.displayName = "TraitListItem";

// Trait 관련 컴포넌트 종료

// Unit 관련 컴포넌트 시작

const UnitList = styled.ul`
  display: flex;
  padding: 0;
`;

const UnitBox = styled.li`
  width: 34px;
  height: 34px;
  list-style-type: none;
  img {
    width: 34px;
    height: 34px;
  }
`;

interface UnitListItemPropsT {
  unit: Unit;
}

const UnitListItem = React.memo(
  ({ unit }: UnitListItemPropsT): ReactElement => {
    return (
      <UnitBox>
        <img
          src={`../public/img/champions/${unit.character_id}.png`}
          alt={`${unit.character_id}`}
        />
      </UnitBox>
    );
  }
);
UnitListItem.displayName = " UnitListItem";

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
      <UnitList>
        {searchedSummoner?.units.map((unit, index) => (
          <UnitListItem unit={unit} key={index} />
        ))}
      </UnitList>
    </MatchListItemBlock>
  );
};

export default MatchListItem;
