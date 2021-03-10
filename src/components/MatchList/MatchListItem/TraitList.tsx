import React, { ReactElement, useState } from "react";
import styled, { css } from "styled-components";
import getTraitName from "../../../lib/getTraitName";
import { Trait } from "../../../types/types";
import HoverDes from "./HoverDes";

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
  background: no-repeat url(/public/img/traits/bg.png);
  background-size: auto 22px;
  width: 20px;
  height: 22px;

  background-position: ${props => {
    return `${(props.traitStyle - 1) * -20}px`;
  }};
`;

interface TraitListItemPropsT {
  trait: Trait;
}

const TraitListItem = React.memo(
  ({ trait }: TraitListItemPropsT): ReactElement => {
    const [isTraitHover, setIsTraitHover] = useState(false);
    const traitName = getTraitName(trait.name);
    if (trait.style === 0) {
      return <></>;
    }

    return (
      <TraitBox
        onMouseOver={() => {
          setIsTraitHover(true);
        }}
        onMouseOut={() => {
          setIsTraitHover(false);
        }}
      >
        <TraitBg className="traitBg" traitStyle={trait.style} />
        {isTraitHover && (
          <HoverDes>
            <p>{traitName}</p>
          </HoverDes>
        )}
        <img
          src={`/public/img/traits/${trait.name}.svg`}
          alt={`${trait.name}`}
          className="traitImg"
        />
      </TraitBox>
    );
  }
);
TraitListItem.displayName = "TraitListItem";

const TraitListBlock = styled.div<{ isWrap: boolean }>`
  display: flex;
  margin-left: auto;
  margin-right: 8px;
  ${props =>
    props.isWrap &&
    css`
      flex-wrap: wrap;
      justify-content: center;
      margin: 0;
      padding: 0 16px;
      min-width: 66px;
    `}
`;

const TraitList = ({
  activatedTraits,
  isWrap = false
}: {
  activatedTraits: Trait[];
  isWrap?: boolean;
}): ReactElement => {
  return (
    <TraitListBlock isWrap={isWrap}>
      {activatedTraits.map((trait, index) => (
        <TraitListItem trait={trait} key={index} />
      ))}
    </TraitListBlock>
  );
};

export default TraitList;
