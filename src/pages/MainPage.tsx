import React, { ReactElement } from "react";
import styled, { ThemeProvider } from "styled-components";

import Search from "../components/Search";
import theme from "../theme";
import Wrapper from "../components/common/Wrapper";
import { Link } from "react-router-dom";

const Info = styled.section`
  width: 60%;
  max-width: 1080px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #273552;
  border: 1px solid #5d61ca;
  border-radius: 10px;
  color: #9ba4d1;
`;

const InfoImg = styled.img`
  margin-right: 25px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLink = styled(Link)`
  text-decoration: none;
  color: #c9d19b;
  font-weight: bold;
`;

const MainPage = (): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <Search />
      <Wrapper>
        <Info>
          <InfoImg
            src={`${process.env.IMG_PUBLIC_PATH}/public/img/Infomation.png`}
          />
          <InfoWrapper>
            <span>현재 시즌 5.5까지의 전적만 검색이 가능합니다.</span>
            <span>
              원활한 검색을 위해{" "}
              <InfoLink to={`/match/불꽃남자임지웅`}>여기</InfoLink>를 클릭하여
              검색해주세요.
            </span>
          </InfoWrapper>
        </Info>
      </Wrapper>
    </ThemeProvider>
  );
};

export default MainPage;
