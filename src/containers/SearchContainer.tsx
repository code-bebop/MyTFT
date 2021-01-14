import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "../components/Search";
import { RootState } from "../modules";
import { changeQuery, summonerAsync } from "../modules/summoner";

const SearchContainer = () => {
  const { query } = useSelector((state: RootState) => ({
    query: state.summoner.query
  }));
  const dispatch = useDispatch();

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const query: string = e.target.value;
      dispatch(changeQuery(query));
    },
    [dispatch],
  )
  const requestSummoner = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      const summonerName = query;
      dispatch(summonerAsync.request({ summonerName }));
    },
    [dispatch, query],
  )

  return (
    <>
      <Search requestSummoner={requestSummoner} onChange={onChange} />
    </>
  )
};

export default SearchContainer;