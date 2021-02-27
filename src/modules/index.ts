import { combineReducers } from "redux";
import { all, AllEffect, ForkEffect } from "redux-saga/effects";

import summoner, { summonerSaga } from "./summoner";
import matches, { matchesSaga } from "./matches";
import match, { matchSaga } from "./match";

const rootReducer = combineReducers({
  summoner,
  matches,
  match
});

export function* rootSaga(): Generator<
  AllEffect<Generator<ForkEffect<never>, void, unknown>>,
  void
> {
  yield all([summonerSaga(), matchesSaga(), matchSaga()]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
