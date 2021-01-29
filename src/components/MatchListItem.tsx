import React, { ReactElement } from "react";
import styled from "styled-components";
import { MatchInfoT, Trait, Unit } from "../types/types";

const MatchListItemBlock = styled.li`
  display: flex;
  align-items: center;
  width: 624px;
  height: 68px;
  background-color: #182338;
  margin-bottom: 8px;
`;

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

interface UnitBoxProps {
  rarity: number;
  chosen?: string;
}

const UnitBox = styled.li<UnitBoxProps>`
  position: relative;
  width: 34px;
  height: 34px;
  list-style-type: none;
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  padding: 2px;
  border-color: ${props => {
    if (props.chosen) {
      return "#ECF0F6";
    }
    switch (props.rarity) {
      case 0:
        return "#2F455B";
      case 1:
        return "#0C9152";
      case 2:
        return "#3E8DBF";
      case 3:
        return "#CB11B1";
      case 4:
        return "#D9A929";
      default:
        break;
    }
  }};
  & + & {
    margin-left: 2px;
  }
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
      <UnitBox rarity={unit.rarity} chosen={unit.chosen}>
        <UnitTiers tier={unit.tier} />
        <img
          src={`../public/img/champions/${unit.character_id}.png`}
          alt={`${unit.character_id}`}
        />
        <UnitItemList items={unit.items} />
      </UnitBox>
    );
  }
);
UnitListItem.displayName = " UnitListItem";

const UnitTiersBlock = styled.div`
  display: flex;
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  img {
    width: 10px;
    height: 10px;
  }
`;

const UnitTiers = ({ tier }: { tier: number }): ReactElement | null => {
  if (tier === 2) {
    return (
      <UnitTiersBlock>
        <img
          src="../public/img/champions/TFT-StarSilver.svg"
          alt="TFT-StarSilver"
        />
        <img
          src="../public/img/champions/TFT-StarSilver.svg"
          alt="TFT-StarSilver"
        />
      </UnitTiersBlock>
    );
  }
  if (tier === 3) {
    return (
      <UnitTiersBlock>
        <img
          src="../public/img/champions/TFT-StarGold.svg"
          alt="TFT-StarGold"
        />
        <img
          src="../public/img/champions/TFT-StarGold.svg"
          alt="TFT-StarGold"
        />
        <img
          src="../public/img/champions/TFT-StarGold.svg"
          alt="TFT-StarGold"
        />
      </UnitTiersBlock>
    );
  }
  return null;
};

const UnitItemListBlock = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 34px;
  img {
    width: 12px;
    height: 12px;
  }
`;

const UnitItemList = ({ items }: { items?: number[] }): ReactElement | null => {
  if (items) {
    return (
      <UnitItemListBlock>
        {items.map((item, index) => {
          return (
            <img
              src={`../public/img/items/${item}.png`}
              alt={`${item}`}
              key={index}
            />
          );
        })}
      </UnitItemListBlock>
    );
  }
  return null;
};

// Unit 관련 컴포넌트 종료

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

  const activatedTraits = searchedSummoner?.traits
    .filter(trait => trait.style)
    .sort((a, b) => {
      return a.style < b.style ? 1 : a.style > b.style ? -1 : 0;
    });

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
