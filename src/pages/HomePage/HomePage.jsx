import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import slider1 from "../../assets/images/slider1.jpg";
import slider2 from "../../assets/images/slider2.jpg";
import slider3 from "../../assets/images/slider3.jpg";
import CardComponent from "../../components/CardComponent/CardComponent";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";


const HomePage = () => {
  const arr = ['TV', 'Điện Thoại', 'Quần Áo', 'Thời Trang Nữ', 'Gia Dụng', 'Giày Dép Nam',
    'Đồng Hồ', 'Sức Khỏe', 'Sắc Đẹp', 'Giày Dép Nữ', 'Xe Máy', 'Thời Trang Nam', 'Thời Trang Trẻ Em', 'Đồ Chơi'
  ];
  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct()
    return res;
  };
  const { isLoading, data: products } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProductAll,
    config: { retry: 3, retryDelay: 1000 }
  });

  return (
    <>
      <div style={{ width: '1270px', margin: '0 auto' }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return (
              <TypeProduct name={item} key={item} />
            )
          })}
        </WrapperTypeProduct>
      </div>
      <div className="body" style={{ width: '100%', backgroundColor: '#efefef' }}>
        <div id="container" style={{ height: '1000px', width: '1270px', margin: '0 auto'}}>
          <SliderComponent arrImages={[slider1, slider2, slider3]} />
          <WrapperProducts>
            {products?.data?.map((product) => {
              return (
                <CardComponent 
                  key = {product._id} 
                  countInStock = {product.countInStock} 
                  description = {product.description} 
                  image = {product.image} 
                  name = {product.name} 
                  price = {product.price}
                  rating = {product.rating}
                  type = {product.type}
                  selled = {product.selled}
                  discount = {product.discount}
                />
              )
            })}
          </WrapperProducts>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <WrapperButtonMore textButton="Xem Thêm" type="outline" styleButton={{
              border: "1px solid rgb(11, 116, 229)",
              color: "rgb(11, 116, 229)",
              width: "240px",
              height: "38px",
              borderRadius: "4px"
            }}
            styleTextButton={{ fontWeight: 500 }} />
          </div>

        </div>
      </div>
    </>
  )
};

export default HomePage;