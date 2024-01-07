import axios from "axios"

export const loginUser = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/sign-in`, data)

  return res.data
};

export const signUpUser = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/sign-up`, data)

  return res.data
};

export const getDetailsUser = async (id, access_token) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/get-details/${id}`, {
    headers: {
      token: `Bearer ${access_token}`,
    }
  })

  return res.data
};