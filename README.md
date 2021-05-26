# MyTFT
Riot Developer API를 이용한 TFT 전적 검색 웹사이트를 만드는 프로젝트
디자인과 UI는 Blitz.gg 웹사이트를 참고했다.

demo site: https://code-bebop.github.io/MyTFT
* 검색해도 500 error가 반환된다면 제가 Riot API key를 public version으로 사용해서 하루에 한 번 갱신해줘야 하는데, 갱신하지 않았기 때문입니다.

# 제공하는 기능

## 소환사의 최근 전적 및 요약 정보 검색
소환사의 닉네임을 검색하면 해당 소환사의 요약된 정보, 최근 20게임 전적, 그리고 게임의 날짜별 분류 및 성적 요약 등의 정보를 표시한다.
챔피언이나 특성에 마우스를 올리면 그에 대한 정보를 표시하고, 챔피언의 경우 좀 더 디테일한 정보(장착한 아이템, 선택받은 자 특성)를 제공한다.

![localhost_8000_match_%EB%B6%88%EA%BD%83%EB%82%A8%EC%9E%90%EC%9E%84%EC%A7%80%EC%9B%85 (2)](https://user-images.githubusercontent.com/57097064/112479798-b7ad0300-8db8-11eb-9610-a6cec3153e00.png)

## 전적 상세 정보
전적을 클릭하면 해당 경기의 정보를 요약해서 보여준다.
해당 경기의 길이와 경기가 치뤄진 일시를 표시한다. 또한 참가한 소환사들을 순위로 정렬해 보여주고, 각 소환사가 사용한 덱, 입힌 피해량, 몇 라운드까지 갔는지, 경기가 끝날 때 몇 골드가 남았는지, 몇 명의 플레이어를 처치했는지 등의 정보이다.

![localhost_8000_match_%EB%B6%88%EA%BD%83%EB%82%A8%EC%9E%90%EC%9E%84%EC%A7%80%EC%9B%85 (3)](https://user-images.githubusercontent.com/57097064/112479810-b976c680-8db8-11eb-817d-0feb25e3807b.png)

## 다른 소환사의 전적
전적 상세정보에서 다른 소환사의 이름을 클릭하면 해당 소환사를 검색한다.

![mytft](https://user-images.githubusercontent.com/57097064/112480865-c7791700-8db9-11eb-9624-538531c739cc.gif)


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

### 무한 스크롤 기능

이 프로젝트에도 무한 스크롤 기능이 적용되었다. 그러나 앞선 프로젝트(책 검색 사이트)보다 훨씬 까다로웠다.

Naver API에서는 책 데이터를 요청 할 때에 파라미터에 몇 개의 책 데이터를 받을 것인지 정해주기만 하면 되었는데,  Riot API는 1차적으로 소환사의 summoner data를 요청해서 받아온 다음, 해당 summoner data 안에 담긴 matchId를 파라미터로 한 요청을 다시 보내어 매치 데이터를 받아오는 구조였기에 좀 더 복잡했다. 처음엔 막막했으나 어떻게든 기능을 구현할 수 있었다.

1. 우선 matchIds가 저장된 redux state(여기선 summoner state)에 count라는 state를 만든다. count는 matchIds를 몇 개 받아올 것인지를 나타내는 number type state이다. count의 initialState는 0이다.
2. 전적이 나타나는 matchListPage 컴포넌트에 들어서면 useSelector로 summoner state에 저장된 state들을 받아 오고, 이후 useEffect에 의해 summoner data를 요청한다. useSelector에서 count state를 가져 올 때 15를 더해주고 summoner data를 받아오는 API에 파라미터로 넘겨준다. 
```js
// MatchListPage.tsx

const MatchListPage = (): ReactElement => {
  const { summonerName } = useParams<{ summonerName: string }>();
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const {
    summonerInfo,
    matches,
    matchIds,
    count,
    summonerLoading,
    matchesLoading,
    summonerError,
    matchesError
  } = useSelector(
    (state: RootState) => ({
      summonerInfo: state.summoner.summonerInfo,
      matches: state.matches.matches,
      matchIds: state.summoner.matchIds,
      count: state.summoner.count + 15, // count state를 불러올 때에 15를 더해준다.
      summonerLoading: state.summoner.loading,
      matchesLoading: state.matches.loading,
      summonerError: state.summoner.error,
      matchesError: state.matches.error
    }),
    shallowEqual
  );
    
  ...
  
  // 스크롤을 전부 내렸을 때 전적 요청
  useEffect(() => {
    const scrollHandler = async () => {
      if (getScrollTop() >= getDocumentHeight() - window.innerHeight) {
        setFirstLoading(false);
        dispatch(summonerAsync.request({ name: summonerName, count: count }));
      }
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [count]);
  
  // 최초 전적 요청
  useEffect(() => {
    if (summonerInfo?.name !== summonerName) {
      dispatch(matchesInitialize());
      dispatch(summonerInitialize());
      dispatch(summonerAsync.request({ name: summonerName, count: count }));
    }
  }, [dispatch, summonerName]);
    
  ...
  
};
```

3. matchIds가 담긴 summoner data 요청에 성공하면 count state에 15를 더해준다. 
```js
// summoner.ts

const summoner = createReducer<SummonerState, SummonerActions>(initialState, {
 
  ...
    
  [SUCCESS]: (state, { payload: { summonerInfo, rankEntry, matchIds } }) => ({
    ...state,
    summonerInfo,
    rankEntry,
    matchIds,
    loading: false,
    count: state.count + 15
  }),

  ...
    
});
```

4. 이후 사용자가 스크롤을 끝까지 내리면 MatchListPage 컴포넌트에서 state에 저장된 count 값에 15를 더하여 가져오게된다(현재 count state가 15니까 30으로 가져온다.). 그럼 30개의 matchIds를 요청하여 얻게 되는데, 이 matchIds 중 뒤에서부터 15개만 match data를 요청한다. 그럼 matches state에는 총 30개의 최신 전적이 저장되어 화면에 나타나게 된다. 이를 반복하면 무한히 스크롤하여 시간순으로 전적을 볼 수 있다.
```js
// MatchListPage.tsx

...

useEffect(() => {
  if (summonerInfo?.name === summonerName) {
    const _matchIds = matchIds.slice(-15);
    dispatch(matchesAsync.request(_matchIds));
  }
}, [summonerInfo, dispatch]);

...
```

좀 더 쉽고 깔끔한 방법이 있으리라 짐작되지만, 이것이 내가 찾은 최선의 방법이다.

조잡하게나마 구현된 기능이지만, 어려웠던 만큼 뿌듯함도 컸다.


# 아쉬웠던 부분들

## TypeScript의 type 분리
TypeScript를 쓰면서 고민한 것이 사용되는 사용자 정의 type 혹은 interface들을 전부 별도의 파일로 분리해서 저장해야 하는가 아닌가에 대한 것이었다.
사용자 정의 타입을 별도의 파일으로 분리했을 때의 장점은 코드가 길어지지 않는 다는 것이다.
예를 들어 어떤 컴포넌트 파일이 있으면, 그 파일은 사용자 정의 타입 코드 + styled-component 코드 + react 코드를 포함하게 되어 코드가 굉장히 길어진다. 실제로 그랬다.
분리했을 때의 단점은 코드가 한 눈에 들어오지 않는다는 것이다. 물론 해당 Type Alias에 마우스를 올린 채로 Ctrl을 누르면 Type Declare가 보이지만, 확인에 시간이 걸리고 개발효율이 떨어지게 된다.

이 프로젝트에서는 src/types/types.ts에 api에 관련된 사용자 정의 type만 분리해서 저장했다. 나머지 사용자 정의 type은 해당 type이 사용되는 파일에 같이 작성했다.

## 코드를 짜기 전에 생각이 너무 많았던 것
이 프로젝트를 처음 진행할 때에는 생각이 너무 많았다. 처음부터 좋은 코드를 짜기 위해 너무 노력한 것이다.
그러다 프로젝트 중반에 CleanCode에 관한 글을 읽었다. 거기서 특히 주목한 부분이 "우선 workable한 코드를 만들 것"이다. 우선 작동하는 코드를 만들고 나서 리팩터링을 하라는 이야기였다.
그 대목을 읽고나서 바로 실행에 옮겼고, 확실히 그 때 부터 개발속도에 유의미한 변화가 있었다고 생각한다.
