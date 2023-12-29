import React from "react";
import {
  WrapperContent,
  WrapperLabelText,
  WrapperTextPrice,
  WrapperTextValue
} from "./style";
import { Checkbox, Rate } from "antd";

const NavBarComponent = () => {
  const onChange = () => {

  }
  const renderContent = (type, options) => {
    switch (type) {
      case 'text':
        return options.map(option => {
          return (
            <WrapperTextValue>{option}</WrapperTextValue>
          )
        })
      case 'checkbox':
        return (
          <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', grap: '12px' }} onChange={onChange}>
            {options.map(option => {
              return (
                <Checkbox style={{ marginLeft: 0 }} value={option.value}>{option.label}</Checkbox>
              )
            })}
          </Checkbox.Group>
        )
      case 'star':
        return options.map(option => {
          return (
            <div style={{ display: 'flex', gap: '4px'}}>
              <Rate style={{ fontSize: '12px'}} disabled defaultValue={option} />
              <span>{ `Từ ${option} sao` }</span>
            </div>
          )
        })
      case 'price':
        return options.map(option => {
          return (
            <WrapperTextPrice>{option}</WrapperTextPrice>
          )
        })
        
      default:
        return {}
    }
  }
  return (
    <div>
      <WrapperLabelText>Label</WrapperLabelText>
      <WrapperContent>
        {renderContent('text', ['Điện thoại', 'Máy tính', 'Quần áo'])}
      </WrapperContent>
      {/* <WrapperContent>
        {renderContent('checkbox', [
          {
            value: 'a',
            label: 'A'
          },
          {
            value: 'b',
            label: 'B'
          },
        ])}
      </WrapperContent>
      <WrapperContent>
        {renderContent('star', [3, 4, 5])}
      </WrapperContent>
      <WrapperContent>
        {renderContent('price', ['Giá dưới 100.000', 'Giá dưới 500.000', 'Giá dưới 1.000.000', 'Giá trên 1.000.000'])}
      </WrapperContent> */}
    </div>
  )
};

export default NavBarComponent;