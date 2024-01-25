import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/LoadingComponent/Loading';
import * as OrderService from '../../services/OrderService';
import { useSelector } from 'react-redux';
import { convertPrice } from '../../utils';
import { WrapperItemOrder, WrapperListOrder, WrapperHeaderItem, WrapperFooterItem, WrapperContainer, WrapperStatus } from './style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { useEffect } from 'react';
import * as message from '../../components/Message/Message';

const MyOrderPage = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderByUserId(state?.id, state?.token);

    return res.data;
  };

  const queryOrder = useQuery({
    queryKey: ['orders'],
    queryFn: fetchMyOrder,
    config: { enabled: !!state?.id && !!state?.token }
  });
  const { isLoading, data } = queryOrder;

  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: {
        token: state?.token
      }
    })
  };

  const mutation = useMutationHooks((data) => {
    const { id, token, orderItems } = data;
    const res = OrderService.deleteOrder(id, token, orderItems);

    return res;
  });

  const handleDeleteOrder = (order) => {
    mutation.mutate({ id: order?._id, token: state?.token, orderItems: order?.orderItems }, {
      onSuccess: () => {
        queryOrder.refetch()
      }
    })
  };
  const { isLoading: isLoadingDelete, isSuccess: isSuccessDelete, isError: isErrorDelete, data: dataDelete } = mutation;

  useEffect(() => {
    if (isSuccessDelete && dataDelete?.status === 'OK') {
      message.success()
    } else if (isSuccessDelete && dataDelete?.status === 'ERR') {
      message.error(dataDelete?.message)
    } else if (isErrorDelete) {
      message.error()
    }
  }, [isSuccessDelete, isErrorDelete])

  const renderProduct = (data) => {
    return data?.map((order) => {
      return (
        <WrapperHeaderItem key={order?._id}>
          <img src={order?.image} style={{
            width: '70px', 
            height: '70px', 
            objectFit: 'cover',
            border: '1px solid rgb(238, 238, 238)',
            padding: '2px'
            }}
          />
          <div style={{
            width: 260,
            overflow: 'hidden',
            textOverflow:'ellipsis',
            whiteSpace:'nowrap',
            marginLeft: '10px'
          }}>{order?.name}</div>
          <span style={{ fontSize: '13px', color: '#242424',marginLeft: 'auto' }}>{convertPrice(order?.price)}</span>
        </WrapperHeaderItem>
      )
    })
  }

  return (
    // <Loading isLoading={isLoading || isLoadingDelete}>
      <WrapperContainer>
        <div style={{height: '100%', width: '1270px', margin: '0 auto'}}>
          <h3 style={{fontWeight: 'bold'}}>Đơn hàng của tôi</h3>
          <WrapperListOrder>
            {data?.map((order) => {
              return (
                <WrapperItemOrder key={order?._id}>
                  <WrapperStatus>
                    <span style={{fontSize: '14px', fontWeight: 'bold'}}>Trạng thái</span>
                    <div><span style={{color: 'rgb(255, 66, 78)'}}>Giao hàng: </span>{`${order.isDelivered ? 'Đã giao hàng': 'Chưa giao hàng'}`}</div>
                    <div><span style={{color: 'rgb(255, 66, 78)'}}>Thanh toán:</span>{`${order.isPaid ? 'Đã thanh toán': 'Chưa thanh toán'}`}</div>
                  </WrapperStatus>
                  {renderProduct(order?.orderItems)}
                  <WrapperFooterItem>
                    <div>
                      <span style={{color: 'rgb(255, 66, 78)'}}>Tổng tiền: </span>
                      <span 
                        style={{ fontSize: '13px', color: 'rgb(56, 56, 61)',fontWeight: 700 }}
                      >{convertPrice(order?.totalPrice)}</span>
                    </div>
                    <div style={{display: 'flex', gap: '10px'}}>
                    <ButtonComponent
                        onClick={() => handleDeleteOrder(order)}
                        size={40}
                        styleButton={{
                          height: '36px',
                          border: '1px solid rgb(11, 116, 229)',
                          borderRadius: '4px'
                        }}
                        textbutton={'Hủy đơn hàng'}
                        styleTextButton={{ color: 'rgb(11, 116, 229)', fontSize: '14px' }}
                      >
                      </ButtonComponent>
                      <ButtonComponent
                        onClick={() => handleDetailsOrder(order?._id)}
                        size={40}
                        styleButton={{
                          height: '36px',
                          border: '1px solid rgb(11, 116, 229)',
                          borderRadius: '4px'
                        }}
                        textbutton={'Xem chi tiết'}
                        styleTextButton={{ color: 'rgb(11, 116, 229)', fontSize: '14px' }}
                      >
                      </ButtonComponent>
                    </div>
                  </WrapperFooterItem>
                </WrapperItemOrder>
              )
            })}
          </WrapperListOrder>
        </div>
      </WrapperContainer>
    // </Loading>
  )
};

export default MyOrderPage;