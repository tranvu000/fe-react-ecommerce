
import React from "react";
import {
  StyleNameProduct,
  WrapDiscountText,
  WrapPriceText,
  WrapReportText,
  WrapperCardStyle
} from "./style";
import {
  StarOutlined,
} from '@ant-design/icons';
import logoProduct from "../../assets/images/logoProduct.png"

const CardComponent = () => {
  return (
    <div>
      <WrapperCardStyle
      hoverable
      headStyle={{ width: '200px', height: '200px'}}
      style={{ width: 200 }}
      bodyStyle={{ padding: '10px' }}
      cover={<img alt="example" src="https://png.pngtree.com/png-clipart/20231007/ourlarge/pngtree-iphone-15-blue-png-image_10194578.png" />}
    >
      <img
        src={logoProduct}
        alt="logoProduct"
        style={{
          width: '48px',
          height: '18px',
          position: 'absolute',
          top: "-1px",
          left: "-1px",
          borderTopLeftRadius: '3px'
          }} />
      <StyleNameProduct>Iphone</StyleNameProduct>
      <WrapReportText>
        <span style={{ marginRight: '4px'}}>
          <span>4.5</span>
          <StarOutlined style={{ fontSize: '12px', color: 'yellow'}} />
        </span>
        <span>| Đã bán 1000+</span>
      </WrapReportText>
      <WrapPriceText>
        1.000.000 đ
        <WrapDiscountText>
          -6%
        </WrapDiscountText>
      </WrapPriceText>
      
    </WrapperCardStyle>
    </div>
  )
};

export default CardComponent;