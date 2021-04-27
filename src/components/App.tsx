import React, { ReactElement } from "react";
import { hot } from "react-hot-loader";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import MainPage from "../pages/MainPage";
import MatchListPage from "../pages/MatchListPage";
import MatchPage from "../pages/MatchPage";

const TestPage = (): ReactElement => {
  return (
    <>
      <p>{process.env.IMG_PUBLIC_PATH}</p>
      <img
        src={`${process.env.IMG_PUBLIC_PATH}/public/img/items/1.png`}
        alt="테스트"
      />
    </>
  );
};
const App = (): ReactElement => {
  return (
    <BrowserRouter basename="/MyTFT">
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/match/:summonerName" component={MatchListPage} exact />
        <Route path="/match/:name/:matchId" component={MatchPage} />
        <Route path="/test" component={TestPage} />
        <Route component={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
};

export default hot(module)(App);
