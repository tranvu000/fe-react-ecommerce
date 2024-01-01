import { Col, Image, InputNumber, Row } from "antd";
import React from "react";
import imageProduct from "../../assets/images/imageProduct.jpg"
import imageProductSmall from "../../assets/images/imagesmall.jpg"
import {
  WrapperAddressProduct,
  WrapperButtonQualityProduct,
  WrapperInputNumber,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperQualityProduct,
  WrapperStyleColImage,
  WrapperStyleImageSmall,
  WrapperStyleNameProduct,
  WrapperStyleTextSell
} from "./style";
import {
  StarFilled,
  PlusOutlined,
  MinusOutlined
} from '@ant-design/icons';
import ButtonComponent from "../ButtonComponent/ButtonComponent"

const ProductDetailsComponent = () => {
  const onChange = () => {}
  return (
    <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
    <Col span={10} style={{ paddingRight: '8px' }}>
      <Image src={imageProduct} alt="image product" preview={false} />
      <Row style={{ paddingTop: '10px', justifyContent: 'space-between'}}>
        <WrapperStyleColImage span={4}>
          <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
        </WrapperStyleColImage>
        <WrapperStyleColImage span={4}>
          <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
        </WrapperStyleColImage>
        <WrapperStyleColImage span={4}>
          <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
        </WrapperStyleColImage>
        <WrapperStyleColImage span={4}>
          <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
        </WrapperStyleColImage>
        <WrapperStyleColImage span={4}>
          <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
        </WrapperStyleColImage>
        <WrapperStyleColImage span={4}>
          <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
        </WrapperStyleColImage>
      </Row>
    </Col>
    <Col span={14} style={{ paddingLeft: '10px' }}>
      <WrapperStyleNameProduct>
        Sweater Basic nỉ trơn Oversize unisex nam nữ [FREESHIP] (có ảnh thật)
      </WrapperStyleNameProduct>
      <div>
        <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
        <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
        <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
        <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
        <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
        <WrapperStyleTextSell>| Đã bán 1000+</WrapperStyleTextSell> 
      </div>
      <WrapperPriceProduct>
        <WrapperPriceTextProduct>200.000 đ</WrapperPriceTextProduct>
      </WrapperPriceProduct>
      <WrapperAddressProduct>
        <span>Giao đến</span>
        <span className="address">Phường Phúc Diễn, Quận Bắc Từ Liêm, Hà Nội</span>
        <span className="change-address">Đổi địa chỉ</span>
      </WrapperAddressProduct>
      <div style={{ margin: '10px 0 20px' }}>
        <div style={{ marginBottom: '6px' }}>Số lượng</div>
        <WrapperQualityProduct>
          <button style={{ border: 'none', background: 'transparent'}}>
            <MinusOutlined style={{ color: '#000', fontSize: '20px'}} />
          </button>
          <WrapperInputNumber defaultValue={1} onChange={onChange} size='small' />
          <button style={{ border: 'none', background: 'transparent'}}>
            <PlusOutlined style={{ color: '#000', fontSize: '20px'}}/>
          </button>
        </WrapperQualityProduct>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px'}}>
        <ButtonComponent
          size={40}
          styleButton={{ 
            background: '#fff',
            height: '48px',
            width: '220px',
            border: '1px solid rgb(238, 77, 45)',
            borderRadius: '4px'
          }}
          styleTextButton={{ color: 'rgb(13, 92, 182', fontSize:'15px' }}
          textButton={'Thêm Vào Giỏ Hàng'}
        >
        </ButtonComponent>
        <ButtonComponent
          size={20}
          styleButton={{ 
            background: 'rgb(255, 57, 69)',
            height: '48px',
            width: '220px',
            border: 'none',
            borderRadius: '4px'
          }}
          styleTextButton={{ color: '#fff', fontSize:'15px', fontWeight: '700' }}
          textButton={'Mua Ngay'}
        >
        </ButtonComponent>
      </div>
    </Col>
  </Row>
  )
};

export default ProductDetailsComponent;