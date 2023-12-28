import React from "react";
import { Col } from "antd";
// import style vào để sử dụng
import {
  WrapperHeader,
  WrapperHeaderAccout,
  WrapperTextHeader,
  WrapperTextHeaderSmall
} from "./style";
import Search from "antd/lib/transfer/search";
// import icon vào để sử dụng
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';

const HeaderComponent = () => {
  return (
    <div>
      {/* khi dùng các hàm trong style.js ở đâu thì bao hàm những thành phần cần dùng đến nó */}
      <WrapperHeader gutter={16}>
        {/* gutter dùng để cách đều nhau 1 khoảng 16 là 16 px */}
        <Col span={6}>
          <WrapperTextHeader>
            Shopee
          </WrapperTextHeader>
        </Col>
        <Col span={12}>
        <Search 
          placeholder="input search text"
          // onSearch={onSearch}
          enterButton 
        />
        </Col>
        <Col span={6} style={{ display: 'flex', gap: '20px' }}> 
        {/* display: 'flex' dùng để dàn hàng ngang, gap: '20px' dùng để cách đều  */}
          <WrapperHeaderAccout>
            <UserOutlined style={{ fontSize: '30px' }} />
            <div>
              <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
              <div>
                <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                <CaretDownOutlined />
              </div>
            </div>
          </WrapperHeaderAccout>
          <div>
            <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  )
};

export default HeaderComponent;