import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputForm from '../../components/InputForm/InputForm';
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from './style';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message';
import { updateUser } from '../../redux/slides/userSlide';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getBase64 } from '../../utils';

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState('');

  const mutation = useMutationHooks(
    (data) => {
      const { id, access_token, ...rests } = data
      UserService.updateUser(id, rests, access_token)
        .then(response => {
          if (response.status === 'ERR') {
            message.error(response.message);
          } else if (response.status === 'OK') {
            message.success();
            handleGetDetailsUser(user?.id, user?.access_token);
          }
        })
        .catch(error => {
          console.error('Error updating user:', error);
          message.error('Failed to update user information');
        });
    }
  );

  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError } = mutation;

  useEffect(() => {
    setEmail(user?.email)
    setName(user?.name)
    setPhone(user?.phone)
    setAddress(user?.address)
    setAvatar(user?.avatar)
  }, [user]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({ ...res?.data, access_token: token }))
  };

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  };
  const handleOnchangeName = (value) => {
    setName(value)
  };
  const handleOnchangePhone = (value) => {
    setPhone(value)
  };
  const handleOnchangeAddress = (value) => {
    setAddress(value)
  };

  const handleOnchangeAvatar = async ({fileList}) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    };

    setAvatar(file.preview);
  };

  const handleUpdate = () => {
    mutation.mutate({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token });
  };

  return (
    <div style={{ width: '1270px', margin: '0 auto', height: '500px' }}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      {/* <Loading isLoading={isLoading}> */}
        <WrapperContentProfile>
          <WrapperInput>
            <WrapperLabel htmlFor="name">Name</WrapperLabel>
            <InputForm style={{ width: '100%' }} id="name" value={name} onChange={handleOnchangeName} />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="email">Email</WrapperLabel>
            <InputForm style={{ width: '100%' }} id="email" value={email} onChange={handleOnchangeEmail} />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
            <InputForm style={{ width: '100%' }} id="phone" value={phone} onChange={handleOnchangePhone} />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
            <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
              <Button icon={<UploadOutlined />}>Select File</Button>
            </WrapperUploadFile>
            {avatar && (
              <img src={avatar} style={{
                height: '60px',
                width: '60px',
                borderRadius: '50%',
                objectFit: 'cover',
              }} alt="avatar"/>
            )}
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel htmlFor="address">Address</WrapperLabel>
            <InputForm style={{ width: '100%' }} id="address" value={address} onChange={handleOnchangeAddress} />
          </WrapperInput>
          <ButtonComponent
            onClick={handleUpdate}
            size={40}
            styleButton={{
              height: '50px',
              width: '200px',
              borderRadius: '4px',
              padding: '2px 6px 6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
            }}
            textbutton={'Cập nhật'}
            styleTextButton={{ color: 'rgb(238, 77, 45)', fontSize: '15px', fontWeight: '700' }}
          ></ButtonComponent>
        </WrapperContentProfile>
      {/* </Loading> */}
    </div>
  )
};

export default ProfilePage;