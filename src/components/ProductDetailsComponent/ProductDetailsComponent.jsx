import { Col, Image, Rate, Row } from "antd";
import React, { useState } from "react";
import imageProduct from "../../assets/images/imageProduct.jpg"
import imageProductSmall from "../../assets/images/imagesmall.jpg"
import {
  WrapperAddressProduct,
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
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";
import { useSelector } from "react-redux";


const ProductDetailsComponent = ({idProduct}) => {
  const [numProduct, setNumProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const onChange = (value) => {
    setNumProduct(Number(value))
  };
  
  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    };
  };

  const handleChangeCount = (type) => {
    if (type === 'increase') {
      setNumProduct(numProduct + 1)
    } else if (type === 'decrease') {
      setNumProduct(numProduct - 1)
    }
  };

  const { isLoading, data: productDetails } = useQuery({
    queryKey: ['product-details', idProduct],
    queryFn: fetchGetDetailsProduct,
    config: { enabled: !!idProduct }
  });

  return (
    <>
      <Loading isLoading={isLoading}>
        <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
          <Col span={10} style={{ paddingRight: '8px' }}>
            <Image src={productDetails?.image} alt="image product" preview={false} />
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
            <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
            <div>
              <Rate allowHalf disabled defaultValue={productDetails?.rating} value={productDetails?.rating}/>
              <WrapperStyleTextSell>| Đã bán 1000+</WrapperStyleTextSell> 
            </div>
            <WrapperPriceProduct>
              <WrapperPriceTextProduct>{productDetails?.price.toLocaleString()}</WrapperPriceTextProduct>
            </WrapperPriceProduct>
            <WrapperAddressProduct>
              <span>Giao đến</span>
              <span className="address">{user?.address}</span>
              <span className="change-address">Đổi địa chỉ</span>
            </WrapperAddressProduct>
            <div style={{ margin: '10px 0 20px' }}>
              <div style={{ marginBottom: '6px' }}>Số lượng</div>
              <WrapperQualityProduct>
                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer'}} onClick={() => handleChangeCount('decrease')}>
                  <MinusOutlined style={{ color: '#000', fontSize: '20px'}} />
                </button>
                <WrapperInputNumber defaultValue={1} onChange={onChange} value={numProduct} size='small' />
                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer'}} onClick={() => handleChangeCount('increase')}>
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
      </Loading>
    </>
  )
};

export default ProductDetailsComponent;