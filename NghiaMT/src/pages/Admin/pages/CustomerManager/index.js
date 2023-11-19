import { useRequest } from 'ahooks';
import React, { useEffect, useState } from 'react';
import {
    Table,
    Checkbox,
    Avatar,
    Modal,
    Form,
    Input,
    Typography,
    Image,
} from "antd";
import axios from 'axios';
import images from '~/assets/images';
import UserAddressTable from './UserAddressTable';
import Cookies from 'js-cookie';
import { ReloadOutlined } from '@ant-design/icons';
import classNames from "classnames/bind";
import styles from "./CustomerManager.module.scss";
import Button from '~/components/Button';
import CustomButton from '~/components/Antd/Button';

const { Title } = Typography;
const cx = classNames.bind(styles);

const CustomerManager = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [listUser, setListUser] = useState([]);
    const [visitableDelete, setVisitableDelete] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [visitableEdit, setVisitableEdit] = useState(false);
    const [selectCategory, setSelectCategory] = useState(null);

    const [editForm] = Form.useForm();
    const [Image1, setImage1] = useState(null);
    const [accountName, setAccountName] = useState("");
    const [accountLastName, setAccountLastName] = useState("");
    const [accountEmail, setAccountEmail] = useState("");
    const [accountPassword, setAccountPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
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
            title: 'Tên khách hàng',
            dataIndex: 'first_name',
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
                                <Title style={{ marginLeft: '12px' }} level={5}>{`${data.first_name} ${data.last_name}`}</Title>
                            </div>
                        </Avatar.Group>{" "}
                    </>
                )
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Admin',
            dataIndex: 'is_admin',
            render: (text, data) => {
                const admin = data.is_admin ? 'admin' : 'user';
                return (
                    <>
                        <Title style={{ marginLeft: '12px' }} level={5}>{admin}</Title>

                    </>
                )
            }
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
        setSelectCategory(data);
        console.log(selectCategory);
        setAccountName(data.first_name);
        setAccountLastName(data.last_name);
        setAccountEmail(data.email);
        setAccountPassword(data.password);
        setIsAdmin(data.is_admin);
        editForm.setFieldValue('lName', data.last_name);
        editForm.setFieldValue('fName', data.first_name);
        editForm.setFieldValue('email', data.email);
        editForm.setFieldValue('is_admin', data.is_admin);
        console.log(isAdmin);
        console.log(accountName);
        console.log(accountLastName);
        setVisitableEdit(true);
    }

    const handleDelete = (data) => {
        console.log(data);
        setSelectCategory(data);
        setVisitableDelete(true);
    }
    useEffect(() => {
        axios.get("/account/list/")
            .then(function (res) {
                setListUser(res.data);
                console.log(res.data);
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
            const csrfToken = Cookies.get('csrftoken');
            let formData = new FormData();
            formData.append('category_name', accountName);
            formData.append('description', accountLastName);
            formData.append('cate_image', Image1);

            console.log(formData);
            console.log(accountName);
            console.log(accountLastName);
            console.log(Image1);
            axios.post(`http://127.0.0.1:8000/account/admin-update/${selectCategory.id}/`, {
                first_name: accountName,
                last_name: accountLastName,
                email: accountEmail,
                password: accountPassword,
                is_admin: isAdmin,
            }, {
                headers: {
                    'X-CSRFToken': csrfToken,
                },
            })
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
            const csrfToken = Cookies.get('csrftoken');
            axios.post("account/admin-register/", {
                first_name: accountName,
                last_name: accountLastName,
                email: accountEmail,
                password: accountPassword,
                is_admin: isAdmin,
            }, {
                headers: {
                    'X-CSRFToken': csrfToken,
                },
            })
                .then((response) => {
                    // Xử lý việc chuyển hướng sau khi đăng ký thành công
                    if (response.status === 200) {
                        alert("Thêm khách hàng thành công!");
                        setVisitableAdd(false);
                        setReload(!reload);
                    }
                })
                .catch((error) => {
                    // Xử lý khi có lỗi xảy ra trong quá trình đăng ký
                    console.error(error);
                });
        }
        if (visitableDelete) {
            axios.delete(`http://127.0.0.1:8000/account/admin-delete/${selectCategory.id}/`)
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
        setTimeout(() => {
            // setVisitableDelete(false);
            // setVisitableAdd(false);
            // setVisitableEdit(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        setVisitableDelete(false);
        setVisitableAdd(false);
        setVisitableEdit(false);
    };

    function handleImageChange(e, setImage, setSelect) {
        const file = e.target.files[0];
        setImage(file);
        console.log(file)
        // setSelect(URL.createObjectURL(file));
        setSelect(null);
    }

    function handleChangeNameedit(e) {
        setAccountName(e.target.value);

    }

    return (
        <>

            {visitableAdd && (
                <Modal
                    title="Thêm người dùng"
                    open={visitableAdd}
                    onOk={handleOk}
                    okText="Thêm người dùng"
                    cancelText="Hủy"
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    width={'50%'}
                >
                    <div>
                        <Form
                            form={editForm}
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 14 }}
                            layout="horizontal"
                            style={{ maxWidth: '100%' }}
                        >
                            <Form.Item name='Tên' label="Tên khách hàng">
                                <Input value={accountName} onChange={handleChangeNameedit} />
                            </Form.Item>
                            <Form.Item name='Họ' label="Họ khách hàng">
                                <Input value={accountLastName} onChange={(e) => setAccountLastName(e.target.value)} />
                            </Form.Item>
                            <Form.Item name='Email' label="Email">
                                <Input value={accountEmail} onChange={(e) => setAccountEmail(e.target.value)} />
                            </Form.Item>
                            <Form.Item name='password' label="Mật khẩu">
                                <Input value={accountPassword} onChange={(e) => setAccountPassword(e.target.value)} />
                            </Form.Item>
                            <Form.Item name='is_admin' label="">
                                <Checkbox onChange={(e) => setIsAdmin(e.target.checked)}>Chọn làm Admin</Checkbox>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            )}

            {visitableDelete && (
                <Modal
                    title={`Xóa loại sản phẩm ${selectCategory.email}`}
                    open={visitableDelete}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <p>{'Bạn có thực sự muốn xóa loại sản phẩm này không?'}</p>
                </Modal>
            )}

            {visitableEdit && (
                <Modal
                    title="Sửa thông tin khách hàng"
                    open={visitableEdit}
                    onOk={handleOk}
                    okText="Lưu thông tin khách hàng"
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
                            <Form.Item name='lName' initialValue={accountName} label="Tên khách hàng">
                                <Input value={accountName} onChange={handleChangeNameedit} />
                            </Form.Item>
                            <Form.Item name='fName' initialValue={accountLastName} label="Họ khách hàng">
                                <Input value={accountLastName} onChange={(e) => setAccountLastName(e.target.value)} />
                            </Form.Item>
                            <Form.Item name='email' initialValue={accountEmail} label="Email">
                                <Input value={accountEmail} onChange={(e) => setAccountEmail(e.target.value)} />
                            </Form.Item>
                            <Form.Item name='password' label="Mật khẩu">
                                <Input value={accountPassword} onChange={(e) => setAccountPassword(e.target.value)} />
                            </Form.Item>
                            <Form.Item name='is_admin' initialValue={isAdmin} label="">
                                <Checkbox checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}>Chọn làm Admin</Checkbox>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            )}

            <div style={{ padding: '0 6px' }}>
                <div className={cx('category_manager_title')}>
                    <Title level={3}>Danh sách tài khoản của cửa hàng:</Title>
                </div>
                <div className={cx('category_manager_button')}>
                    <CustomButton
                        type="primary"
                        shape="circle"
                        icon={<ReloadOutlined className="reload-icon" />}
                        // onClick={handleReload}
                        className={cx('custom_reload_button')}
                    />
                    <Button style={{ marginLeft: '10px' }} primary effect onClick={handleAdd}>Thêm người dùng</Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={listUser}
                    rowKey='id'
                    pagination={{ position: ['buttomRight'] }}
                    expandable={{
                        expandedRowRender: (record) => (<UserAddressTable record={record} />)
                        // rowExpandable: (record) => record.name !== 'Not Expandable',
                    }
                    }
                />
            </div>
        </>
    );
};

export default CustomerManager;

// function CategoryManager() {
//     return (<>hi</>);
// }

// export default CategoryManager;