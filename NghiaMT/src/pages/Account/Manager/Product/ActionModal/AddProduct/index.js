import classNames from "classnames/bind";
import styles from "./AddProduct.module.scss";
import { useEffect, useState } from "react";
import Button from "~/components/Button";
import axios from "axios";
import { Divider, Modal, message, Upload, notification } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';

const cx = classNames.bind(styles);

function AddProduct({ okOk, onCancel, title, open }) {
    const [listCategory, setListCategory] = useState([]);
    if (typeof onOk !== 'function') {
        console.warn('onOk should be a function');
    }
    const [category, setCategory] = useState(null);
    const [productName, setProductName] = useState("");
    const [productDes, setProductDes] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productInventory, setProductInventory] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [listProductImage, setListProductImage] = useState([]);
    const [listItemProductImage, setListItemProductImage] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/category/list/")
            .then(function (res) {
                setListCategory(res.data)
            })
            .catch(function (error) {

            })
    }, [])

    const onChange = ({ fileList: newFileList }) => {
        setListProductImage(newFileList);
        setProductImage(newFileList[0].originFileObj);
    };

    const onChangeItemImage = ({ fileList: newFileList }) => {
        console.log(listItemProductImage);
        setListItemProductImage(newFileList);
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
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );


    function handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append('category', Number(category));
        formData.append('product_name', productName);
        formData.append('description', productDes);
        formData.append('price', productPrice);
        formData.append('inventory', productInventory);
        formData.append('image', productImage);
        if (listItemProductImage.length !== 0) {
            for (let i = 0; i < listItemProductImage.length; i++) {
                formData.append(`ImageList`, listItemProductImage[i].originFileObj);
            }
            axios.post('http://127.0.0.1:8000/product/create/', formData)
                .then(function (response) {
                    console.log(response.data);
                    onCancel();
                    notification.success({ message: 'Thêm sản phẩm', description: 'Thêm sản phẩm thành công!' });
                })
                .catch(function (error) {
                    console.error(error);
                    notification.error({ message: 'Thêm sản phẩm', description: 'Thêm sản phẩm thất bại!' });
                });
        }
    };

    return (
        <Modal
            title={title}
            open={open}
            onOk={okOk}
            footer={(
                <>
                    <Button effect onClick={onCancel}>Hủy</Button>
                    <Button primary effect onClick={handleSubmit}>Thêm sản phẩm</Button>
                </>
            )}
            okText="Thêm sản phẩm"
            cancelText="Hủy"
            onCancel={onCancel}
            width={'80%'}
        >
            <div className={cx('wrapper')}>
                <form className={cx('inner')} onSubmit={handleSubmit}>
                    <Divider />
                    <div className={cx('content')}>
                        <div className={cx('category_product')}>
                            <span>Chọn loại sản phẩm:</span>
                            <select onChange={(e) => { setCategory(e.target.value) }}>
                                <option>__Chọn loại sản phẩm___</option>
                                {listCategory.map((category, index) => (
                                    <option key={index} value={category.id} >{category.category_name}</option>
                                ))}
                            </select>
                        </div>
                        <div className={cx('category_product')}>
                            <span>Tên sản phẩm:</span>
                            <input type="text" value={productName} name="productName" onChange={(e) => setProductName(e.target.value)} />
                        </div>
                        <div className={cx('category_product')}>
                            <span>Mô tả sản phẩm:</span>
                            <textarea type="text" value={productDes} name="productDes" onChange={(e) => setProductDes(e.target.value)} />
                        </div>
                        <div className={cx('category_product')}>
                            <span>Giá sản phẩm:</span>
                            <input type="text" value={productPrice} name="productPrice" onChange={(e) => setProductPrice(Number(e.target.value))}
                                onKeyPress={(e) => {
                                    const charCode = e.which ? e.which : e.keyCode;
                                    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                        </div>
                        <div className={cx('category_product')}>
                            <span>Số lượng sản phẩm:</span>
                            <input type="text" value={productInventory} name="productInventory" onChange={(e) => setProductInventory(Number(e.target.value))}
                                onKeyPress={(e) => {
                                    const charCode = e.which ? e.which : e.keyCode;
                                    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                        </div>
                        <div className={cx('img_product')}>
                            <span>Ảnh sản phẩm:</span>
                            <ImgCrop name="image-category" rotationSlider>
                                <Upload
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    listType="picture-card"
                                    fileList={listProductImage}
                                    onChange={onChange}
                                    onPreview={onPreview}
                                >
                                    {listProductImage.length >= 1 ? null : uploadButton}
                                </Upload>
                            </ImgCrop>
                        </div>
                        <div className={cx('child_image_product')}>
                            <span>Ảnh mô tả thêm về sản phẩm:</span>
                            <ImgCrop name="image-category" rotationSlider>
                                <Upload
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    listType="picture-card"
                                    fileList={listItemProductImage}
                                    onChange={onChangeItemImage}
                                    onPreview={onPreview}
                                >
                                    {listItemProductImage.length >= 9 ? null : uploadButton}
                                </Upload>
                            </ImgCrop>
                        </div>
                    </div>
                </form>

            </div>
        </Modal>

    );
}

export default AddProduct;

// {
//     action: "immutable",
//     disable: false,
//     priority: 0,
//     project_id: 11,
//     scope_selectors: {
//         repository: [
//             {
//                 kind: "doublestar",
//                 decoration: "repoMatches",
//                 pattern: "**"
//             }
//         ]
//     },
//     tag_selectors: [
//         {
//             kind: "doublestar",
//             decoration: "matches",
//             pattern: "**"
//         }
//     ],
//     template: "immutable_template"
// }

// const {data = {}} = useRequest(()=>
//     getImageDetail(repository.id, image.id),
//     {
//         ready: !!image.id,
//     }
// )

