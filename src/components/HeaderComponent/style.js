import styled from "styled-components";
import { Row } from "antd";
import { Link } from "react-router-dom";

export const WrapperHeader = styled(Row)`
  padding: 10px 0;
  width: 1270px;
  background-color: rgb(238, 77, 45);
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
`

export const WrapperTextHeader = styled(Link)`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  text-align: left;
  &:hover {
    font-size: 18px;
    color: #fff;
  }
`

export const WrapperHeaderAccout = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  gap: 10px;
  max-width: 200px;
`

export const WrapperTextHeaderSmall = styled.span`
  font-size: 12px;
  color: #fff;
  white-space: nowrap;
`

export const WrapperContentPopup = styled.p`
  cursor: pointer;
  &:hover {
    color: rgb(238, 77, 45);
  }
`