import { useRequest } from 'ahooks';
import React, { useEffect, useState } from 'react';
import {
    Table,
    Avatar,
    Modal,
    Form,
    Input,
    Typography,
    Divider,
    notification,
} from "antd";
import axios from 'axios';
import { ReloadOutlined } from '@ant-design/icons';
import classNames from "classnames/bind";
// import styles from "./CategoryManager.module.scss";
import Button from '~/components/Button';
import CustomButton from '~/components/Antd/Button';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import userEvent from '@testing-library/user-event';

const { Title } = Typography;
const { TextArea } = Input;

function AddCategory({ onOk, onCancel, title, open }) {
    const [addForm] = Form.useForm();
    const [Image1, setImage1] = useState(null);
    const [categoryName, setCatergoryName] = useState("");
    const [categoryDes, setCatergoryDes] = useState("");

    function onHandleCreate() {
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
                notification.success({ message: 'Tạo loại sản phẩm', description: 'Tọa loại sản phầm thành công!' });
                onOk();
            })
            .catch(function (error) {
                // Xử lý lỗi (nếu có)
                console.error(error);
                notification.error({ message: 'Tạo loại sản phẩm', description: 'Tọa loại sản phầm thất bại!' });
                alert("Loi");

            });
    };

    // useEffect(() => {
    //     if (Image1 !== null)
    //         setImageUrl(`http://localhost:8000${Image1}`);
    // }, [Image1]);

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    // const getBase64 = (img, callback) => {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result));
    //     reader.readAsDataURL(img);
    // };

    // const handleChange = (info) => {
    //     setImage1(info.file.originFileObj);
    //     if (info.file.status === 'uploading') {
    //         setLoading(true);
    //         return;
    //     }
    //     if (info.file.status === 'done') {
    //         getBase64(info.file.originFileObj, (url) => {
    //             console.log(url);
    //             setLoading(false);
    //             setImageUrl(url);
    //         });
    //     }
    // };

    const [fileList, setFileList] = useState([]);

    const onChange = ({ fileList: newFileList }) => {
        console.log(newFileList);
        console.log(fileList);
        setFileList(newFileList);
        setImage1(newFileList[0].originFileObj);
    };

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        console.log(image);
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <>
            <Modal
                title={title}
                open={open}
                onOk={onHandleCreate}
                footer={
                    (
                        <>
                            <Button effect onClick={onCancel}>Hủy</Button>
                            <Button primary effect onClick={onHandleCreate}>Thêm loại sản phẩm</Button>
                        </>

                    )
                }
                okText="Thêm loại sản phẩm"
                cancelText="Hủy"
                // confirmLoading={confirmLoading}
                onCancel={onCancel}
                width={'70%'}
            >
                <div>
                    <Form
                        form={addForm}
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        style={{ maxWidth: '100%' }}
                    >
                        <Divider />
                        <Form.Item name='nameEdit' label="Tên loại sản phẩm" required>
                            <Input value={categoryName} onChange={(e) => setCatergoryName(e.target.value)} />
                        </Form.Item>
                        <Form.Item name='descriptionEdit' label="Mô tả" required>
                            <TextArea value={categoryDes} onChange={(e) => setCatergoryDes(e.target.value)} rows={4} />
                        </Form.Item>
                        <Form.Item name="imageEdit" label="Hình ảnh" required>
                            {/* {Image1 !== null && (
                                <Image
                                    width={200}
                                    style={{ marginBottom: '10px' }}
                                    src={`http://localhost:8000${Image1}`}
                                />
                            )}
                            <input type="file" onChange={(e) => handleImageChange(e, setImage1, setselectImagen1)} /> */}
                            {/* <Upload
                                name="image-category"
                                // listType="picture-card"
                                fileList={fileList}
                                className="image-category-uploader"
                                showUploadList={false}
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                // beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="imagecategory" style={{ width: '100%' }} /> : uploadButton}
                            </Upload> */}
                            <>
                                {/* <Upload
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onChange={handleChange}
                                    onPreview={handlePreview}
                                >
                                    {fileList.length >= 1 ? null : uploadButton1}
                                </Upload> */}
                                <ImgCrop name="image-category" rotationSlider>
                                    <Upload
                                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onChange={onChange}
                                        onPreview={onPreview}
                                    >
                                        {fileList.length >= 1 ? null : uploadButton}
                                    </Upload>
                                </ImgCrop>
                            </>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    );
}

export default AddCategory;