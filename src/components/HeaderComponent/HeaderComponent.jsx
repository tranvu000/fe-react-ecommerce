import React from "react";
import { Badge, Col } from "antd";
import {
  WrapperHeader,
  WrapperHeaderAccout,
  WrapperTextHeader,
  WrapperTextHeaderSmall
} from "./style";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); 
  const handleNavigateLogin = () => {
    navigate('/sign-in')
  }

  return (
    <div style={{ width: '100%', background: 'rgb(238, 77, 45)', display: 'flex', justifyContent: 'center' }}>
      <WrapperHeader>
        <Col span={5}>
          <WrapperTextHeader>
            Shopee
          </WrapperTextHeader>
        </Col>
        <Col span={13}>
        <ButtonInputSearch 
          size="large"
          textButton="Tìm Kiếm"
          placeholder="input search text"
          backgroundColorButton = 'rgb(238, 77, 45)'
          // onSearch={onSearch}
        />
        </Col>
        <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center' }}> 
          <WrapperHeaderAccout>
            <UserOutlined style={{ fontSize: '30px' }} />
            { user?.name ? (
              <div>{user.name}</div>
            ) : (
            <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
              <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
              <div>
                <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                <CaretDownOutlined />
              </div>
            </div>
            )}
          </WrapperHeaderAccout>
          <div>
            <Badge count={4} size="small">
              <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
            </Badge>
            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  )
};

export default HeaderComponent;