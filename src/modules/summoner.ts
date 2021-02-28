import { AxiosError } from "axios";
import { ForkEffect, takeLatest } from "redux-saga/effects";
import {
  ActionType,
  createAction,
  createAsyncAction,
  createReducer
} from "typesafe-actions";
import { getSummoner } from "../lib/api";
import { createAsyncActionType } from "../lib/createAsnycActionType";
import createAsyncSaga from "../lib/createAsyncSaga";
import {
  SummonerResponseT,
  SummonerInfoResponseT,
  RankEntryResponseT,
  MatchIdsResponseT
} from "../types/types";

const CHANGE_QUERY = "search/CHANGE_QUERY" as const;

export const changeQuery = createAction(
  CHANGE_QUERY,
  (query: string) => query
)();

const GET_SUMMONER = "search/GET_SUMMONER" as const;

const { REQUEST, SUCCESS, FAILURE } = createAsyncActionType(GET_SUMMONER);

export const summonerAsync = createAsyncAction(REQUEST, SUCCESS, FAILURE)<
  string,
  SummonerResponseT,
  AxiosError
>();

const getSummonerSaga = createAsyncSaga<string, SummonerResponseT, AxiosError>(
  summonerAsync,
  getSummoner
);

export const summonerSaga = function* (): Generator<ForkEffect<never>, void> {
  yield takeLatest(REQUEST, getSummonerSaga);
};

const actions = {
  changeQuery
};

type SummonerActions = ActionType<typeof actions>;

type SummonerState = {
  query: string;
  summonerInfo: SummonerInfoResponseT | null;
  rankEntry: RankEntryResponseT | null;
  matchIds: MatchIdsResponseT;
  error: AxiosError | null;
  loading: boolean;
};

const initialState: SummonerState = {
  query: "",
  summonerInfo: null,
  rankEntry: null,
  matchIds: [""],
  error: null,
  loading: false
};

const summoner = createReducer<SummonerState, SummonerActions>(initialState, {
  [CHANGE_QUERY]: (state, { payload: query }) => ({
    ...state,
    query
  }),
  [REQUEST]: state => ({
    ...state,
    loading: true
  }),
  [SUCCESS]: (state, { payload: { summonerInfo, rankEntry, matchIds } }) => ({
    ...state,
    summonerInfo,
    rankEntry,
    matchIds,
    loading: false
  }),
  [FAILURE]: (state, { payload: error }) => ({
    ...state,
    error,
    loading: false
  })
});

export default summoner;
