import axios from "axios"

export const loginUser = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/sign-in`, data)

  return res.data
};

export const signUpUser = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/sign-up`, data)

  return res.data
};