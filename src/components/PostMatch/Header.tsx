import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../modules";
import { SummonerIcon, SummonerLevel } from "../SummonerProfile/ProfileInfo";

const BigSummonerIcon = styled(SummonerIcon)`
  width: 80px;
  height: 80px;
`;
const SummonerName = styled.p`
  color: #fff;
  font-weight: bold;
  font-size: 26px;
`;
const MatchSummary = styled.p`
  margin: 0;
  font-size: 12px;
  color: #7986a3;
  span + span {
    &::before {
      content: "·";
      display: inline;
      margin: 0 8px;
    }
  }
`;
const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  p {
    margin: 0;
  }
  p + p {
    margin-top: 20px;
  }
`;
const HeaderBlock = styled.header`
  display: flex;
`;

const convertUnixToDate = (unix: Date): string => {
  const date = new Date(unix);
  const weekDay = ["일", "월", "화", "수", "목", "금", "토", "일"];

  const addLeadingZero = (dt: number): string => {
    return (dt < 10 ? "0" : "") + dt;
  };

  const dateString =
    weekDay[date.getDay()] +
    " " +
    date.getFullYear() +
    "." +
    addLeadingZero(date.getMonth() + 1) +
    "." +
    addLeadingZero(date.getDate()) +
    " " +
    addLeadingZero(date.getHours()) +
    ":" +
    addLeadingZero(date.getMinutes()) +
    ":" +
    addLeadingZero(date.getSeconds());

  return dateString;
};
const convertGameLengthToTime = (gameLength: number): string => {
  const gameLengthMs = (gameLength / 60).toFixed(2);
  return gameLengthMs.replace(".", ":");
};

const Header = (): ReactElement => {
  const { summonerInfo, match } = useSelector((state: RootState) => ({
    summonerInfo: state.summoner.summonerInfo,
    match: state.match.match
  }));
  if (!summonerInfo) {
    return <p>소환사 데이터 없음</p>;
  }
  if (!match) {
    return <p>매치 데이터 없음</p>;
  }

  const matchUnix = new Date(match.info.game_datetime);
  const matchDate = convertUnixToDate(matchUnix);
  const matchLength = convertGameLengthToTime(match.info.game_length);
  const { name, profileIconId, summonerLevel } = summonerInfo;

  return (
    <HeaderBlock>
      <BigSummonerIcon>
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/11.2.1/img/profileicon/${profileIconId}.png`}
        />
        <SummonerLevel>{summonerLevel}</SummonerLevel>
      </BigSummonerIcon>
      <PlayerInfo>
        <SummonerName>{name}</SummonerName>
        <MatchSummary>
          <span>전략적 팀 전투</span>
          <span>{matchLength}</span>
          <span>{matchDate}</span>
        </MatchSummary>
      </PlayerInfo>
    </HeaderBlock>
  );
};

export default Header;
