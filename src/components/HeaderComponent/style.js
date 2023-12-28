import styled from "styled-components";
import { Row } from "antd";

export const WrapperHeader = styled(Row)`
  padding: 10px 120px;
  background-color: rgb(26, 148, 255);
  align-items: center;
`

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
// khi 1 cái gì đó đại diện cho thẻ nào thì styled./thẻ đó/ ví dụ dùng cho thẻ div thì styled.div
export const WrapperTextHeaderSmall = styled.span`
  font-size: 12px;
  color: #fff;
`
