import { AxiosError } from "axios";
import { ForkEffect, takeLatest } from "redux-saga/effects";
import { createAsyncAction, createReducer } from "typesafe-actions";
import { getMatch } from "../lib/api";
import { createAsyncActionType } from "../lib/createAsnycActionType";
import createAsyncSaga from "../lib/createAsyncSaga";
import { MatchPayloadT, MatchResponseT } from "../types/types";

const GET_MATCH = "match/GET_MATCH" as const;

const { REQUEST, SUCCESS, FAILURE } = createAsyncActionType(GET_MATCH);

export const matchAsync = createAsyncAction(REQUEST, SUCCESS, FAILURE)<
  MatchPayloadT,
  MatchResponseT[],
  AxiosError
>();

const getMatchAsyncSaga = createAsyncSaga<
  MatchPayloadT,
  MatchResponseT[],
  AxiosError
>(matchAsync, getMatch);

export const matchSaga = function* (): Generator<ForkEffect<never>, void> {
  yield takeLatest(REQUEST, getMatchAsyncSaga);
};

type MatchState = {
  matchInfoList: MatchResponseT[] | null;
  error: AxiosError | null;
  loading: boolean;
};

const initialState = {
  matchInfoList: null,
  error: null,
  loading: false
};

const match = createReducer<MatchState>(initialState, {
  [REQUEST]: state => ({
    ...state,
    loading: true
  }),
  [SUCCESS]: (state, { payload: matchInfoList }) => ({
    ...state,
    matchInfoList
  }),
  [FAILURE]: (state, { payload: error }) => ({
    ...state,
    error
  })
});

export default match;
