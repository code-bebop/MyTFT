import { combineReducers } from "redux";
import { all, AllEffect, ForkEffect } from "redux-saga/effects";
import rankEntry, { rankEntrySaga } from "./rankEntry";

import summoner, { summonerSaga } from "./summoner";

const rootReducer = combineReducers({
  summoner,
  rankEntry
});

export function* rootSaga(): Generator<AllEffect<Generator<ForkEffect<never>, void, unknown>>, void> {
  yield all([summonerSaga(), rankEntrySaga()]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;