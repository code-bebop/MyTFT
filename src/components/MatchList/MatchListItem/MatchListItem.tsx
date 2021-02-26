import React, { ReactElement } from "react";
import styled from "styled-components";
import findSearchedSummonerInMatch from "../../../lib/findSearchedSummonerInMatch";

import { MatchInfoT, Participant } from "../../../types/types";
import TraitList from "./TraitList";
import UnitList from "./UnitList";

const MatchListItemBlock = styled.li<{ placement: number }>`
  display: flex;
  align-items: center;
  width: 624px;
  height: 68px;
  background-color: #182338;
  margin-bottom: 8px;
  padding-left: 4px;
  padding-right: 16px;
  border-left-width: 3px;
  border-left-style: solid;
  border-left-color: ${({ placement, theme }) => {
    switch (placement) {
      case 1:
        return theme.colors.placement.first;
      case 2:
        return theme.colors.placement.second;
      case 3:
        return theme.colors.placement.third;
      case 4:
        return theme.colors.placement.fourth;
      default:
        return theme.colors.placement.default;
    }
  }};
  border-radius: 5px;
  box-sizing: border-box;
`;

const LittleLegendImg = styled.img`
  width: 60px;
  height: 100%;
  object-fit: cover;
  margin-right: 20px;
`;

const MatchSummary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    margin: 0;
    font-size: 13px;
    &:nth-child(2) {
      color: #6a7e92;
    }
  }
`;

const Placement = styled.p<{ placement: number }>`
  margin-bottom: 7px;
  color: ${props => {
    switch (props.placement) {
      case 1:
        return "#E7B767";
      case 2:
        return "#9DA2B1";
      case 3:
        return "#AD8866";
      default:
        return "#576480";
    }
  }};
`;

export interface MatchListItemPropsT {
  matchInfo: MatchInfoT;
  puuid: string;
}

const unifySummonerUnits = (summoner: Participant): void => {
  const units = summoner.units;

  if (units.length < 9) {
    for (let i = units.length; i < 9; i++) {
      units.push({
        character_id: "",
        items: [],
        name: "",
        rarity: 0,
        tier: 0
      });
    }
  }
};

const sortSummonerUnits = (summoner: Participant): void => {
  const units = summoner.units;

  units.sort((a, b) => {
    return a.rarity < b.rarity ? 1 : a.rarity > b.rarity ? -1 : 0;
  });
};

const getFourActivatedTraits = (summoner: Participant) => {
  const activatedTraits = summoner.traits
    .filter(trait => trait.style)
    .sort((a, b) => {
      return a.style < b.style ? 1 : a.style > b.style ? -1 : 0;
    })
    .slice(0, 4);

  return activatedTraits;
};

const MatchListItem = ({
  matchInfo,
  puuid
}: MatchListItemPropsT): ReactElement => {
  const searchedSummoner = findSearchedSummonerInMatch(matchInfo, puuid);
  unifySummonerUnits(searchedSummoner);
  sortSummonerUnits(searchedSummoner);
  const activatedTraits = getFourActivatedTraits(searchedSummoner);

  return (
    <MatchListItemBlock placement={searchedSummoner.placement}>
      <LittleLegendImg src={`../public/img/champions/tempLittleLegend.png`} />
      <MatchSummary>
        <Placement placement={searchedSummoner.placement}>
          {searchedSummoner.placement}위
        </Placement>
        <p>{matchInfo.info.queue_id === 1100 ? "랭크" : "일반"}</p>
      </MatchSummary>
      <TraitList activatedTraits={activatedTraits} />
      <UnitList units={searchedSummoner.units} />
    </MatchListItemBlock>
  );
};

export default MatchListItem;
