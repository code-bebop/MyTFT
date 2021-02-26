import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import getTraitName from "../../../lib/getTraitName";
import { Trait } from "../../../types/types";
import HoverDes from "./HoverDes";

const TraitListBlock = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 8px;
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

interface TraitListItemPropsT {
  trait: Trait;
}

const TraitListItem = React.memo(
  ({ trait }: TraitListItemPropsT): ReactElement => {
    const [isTraitHover, setIsTraitHover] = useState(false);
    const traitName = getTraitName(trait.name);

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
          src={`../public/img/traits/${trait.name}.svg`}
          alt={`${trait.name}`}
          className="traitImg"
        />
      </TraitBox>
    );
  }
);
TraitListItem.displayName = "TraitListItem";

const TraitList = ({
  activatedTraits
}: {
  activatedTraits: Trait[];
}): ReactElement => {
  return (
    <TraitListBlock>
      {activatedTraits.map((trait, index) => (
        <TraitListItem trait={trait} key={index} />
      ))}
    </TraitListBlock>
  );
};

export default TraitList;
