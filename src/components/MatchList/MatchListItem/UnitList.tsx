import React, { ReactElement, useState } from "react";
import styled, { css } from "styled-components";
import getChampion from "../../../lib/getChampion";
import getTraitName from "../../../lib/getTraitName";
import { Unit } from "../../../types/types";
import HoverDes from "./HoverDes";
import itemsSet4 from "../../../../public/json/items/items_set4.json";
import itemsSet4Update from "../../../../public/json/items/items_set4update.json";
import getUniqueObjectArray from "../../../lib/getUniqueObjectArray";

const UnitItemListBlock = styled.div`
  position: absolute;
  left: 0;
  display: flex;
  justify-content: center;
  width: 34px;
  img {
    width: 11px;
    height: 12px;
    border-radius: 2px;
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

const UnitTierBlock = styled.div`
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
const UnitTier = ({ tier }: { tier: number }): ReactElement | null => {
  if (tier === 2) {
    return (
      <UnitTierBlock>
        <img
          src="../public/img/champions/TFT-StarSilver.svg"
          alt="TFT-StarSilver"
        />
        <img
          src="../public/img/champions/TFT-StarSilver.svg"
          alt="TFT-StarSilver"
        />
      </UnitTierBlock>
    );
  }
  if (tier === 3) {
    return (
      <UnitTierBlock>
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
      </UnitTierBlock>
    );
  }
  return null;
};

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
  box-sizing: border-box;
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
  &:hover {
    & > img {
      filter: brightness(130%);
    }
  }
  ${props => {
    if (props.chosen) {
      return css`
        &::before {
          display: block;
          position: absolute;
          right: 0;
          top: -5px;
          content: "";
          width: 12px;
          height: 13px;
          background: url(../public/img/champions/TFT_Chosen_icon.svg);
        }
      `;
    }
  }}

  & + & {
    margin-left: 2px;
  }
  & > img {
    width: 100%;
    height: 100%;
  }
`;
const TraitInHoverDes = styled.span<{ isChosen: boolean }>`
  margin-top: 10px;
  font-size: 14px;
  &:not(:last-child) {
    &::after {
      content: " · ";
      display: inline;
      color: #fff;
    }
  }
  ${props => {
    if (props.isChosen) {
      return css`
        color: #b362ba;
        &::before {
          display: inline-block;
          content: "";
          width: 12px;
          height: 13px;
          margin-right: 5px;
          background: url(../public/img/champions/TFT_Chosen_icon.svg);
        }
      `;
    }
  }}
`;
const ItemsInHoverDes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 4px;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 4px 0;
    & > img {
      width: 24px;
      height: 24px;
      border-radius: 5px;
    }
    & > p {
      margin: 0;
      margin-left: 8px;
      font-size: 13px;
      color: #8095a9;
    }
  }
`;
interface UnitListItemPropsT {
  unit: Unit;
}
const UnitListItem = React.memo(
  ({ unit }: UnitListItemPropsT): ReactElement => {
    const [isUnitBeHovered, setIsUnitBeHovered] = useState(false);
    const champion = getChampion(unit);
    const isUnitChosen = unit.chosen ? true : false;
    const isUnitHaveItem = unit.items.length !== 0 ? true : false;
    const itemsJsonArray = [...itemsSet4Update, ...itemsSet4];
    const itemsUniqueJsonArray = getUniqueObjectArray(itemsJsonArray);

    if (unit.character_id === "") {
      return <UnitBox rarity={unit.rarity} />;
    }
    return (
      <UnitBox
        rarity={unit.rarity}
        chosen={unit.chosen}
        onMouseOver={() => {
          setIsUnitBeHovered(true);
        }}
        onMouseOut={() => {
          setIsUnitBeHovered(false);
        }}
      >
        <UnitTier tier={unit.tier} />
        {isUnitBeHovered && (
          <HoverDes>
            <p>{champion.name}</p>
            {isUnitChosen && (
              <p>
                {champion.traits.map(trait => {
                  const traitName = getTraitName(trait);
                  let isTraitChosen = false;
                  if (isUnitChosen) {
                    const chosenTrait = getTraitName(unit.chosen!);
                    isTraitChosen = traitName === chosenTrait ? true : false;
                  }
                  return (
                    <TraitInHoverDes key={trait} isChosen={isTraitChosen}>
                      {traitName}
                    </TraitInHoverDes>
                  );
                })}
              </p>
            )}
            {isUnitHaveItem && (
              <ItemsInHoverDes>
                {unit.items.map(item => {
                  return (
                    <div key={item}>
                      <img
                        src={`../public/img/items/${item}.png`}
                        alt={`${item}`}
                      />
                      <p>
                        {
                          itemsUniqueJsonArray.find(itemJson => {
                            return itemJson.id === item;
                          })?.name
                        }
                      </p>
                    </div>
                  );
                })}
              </ItemsInHoverDes>
            )}
          </HoverDes>
        )}
        <img
          src={`../public/img/champions/${unit.character_id}.png`}
          alt={`${unit.character_id}`}
        />
        <UnitItemList items={unit.items} />
      </UnitBox>
    );
  }
);
UnitListItem.displayName = "UnitListItem";

const UnitListBlock = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;
`;
const UnitList = ({ units }: { units: Unit[] }): ReactElement => {
  return (
    <UnitListBlock>
      {units.map((unit, index) => (
        <UnitListItem unit={unit} key={index} />
      ))}
    </UnitListBlock>
  );
};

export default UnitList;
