import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderItems: [],
  orderItemsSelected: [],
  shippingAddress: {},
  paymentMethod: '',
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: '',
  isPaid: false,
  paidAt: '',
  isDelivered: false,
  deliveredAt: '',
  isSuccessOrder: false
};

export const orderSlide = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItem } = action?.payload;
      const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem?.product && item?.userId === orderItem?.userId);
      if (itemOrder) {
        if (itemOrder.amount + orderItem.amount <= itemOrder.countInStock) {
          itemOrder.amount += orderItem.amount;
          state.isSuccessOrder = true;
          state.isErrorOrder = false;
        } else {
          state.isErrorOrder = true;
        }
      } else {
        state.orderItems.push(orderItem);
        state.isSuccessOrder = true;
        state.isErrorOrder = false;
      }
    },
    resetOrder: (state) => {
      state.isSuccessOrder = false
    },
    increaseAmount: (state, action) => {
      const {idProduct, userId} = action.payload;
      const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct && item.userId === userId);
      const itemOrderSelected = state?.orderItemsSelected?.find((item) => item?.product === idProduct && item.userId === userId);

      if (itemOrder) {
        itemOrder.amount++;
      }
      if (itemOrderSelected) {
        itemOrderSelected.amount++;
      }
    },
    decreaseAmount: (state, action) => {
      const {idProduct, userId} = action.payload;
      const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct && item.userId === userId);
      const itemOrderSelected = state?.orderItemsSelected?.find((item) => item?.product === idProduct && item.userId === userId);

      if (itemOrder && itemOrder.amount > 1) {
        itemOrder.amount--;
      }
      if (itemOrderSelected && itemOrderSelected.amount > 1) {
        itemOrderSelected.amount--;
      }
    },
    removeOrderProduct: (state, action) => {
      const { idProduct, userId } = action.payload;
      const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct || item?.userId !== userId);
      const itemOrderSelected = state?.orderItemsSelected?.filter((item) => item?.product !== idProduct || item?.userId !== userId);
    
      state.orderItems = itemOrder;
      state.orderItemsSelected = itemOrderSelected;
    },
    removeAllOrderProduct: (state, action) => {
      const { listChecked, userId } = action.payload;

      const itemOrders = state?.orderItems?.filter((item) => {
        return !(listChecked.includes(item.product) && item.userId === userId);
      });
      const itemOrderSelected = state?.orderItemsSelected?.filter((item) => {
        return !(listChecked.includes(item.product) && item.userId === userId);
      });

      state.orderItems= itemOrders;
      state.orderItemsSelected = itemOrderSelected;
    },
    selectedOrder: (state, action) => {
      const {listChecked} = action.payload;
        const orderSelected = [];

        state.orderItems.forEach((order) => {
          if (listChecked.includes(order.product)) {
            orderSelected.push(order)
          };
        });
        state.orderItemsSelected = orderSelected;
    }
  },
});

export const {
  addOrderProduct,
  increaseAmount,
  decreaseAmount,
  removeOrderProduct,
  removeAllOrderProduct,
  selectedOrder,
  resetOrder
} = orderSlide.actions;

export default orderSlide.reducer;