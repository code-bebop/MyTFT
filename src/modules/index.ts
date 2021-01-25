import { combineReducers } from "redux";
import { all, AllEffect, ForkEffect } from "redux-saga/effects";

import summoner, { summonerSaga } from "./summoner";
import match, { matchSaga } from "./match";

const rootReducer = combineReducers({
  summoner,
  match
});

export function* rootSaga(): Generator<
  AllEffect<Generator<ForkEffect<never>, void, unknown>>,
  void
> {
  yield all([summonerSaga(), matchSaga()]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
