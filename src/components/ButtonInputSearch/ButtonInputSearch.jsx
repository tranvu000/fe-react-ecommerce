import { Button, Input } from "antd";
import React from "react";
import {
  SearchOutlined,
} from '@ant-design/icons'

const ButtonInputSearch = (props) => { 
  const { 
    size,
    placeholder,
    textButton,
    bordered,
    backgroundColorInput = '#fff',
    backgroundColorButton = 'rgb(13, 92, 182)',
    colorButon = '#fff'
  } = props

  return (
    <div style={{ display: 'flex' }}>
      <Input
        size={size}
        placeholder={placeholder}
        bordered={bordered}
        style={{ backgroundColor: backgroundColorInput }}
      />
      <Button
        size={size}
        style={{ backgroundColor: backgroundColorButton, color: colorButon, border: !bordered && 'none' }}
        icon={<SearchOutlined />}
      >{textButton}</Button>
    </div>
  )
};

export default ButtonInputSearch;