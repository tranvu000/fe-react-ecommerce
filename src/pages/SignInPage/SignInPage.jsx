import React, { useEffect, useState } from "react";
import { StyledImage, WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Image } from "antd";
import imageLogo from "../../assets/images/logo-login.jpg";
import {
  EyeOutlined,
  EyeInvisibleOutlined
} from '@ant-design/icons';
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";


const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const user  = useSelector((state) => state.user);
  const navigate = useNavigate();

  const mutation = useMutationHooks(
    data => UserService.loginUser(data)
  );
  const { data, isLoading, isSuccess } = mutation;

  useEffect(() => {
    if (isSuccess) {
      if (location?.state) {
        navigate(location?.state)
      } else {
        navigate('/')
      };
      localStorage.setItem('access_token', JSON.stringify(data?.access_token));
      localStorage.setItem('refresh_token', JSON.stringify(data?.refresh_token));
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token)
        if(decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token)
        }
      };
    };
  }, [isSuccess]);

  const handleGetDetailsUser = async (id, token) => {
    const storage = localStorage.getItem('refresh_token');
    const refreshToken = JSON.parse(storage);
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
  };

  const handleNavigateSignUp = () => {
    navigate('/sign-up')
  };

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  };

  const handleOnchangePassword = (value) => {
    setPassword(value)
  };

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password
    });
  };

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh', }}>
      <div style={{ width: '800px', height: '444px', borderRadius: '6px', background: '#fff', display: 'flex'}}>
        <WrapperContainerLeft>
          <h1>Xin Chào</h1>
          <span>Đăng nhập vào tạo tài khoản</span>
          <InputForm style={{ margin: '10px 0' }} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail} />
          <div style={{ position: 'relative' }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px'
              }}
            >{
              isShowPassword ? (
                <EyeOutlined />
              ) : (
                <EyeInvisibleOutlined />
              )
            }
            </span>
            <InputForm
              placeholder="password"
              type={ isShowPassword ? "text" : "password" }
              value={password}
              onChange={handleOnchangePassword}
            />
          </div>
          { data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>} 
          {/* <Loading isLoading={isLoading}> */}
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
              size={40}
              styleButton={{ 
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px'
              }}
              textbutton={'Đăng Nhập'}
              styleTextButton={{ color: '#fff', fontSize:'15px', fontWeight: '700' }}
            ></ButtonComponent>
          {/* </Loading> */}
          <p><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></p>
          <p>
            Chưa có tài khoản?
            <WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <StyledImage src={imageLogo} alt="image logo" preview={false} height='203px' width='203px' onClick={handleClick}/>
          <h4>Mua sắm tại shopee</h4>
        </WrapperContainerRight>
      </div>
    </div>
  )
};

export default SignInPage;