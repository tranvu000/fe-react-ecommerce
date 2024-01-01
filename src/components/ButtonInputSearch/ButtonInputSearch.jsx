import React from "react";
import {
  SearchOutlined,
} from '@ant-design/icons'
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ButtonInputSearch = (props) => { 
  const { 
    size,
    placeholder,
    textButton,
    bordered,
    backgroundColorInput = '#fff',
    backgroundColorButton = 'rgb(238, 77, 45)',
    colorButon = '#fff'
  } = props

  return (
    <div style={{ display: 'flex' }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        bordered={bordered}
        style={{ backgroundColor: backgroundColorInput }}
      />
      <ButtonComponent
        size={size}
        styleButton={{ background: backgroundColorButton, color: colorButon, border: !bordered && 'none' }}
        icon={<SearchOutlined color={colorButon} style={{ color: '#fff'}}/>}
        styleTextButton={{color: colorButon}}
        textButton={textButton}
      />
    </div>
  )
};

export default ButtonInputSearch;