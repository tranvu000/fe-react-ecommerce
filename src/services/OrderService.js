import { axiosJWT } from "./UserService"

export const createOrder = async (access_token, data) => {
  const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/create`, data, {
    headers: {
      token: `Bearer ${access_token}`,
    }
  });

  return res.data;
};

export const getOrderByUserId = async (id, access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-order-details/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    }
  });

  return res.data;
};