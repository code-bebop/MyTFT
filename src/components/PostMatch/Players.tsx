import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../modules";
import UnitList from "../MatchList/MatchListItem/UnitList";
import { SummonerIcon, SummonerLevel } from "../SummonerProfile/ProfileInfo";
import { getSortRowFlexGlow } from "./SortRow";

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
                <UnitList units={participant.units} />
              </PlayerApiRow>
              <PlayerApiRow>
                <p>3</p>
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
            </PlayerApi>
          );
        })}
      </ol>
    </PlayersBlock>
  );
};

export default Players;
