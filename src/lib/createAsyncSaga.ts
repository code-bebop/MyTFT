import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { AsyncActionCreatorBuilder, EmptyAction, PayloadAction } from "typesafe-actions";

type PrmoiseCreatorFunction<P, T> =
  | ((payload: P) => Promise<T>)
  | (() => Promise<T>);

const isPayloadAction = <P>(action): action is PayloadAction<string, P> => {
  return action.payload !== undefined;
}

const createAsyncSaga = <P1, P2, P3>(
  asyncActionCreator: AsyncActionCreatorBuilder<
    [string, [P1, undefined]],
    [string, [P2, undefined]],
    [string, [P3, undefined]]
  >,
  promiseCreator: PrmoiseCreatorFunction<P1, P2>
) => {
  return function* saga(
    action: ReturnType<typeof asyncActionCreator.request>
  ): Generator<CallEffect<P2> | PutEffect<EmptyAction<string>>, void, P2> {
    try {
      const response: P2 = isPayloadAction<P1>(action)
        ? yield call(promiseCreator, action.payload)
        : yield call(promiseCreator);
      yield put(asyncActionCreator.success(response));
    } catch(error) {
      console.log(error);
      yield put(asyncActionCreator.failure(error));
    }
  }
}

export default createAsyncSaga;