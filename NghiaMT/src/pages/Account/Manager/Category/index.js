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
    Divider,
    notification,
} from "antd";
import axios from 'axios';
import { ReloadOutlined } from '@ant-design/icons';
import classNames from "classnames/bind";
import styles from "./CategoryManager.module.scss";
import Button from '~/components/Button';
import CustomButton from '~/components/Antd/Button';
import AddCategory from './ActionModal/AddCategory';
import EditCategory from './ActionModal/EditCatgory';
import DeleteCategory from './ActionModal/DeleteCategory';
import RightNavbar from '~/pages/Account/components/RightNavbar';

const { Title } = Typography;
const cx = classNames.bind(styles);

const CategoryManager = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [visitableDelete, setVisitableDelete] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [visitableEdit, setVisitableEdit] = useState(false);
    const [selectCategory, setSelectCategory] = useState(null);
    const [selectCategoryEdit, setSelectCategoryEdit] = useState(null);
    const [selectCategoryDelete, setSelectCategoryDelete] = useState(null);

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
            title: 'Tên loại sản phẩm',
            dataIndex: 'category_name',
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
                                src={`http://localhost:8000${data.cate_image}`}
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
            title: 'Mô tả',
            dataIndex: 'description',
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
        setSelectCategoryEdit(data);
        console.log(selectCategory);
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
        setSelectCategoryDelete(data);
        setVisitableDelete(true);
    }
    useEffect(() => {
        axios.get("/category/list/")
            .then(function (res) {
                setListCategory(res.data);
            })
            .catch(function (error) {

            })
    }, [reload]);

    const handleAdd = () => {
        setVisitableAdd(true);
    }
    const handleOk = () => {
        setConfirmLoading(true);
        if (visitableEdit) {
            openNotificationWithIcon('success', 'Sửa thông tin loại sản phẩm', `Sửa thông tin sản phẩm thành công`);
            setVisitableEdit(false);
        }
        if (visitableDelete) {
            openNotificationWithIcon('success', 'Xóa loại sản phẩm', `Xóa loại sản phẩm thành công`);
            setVisitableDelete(false);
        }
        if (visitableAdd) {
            openNotificationWithIcon('success', 'Thêm loại sản phẩm', `Thêm loại sản phẩm thành công`);
            setVisitableAdd(false);
        }
        setReload(!reload);
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

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description,
        });
    };

    return (
        <>
            {contextHolder}
            {visitableAdd && (
                <AddCategory
                    title="Thêm loại sản phẩm"
                    open={visitableAdd}
                    onOk={handleOk}
                    onCancel={handleCancel}
                />
            )}

            {visitableDelete && (
                <DeleteCategory
                    title={`Xóa loại sản phẩm`}
                    open={visitableDelete}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    data={selectCategoryDelete}
                />
            )}

            {visitableEdit && (
                <EditCategory
                    title="Sửa loại sản phẩm"
                    open={visitableEdit}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    data={selectCategoryEdit}
                />
            )}
            {/* <div>
                        <Divider />
                        <Form
                            form={editForm}
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 14 }}
                            layout="horizontal"
                            style={{ maxWidth: '100%' }}
                        >
                            <Form.Item name='nameEdit' initialValue={categoryName} label="Tên loại sản phẩm">
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
                </Modal> */}
            <RightNavbar>
                <>
                    <div style={{ padding: '0 6px' }}>
                        <div className={cx('category_manager_title')}>
                            <Title level={3}>Thông tin loại sản phẩm của cửa hàng:</Title>
                        </div>
                        <div className={cx('category_manager_button')}>
                            <CustomButton
                                type="primary"
                                shape="circle"
                                icon={<ReloadOutlined className="reload-icon" />}
                                // onClick={handleReload}
                                className={cx('custom_reload_button')}
                            />
                            <Button style={{ marginLeft: '10px' }} primary effect onClick={handleAdd}>Thêm loại sản phẩm</Button>
                        </div>
                        <Table style={{ marginTop: '10px' }} columns={columns} dataSource={listCategory} pagination={{ position: ['buttomRight'] }} />
                    </div>
                </>
            </RightNavbar>

        </>
    );
};

export default CategoryManager;