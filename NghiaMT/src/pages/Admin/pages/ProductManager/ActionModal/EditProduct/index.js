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
const { Title } = Typography;
const { TextArea } = Input;

function EditProduct({ okOk, onCancel, title, open, data }) {
    const [editForm] = Form.useForm();
    const [Image1, setImage1] = useState(null);
    const [categoryName, setCatergoryName] = useState("");
    const [categoryDes, setCatergoryDes] = useState("");
    const [selectImage1, setselectImagen1] = useState(null);
    const [srcImage, setSrcImage] = useState("");
    const [product, setProduct] = useState({});
    console.log(data);
    useEffect(() => {
        console.log(data);
        axios.get(`http://127.0.0.1:8000/product/detail/${data}/`)
            .then((res) => {
                setProduct(res.data);
                setImage1(res.data.image);
                editForm.setFieldValue('nameEdit', res.data.product_name);
                editForm.setFieldValue('descriptionEdit', res.data.description);
            })
    }, [data]);

    function handleImageChange(e, setImage, setSelect) {
        const file = e.target.files[0];
        setImage(file);
        console.log(file)
        // setSelect(URL.createObjectURL(file));
        setSelect(null);
    }

    function handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append('category_name', categoryName);
        formData.append('description', categoryDes);
        formData.append('cate_image', Image1);

        console.log(formData);
        console.log(categoryName);
        console.log(categoryDes);
        console.log(Image1);
        axios.post(`http://127.0.0.1:8000/category/update/${product.id}/`, formData)
            .then(function (response) {
                // Xử lý phản hồi từ server (nếu cần)
                console.log(response.data);
                alert("thanhf coong");
                onCancel();
            })
            .catch(function (error) {
                // Xử lý lỗi (nếu có)
                console.error(error);
                alert("Loi");

            });
    }

    return (<>
        <Modal
            title={title}
            open={open}
            onOk={handleSubmit}
            okText="Lưu sản phẩm"
            cancelText="Hủy"
            onCancel={onCancel}
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
                        <Input value={categoryName} onChange={(e) => setCatergoryName(e.target.value)} />
                    </Form.Item>
                    <Form.Item name='descriptionEdit' initialValue={categoryDes} label="Mô tả">
                        <TextArea value={categoryDes} onChange={(e) => setCatergoryDes(e.target.value)} rows={4} />
                    </Form.Item>
                    <Form.Item name="imageEdit" label="Hình ảnh" >
                        <Image
                            width={200}
                            style={{ marginBottom: '10px' }}
                            src={`http://localhost:8000/${Image1}`}
                        />
                        <input type="file" onChange={(e) => handleImageChange(e, setImage1, setselectImagen1)} />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    </>);
}

export default EditProduct;