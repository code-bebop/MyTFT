import React, { ReactElement } from "react";
import styled from "styled-components";
import { Trait } from "../../types/types";

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
