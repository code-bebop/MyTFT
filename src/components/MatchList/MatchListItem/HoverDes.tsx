import React, { ReactElement } from "react";
import styled from "styled-components";

const HoverDesBlock = styled.div`
  width: auto;
  height: auto;
  border-radius: 5px;
  background-color: #070e1d;
  position: absolute;
  z-index: 2;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  white-space: nowrap;
  padding: 20px;
  & > p {
    color: #fff;
    font-size: 18px;
    margin: 0;
  }
`;

const HoverDes = ({
  children
}: React.PropsWithChildren<Record<string, unknown>>): ReactElement => {
  return <HoverDesBlock>{children}</HoverDesBlock>;
};

export default HoverDes;
