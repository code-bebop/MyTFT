import { AxiosError } from "axios";
import { ForkEffect, takeLatest } from "redux-saga/effects";
import {
  ActionType,
  createAction,
  createAsyncAction,
  createReducer
} from "typesafe-actions";
import { getMatch } from "../lib/api";
import { createAsyncActionType } from "../lib/createAsnycActionType";
import createAsyncSaga from "../lib/createAsyncSaga";
import { MatchT } from "../types/types";

const INITIALIZE = "match/INITIALIZE" as const;
const GET_MATCH = "match/GET_MATCH" as const;

const { REQUEST, SUCCESS, FAILURE } = createAsyncActionType(GET_MATCH);

export const initialize = createAction(INITIALIZE)();

export const matchAsync = createAsyncAction(REQUEST, SUCCESS, FAILURE)<
  string,
  MatchT,
  AxiosError
>();

const matchAsyncSaga = createAsyncSaga<string, MatchT, AxiosError>(
  matchAsync,
  getMatch
);

export const matchSaga = function* (): Generator<ForkEffect<never>, void> {
  yield takeLatest(REQUEST, matchAsyncSaga);
};

type MatchState = {
  match: MatchT | null;
  error: AxiosError | null;
  loading: boolean;
};

const initialState = {
  match: null,
  error: null,
  loading: false
};

const actions = {
  initialize
};

type MatchActions = ActionType<typeof actions>;

const match = createReducer<MatchState, MatchActions>(initialState, {
  [REQUEST]: state => ({
    ...state,
    loading: true
  }),
  [SUCCESS]: (state, { payload: match }) => ({
    ...state,
    match,
    loading: false
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

export default match;
