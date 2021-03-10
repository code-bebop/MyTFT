import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../modules";
import UnitList from "../MatchList/MatchListItem/UnitList";
import {
  unifySummonerUnits,
  sortSummonerUnits
} from "../MatchList/MatchListItem/MatchListItem";
import { SummonerIcon, SummonerLevel } from "../SummonerProfile/ProfileInfo";
import { getSortRowFlexGlow } from "./SortRow";
import TraitList from "../MatchList/MatchListItem/TraitList";

const SmallSummonerLevel = styled(SummonerLevel)`
  width: 18px;
  height: 18px;
`;
const SmallSummonerIcon = styled(SummonerIcon)`
  width: 40px;
  height: 40px;
  margin: 0 10px;
`;
const PlayerApiRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 88px;
  & > span {
    font-size: 12px;
    color: #899cb1;
  }
  & > p {
    margin: 0;
    font-size: 13px;
    color: #899cb1;
  }
`;
const PlayerApi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  & > div {
    ${getSortRowFlexGlow()}
  }
`;
const PlayersBlock = styled.div`
  width: 100%;
  background-color: #000;
  ol {
    padding: 0 20px;
    margin: 0;
  }
`;

const unifyUnits = participant => {
  unifySummonerUnits(participant);
};
const sortUnits = participant => {
  sortSummonerUnits(participant);
};

const Players = (): ReactElement => {
  const { match } = useSelector((state: RootState) => ({
    match: state.match.match
  }));
  if (match === null) {
    return <p>매치 데이터 없음</p>;
  }
  match.info.participants.sort((a, b) => {
    return a.placement - b.placement;
  });
  match.info.participants.forEach(participant => {
    unifyUnits(participant);
    sortUnits(participant);
  });

  return (
    <PlayersBlock>
      <ol>
        {match.info.participants.map((participant, index) => {
          return (
            <PlayerApi key={index}>
              <PlayerApiRow>
                <span>{participant.placement}위</span>
                <SmallSummonerIcon>
                  <img
                    src={`http://ddragon.leagueoflegends.com/cdn/11.2.1/img/profileicon/15.png`}
                    alt="임시 소환사 아이콘"
                  />
                  <SmallSummonerLevel>{participant.level}</SmallSummonerLevel>
                </SmallSummonerIcon>
                <p>
                  <span>임시 닉네임</span>
                </p>
              </PlayerApiRow>
              <PlayerApiRow>
                <UnitList units={participant.units} isBig />
              </PlayerApiRow>
              <PlayerApiRow>
                <TraitList activatedTraits={participant.traits} isWrap />
              </PlayerApiRow>
              <PlayerApiRow>
                <p>4</p>
              </PlayerApiRow>
              <PlayerApiRow>
                <p>5</p>
              </PlayerApiRow>
              <PlayerApiRow>
                <p>6</p>
              </PlayerApiRow>
              <PlayerApiRow>
                <p>7</p>
              </PlayerApiRow>
            </PlayerApi>
          );
        })}
      </ol>
    </PlayersBlock>
  );
};

export default Players;
