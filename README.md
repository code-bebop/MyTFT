# MyTFT
Riot Developer API를 이용한 TFT 전적 검색 웹사이트를 만드는 프로젝트


# 제공하는 기능

## 소환사의 최근 전적 및 요약 정보 검색
소환사의 닉네임을 검색하면 해당 소환사의 요약된 정보, 최근 20게임 전적, 그리고 게임의 날짜별 분류 및 성적 요약 등의 정보를 표시한다.
챔피언이나 특성에 마우스를 올리면 그에 대한 정보를 표시하고, 챔피언의 경우 좀 더 디테일한 정보(장착한 아이템, 선택받은 자 특성)를 제공한다.

## 전적 상세 정보
전적을 클릭하면 해당 경기의 정보를 요약해서 보여준다.
해당 경기의 길이와 경기가 치뤄진 일시를 표시한다. 또한 참가한 소환사들을 순위로 정렬해 보여주고, 각 소환사가 사용한 덱, 입힌 피해량, 몇 라운드까지 갔는지, 경기가 끝날 때 몇 골드가 남았는지, 몇 명의 플레이어를 처치했는지 등의 정보이다.

## 다른 소환사의 전적
전적 상세정보에서 다른 소환사의 이름을 클릭하면 해당 소환사를 검색한다.


# 주로 사용된 기술

## React + TypeScript
이 프로젝트가 React와 Typescript를 사용한 2번째 개인 프로젝트이다. 확실히 프로젝트를 거듭할 수록 실력이 향상되는 것이 느껴진다.(그래봤자 아직 초보자 수준이고 이런 생각이 건방져보이는 것은 알고 있다.
하지만 아직 TypeScript는 초보중의 초보 수준이라고 생각된다. 인터넷을 보면 분명 TypeScript로 더 굉장한 일을 할 수 있는데, 그걸 못 하고 있다는 걸 알 수 있다.
이는 내가 다양한 TypeScript 패턴을 접하지 못 했기 때문이기도 하고, TypeScript 문법에 대한 숙련도가 낮기 때문이기도 하다.

### Hook을 통한 presentational component와 container component의 통합
이 프로젝트를 진행하다 React에 대한 흥미로운 내용을 접했다. 기존에 presentational component와 container component를 분리하는 부분을 Hook을 사용해 없앨 수 있다는 내용이었다.
평소에도 presentational / container 형식의 컴포넌트 분리 방법이 프로젝트 구조를 더 복잡하게 만들고, 또 그렇게 나누기 애매한 component도 많이 있었기 때문에 아주 매력적인 내용이었다.
그 글을 읽자마자 이 프로젝트에 적용했고, 실제로 부족한 것 없이 간단해진 프로젝트 구조를 가질 수 있었다. 이는 개발효율의 향상으로도 이어졌다.

### Chart 만들기
소환사 정보에는 최근 20 게임 순위를 그래프로 나타내는 부분도 포함되어 있다.
그래프를 만들기 위해서 d3.js나 chart.js 라이브러리를 고려해봤는데 생각한 모양의 차트는 만들기 힘들 뿐 더러 필요없는 기능도 붙어있고, 여러 차트들의 템플릿을 제공하다보니 라이브러리가 너무 무거웠다.
이래서는 배보다 배꼽이 더 큰 꼴이기 때문에 그냥 내가 만들기로 했다.

```js
// placementDistribution.tsx

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
  placementArray // 1번 설명
}: PlacementDistributionPropsT): ReactElement => {
  const UseFrequentArray = () => {
    const [frequentArray, setFrequentArary] = useState<number[]>([]);

    useEffect(() => {
      const frequentInfo = placementArray.reduce((acc, val) => { // 2번 설명
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

      const _frequentArray: number[] = Object.keys(frequentInfo).map( // 3번 
        key => frequentInfo[key]
      );

      setFrequentArary(_frequentArray);
    }, [placementArray]);

    return frequentArray;
  };

  const frequentArray = UseFrequentArray(); // 4

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
```
1. placementArray는 최근 20 게임의 순위가 들어있는 배열이다. ex) [1, 3, 5, 6, 6, 2, ..., 1]
2. placementArray를 통해 frequentInfo 객체를 만든다. frequentInfo는 placementArray 배열의 중복된 값을 카운트한 결과가 들어있다. ex { "1": 1, "2": 6, "3": 0, ..., "8": 2 }
3. frequentInfo의 value를 순서대로 _frequentArray 배열에 담고, setFrequentArray(_frequentArray) 한 뒤 frequentArray를 return한다.
4. frequentArray 배열에는 최근 20 게임의 순위 횟수가 1위부터 차례대로 들어있게 된다.

