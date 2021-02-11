import React, { ReactElement } from "react";
import styled from "styled-components";
import useSearchForm from "../hooks/useSearchForm";

const HeaderBlock = styled.div`
  width: 100%;
  height: 50px;
  background-color: #0e1726;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  form {
    input {
      width: 380px;
      height: 38px;
      border-radius: 12px;
      box-sizing: border-box;
      padding: 0 15px;
      background-color: #273552;
      outline: none;
      border: none;
      color: #fff;
    }
  }
`;

interface SearchPropsT {
  requestSummoner: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = (): ReactElement => {
  const { onChange, requestSummoner }: SearchPropsT = useSearchForm();

  return (
    <HeaderBlock>
      <form onSubmit={requestSummoner}>
        <input placeholder="소환사 검색" onChange={onChange} />
      </form>
    </HeaderBlock>
  );
};

export default Search;
