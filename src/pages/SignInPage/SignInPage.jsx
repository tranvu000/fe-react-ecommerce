import React, { useState } from "react";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Image } from "antd";
import imageLogo from "../../assets/images/logo-login.jpg";
import {
  EyeOutlined,
  EyeInvisibleOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword]=useState(false);
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');

  const navigate = useNavigate();

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  };

  const handleOnchangePassword = (value) => {
    setPassword(value)
  };

  const handleSignIn = () => {
    console.log('signin', email, password);
  }

  const handleNavigateSignUp = () => {
    navigate('/sign-up')
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
            styleTextButton={{ color: '#fff', fontSize:'15px', fontWeight: '700' }}
            textButton={'Đăng Nhập'}
          >
          </ButtonComponent>
          <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
          <p>
            Chưa có tài khoản?
            <WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imageLogo} alt="image logo" preview={false} height='203px' width='203px'/>
          <h4>Mua sắm tại shopee</h4>
        </WrapperContainerRight>
      </div>
    </div>
  )
};

export default SignInPage;