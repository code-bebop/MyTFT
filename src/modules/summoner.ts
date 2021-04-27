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
  MatchIdsResponseT,
  SummonerPayloadT
} from "../types/types";

const CHANGE_QUERY = "summoner/CHANGE_QUERY" as const;
const INITIALIZE = "summoner/INITIALIZE" as const;

export const changeQuery = createAction(
  CHANGE_QUERY,
  (query: string) => query
)();
export const initialize = createAction(INITIALIZE)();

const GET_SUMMONER = "summoner/GET_SUMMONER" as const;

const { REQUEST, SUCCESS, FAILURE } = createAsyncActionType(GET_SUMMONER);

export const summonerAsync = createAsyncAction(REQUEST, SUCCESS, FAILURE)<
  SummonerPayloadT,
  SummonerResponseT,
  AxiosError
>();

const getSummonerSaga = createAsyncSaga<
  SummonerPayloadT,
  SummonerResponseT,
  AxiosError
>(summonerAsync, getSummoner);

export const summonerSaga = function* (): Generator<ForkEffect<never>, void> {
  yield takeLatest(REQUEST, getSummonerSaga);
};

const actions = {
  changeQuery,
  initialize
};

type SummonerActions = ActionType<typeof actions>;

type SummonerState = {
  query: string;
  summonerInfo: SummonerInfoResponseT | null;
  rankEntry: RankEntryResponseT | null;
  matchIds: MatchIdsResponseT;
  error: AxiosError | null;
  loading: boolean;
  count: number;
};

const initialState: SummonerState = {
  query: "",
  summonerInfo: null,
  rankEntry: null,
  matchIds: [""],
  error: null,
  loading: false,
  count: 0
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
    loading: false,
    count: state.count + 15
  }),
  [FAILURE]: (state, { payload: error }) => ({
    ...state,
    error,
    loading: false
  }),
  [INITIALIZE]: () => ({
    ...initialState
  })
});

export default summoner;
