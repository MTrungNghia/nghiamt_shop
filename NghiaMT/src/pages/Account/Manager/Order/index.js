import { useRequest } from 'ahooks';
import React, { useEffect, useState } from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import classNames from "classnames/bind";
import styles from "./OrderManager.module.scss";
import {
    Table,
    Avatar,
    Modal,
    Form,
    Input,
    Typography,
    Image,
    notification,
} from "antd";
import axios from 'axios';
import images from '~/assets/images';
import Detail from './Detail';
import CustomButton from '~/components/Antd/Button';
import Button from '~/components/Button';
import RightNavbar from '../../components/RightNavbar';

const cx = classNames.bind(styles);

const { Title } = Typography;

const OrderManager = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [listOrders, setListOrders] = useState([]);
    const [visitableDelete, setVisitableDelete] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [visitableEdit, setVisitableEdit] = useState(false);
    const [selectOrder, setSelectOrder] = useState(null);
    const [dataOrder, setDataOrder] = useState(null);

    const [editForm] = Form.useForm();
    const [Image1, setImage1] = useState(null);
    const [categoryName, setCatergoryName] = useState("");
    const [categoryDes, setCatergoryDes] = useState("");
    const [selectImage1, setselectImagen1] = useState(null);
    const [reload, setReload] = useState(false);

    const [visitableAdd, setVisitableAdd] = useState(false);

    const { TextArea } = Input;

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const columns = [
        {
            title: 'Họ và tên',
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
            title: 'Địa chỉ',
            dataIndex: 'address',
        },
        {
            title: 'Trạng thái đơn hàng',
            dataIndex: 'order_status',
        },
        // {
        //     title: 'Phương thức thanh toán',
        //     dataIndex: 'payment_method',
        // },
        {
            title: 'Tổng tiền',
            dataIndex: 'total_price',
            render: (text) => (
                <span>{Number(text).toLocaleString()} ₫</span>
            )
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'date_added',
        },
        {
            title: 'Hoạt động',
            dataIndex: 'address',
            render: (text, data) => {
                console.log(data?.finish);
                return (
                    <>
                        <Button small primary effect onClick={() => handleEdit(data)} style={{ backgoundColor: '#77d2a1' }}>Chi tiết</Button>
                        {data?.finish === false && (
                            <Button primary effect onClick={() => handleDelete(data)} style={{ marginLeft: '12px' }}>Hoàn thành</Button>
                        )}
                    </>

                )
            }
        },
    ];

    const handleEdit = (data) => {
        setSelectOrder(data);
        axios.get(`http://127.0.0.1:8000/order/order-detail/${data.id}/`)
            .then(function (response) {
                // Xử lý phản hồi từ server (nếu cần)
                setDataOrder(response.data);
                console.log(response.data);
            })
            .catch(function (error) {
                // Xử lý lỗi (nếu có)
                console.error(error);
                alert("Loi");

            });
        setVisitableEdit(true);
    }

    const handleDelete = (data) => {
        console.log(data);
        setSelectOrder(data);
        setVisitableDelete(true);
    }

    useEffect(() => {
        axios.get("/order/list-all/")
            .then(function (res) {
                setListOrders(res.data);
            })
            .catch(function (error) {

            })
    }, [reload]);

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        // selections: [
        //     Table.SELECTION_ALL,
        //     Table.SELECTION_INVERT,
        //     Table.SELECTION_NONE,
        //     {
        //         key: 'odd',
        //         text: 'Select Odd Row',
        //         onSelect: (changeableRowKeys) => {
        //             let newSelectedRowKeys = [];
        //             newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
        //                 if (index % 2 !== 0) {
        //                     return false;
        //                 }
        //                 return true;
        //             });
        //             setSelectedRowKeys(newSelectedRowKeys);
        //         },
        //     },
        //     {
        //         key: 'even',
        //         text: 'Select Even Row',
        //         onSelect: (changeableRowKeys) => {
        //             let newSelectedRowKeys = [];
        //             newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
        //                 if (index % 2 !== 0) {
        //                     return true;
        //                 }
        //                 return false;
        //             });
        //             setSelectedRowKeys(newSelectedRowKeys);
        //         },
        //     },
        // ],
    };
    const handleAdd = () => {
        setVisitableAdd(true);
    }
    const handleOk = () => {
        setConfirmLoading(true);
        if (visitableDelete) {
            axios.post(`http://127.0.0.1:8000/order/confirm-delivered/${selectOrder.id}/`)
                .then(function (response) {
                    // Xử lý phản hồi từ server (nếu cần)
                    console.log(response.data);
                    setReload(!reload);
                    notification.success({ message: 'Xác nhận đơn hàng', description: 'Đơn hàng thành công!' });
                    setVisitableDelete(false);
                })
                .catch(function (error) {
                    // Xử lý lỗi (nếu có)
                    console.error(error);
                    notification.error({ message: 'Xác nhận đơn hàng', description: 'Đơn hàng thất bại!' });

                });
        }
        deleteAllField();
        setTimeout(() => {
            // setVisitableDelete(false);
            // setVisitableAdd(false);
            // setVisitableEdit(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const deleteAllField = () => {
        setImage1(null);
        setCatergoryDes("");
        setCatergoryName("");
    }

    const handleCancel = () => {
        setVisitableDelete(false);
        setVisitableAdd(false);
        setVisitableEdit(false);
        deleteAllField();
    };

    function handleImageChange(e, setImage, setSelect) {
        const file = e.target.files[0];
        setImage(file);
        console.log(file)
        // setSelect(URL.createObjectURL(file));
        setSelect(null);
    }

    function handleChangeNameedit(e) {
        setCatergoryName(e.target.value);

    }

    const handleReload = () => {
        setReload(!reload);
        // Thực hiện các thao tác cần thiết khi nút "reload" được nhấn
    };

    return (
        <div className={cx('wrapper')}>
            {visitableEdit && (
                <Modal
                    title="Chi tiết đơn hàng"
                    open={visitableEdit}
                    onOk={handleOk}
                    footer={[
                        <CustomButton key="back" onClick={handleCancel}>
                            Quay lại
                        </CustomButton>
                    ]}
                    okText="OK"
                    cancelText="Quay lại"
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    width={'70%'}
                >
                    <div>
                        <Detail data={dataOrder} />
                    </div>
                </Modal>
            )}

            {visitableDelete && (
                <Modal
                    title={`Xác nhận hoàn thành đơn hàng`}
                    open={visitableDelete}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <p>{'Đơn hàng thực sự đã hoàn thành?'}</p>
                </Modal>
            )}
            <RightNavbar>
                <div className={cx('inner')} style={{ padding: '0 6px' }}>
                    <div className={cx('category_manager_title')}>
                        <Title level={3}>Thông tin danh sách đơn hàng của bạn:</Title>
                    </div>
                    <div className={cx('category_manager_button')}>
                        <CustomButton
                            type="primary"
                            shape="circle"
                            icon={<ReloadOutlined className="reload-icon" />}
                            onClick={handleReload}
                            className={cx('custom_reload_button')}
                        />
                    </div>
                    <Table
                        style={{ marginTop: '10px' }}
                        columns={columns}
                        dataSource={listOrders}
                        pagination={{
                            position: ['bottomRight'],
                            // Custom CSS class for pagination
                            className: "custom-pagination"
                        }}
                    />
                </div>
            </RightNavbar>
        </div>
    );
};

export default OrderManager;