이 frequentArray 배열과 styled-component를 사용해서 그래프를 만들었다.
ChartBar styled component에게 해당 순위의 카운트인 frequent를 props로 주어서 (frequent / frequentMax)% 만큼 height를 갖게 하고, 이 ChartBar들을 나란히 늘어놓으면 그래프의 완성이다.

### 데이터 처리
이 프로젝트를 진행하면서 가장 많이 다룬 부분이며 가장 재밌게 다룬 부분이 데이터 처리이다. 소환사의 전적 데이터를 보기좋게 만들어서 표시하는 서비스이기 때문에 데이터를 불러와서 가공하고, 가공한 데이터를 뿌려서 표시하고... 의 반복이다.
실제로 만든 함수의 대부분은 데이터를 처리하는 함수들이다.
데이터 처리 로직같은 경우 반복되는 부분도 많고, TypeScript를 적절히 활용하면 더 쉽게 구현할 수 있겠다는 생각이 들었다.

## github commit
이번 프로젝트를 시작하기 전, commit에 대한 가이드라인같은 것들을 읽었다. commit은 최대한 작은 단위로 해야하고 commit의 제목, 내용의 양식에 관한 가이드라인이었다.
그 글을 읽고 보니 이전 프로젝트들에서 내가 얼마나 commit을 생각없이 했는지 인지하게 되었다. 협업하는 게 아니고 혼자 하는 프로젝트이다 보니 commit이 어떤 역할을 하는지 너무 늦게 깨달았다.
그래서 이번 프로젝트부터는 commit에 대해 각별히 신경썼다.
여기서 느낀 점은
1. 코드를 짤 때 이 코드가 사용될 곳 등을 생각하며 제대로 짤 것. 그렇지 않으면 새 코드를 짜다가 이거 수정하고 저거 수정하고... 그렇게 되면 commit을 언제 해야될 지 정하기 어렵게 되기 쉽상이다.
2. commit할 내용에 대해서만 코드를 작성할 것. 내가 어떤 컴포넌트를 만들겠다고 생각했으면 그에 대해서만 코드를 만들어내야한다. 그러지 않고 생각나는대로 코드를 짜면 commit하기가 난처해진다.
3. commit을 제 때 제 때 할 것. 이는 2번과도 일맥상통하는데, 이번 프로젝트를 진행하다가 중간에 막히는 부분이 있었다. 그래서 끙끙 앓다가 막히는 부분을 해결하고 계속해서 코드를 짜다 보니 어느새 한 commit으로 정리하기엔 너무 많은 양의 코드를 작성한 경험이 있다.

이 프로젝트를 진행하며 commit에 대해 깊게 생각하게 되었다.

# 아쉬웠던 부분들

## Riot API에 대한 충분하지 않은 사전 조사

## TypeScript의 type 분리
TypeScript를 쓰면서 고민한 것이 사용되는 사용자 정의 type 혹은 interface들을 전부 별도의 파일로 분리해서 저장해야 하는가 아닌가에 대한 것이었다.
사용자 정의 타입을 별도의 파일으로 분리했을 때의 장점은 코드가 길어지지 않는 다는 것이다.
210

              </CahrtRight>

211

            </PlacementDistributonTable>

212

          </PlacementDistributionBlock>

213

        </>

214

      )}

215

    </>

216

  );

217

};

218



219

export default PlacementDistribution;

220

