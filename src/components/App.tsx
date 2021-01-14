import React, { ReactElement } from "react";
import SearchContainer from "../containers/SearchContainer";
import SummonerInfoContainer from "../containers/SummonerInfoContainer";

const App = (): ReactElement => {  
  return (
    <>
      <SearchContainer />
      <SummonerInfoContainer />
    </>
  );
};

export default App;