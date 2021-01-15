import { combineReducers } from "redux";
import { all, AllEffect, ForkEffect } from "redux-saga/effects";

import summoner, { summonerSaga } from "./summoner";

const rootReducer = combineReducers({
  summoner
});

export function* rootSaga(): Generator<AllEffect<Generator<ForkEffect<never>, void, unknown>>, void> {
  yield all([summonerSaga()]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;