import { Col, Image, Rate, Row } from "antd";
import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct, resetOrder } from "../../redux/slides/orderSlide";
import { convertPrice } from "../../utils";
import * as message from '../../components/Message/Message';

const ProductDetailsComponent = ({idProduct}) => {
  const [numProduct, setNumProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const [errorLimitOrder, setErrorLimitOrder] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const onChange = (value) => {
    const newValue = value !== '' ? Math.max(1, Number(value)) : 1;
    setNumProduct(newValue)
  };
  
  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    };
  };

  useEffect(() => {
    const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id);

    if ((orderRedux?.amount + numProduct) <= orderRedux?.countInStock || (!orderRedux && productDetails?.countInStock > 0)) {
      setErrorLimitOrder(false)
    } else if (productDetails?.countInStock === 0) {
      setErrorLimitOrder(true)
    };
  }, [numProduct]);

  useEffect(() => {
    if (order?.isSuccessOrder) {
      message.success('Đã thêm vào giỏ hàng')
    };

    return () => {
      dispatch(resetOrder())
    }
  }, [order?.isSuccessOrder])

  const handleChangeCount = (type, limited) => {
    if (type === 'increase') {
      if (!limited) {
        setNumProduct(numProduct + 1)
      }
    } else if (type === 'decrease') {
      if (!limited) {
        if (numProduct === 1) {
          navigate('/');
        } else {
          setNumProduct(numProduct - 1);
        }
      }
    }
  };

  const { isLoading, data: productDetails } = useQuery({
    queryKey: ['product-details', idProduct],
    queryFn: fetchGetDetailsProduct,
    config: { enabled: !!idProduct }
  });

  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate('/sign-in', {state: location?.pathname})
    } else {
      const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id && item.userId === user?.id);

      if ((orderRedux?.amount + numProduct) <= (orderRedux?.countInStock || 0) || (!orderRedux && (productDetails?.countInStock || 0) > 0)) {
        dispatch(addOrderProduct({
          orderItem: {
            name: productDetails?.name,
            amount: numProduct,
            image: productDetails?.image,
            price: productDetails?.price,
            product: productDetails?._id,
            discount: productDetails?.discount,
            countInStock: productDetails?.countInStock,
            userId: user?.id
          }
        }))
      } else {
        setErrorLimitOrder(true)
      };
    };
  };

  const handleByAddOrderProduct = () => {
    if (!user?.id) {
      navigate('/sign-in', {state: location?.pathname})
    } else {
      const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id && item.userId === user?.id);

      if ((orderRedux?.amount + numProduct) <= (orderRedux?.countInStock || 0) || (!orderRedux && (productDetails?.countInStock || 0) > 0)) {
        dispatch(addOrderProduct({
          orderItem: {
            name: productDetails?.name,
            amount: numProduct,
            image: productDetails?.image,
            price: productDetails?.price,
            product: productDetails?._id,
            discount: productDetails?.discount,
            countInStock: productDetails?.countInStock,
            userId: user?.id
          }
        }));
        navigate('/order');
      } else {
        setErrorLimitOrder(true);
      };
    };
  };

  return (
    <>
      <Loading isLoading={isLoading}>
        <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px', height:'100%' }}>
          <Col span={10} style={{ paddingRight: '8px' }}>
            <Image src={productDetails?.image} alt="image product" preview={false} />
            <Row style={{ paddingTop: '10px', justifyContent: 'space-between'}}>
              <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall src={productDetails?.image} alt="image small" preview={false} />
              </WrapperStyleColImage>
              <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall src={productDetails?.image} alt="image small" preview={false} />
              </WrapperStyleColImage>
              <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall src={productDetails?.image} alt="image small" preview={false} />
              </WrapperStyleColImage>
              <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall src={productDetails?.image} alt="image small" preview={false} />
              </WrapperStyleColImage>
              <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall src={productDetails?.image} alt="image small" preview={false} />
              </WrapperStyleColImage>
              <WrapperStyleColImage span={4}>
                <WrapperStyleImageSmall src={productDetails?.image} alt="image small" preview={false} />
              </WrapperStyleColImage>
            </Row>
          </Col>
          <Col span={14} style={{ paddingLeft: '10px' }}>
            <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
            <div>
              <Rate allowHalf disabled defaultValue={productDetails?.rating} value={productDetails?.rating}/>
              <WrapperStyleTextSell>| Đã bán {productDetails?.selled}</WrapperStyleTextSell>
            </div>
            <WrapperPriceProduct>
              <WrapperPriceTextProduct>{convertPrice(productDetails?.price)}</WrapperPriceTextProduct>
            </WrapperPriceProduct>
            <WrapperAddressProduct>
              <span>Địa chỉ: </span>
              <span style={{fontWeight: 'bold'}} className="address">{user?.address}</span>
            </WrapperAddressProduct>
            <div style={{ margin: '10px 0 20px' }}>
              <div style={{ marginBottom: '6px' }}>Số lượng</div>
              <WrapperQualityProduct>
                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer'}} onClick={() => handleChangeCount('decrease', numProduct === 0)}>
                  <MinusOutlined style={{ color: '#000', fontSize: '20px'}} />
                </button>
                <WrapperInputNumber defaultValue={1} onChange={onChange} value={numProduct} size='small' min={1} max={productDetails?.countInStock} />
                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer'}} onClick={() => handleChangeCount('increase', numProduct === productDetails?.countInStock)}>
                  <PlusOutlined style={{ color: '#000', fontSize: '20px'}}/>
                </button>
              </WrapperQualityProduct>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px'}}>
              <ButtonComponent
                size={40}
                styleButton={{
                  background: 'rgb(238, 77, 45)',
                  height: '48px',
                  width: '220px',
                  border: 'none',
                  borderRadius: '4px'
                }}
                onClick={handleAddOrderProduct}
                styleTextButton={{ color: '#fff', fontSize:'15px', fontWeight: '700px' }}
                textbutton={'Thêm Vào Giỏ Hàng'}
              >
              </ButtonComponent>
              <ButtonComponent
                size={40}
                styleButton={{
                  background: 'rgb(238, 77, 45)',
                  height: '48px',
                  width: '220px',
                  border: 'none',
                  borderRadius: '4px'
                }}
                onClick={handleByAddOrderProduct}
                styleTextButton={{ color: '#fff', fontSize:'15px', fontWeight: '700px' }}
                textbutton={'Mua Ngay'}
              >
              </ButtonComponent>
            </div>
            <div>
              {errorLimitOrder && <div style={{color: 'red'}}>Sản phẩm đã hết hàng</div>}
            </div>
          </Col>
        </Row>
      </Loading>
    </>
  )
};

export default ProductDetailsComponent;