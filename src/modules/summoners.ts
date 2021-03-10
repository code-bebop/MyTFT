import { takeLatest } from "@redux-saga/core/effects";
import { AxiosError } from "axios";
import { createAsyncAction, createReducer } from "typesafe-actions";
import { getSummoners } from "../lib/api";
import { createAsyncActionType } from "../lib/createAsnycActionType";
import createAsyncSaga from "../lib/createAsyncSaga";
import { Participant, SummonerInfoResponseT } from "../types/types";

const GET_SUMMONERS = "search/GET_SUMMONERS" as const;

const { REQUEST, SUCCESS, FAILURE } = createAsyncActionType(GET_SUMMONERS);

export const summonersAsync = createAsyncAction(REQUEST, SUCCESS, FAILURE)<
  Participant[],
  SummonerInfoResponseT[],
  AxiosError
>();

const getSummonersSaga = createAsyncSaga<
  Participant[],
  SummonerInfoResponseT[],
  AxiosError
>(summonersAsync, getSummoners);

export const summonersSaga = function* () {
  yield takeLatest(REQUEST, getSummonersSaga);
};

type SummonersState = {
  summonersInfo: SummonerInfoResponseT[] | null;
  error: AxiosError | null;
  loading: boolean;
};

const initialState: SummonersState = {
  summonersInfo: null,
  error: null,
  loading: false
};

const summoners = createReducer<SummonersState>(initialState, {
  [REQUEST]: state => ({
    ...state,
    loading: true
  }),
  [SUCCESS]: (state, { payload: summonersInfo }) => ({
    ...state,
    summonersInfo,
    loading: false
  }),
  [FAILURE]: (state, { payload: error }) => ({
    ...state,
    error,
    loading: false
  })
});

export default summoners;
