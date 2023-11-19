
import { useRequest } from 'ahooks';
import React, { useEffect, useState } from 'react';
import {
    Table,
    Button,
    Avatar,
    Modal,
    Form,
    Input,
    Typography,
    Image,
} from "antd";
import axios from 'axios';
import images from '~/assets/images';

const { Title } = Typography;

const StatiscalByRevenue = () => {
    const [listCategory, setListCategory] = useState([]);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [visitableEdit, setVisitableEdit] = useState(false);

    const [editForm] = Form.useForm();
    const [reload, setReload] = useState(false);

    const { TextArea } = Input;

    const columns = [
        {
            title: 'Tên khách hàng',
            dataIndex: 'name',
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
                                src={images.account}
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
            title: 'Địa chỉ giao hàng',
            dataIndex: 'address',
        },
        {
            title: 'Trạng thái giao',
            dataIndex: 'order_status',
        },
        {
            title: 'Thanh toán',
            dataIndex: 'payment_method',
        },
        {
            title: 'Doanh thu',
            dataIndex: 'total_price',
            render: (text, data) => (
                <span>{Number(text).toLocaleString()} ₫</span>
            )
        },
        {
            title: 'Hoạt động',
            dataIndex: 'address',
            render: (text, data) => {
                return (
                    <>
                        <Button onClick={() => handleEdit(data)} style={{ backgoundColor: '#77d2a1' }}>Xem chi tiết</Button>
                    </>

                )
            }
        },
    ];

    const handleEdit = (data) => {
        setVisitableEdit(true);
    }
    useEffect(() => {
        axios.get("/order/staticscal-revenue/")
            .then(function (res) {
                setListCategory(res.data);
            })
            .catch(function (error) {

            })
    }, [reload]);

    const handleOk = () => {
        setConfirmLoading(true);
        if (visitableEdit) {
            let formData = new FormData();
            axios.post(`http://127.0.0.1:8000/category/update/`, formData)
                .then(function (response) {
                    // Xử lý phản hồi từ server (nếu cần)
                    console.log(response.data);
                    setReload(!reload);
                    alert("thanhf coong");
                    setVisitableEdit(false);
                })
                .catch(function (error) {
                    // Xử lý lỗi (nếu có)
                    console.error(error);
                    alert("Loi");

                });
        }
        setTimeout(() => {
            // setVisitableDelete(false);
            // setVisitableAdd(false);
            // setVisitableEdit(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        setVisitableEdit(false);
    };

    function handleImageChange(e, setImage, setSelect) {
        const file = e.target.files[0];
        setImage(file);
        console.log(file)
        // setSelect(URL.createObjectURL(file));
        setSelect(null);
    }

    return (
        <>
            {visitableEdit && (
                <Modal
                    title="Sửa loại sản phẩm"
                    open={visitableEdit}
                    onOk={handleOk}
                    okText="Lưu loại sản phẩm"
                    cancelText="Hủy"
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    width={'70%'}
                >
                    <div>

                    </div>
                </Modal>
            )}

            <div style={{ padding: '6px' }}>
                <div>
                    <Title level={4}>Tổng doanh thu: {Number(listCategory.total).toLocaleString()} ₫</Title>
                </div>
                <Table columns={columns} dataSource={listCategory?.orders} pagination={{ position: ['bottomRight'] }} />
            </div>
        </>
    );
};

export default StatiscalByRevenue;