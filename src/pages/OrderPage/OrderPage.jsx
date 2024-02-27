import { Checkbox, Form } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import {
  WrapperCountOrder,
  WrapperInfo,
  WrapperItemOrder,
  WrapperLeft,
  WrapperListOrder,
  WrapperRight,
  WrapperStyleHeader,
  WrapperStyleHeaderDelivery,
  WrapperTotal,
  CustomCheckbox
} from './style';
import { DeleteOutlined, MinusOutlined, PlusOutlined} from '@ant-design/icons';
import { WrapperInputNumber } from '../../components/ProductDetailsComponent/style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../utils';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from "../../services/UserService";
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message';
import { updateUser } from '../../redux/slides/userSlide';
import { useNavigate } from 'react-router-dom/dist';
import StepComponent from '../../components/StepComponent/StepComponent';

const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  const [listChecked, setListChecked] = useState([]);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: ''
  });
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter((item) => item !== e.target.value);
      setListChecked(newListChecked);
    }else {
      setListChecked([...listChecked, e.target.value])
    };
  };

  const handleChangeCount = (type, userId, idProduct, limited) => {
    if (type === 'increase') {
      if(!limited) {
        dispatch(increaseAmount({userId, idProduct}))
      }
    } else if (type === 'decrease') {
      if (limited) {
        if (limited === 1) {
          dispatch(removeOrderProduct({ idProduct, userId }));
        } else {
          dispatch(decreaseAmount({ userId, idProduct }));
        }
      }
    }
  };

  const handleDeleteOrder = (idProduct, userId) => {
    dispatch(removeOrderProduct({ idProduct, userId }));
  };

  const handleOnchangeCheckAll = (e) => {
    if(e.target.checked) {
      const newListChecked = [];

      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product)
      });
      setListChecked(newListChecked);
    }else {
      setListChecked([])
    }
  };

  useEffect(() => {
    dispatch(selectedOrder({listChecked}))
  }, [listChecked]);

  useEffect(() => {
    form.setFieldsValue(stateUserDetails)
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        name: user?.name,
        phone: user?.phone,
        address: user?.address,
        city: user?.city
      })
    }
  }, [isOpenModalUpdateInfo]);

  const userPriceMemo = useMemo(() => {
    const userOrderItems = order?.orderItemsSelected?.filter(item => item.userId === user?.id);
    const result = userOrderItems.reduce((total, cur) => {
      return total + (cur.price * cur.amount)
    }, 0);

    return result;
  }, [order, user]);

  const priceDiscountMemo = useMemo(() => {
    let totalDiscount = 0;

    order?.orderItemsSelected?.forEach((item) => {
      if (item.userId === user?.id) {
        const itemDiscount = item.discount ? item.discount : 0;
        const itemPrice = item.price * item.amount;
        const itemTotalDiscount = (itemPrice * itemDiscount) / 100;
        
        totalDiscount += itemTotalDiscount;
      }
    });
  
    return totalDiscount;
  }, [order, user]);

  const deliveryPriceMemo = useMemo(() => {
    if (userPriceMemo > 0 && userPriceMemo < 200000 ) {
      return 20000
    } else if (userPriceMemo >= 200000 && userPriceMemo <= 500000) {
      return 10000
    } else if ((userPriceMemo === 0 && order?.orderItemsSelected?.length === 0) || userPriceMemo > 500000) {
      return 0
    }
  }, [userPriceMemo]);

  const totalPriceMemo = useMemo(() => {
    return Number(userPriceMemo) - Number(priceDiscountMemo) + Number(deliveryPriceMemo);
  }, [userPriceMemo, priceDiscountMemo, deliveryPriceMemo]);

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true)
  };

  const handleRemoveAllOrder = (userId) => {
    if(listChecked?.length > 1){
      dispatch(removeAllOrderProduct({listChecked, userId}))
    }
  };

  const handleAddCard = () => {
    const currentUserOrderItems = order?.orderItemsSelected?.filter(item => item.userId === user?.id);

    if (!currentUserOrderItems.length) {
      message.error('Vui lòng chọn sản phẩm')
    } else if (!user?.phone || !user?.address || !user?.name || !user?.city) {
      setIsOpenModalUpdateInfo(true)
    } else {
      navigate('/payment', { state: { orderItems: currentUserOrderItems } });
    }
  };

  const mutationUpdate = useMutationHooks(
    (data) => {
      const { id, token, ...rests } = data;
      const res = UserService.updateUser(id, {...rests}, token);

      return res;
    },
  );

  const { isLoading, data } = mutationUpdate;

  const handleCancelUpdate = () => {
    setStateUserDetails({
      name: '',
      phone: '',
      address: '',
      city: ''
    });
    form.resetFields();
    setIsOpenModalUpdateInfo(false)
  };

  const handleUpdateInforUser = () => {
    const {name, phone, address, city} = stateUserDetails;

    if (name && phone && address && city) {
      mutationUpdate.mutate({ id: user?.id, token: user?.access_token, ...stateUserDetails }, {
        onSuccess: () => {
          dispatch(updateUser({name, phone, address, city}))
          setIsOpenModalUpdateInfo(false)
        }
      })
    };
  };

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value
    });
  };

  const itemsDelivery = [
    {
      title: '20.000 vnđ',
      description: 'Dưới 200.000 vnđ',
    },
    {
      title: '10.000 vnđ',
      description: 'Từ 200.000 vnđ đến 500.000 vnđ',
    },
    {
      title: 'Free ship',
      description: 'Trên 500.000 vnđ',
    },
  ];
  
  const orderCountForCurrentUser = order?.orderItems?.reduce((count, item) => {
        if (item.userId === user?.id) {
      return count + item.amount;
    }
    return count;
  }, 0);

  return (
    <div style={{background: '#f5f5fa', width: '100%', height: '100vh'}}>
      <div style={{height: '100%', width: '1270px', margin: '0 auto'}}>
        <h3 style={{fontWeight: 'bold'}}>Giỏ hàng</h3>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <WrapperLeft>
            <h4>Phí giao hàng</h4>
            <WrapperStyleHeaderDelivery>
              <StepComponent items = {itemsDelivery} current={deliveryPriceMemo === 10000 ? 2
                : deliveryPriceMemo === 20000 ? 1
                : order?.orderItemsSelected?.length === 0 ? 0
                : 3
              } />
            </WrapperStyleHeaderDelivery>
            <WrapperStyleHeader>
              <span style={{display: 'inline-block', width: '390px'}}>
                <CustomCheckbox onChange={handleOnchangeCheckAll} checked={listChecked?.length === order?.orderItems?.length}></CustomCheckbox>
                <span>Tất cả ({orderCountForCurrentUser} sản phẩm)</span>
              </span>
              <div style={{flex:1,display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <DeleteOutlined style={{cursor: 'pointer'}} onClick={() => handleRemoveAllOrder(user?.id)}/>
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {order?.orderItems?.filter(item => item.userId === user.id).map((order) => {
                return (
                  <WrapperItemOrder key={order?.product}>
                    <div style={{width: '390px', display: 'flex', alignItems: 'center', gap: 4}}> 
                      <CustomCheckbox onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)}></CustomCheckbox>
                      <img src={order?.image} style={{width: '77px', height: '79px', objectFit: 'cover'}}/>
                      <div style={{
                        width: 260,
                        overflow: 'hidden',
                        textOverflow:'ellipsis',
                        whiteSpace:'nowrap'
                      }}>{order?.name}</div>
                    </div>
                    <div style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                      <span>
                        <span style={{ fontSize: '13px', color: '#242424' }}>{convertPrice(order?.price)}</span>
                      </span>
                      <WrapperCountOrder>
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', user?.id, order?.product, order?.amount)}>
                          <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                        </button>
                        <WrapperInputNumber defaultValue={1} value={order?.amount} size="small" min={1} max={order?.countInStock}/>
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', user?.id, order?.product, order?.amount === order?.countInStock)}>
                          <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                        </button>
                      </WrapperCountOrder>
                      <span style={{color: 'rgb(238, 77, 45)', fontSize: '13px', fontWeight: 500}}>{convertPrice(order?.price * order?.amount)}</span>
                      <DeleteOutlined style={{cursor: 'pointer'}} onClick={() => handleDeleteOrder(order?.product, order?.userId)}/>
                    </div>
                  </WrapperItemOrder>
                )
              })}
            </WrapperListOrder>
          </WrapperLeft>
          <WrapperRight>
            <div style={{width: '100%'}}>
              <WrapperInfo>
                <div>
                  <span>Địa chỉ: </span>
                  <span style={{fontWeight: 'bold'}}>{`${user?.address} ${user?.city}`}</span>
                  <span onClick={handleChangeAddress} style={{color: 'rgb(238, 77, 45)', cursor: 'pointer', marginLeft: '6px'}}>Thay đổi</span>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <span>Tạm tính</span>
                  <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{convertPrice(userPriceMemo)}</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <span>Giảm giá</span>
                  <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{priceDiscountMemo > 0 ? `- ${convertPrice(priceDiscountMemo)}` : convertPrice(0)}</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <span>Phí giao hàng</span>
                  <span style={{color: '#000', fontSize: '14px', fontWeight: 'bold'}}>{convertPrice(deliveryPriceMemo)}</span>
                </div>
              </WrapperInfo>
              <WrapperTotal>
                <span>Tổng tiền</span>
                <span style={{display:'flex', flexDirection: 'column'}}>
                  <span style={{color: 'rgb(238, 77, 45)', fontSize: '24px', fontWeight: 'bold'}}>{convertPrice(totalPriceMemo)}</span>
                  <span style={{color: '#000', fontSize: '11px'}}>(Đã bao gồm VAT nếu có)</span>
                </span>
              </WrapperTotal>
            </div>
            <ButtonComponent
              onClick={() => handleAddCard()}
              size={40}
              styleButton={{
                  background: 'rgb(238, 77, 45)',
                  height: '48px',
                  width: '320px',
                  border: 'none',
                  borderRadius: '4px'
              }}
              textbutton={'Mua hàng'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
            {/* {errorLimitOrder && <div style={{color: 'red'}}>Sản phẩm đã hết hàng</div>} */}
          </WrapperRight>
        </div>
      </div>
      <ModalComponent title="Cập nhật thông tin giao hàng"
        open={isOpenModalUpdateInfo} onCancel={handleCancelUpdate} onOk={handleUpdateInforUser}
      >
        {/* <Loading isLoading={isLoading}> */}
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            // onFinish={onUpdateUser}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!'
                },
              ]}
            >
              <InputComponent value={stateUserDetails.name} onChange={handleOnchangeDetails} name="name" />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone!'
                },
              ]}
            >
              <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: 'Please input your address!'
                },
              ]}
            >
              <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[
                {
                  required: true,
                  message: 'Please input your city!'
                },
              ]}
            >
              <InputComponent value={stateUserDetails.city} onChange={handleOnchangeDetails} name="city" />
            </Form.Item>
          </Form>
        {/* </Loading> */}
      </ModalComponent>
    </div>
  )
};

export default OrderPage;