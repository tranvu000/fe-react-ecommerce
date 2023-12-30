import styled from "styled-components";
import { Row } from "antd";

export const WrapperHeader = styled(Row)`
  padding: 10px 120px;
  background-color: rgb(238, 77, 45);
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
`
// flex-wrap: nowrap;để cho nó không bị xuống dòng
export const WrapperTextHeader = styled.span`
  font-size: 24px;
  color: #fff;
  font-weight: bold;
  text-align: left;
`

export const WrapperHeaderAccout = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  gap: 10px;
  font-size: 12px;
`
export const WrapperTextHeaderSmall = styled.span`
  font-size: 12px;
  color: #fff;
  white-space: nowrap;
`
// white-space: nowrap  để cho nó không bị xuống dòng
