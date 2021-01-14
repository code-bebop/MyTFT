interface AsyncActionT {
  REQUEST: string,
  SUCCESS: string,
  FAILURE: string
}

export const createAsyncActionType = (actionName: string): AsyncActionT => {
  const asyncActionType: Array<string> = ["_REQUEST", "_SUCCESS", "_FAILURE"];

  return {
    REQUEST: actionName + asyncActionType[0],
    SUCCESS: actionName + asyncActionType[1],
    FAILURE: actionName + asyncActionType[2]
  }
}