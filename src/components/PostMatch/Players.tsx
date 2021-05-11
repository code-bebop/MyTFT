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
import { Link } from "react-router-dom";

const SmallSummonerLevel = styled(SummonerLevel)`
  width: 18px;
  height: 18px;
  font-size: 11px;
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
    color: #fff;
  }
  & > p {
    width: 68px;
    margin: 0;
    font-size: 13px;
    color: #899cb1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & > svg {
    width: 12px;
    height: 12px;
    color: #53575f;
    margin-right: 5px;
    display: block;
    stroke-width: 0;
    stroke: currentcolor;
    fill: currentcolor;
  }
`;
const PlayerApiPlacementRow = styled(PlayerApiRow)`
  & > span {
    color: #899cb1;
  }
`;
const PlayerApiLink = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  & > div {
    ${getSortRowFlexGlow()}
  }
`;
const PlayerApi = styled.li``;
const PlayersBlock = styled.div`
  width: 100%;
  ol {
    margin: 0;
    padding: 0;
    & > li {
      padding: 0 20px;
      background-color: #182338;
      &:first-child {
        border-radius: 5px 5px 0 0;
      }
      &:last-child {
        border-radius: 0 0 5px 5px;
      }
      &:nth-child(2n) {
        background-color: #202b43;
      }
    }
  }
