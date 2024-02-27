import { axiosJWT } from "./UserService";

export const createOrder = async (data, access_token) => {
  const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/create/${data.user}`, data, {
    headers: {
      token: `Bearer ${access_token}`,
    }
  });

  return res.data;
};

export const getOrderByUserId = async (id, access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all-order/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    }
  });

  return res.data;
};

export const getDetailsOrder = async (id, access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-details-order/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    }
  });

  return res.data;
};

export const deleteOrder = async (id, access_token, orderItems, userId) => {
  const data = {orderItems, orderId: id}
  const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/order/delete-order/${userId}`, {data}, {
    headers: {
      token: `Bearer ${access_token}`,
    }
  });

  return res.data;
};

export const getAllOrder = async (access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all-order`, {
    headers: {
      token: `Bearer ${access_token}`,
    }
  });

  return res.data;
};

export const deleteManyOrder = async (data, access_token) => {
  const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/delete-many`, data, {
    headers: {
      token: `Bearer ${access_token}`,
    }
  });
  
  return res.data;
};