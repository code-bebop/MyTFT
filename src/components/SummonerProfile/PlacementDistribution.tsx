import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";

const PlacementDistributionBlock = styled.div`
  display: flex;
  flex-direction: column;
  & > span {
    font-size: 12px;
    color: #89a0b5;
    margin-bottom: 25px;
  }
  p {
    margin: 0;
    font-size: 10px;
  }
`;

const PlacementDistributonTable = styled.div`
  display: flex;
`;

const ChartAxisY = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 20px;
  height: 100px;
  color: #717fa0;
`;

const CahrtRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ChartBarList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 100px;
`;

const ChartBar = styled.div<{
  frequent: number;
  frequentMax: number;
  placement: number;
}>`
  width: 4px;
  height: ${({ frequent, frequentMax }) => {
    return `${(frequent / frequentMax) * 100}%`;
  }};
  border-radius: 5px;
  background-color: ${({ placement, theme }) => {
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
`;

const ChartAxisX = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
`;

const ChartAxisXEntry = styled.p<{ placement: number }>`
  color: ${({ placement, theme }) => {
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
`;

export interface PlacementDistributionPropsT {
  placementArray: number[];
}

const PlacementDistribution = ({
  placementArray
}: PlacementDistributionPropsT): ReactElement => {
  const UseFrequentArray = () => {
    const [frequentArray, setFrequentArary] = useState<number[]>([]);

    useEffect(() => {
      const frequentInfo = placementArray.reduce((acc, val) => {
        if (Object.prototype.hasOwnProperty.call(acc, val)) {
          acc[val] = acc[val] + 1;
        } else {
          acc[val] = 1;
        }
        return acc;
      }, {});

      for (let i = 1; i <= 8; i++) {
        if (frequentInfo[i] === undefined) {
          frequentInfo[i] = 0;
        }
      }

      const _frequentArray: number[] = Object.keys(frequentInfo).map(
        key => frequentInfo[key]
      );

      setFrequentArary(_frequentArray);
    }, [placementArray]);

    return frequentArray;
  };

  const frequentArray = UseFrequentArray();

  return (
    <>
      {frequentArray.length !== 0 && (
        <>
          <PlacementDistributionBlock>
            <span>최근 20게임 결과 통계표</span>
            <PlacementDistributonTable>
              <ChartAxisY>
                <p>{Math.max.apply(null, frequentArray)}</p>
                <p>
                  {Math.round(
                    Math.max.apply(null, frequentArray) +
                      Math.min.apply(null, frequentArray)
                  ) / 2}
                </p>
                <p>1</p>
              </ChartAxisY>
              <CahrtRight>
                <ChartBarList>
                  {frequentArray.map((frequent, index) => {
                    return (
                      <ChartBar
                        key={index}
                        frequent={frequent}
                        frequentMax={Math.max.apply(null, frequentArray)}
                        placement={index + 1}
                      />
                    );
                  })}
                </ChartBarList>
                <ChartAxisX>
                  {frequentArray.map((frequent, index) => {
                    return (
                      <ChartAxisXEntry key={index} placement={index + 1}>
                        {index + 1}
                      </ChartAxisXEntry>
                    );
                  })}
                </ChartAxisX>
              </CahrtRight>
            </PlacementDistributonTable>
          </PlacementDistributionBlock>
        </>
      )}
    </>
  );
};

export default PlacementDistribution;
