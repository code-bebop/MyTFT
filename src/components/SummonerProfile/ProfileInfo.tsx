import React, { ReactElement } from "react";
import styled from "styled-components";

const ProfileInfoBlock = styled.div`
  display: flex;
  margin-bottom: 40px;
`;

const SummonerIconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  border: 2px solid #333e56;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-right: 15px;
`;

const SummonerIcon = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 23px;
`;

const SummonerLevel = styled.p`
  width: 28px;
  height: 28px;
  border-radius: 14px;
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
      <SummonerIconWrapper>
        <SummonerIcon
          src={`http://ddragon.leagueoflegends.com/cdn/11.2.1/img/profileicon/${profileIconId}.png`}
        />
        <SummonerLevel>{summonerLevel}</SummonerLevel>
      </SummonerIconWrapper>
      <ColumnFlexBlock>
        <SummonerName>{summonerName}</SummonerName>
        <SummonerDate>최근 플레이 날짜: {dateDiff}일 전</SummonerDate>
      </ColumnFlexBlock>
    </ProfileInfoBlock>
  );
};

export default ProfileInfo;
