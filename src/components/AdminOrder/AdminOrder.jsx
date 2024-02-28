import { Button, Space } from 'antd';
import React, { useRef, useState } from 'react';
import { WrapperHeader } from './style';
import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';
import Loading from '../LoadingComponent/Loading';
import { convertPrice } from '../../utils';
import * as OrderService from '../../services/OrderService';
import { useQuery } from '@tanstack/react-query';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { orderContant } from '../../contant';
import PieChartComponent from './PieChartComponent';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { useLocation } from 'react-router-dom';

const AdminOrder = () => {
  const user = useSelector((state) => state?.user);
  const searchInput = useRef(null);

  
  const getAllOrders = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);

    return res;
  };

  const queryOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrders });
  const { isLoading: isLoadingOrders, data: orders } = queryOrder;

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: 'User name',
      dataIndex: 'userName',
      sorter: (a, b) => a.userName.localeCompare(b.userName),
      ...getColumnSearchProps('userName')
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone.localeCompare(b.phone),
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Address',
      dataIndex: 'address',
      sorter: (a, b) => a.address.localeCompare(b.address),
      ...getColumnSearchProps('address')
    },
    {
      title: 'Paided',
      dataIndex: 'isPaid',
      sorter: (a, b) => a.isPaid.localeCompare(b.isPaid),
      filters: [
        {
          text: 'True',
          value: 'true',
        },
        {
          text: 'False',
          value: 'false',
        },
      ],
      ...getColumnSearchProps('isPaid')
    },
    {
      title: 'Shipped',
      dataIndex: 'isDelivered',
      sorter: (a, b) => a.isDelivered.localeCompare(b.isDelivered),
      filters: [
        {
          text: 'True',
          value: 'true',
        },
        {
          text: 'False',
          value: 'false',
        },
      ],
      ...getColumnSearchProps('isDelivered')
    },
    {
      title: 'Payment method',
      dataIndex: 'paymentMethod',
      sorter: (a, b) => a.paymentMethod.localeCompare(b.paymentMethod),
      ...getColumnSearchProps('paymentMethod')
    },
    {
      title: 'Total price',
      dataIndex: 'totalPrice',
      sorter: (a, b) => {
        const totalPriceA = parseInt(a.totalPrice.split(' ')[0].replace(/[,.]/g, ''), 10);
        const totalPriceB = parseInt(b.totalPrice.split(' ')[0].replace(/[,.]/g, ''), 10);
        return totalPriceA - totalPriceB;
      },
      filters: [
        {
          text: 'Dưới 100.000',
          value: '<100000',
        },
        {
          text: 'Từ 100.000 - 500.000',
          value: '100000-500000',
        },
        {
          text: 'Từ 500.000 - 2.000.000',
          value: '500000-2000000',
        },
        {
          text: 'Từ 2.000.000 - 15.000.000',
          value: '2000000-15000000',
        },
        {
          text: 'Từ 15.000.000 - 50.000.000',
          value: '15000000-50000000',
        },
        {
          text: 'Trên 50.000.000',
          value: '>50000000',
        },
      ],
      onFilter: (value, record) => {
        const totalPrice = parseInt(record.totalPrice.split(' ')[0].replace(/[,.]/g, ''), 10);
        if (value === '<100000') {
          return totalPrice >= 0 && totalPrice < 100000;
        } else if (value === '100000-500000') {
          return totalPrice >= 100000 && totalPrice <= 500000;
        } else if (value === '500000-2000000') {
          return totalPrice >= 500000 && totalPrice <= 2000000;
        } else if (value === '2000000-15000000') {
          return totalPrice >= 2000000 && totalPrice <= 15000000;
        } else if (value === '15000000-50000000') {
          return totalPrice >= 15000000 && totalPrice <= 50000000;
        } else if (value === '>50000000') {
          return totalPrice > 50000000;
        };
      },
    },
  ];

  const dataTable = orders?.data?.length && orders?.data?.map((order) => {
    return {
      ...order,
      key: order?._id,
      userName: order?.shippingAddress?.fullName,
      phone: order?.shippingAddress?.phone,
      address: order?.shippingAddress?.address,
      paymentMethod: orderContant.payment[order?.paymentMethod],
      isPaid: order?.isPaid ? 'True' :'False',
      isDelivered: order?.isDelivered ? 'True' : 'False',
      totalPrice: convertPrice(order?.totalPrice)
    }
  });

  const [rowSelected, setRowSelected] = useState('');


  const mutationDeletedMany = useMutationHooks((data) => {
    const { token, ...ids } = data;
    const res = OrderService.deleteManyOrder(ids, token);

    return res;
  });

  const handleDeleteManyOrders = (ids) => {
    mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
      onSettled: () => {
        queryOrder.refetch()
      }
    })
  };

  return (
    <div>
      <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
      <div style={{height: 200, width:200}}>
        <PieChartComponent data={orders?.data} />
      </div>
      <div style={{ marginTop: '20px' }}>
        <TableComponent handleDeleteMany={handleDeleteManyOrders} columns={columns} isLoading={isLoadingOrders} data={dataTable} onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              setRowSelected(record._id)
            }
          };
        }} />
      </div>
    </div>
  )
};

export default AdminOrder;