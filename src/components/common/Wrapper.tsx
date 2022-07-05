import React, { ReactElement } from "react";
import styled from "styled-components";

export const WrapperBlock = styled.div`
  width: 100vw;
  min-width: 1080px;
  max-width: 100%;
  padding-top: 150px;
  display: flex;
  justify-content: center;
`;

const Wrapper = ({
  children
}: React.PropsWithChildren<Record<string, unknown>>): ReactElement => {
  return <WrapperBlock>{children}</WrapperBlock>;
};

export default Wrapper;
