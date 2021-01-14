import { AxiosError } from "axios";
import { ForkEffect, takeLatest } from "redux-saga/effects";
import { createAsyncAction, createReducer } from "typesafe-actions";
import { getRankEntry } from "../lib/api";
import { createAsyncActionType } from "../lib/createAsnycActionType";
import createAsyncSaga from "../lib/createAsyncSaga";
import { RankEntryPayloadT, RankEntryResponseT } from "../types/types";

const RANK_ENTRY = "rankEntry/rankEntry" as const;

const { REQUEST, SUCCESS, FAILURE } = createAsyncActionType(RANK_ENTRY);

export const rankEtnryAsync = createAsyncAction(REQUEST, SUCCESS, FAILURE)<RankEntryPayloadT, RankEntryResponseT, AxiosError>();

const getRankEntrySaga = createAsyncSaga<RankEntryPayloadT, RankEntryResponseT, AxiosError>(rankEtnryAsync, getRankEntry);

export const rankEntrySaga = function* (): Generator<ForkEffect<never>, void> {
  yield takeLatest(REQUEST, getRankEntrySaga);
}

type RankEntryState = {
  response: RankEntryResponseT | null,
  loading: boolean
}

const initialState: RankEntryState = {
  response: null,
  loading: false
}

const rankEntry = createReducer<RankEntryState>(initialState, {
  [REQUEST]: (state) => ({
    ...state,
    loading: true
  }),
  [SUCCESS]: (state, { payload: response }) => ({
    ...state,
    response,
    loading: false
  }),
  [FAILURE]: (state, { payload: response }) => ({
    ...state,
    response,
    loading: false
  })
})

export default rankEntry;