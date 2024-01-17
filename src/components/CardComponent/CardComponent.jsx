
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
import { useNavigate } from "react-router-dom";

const CardComponent = (props) => {
  const { countInStock, description, image, name, price, rating, type, selled, discount, id } = props;
  const navigate = useNavigate();
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`)
  };

  return (
    <div>
      <WrapperCardStyle
      hoverable
      headStyle={{ width: '200px', height: '200px'}}
      style={{ width: 200 }}
      bodyStyle={{ padding: '10px' }}
      cover={<img alt="example" src={image} />}
      onClick={() => handleDetailsProduct(id)}
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
        }} 
      />
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapReportText>
        <span style={{ marginRight: '4px'}}>
          <span>{rating}</span>
          <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
        </span>
        <WrapperStyleTextSell>| Đã bán {selled || 1000}+</WrapperStyleTextSell>
      </WrapReportText>
      <WrapPriceText>
        <span style={{marginRight: '8px'}}>{price?.toLocaleString()}</span>
        <WrapDiscountText>
          - {discount || 5} %
        </WrapDiscountText>
      </WrapPriceText>
      
    </WrapperCardStyle>
    </div>
  )
};

export default CardComponent;