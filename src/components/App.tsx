import React, { ReactElement } from "react";
import styled from "styled-components";

import SearchContainer from "../containers/SearchContainer";
import SummonerInfoContainer from "../containers/SummonerInfoContainer";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const App = (): ReactElement => {  
  return (
    <Wrapper>
      <SearchContainer />
      <SummonerInfoContainer />
    </Wrapper>
  );
};

export default App;