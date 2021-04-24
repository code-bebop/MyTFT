import React, { ReactElement } from "react";
import styled from "styled-components";

export const getSortRowFlexGlow = () => {
  const flexRateArray = [17, 41, 10, 8, 8, 8, 8];

  return flexRateArray.map((flexRate, index) => {
    return `&:nth-child(${index + 1}) {flex: ${flexRate} 1 0%}`;
  });
};

const SortRowBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  margin-bottom: 20px;
  p {
    font-size: 12px;
    color: #89a0b5;
    margin: 0;
    text-align: center;
    ${getSortRowFlexGlow()}
  }
`;

const SortRow = (): ReactElement => {
  return (
    <SortRowBlock>
      <p>순위</p>
      <p>챔피언</p>
      <p>직업과 종족</p>
      <p>남은 골드</p>
      <p>플레이어 처치</p>
      <p>가한 피해량</p>
      <p>최종 라운드</p>
    </SortRowBlock>
  );
};

export default SortRow;
