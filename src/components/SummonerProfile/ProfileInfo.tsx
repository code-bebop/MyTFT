import React, { ReactElement } from "react";
import styled from "styled-components";

const ProfileInfoBlock = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

export const SummonerIcon = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 100%;
  border: 2px solid #333e56;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-right: 15px;
  padding: 2px;
  background-color: #070e1d;
  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
`;

export const SummonerLevel = styled.p`
  width: 28px;
  height: 28px;
  border-radius: 100%;
  background-color: #131c2e;
  color: #fff;
  font-size: 12px;
  position: absolute;
  bottom: 0;
  right: -4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

const ColumnFlexBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  p {
    margin: 0;
  }
`;

const SummonerName = styled.p`
  font-size: 22px;
  font-weight: bold;
`;

const SummonerDate = styled.p`
  font-size: 14px;
  letter-spacing: 0.01em;
`;

interface profileInfoPropsT {
  summonerLevel: number;
  summonerName: string;
  dateDiff: number;
  profileIconId: number;
}

const ProfileInfo = ({
  summonerLevel,
  summonerName,
  dateDiff,
  profileIconId
}: profileInfoPropsT): ReactElement => {
  return (
    <ProfileInfoBlock>
      <SummonerIcon>
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/11.2.1/img/profileicon/${profileIconId}.png`}
        />
        <SummonerLevel>{summonerLevel}</SummonerLevel>
      </SummonerIcon>
      <ColumnFlexBlock>
        <SummonerName>{summonerName}</SummonerName>
        <SummonerDate>최근 플레이 날짜: {dateDiff}일 전</SummonerDate>
      </ColumnFlexBlock>
    </ProfileInfoBlock>
  );
};

export default ProfileInfo;
