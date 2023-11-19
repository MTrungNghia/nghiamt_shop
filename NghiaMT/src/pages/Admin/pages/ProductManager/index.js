import { useRequest } from 'ahooks';
import React, { useEffect, useState } from 'react';
import {
    Table,
    Avatar,
    Modal,
    Form,
    Input,
    Typography,
    Image,
} from "antd";
import axios from 'axios';
import AddProduct from '~/pages/AddProduct';
import { ReloadOutlined } from '@ant-design/icons';
import classNames from "classnames/bind";
import styles from "./ProductManager.module.scss";
import Button from '~/components/Button';
import CustomButton from '~/components/Antd/Button';

const { Title } = Typography;
const cx = classNames.bind(styles);

const ProductManager = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [visitableDelete, setVisitableDelete] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [visitableEdit, setVisitableEdit] = useState(false);
    const [selectProduct, setSelectProduct] = useState(null);

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
            title: 'Tên sản phẩm',
            dataIndex: 'product_name',
            filterSearch: true,
            width: '300px',
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
            title: 'Loại sản phẩm',
            dataIndex: 'category',

        },
        {
            title: 'Số lượng',
            dataIndex: 'inventory',

        },
        {
            title: 'Đã bán',
            dataIndex: 'quantity_sold',

        },
        {
            title: 'Giá sản phẩm',
            dataIndex: 'price',

        },
        {
            title: 'Hoạt động',
            dataIndex: 'address',
            render: (text, data) => {
                return (
                    <>
                        <Button primary effect onClick={() => handleEdit(data)} style={{ backgoundColor: '#77d2a1' }}>Edit</Button>
                        <Button effect onClick={() => handleDelete(data)} style={{ marginLeft: '12px' }}>Delete</Button>
                    </>

                )
            }
        },
    ];

    const handleEdit = (data) => {
        setSelectProduct(data);
        console.log(selectProduct);
        setCatergoryName(data.category_name);
        setCatergoryDes(data.description);
        editForm.setFieldValue('nameEdit', data.category_name);
        editForm.setFieldValue('descriptionEdit', data.description);
        console.log(categoryName);
        console.log(categoryDes);

        setImage1(data.cate_image);
        setVisitableEdit(true);
    }

    const handleDelete = (data) => {
        console.log(data);
        setSelectProduct(data);
        setVisitableDelete(true);
    }
    useEffect(() => {
        axios.get("/product/product-list-all/")
            .then(function (res) {
                setListProduct(res.data);
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
        if (visitableEdit) {
            let formData = new FormData();
            formData.append('category_name', categoryName);
            formData.append('description', categoryDes);
            formData.append('cate_image', Image1);

            console.log(formData);
            console.log(categoryName);
            console.log(categoryDes);
            console.log(Image1);
            axios.post(`http://127.0.0.1:8000/category/update/${selectProduct.id}/`, formData)
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
        if (visitableAdd) {
            let formData = new FormData();
            formData.append('category_name', categoryName);
            formData.append('description', categoryDes);
            formData.append('cate_image', Image1);

            console.log(formData);
            console.log(categoryName);
            console.log(categoryDes);
            console.log(Image1);
            axios.post(`http://127.0.0.1:8000/category/create/`, formData)
                .then(function (response) {
                    // Xử lý phản hồi từ server (nếu cần)
                    console.log(response.data);
                    setReload(!reload);
                    alert("add thanhf coong");
                    setVisitableAdd(false);
                })
                .catch(function (error) {
                    // Xử lý lỗi (nếu có)
                    console.error(error);
                    alert("Loi");

                });
        }
        if (visitableDelete) {
            axios.delete(`http://127.0.0.1:8000/category/delete/${selectProduct.id}/`)
                .then(function (response) {
                    // Xử lý phản hồi từ server (nếu cần)
                    console.log(response.data);
                    setReload(!reload);
                    alert("Xoas thanhf coong");
                    setVisitableDelete(false);
                })
                .catch(function (error) {
                    // Xử lý lỗi (nếu có)
                    console.error(error);
                    alert("Loi");

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

    return (
        <>

            {visitableAdd && (
                <AddProduct
                    title="Thêm sản phẩm"
                    open={visitableAdd}
                    onOk={handleOk}
                    onCancel={handleCancel}
                />
            )}

            {visitableDelete && (
                <Modal
                    title={`Xóa loại sản phẩm ${selectProduct.category_name}`}
                    open={visitableDelete}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <p>{'Bạn có thực sự muốn xóa sản phẩm này không?'}</p>
                </Modal>
            )}

            {visitableEdit && (
                <Modal
                    title="Sửa sản phẩm"
                    open={visitableEdit}
                    onOk={handleOk}
                    okText="Lưu sản phẩm"
                    cancelText="Hủy"
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    width={'70%'}
                >
                    <div>
                        <Form
                            form={editForm}
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 14 }}
                            layout="horizontal"
                            style={{ maxWidth: '100%' }}
                        >
                            <Form.Item name='nameEdit' initialValue={categoryName} label="Tên sản phẩm">
                                <Input value={categoryName} onChange={handleChangeNameedit} />
                            </Form.Item>
                            <Form.Item name='descriptionEdit' initialValue={categoryDes} label="Mô tả">
                                <TextArea value={categoryDes} onChange={(e) => setCatergoryDes(e.target.value)} rows={4} />
                            </Form.Item>
                            <Form.Item name="imageEdit" label="Hình ảnh" >

                                <Image
                                    width={200}
                                    style={{ marginBottom: '10px' }}
                                    src={`http://localhost:8000${Image1}`}
                                />
                                <input type="file" onChange={(e) => handleImageChange(e, setImage1, setselectImagen1)} />
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            )}

            <div style={{ padding: '0 6px' }}>
                <div className={cx('category_manager_title')}>
                    <Title level={3}>Thông tin sản phẩm của cửa hàng:</Title>
                </div>
                <div className={cx('category_manager_button')}>
                    <CustomButton
                        type="primary"
                        shape="circle"
                        icon={<ReloadOutlined className="reload-icon" />}
                        // onClick={handleReload}
                        className={cx('custom_reload_button')}
                    />
                    <Button style={{ marginLeft: '10px' }} primary effect onClick={handleAdd}>Thêm sản phẩm</Button>
                </div>
                <Table columns={columns} dataSource={listProduct} pagination={{ position: ['bottomRight'] }} />
            </div>
        </>
    );
};

export default ProductManager;