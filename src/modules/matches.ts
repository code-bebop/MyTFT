import { AxiosError } from "axios";
import { ForkEffect, takeLatest } from "redux-saga/effects";
import {
  ActionType,
  createAction,
  createAsyncAction,
  createReducer
} from "typesafe-actions";
import { getMatches } from "../lib/api";
import { createAsyncActionType } from "../lib/createAsnycActionType";
import createAsyncSaga from "../lib/createAsyncSaga";
import { MatchesPayloadT, MatchesResponseT } from "../types/types";

const INITIALIZE = "matches/INITIALIZE" as const;
const GET_MATCHES = "matches/GET_MATCHES" as const;

const { REQUEST, SUCCESS, FAILURE } = createAsyncActionType(GET_MATCHES);

export const initialize = createAction(INITIALIZE)();

export const matchesAsync = createAsyncAction(REQUEST, SUCCESS, FAILURE)<
  MatchesPayloadT,
  MatchesResponseT,
  AxiosError
>();

const getMatchesAsyncSaga = createAsyncSaga<
  MatchesPayloadT,
  MatchesResponseT,
  AxiosError
>(matchesAsync, getMatches);

export const matchesSaga = function* (): Generator<ForkEffect<never>, void> {
  yield takeLatest(REQUEST, getMatchesAsyncSaga);
};

type MatchesState = {
  matches: MatchesResponseT | null;
  error: AxiosError | null;
  loading: boolean;
};

const initialState = {
  matches: null,
  error: null,
  loading: false
};

const actions = {
  initialize
};

type MatchesActions = ActionType<typeof actions>;

const matches = createReducer<MatchesState, MatchesActions>(initialState, {
  [REQUEST]: state => ({
    ...state,
    loading: true
  }),
  [SUCCESS]: (state, { payload: matches }) => ({
    ...state,
    matches,
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

export default matches;