`;

const unifyUnits = participant => {
  unifySummonerUnits(participant);
};
const sortUnits = participant => {
  sortSummonerUnits(participant);
};

const Players = (): ReactElement => {
  const { match, summonerInfoArray } = useSelector((state: RootState) => ({
    match: state.match.match,
    summonerInfoArray: state.summoners.summonersInfo
  }));
  if (match === null) {
    return <p>매치 데이터 없음</p>;
  }
  if (summonerInfoArray === null) {
    return <p>소환사 정보 없음</p>;
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
          const summonerInfo = summonerInfoArray.find(
            summonerInfo => summonerInfo.puuid === participant.puuid
          );
          if (summonerInfo === undefined) {
            return <p>소환사 없음</p>;
          }

          return (
            <PlayerApi key={index}>
              <PlayerApiLink to={`/match/${summonerInfo.name}`}>
                <PlayerApiPlacementRow>
                  <span>{participant.placement}위</span>
                  <SmallSummonerIcon>
                    <img
                      src={`http://ddragon.leagueoflegends.com/cdn/${process.env.RIOT_DDRAGON_CURRENT_VER}/img/profileicon/${summonerInfo.profileIconId}.png`}
                      alt="임시 소환사 아이콘"
                    />
                    <SmallSummonerLevel>{participant.level}</SmallSummonerLevel>
                  </SmallSummonerIcon>
                  <p>
                    <span>{summonerInfo.name}</span>
                  </p>
                </PlayerApiPlacementRow>
                <PlayerApiRow>
                  <UnitList units={participant.units} isBig />
                </PlayerApiRow>
                <PlayerApiRow>
                  <TraitList activatedTraits={participant.traits} isWrap />
                </PlayerApiRow>
                <PlayerApiRow>
                  <svg viewBox="0 0 32 32">
                    <title>match-gold</title>
                    <path d="M18.5 4.050c6.4-0.483 11.85 2.617 12.15 6.867 0.233 3.117-2.4 6.017-6.35 7.517 0.133 0.383 0.2 0.767 0.233 1.167 0.317 4.25-4.6 7.9-11.033 8.367s-11.833-2.45-12.15-6.7c-0.217-3.117 2.4-6.017 6.35-7.517-0.133-0.383-0.2-0.767-0.233-1.167-0.317-4.25 4.633-8.050 11.033-8.533zM4.5 20.667c-0.283 2 2.967 4.817 8.833 4.333s7.65-2.9 6.767-5.617c-0.053 0.005-0.106 0.012-0.16 0.019-0.115 0.015-0.232 0.031-0.356 0.031-4.183 0.3-7.967-0.933-10.167-3.017-2.433 0.5-4.617 2.183-4.917 4.25z"></path>
                  </svg>
                  <span>{participant.gold_left}</span>
                </PlayerApiRow>
                <PlayerApiRow>
                  <svg viewBox="0 0 32 32">
                    <title>stat-damagePerDeath</title>
                    <path d="M1.333 4.333l4.617 4.5-2.833 3.167 1.8 1.833 9.083-9.167-2-1.667-2.883 3.1-4.783-4.767-3 3zM28.717 12l-2.833-3.167 4.783-4.5-3.167-3-4.783 4.767-3.050-3.1-1.667 1.667 8.917 9.167 1.8-1.833zM6 20.367v3.467l5.333 2-4 4.833h-6v-6.167l4.667-4.133zM30.667 24.5l-4.667-4.133v3.467l-5.333 2 4 4.833h6v-6.167zM24.5 15.95c0 0-3.733-0.3-6.683 2.75 0 0 3.65 2.617 6.683-0.983v4.867l-5.417 1.833v1.983h0.633c-0.683 2.167-3.017 4.1-3.717 4.1s-3.033-1.933-3.717-4.083h0.633v-1.983l-5.417-1.833v-4.867c3.033 3.6 6.683 0.983 6.683 0.983-2.917-2.767-6.683-2.767-6.683-2.767 1.817-5.233 4.367-9.033 8.5-6.483 4.133-2.533 6.683 1.267 8.5 6.483zM17.333 21.617c0 0.717-0.833 1.217-1.333 1.217s-1.333-0.5-1.333-1.217c0-0.717 0.6-1.783 1.333-1.783s1.333 1.067 1.333 1.783zM22.833 17.167c-0.8 1.95-1.85 2.133-3.5 1.533 1.517-1.15 2.067-1.533 3.5-1.533zM9.167 17.167c1.433 0 1.983 0.383 3.5 1.533-1.65 0.6-2.7 0.417-3.5-1.533z"></path>
                  </svg>
                  <span>{participant.players_eliminated}</span>
                </PlayerApiRow>
                <PlayerApiRow>
                  <svg viewBox="0 0 32 32">
                    <title>stat-killParticipation</title>
                    <path d="M21.5 5.65l4.283-4.317h4.883v4.883l-5.667 5.733c-0.983-0.667-1.717-1-2.2-1-1.867 0-7.717 4.4-7.717 6.5v4.533l-1.467 1.483 0.567 0.617c-0.017 0.117-0.017 0.233-0.017 0.367 0 0.583 0.183 1.133 0.567 1.683l-2.633 2.567-2.7-2.883-5.083 4.85-2.983-3.067 5.083-4.867-3.4-3.583 3.333-3.25 2.417 2.567 3.167-3.183h-0.017l9.617-9.617-0.033-0.017zM12.35 12.8c0.050-0.567 0.083-1.25 0.050-2.083 0 0 1.6-0.483 1.317-2.95 0 0-2.55 0.017-2.867 2.033v2.9h-1.483v-2.917c-0.317-2-2.867-2.033-2.867-2.033-0.283 2.467 1.317 2.95 1.317 2.95-0.133 4.167 0.983 4.667 0.983 4.667-2.883-0.483-3.717-2.467-3.95-3.317-0.017-0.083 0-0.183 0.067-0.25s0.15-0.1 0.233-0.083l0.483 0.067v-4.467c0-1.233 2.483-3.017 3.75-3.683 0.45-0.25 1-0.25 1.467 0 1.267 0.683 3.75 2.45 3.75 3.683v3.267l-2.25 2.217zM30 24.417c-0.083-0.1-0.2-0.15-0.333-0.133l-0.633 0.1v-6.317c0-1.75-3.467-4.25-5.25-5.217-0.633-0.35-1.417-0.35-2.050 0-1.783 0.967-5.25 3.467-5.25 5.217v6.317l-0.667-0.1c-0.117-0.017-0.25 0.033-0.333 0.133s-0.117 0.233-0.083 0.35c0.333 1.2 1.5 3.983 5.533 4.667 0 0-1.567-0.717-1.383-6.6 0 0-2.25-0.683-1.85-4.167 0 0 3.55 0.033 4 2.867v4.117h2.083v-4.1c0.433-2.833 4-2.867 4-2.867 0.4 3.467-1.85 4.167-1.85 4.167 0.167 5.9-1.383 6.6-1.383 6.6 4.050-0.7 5.217-3.467 5.533-4.683 0.033-0.117 0-0.25-0.083-0.35z"></path>
                  </svg>
                  <span>{participant.total_damage_to_players}</span>
                </PlayerApiRow>
                <PlayerApiRow>
                  <svg viewBox="0 0 32 32">
                    <title>stat-melee</title>
                    <path d="M25.777 9.333l2.89 2.833-3.167 3-2.5-2.833-15.5 18.333h-6.167v-6.333l17.833-15.667-2.667-2.667 3-3 2.717 3.036 4.45-4.702 3.833 3.667-4.723 4.333zM15.5 6l-9 9.167-3-3 2.783-2.833-4.616-4.333 3.667-3.667 4.51 4.47 2.824-2.803 2.833 3zM22.333 17.333l-4.667 5.333 6.667 8h6.333v-6.167l-8.333-7.167z"></path>
                  </svg>
                  <span>{participant.last_round}</span>
                </PlayerApiRow>
              </PlayerApiLink>
            </PlayerApi>
          );
        })}
      </ol>
    </PlayersBlock>
  );
};

export default Players;
