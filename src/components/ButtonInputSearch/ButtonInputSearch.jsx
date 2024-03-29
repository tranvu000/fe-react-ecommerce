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
    textbutton,
    bordered,
    backgroundColorInput = '#fff',
    backgroundcolorbutton = 'rgb(238, 77, 45)',
    colorButon = '#fff'
  } = props

  return (
    <div style={{ display: 'flex' }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        bordered={bordered}
        style={{ backgroundColor: backgroundColorInput }}
        {...props}
      />
      <ButtonComponent
        size={size}
        styleButton={{ background: backgroundcolorbutton, color: colorButon, border: !bordered && 'none' }}
        icon={<SearchOutlined color={colorButon} style={{ color: '#fff'}}/>}
        styleTextButton={{color: colorButon}}
        textbutton={textbutton}
      />
    </div>
  )
};

export default ButtonInputSearch;