```

221

1. placementArray는 최근 20 게임의 순위가 들어있는 배열이다. ex) [1, 3, 5, 6, 6, 2, ..., 1]

222

2. placementArray를 통해 frequentInfo 객체를 만든다. frequentInfo는 placementArray 배열의 중복된 값을 카운트한 결과가 들어있다. ex { "1": 1, "2": 6, "3": 0, ..., "8": 2 }

223

3. frequentInfo의 value를 순서대로 _frequentArray 배열에 담고, setFrequentArray(_frequentArray) 한 뒤 frequentArray를 return한다.

224

4. frequentArray 배열에는 최근 20 게임의 순위 횟수가 1위부터 차례대로 들어있게 된다.

225



226

이 frequentArray 배열과 styled-component를 사용해서 그래프를 만들었다.

227

ChartBar styled component에게 해당 순위의 카운트인 frequent를 props로 주어서 (frequent / frequentMax)% 만큼 height를 갖게 하고, 이 ChartBar들을 나란히 늘어놓으면 그래프의 완성이다.

228



229

### 데이터 처리

230

이 프로젝트를 진행하면서 가장 많이 다룬 부분이며 가장 재밌게 다룬 부분이 데이터 처리이다. 소환사의 전적 데이터를 보기좋게 만들어서 표시하는 서비스이기 때문에 데이터를 불러와서 가공하고, 가공한 데이터를 뿌려서 표시하고... 의 반복이다.

231

실제로 만든 함수의 대부분은 데이터를 처리하는 함수들이다.

232

데이터 처리 로직같은 경우 반복되는 부분도 많고, TypeScript를 적절히 활용하면 더 쉽게 구현할 수 있겠다는 생각이 들었다.

233



234

## github commit

235

이번 프로젝트를 시작하기 전, commit에 대한 가이드라인같은 것들을 읽었다. commit은 최대한 작은 단위로 해야하고 commit의 제목, 내용의 양식에 관한 가이드라인이었다.

236

그 글을 읽고 보니 이전 프로젝트들에서 내가 얼마나 commit을 생각없이 했는지 인지하게 되었다. 협업하는 게 아니고 혼자 하는 프로젝트이다 보니 commit이 어떤 역할을 하는지 너무 늦게 깨달았다.

237

그래서 이번 프로젝트부터는 commit에 대해 각별히 신경썼다.

238

여기서 느낀 점은

239

1. 코드를 짤 때 이 코드가 사용될 곳 등을 생각하며 제대로 짤 것. 그렇지 않으면 새 코드를 짜다가 이거 수정하고 저거 수정하고... 그렇게 되면 commit을 언제 해야될 지 정하기 어렵게 되기 쉽상이다.

240

2. commit할 내용에 대해서만 코드를 작성할 것. 내가 어떤 컴포넌트를 만들겠다고 생각했으면 그에 대해서만 코드를 만들어내야한다. 그러지 않고 생각나는대로 코드를 짜면 commit하기가 난처해진다.

241

3. commit을 제 때 제 때 할 것. 이는 2번과도 일맥상통하는데, 이번 프로젝트를 진행하다가 중간에 막히는 부분이 있었다. 그래서 끙끙 앓다가 막히는 부분을 해결하고 계속해서 코드를 짜다 보니 어느새 한 commit으로 정리하기엔 너무 많은 양의 코드를 작성한 경험이 있다.

242



243

이 프로젝트를 진행하며 commit에 대해 깊게 생각하게 되었다.

244



245

# 아쉬웠던 부분들

246



247

## Riot API에 대한 충분하지 않은 사전 조사

248



249

## TypeScript의 type 분리

250

TypeScript를 쓰면서 고민한 것이 사용되는 사용자 정의 type 혹은 interface들을 전부 별도의 파일로 분리해서 저장해야 하는가 아닌가에 대한 것이었다.

251

사용자 정의 타입을 별도의 파일으로 분리했을 때의 장점은 코드가 길어지지 않는 다는 것이다.

252

예를 들어 컴포넌트 tsx파일 안에 사용자 정의 타입 코드를 포함시키면, 컴포넌트 파일은 사용자 정의 타입 코드 + styled-component 코드 + react 코드 상태가 되어 코드가예를 들어 컴포넌트 tsx파일 안에 사용자 정의 타입 코드를 포함시키면, 컴포넌트 파일은 사용자 정의 타입 코드 + styled-component 코드 + react 코드 상태가 되어 코드가

## 일단 workable한 코드를 만드는 것
