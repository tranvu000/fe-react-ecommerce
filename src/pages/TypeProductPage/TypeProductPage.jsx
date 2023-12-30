import React from "react";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";

const TypeProductPage = () => {
  const onChange = () => {}
  return (
    <div style={{ padding: '0 120px', background: '#efefef' }}>
      <Row style={{ flexWrap: 'nowrap', paddingTop: '10px'}}>
        <WrapperNavbar span={4}>
          <NavBarComponent />
        </WrapperNavbar>
        <Col span={20}>
          <WrapperProducts>
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
          </WrapperProducts>
          <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} 
            style={{ textAlign: 'center', marginTop: '10px'}}
          />
        </Col>
      </Row>
    </div>
  )
      // Pagination: Phân trang theo thứ tự
};

export default TypeProductPage;