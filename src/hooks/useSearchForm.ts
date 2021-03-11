import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules";
import { initialize } from "../modules/matches";
import { changeQuery, summonerAsync } from "../modules/summoner";
import { useHistory } from "react-router-dom";

const useSearchForm = (): {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  requestSummoner: (e: React.FormEvent<HTMLFormElement>) => void;
} => {
  const { query } = useSelector((state: RootState) => ({
    query: state.summoner.query
  }));
  const dispatch = useDispatch();
  const history = useHistory();

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const query: string = e.target.value;
      dispatch(changeQuery(query));
    },
    [dispatch]
  );
  // dispatch(initialize());
  // dispatch(summonerAsync.request(query));
  const requestSummoner = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      history.push(`/match/${query}`);
      console.log("SearchForm Submit");
    },
    [dispatch, query]
  );

  return { onChange, requestSummoner };
};

export default useSearchForm;
