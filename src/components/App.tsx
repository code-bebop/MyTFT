import React, { ReactElement } from "react";
import { hot } from "react-hot-loader";
import { Link, Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import MainPage from "../pages/MainPage";
import MatchListPage from "../pages/MatchListPage";
import MatchPage from "../pages/MatchPage";

const test1 = (): ReactElement => {
  return <p>페이지 1</p>;
};
const App = (): ReactElement => {
  console.log("App 렌더링");

  return (
    <BrowserRouter basename="/MyTFT">
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/page1" component={test1} />
        <Route path="/match/:summonerName" component={MatchListPage} exact />
        <Route path="/match/:name/:matchId" component={MatchPage} />
        <Route component={() => <Redirect to="/" />} />
      </Switch>
    </BrowserRouter>
  );
};

export default hot(module)(App);
