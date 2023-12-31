
import React from "react";
import {
  StyleNameProduct,
  WrapDiscountText,
  WrapPriceText,
  WrapReportText,
  WrapperCardStyle,
  WrapperStyleTextSell
} from "./style";
import {
  StarFilled,
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
          <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
        </span>
        <WrapperStyleTextSell>| Đã bán 1000+</WrapperStyleTextSell>
      </WrapReportText>
      <WrapPriceText>
        <span style={{marginRight: '8px'}}>1.000.000 đ</span>
        <WrapDiscountText>
          -6%
        </WrapDiscountText>
      </WrapPriceText>
      
    </WrapperCardStyle>
    </div>
  )
};

export default CardComponent;