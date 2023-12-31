import React from "react";
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Image } from "antd";
import imageLogo from "../../assets/images/logo-login.jpg"

const SignUpPage = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh', }}>
      <div style={{ width: '800px', height: '444px', borderRadius: '6px', background: '#fff', display: 'flex'}}>
        <WrapperContainerLeft>
          <h1>Xin Chào</h1>
          <span>Đăng ký và tạo tài khoản</span>
          <InputForm style={{ margin: '10px 0' }} placeholder="abc@gmail.com" />
          <InputForm style={{ marginBottom: '10px' }} placeholder="password" />
          <InputForm placeholder="comfirm password" />
          <ButtonComponent
            size={20}
            styleButton={{ 
              background: 'rgb(255, 57, 69)',
              height: '48px',
              width: '100%',
              border: 'none',
              borderRadius: '4px',
              margin: '26px 0 10px'
            }}
            styleTextButton={{ color: '#fff', fontSize:'15px', fontWeight: '700' }}
            textButton={'Đăng Ký'}
          >
          </ButtonComponent>
          <p>
            Đã có tài khoản?
            <WrapperTextLight>Đăng nhập</WrapperTextLight>
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

export default SignUpPage;