import { Avatar, Typography, Divider, Spin, Table, Tag } from 'antd';
import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
import { useEffect, useState } from 'react';
const { Title } = Typography;

const cx = classNames.bind(styles);

function Detail({ data }) {
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState(null);
    console.log(data);
    console.log(data == null);
    useEffect(() => {
        if (data != null) {
            setOrder(data.order);
            setProducts(data.products);
        }
        console.log(order);
        console.log(products);
    }, [order, products, data]);

    const columns = [
        {
            title: 'Tên loại sản phẩm',
            dataIndex: 'product_name',
            filterSearch: true,
            onFilter: (value, record) => record.name.startsWith(value),
            render: (text, data) => {

                return (
                    <>
                        <Avatar.Group>
                            <Avatar
                                className="shape-avatar"
                                shape="square"
                                size={40}
                                src={`http://localhost:8000${data.image}`}
                            ></Avatar>
                            <div className="avatar-info">
                                <Title style={{ marginLeft: '12px' }} level={5}>{text}</Title>
                            </div>
                        </Avatar.Group>{" "}
                    </>
                )
            }
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            render: (text, data) => (
                <p>{Number(text).toLocaleString()}₫</p>
            )
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
        },
        {
            title: 'Tổng',
            dataIndex: 'price',
            render: (text, data) => (
                <p>{Number(data.price * data.quantity).toLocaleString()}₫</p>
            )
        },
    ];
    return (
        <>
            <Divider />
            {data == null ? (
                <div className={cx('content')}>
                    <Spin />
                </div>
            ) : (
                <div className={cx('content-main')}>
                    <div style={{ marginBottom: '10px' }}>
                        {products != null && (
                            <>
                                <h3>Danh sách sản phẩm:</h3>
                                <Table columns={columns} dataSource={products} pagination={{ position: ['topRight'] }} />
                            </>
                        )}
                    </div>
                    <div className={cx('detail-order')}>
                        <div className={cx('detail-order__customer')}>
                            <h3>Thông tin khách hàng:</h3>
                            <p>Tên khách hàng: {order?.name}</p>
                            <p>Địa chỉ: {order?.address}</p>
                            <p>Số điện thoại: {order?.phone_number}</p>
                        </div>
                        <div className={cx('detail-order__infor')}>
                            <h3>Thông tin đơn hàng:</h3>
                            <p>Trạng thái: <Tag color="green">{order?.order_status}</Tag></p>
                            <p>Phương thức thanh toán: {order?.payment_method}</p>
                            <p>Trạng thái thanh toán: {order?.payment_status}</p>
                            <p>Phí giao hàng: {Number(40000).toLocaleString()} ₫</p>
                            {order?.discount_code !== null && (
                                <p>Mã giảm giá: {Number(order?.discount_code).toLocaleString()} ₫</p>
                            )}
                        </div>
                    </div>
                    <div className={cx('total-order')}>
                        <p>Tổng: {Number(order?.total_price).toLocaleString()} ₫</p>
                    </div>
                </div>
            )}
        </>
    );
}

export default Detail;