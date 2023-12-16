import classNames from "classnames/bind";
import styles from "./AddProduct.module.scss";
import { useEffect, useState } from "react";
import Button from "~/components/Button";
import axios from "axios";
import { Divider, Modal, message, Upload, notification } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

function AddProduct({ okOk, onCancel, title, open }) {
    const [listCategory, setListCategory] = useState([]);
    if (typeof onOk !== 'function') {
        console.warn('onOk should be a function');
    }
    console.log(okOk);
    console.log(onCancel);
    console.log(title);
    const [category, setCategory] = useState(null);
    const [productName, setProductName] = useState("");
    const [productDes, setProductDes] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productInventory, setProductInventory] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [Image1, setImage1] = useState(null);
    const [Image2, setImage2] = useState(null);
    const [Image3, setImage3] = useState(null);
    const [Image4, setImage4] = useState(null);
    const [Image5, setImage5] = useState(null);
    const [Image6, setImage6] = useState(null);
    const [Image7, setImage7] = useState(null);
    const [Image8, setImage8] = useState(null);
    const [Image9, setImage9] = useState(null);
    const [loadingPImage, setLoadingPImage] = useState(false);
    const [loadingImage1, setLoadingImage1] = useState(false);
    const [loadingImage2, setLoadingImage2] = useState(false);
    const [loadingImage3, setLoadingImage3] = useState(false);
    const [loadingImage4, setLoadingImage4] = useState(false);
    const [loadingImage5, setLoadingImage5] = useState(false);
    const [loadingImage6, setLoadingImage6] = useState(false);
    const [loadingImage7, setLoadingImage7] = useState(false);
    const [loadingImage8, setLoadingImage8] = useState(false);
    const [loadingImage9, setLoadingImage9] = useState(false);


    const [selectImageMain, setSelectedImageMain] = useState('');
    const [selectImage1, setselectImage1] = useState('');
    const [selectImage2, setselectImage2] = useState('');
    const [selectImage3, setselectImage3] = useState('');
    const [selectImage4, setselectImage4] = useState('');
    const [selectImage5, setselectImage5] = useState('');
    const [selectImage6, setselectImage6] = useState('');
    const [selectImage7, setselectImage7] = useState('');
    const [selectImage8, setselectImage8] = useState('');
    const [selectImage9, setselectImage9] = useState('');

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/category/list/")
            .then(function (res) {
                setListCategory(res.data)
            })
            .catch(function (error) {

            })
    }, [])

    function handleImageChange(e, setImage, setSelect) {
        const file = e.target.files[0];
        setImage(file);
        // setSelect(URL.createObjectURL(file));
        setSelect(null);

    }

    // {
    //     repositoryType: "private",
    //     description: 'mota ne',
    //     storagelimit: '1312',
    // }

    function handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append('category', Number(category));
        formData.append('product_name', productName);
        formData.append('description', productDes);
        formData.append('price', productPrice);
        formData.append('inventory', productInventory);
        formData.append('image', productImage);
        formData.append(`ImageList`, Image1);
        formData.append(`ImageList`, Image2);
        formData.append(`ImageList`, Image3);
        formData.append(`ImageList`, Image4);
        formData.append(`ImageList`, Image5);
        formData.append(`ImageList`, Image6);
        formData.append(`ImageList`, Image7);
        formData.append(`ImageList`, Image8);
        formData.append(`ImageList`, Image9);
        // Gửi dữ liệu đến server
        axios.post('http://127.0.0.1:8000/product/create/', formData)
            .then(function (response) {
                // Xử lý phản hồi từ server (nếu cần)
                console.log(response.data);
                onCancel();
                notification.success({ message: 'Thêm sản phẩm', description: 'Thêm sản phẩm thành công!' });
            })
            .catch(function (error) {
                // Xử lý lỗi (nếu có)
                console.error(error);
                notification.error({ message: 'Thêm sản phẩm', description: 'Thêm sản phẩm thất bại!' });
            });
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const handleChange = (info, setImage, setSelectImage, setLoadingPImage) => {
        console.log()
        setSelectImage(info.file.originFileObj);
        if (info.file.status === 'uploading') {
            setLoadingPImage(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoadingPImage(false);
                setImage(url);
            });
        }
    };

    const UploadButton = ({ loading }) => (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

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
                    {/* <div className={cx('breadcrumb')}>
                <h5>Thêm sản phẩm </h5>
            </div> */}
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
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                // action="//jsonplaceholder.typicode.com/posts/"
                                beforeUpload={(beforeUpload)}
                                onChange={(e) => handleChange(e, setProductImage, setSelectedImageMain, setLoadingPImage)}
                            >
                                {productImage ? <img src={productImage} alt="Ảnh sản phẩm" style={{ width: '100%' }} /> : <UploadButton loading={loadingPImage} />}
                            </Upload>
                            {/* <input type="file" name="productImage" onChange={(e) => handleImageChange(e, setProductImage, setSelectedImageMain)} />
                            {selectImageMain && (<img src={selectImageMain} alt="Imagea saaa" />)
                            } */}

                        </div>
                        <div className={cx('child_image_product')}>
                            <span>Ảnh mô tả thêm về sản phẩm:</span>
                            <ul>
                                {/* <li><input type="file" name="image" onChange={(e) => handleImageChange(e, setImage1, setselectImagen1)} />
                                    {selectImage1 && (<img src={selectImage1} alt="Imagea saaa" />)
                                    }</li>
                                <li><input type="file" name="image" onChange={(e) => handleImageChange(e, setImage2, setselectImagen2)} />
                                    {selectImage2 && (<img src={selectImage2} alt="Imagea saaa" />)
                                    }</li>
                                <li><input type="file" name="image" onChange={(e) => handleImageChange(e, setImage3, setselectImagen3)} />
                                    {selectImage3 && (<img src={selectImage3} alt="Imagea saaa" />)
                                    }</li>
                                <li><input type="file" name="image" onChange={(e) => handleImageChange(e, setImage4, setselectImagen4)} />
                                    {selectImage4 && (<img src={selectImage4} alt="Imagea saaa" />)
                                    }</li>
                                <li><input type="file" name="image" onChange={(e) => handleImageChange(e, setImage5, setselectImagen5)} />
                                    {selectImage5 && (<img src={selectImage5} alt="Imagea saaa" />)
                                    }</li>
                                <li><input type="file" name="image" onChange={(e) => handleImageChange(e, setImage6, setselectImagen6)} />
                                    {selectImage6 && (<img src={selectImage6} alt="Imagea saaa" />)
                                    }</li>
                                <li><input type="file" name="image" onChange={(e) => handleImageChange(e, setImage7, setselectImagen7)} />
                                    {selectImage7 && (<img src={selectImage7} alt="Imagea saaa" />)
                                    }</li>
                                <li><input type="file" name="image" onChange={(e) => handleImageChange(e, setImage8, setselectImagen8)} />
                                    {selectImage8 && (<img src={selectImage8} alt="Imagea saaa" />)
                                    }</li>
                                <li><input type="file" name="image" onChange={(e) => handleImageChange(e, setImage9, setselectImagen9)} />
                                    {selectImage9 && (<img src={selectImage9} alt="Imagea saaa" />)
                                    }</li> */}

                                <li>
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                        beforeUpload={beforeUpload}
                                        onChange={(e) => handleChange(e, setImage1, setselectImage1, setLoadingImage1)}
                                    >
                                        {Image1 ? <img src={Image1} alt="Ảnh sản phẩm" style={{ width: '100%' }} /> : <UploadButton loading={loadingImage1} />}
                                    </Upload>
                                </li>
                                <li>
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                        beforeUpload={beforeUpload}
                                        onChange={(e) => handleChange(e, setImage2, setselectImage2, setLoadingImage2)}
                                    >
                                        {Image2 ? <img src={Image2} alt="Ảnh sản phẩm" style={{ width: '100%' }} /> : <UploadButton loading={loadingImage2} />}
                                    </Upload>
                                </li>
                                <li>
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                        beforeUpload={beforeUpload}
                                        onChange={(e) => handleChange(e, setImage3, setselectImage3, setLoadingImage3)}
                                    >
                                        {Image3 ? <img src={productImage} alt="Ảnh sản phẩm" style={{ width: '100%' }} /> : <UploadButton loading={loadingImage3} />}
                                    </Upload>
                                </li>
                                <li>
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                        beforeUpload={beforeUpload}
                                        onChange={(e) => handleChange(e, setImage4, setselectImage4, setLoadingImage4)}
                                    >
                                        {Image4 ? <img src={Image4} alt="Ảnh sản phẩm" style={{ width: '100%' }} /> : <UploadButton loading={loadingImage4} />}
                                    </Upload>
                                </li>
                                <li>
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                        beforeUpload={beforeUpload}
                                        onChange={(e) => handleChange(e, setImage5, setselectImage5, setLoadingImage5)}
                                    >
                                        {Image5 ? <img src={productImage} alt="Ảnh sản phẩm" style={{ width: '100%' }} /> : <UploadButton loading={loadingImage5} />}
                                    </Upload>
                                </li>
                                <li>
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                        beforeUpload={beforeUpload}
                                        onChange={(e) => handleChange(e, setImage6, setselectImage6, setLoadingImage6)}
                                    >
                                        {Image6 ? <img src={Image6} alt="Ảnh sản phẩm" style={{ width: '100%' }} /> : <UploadButton loading={loadingImage6} />}
                                    </Upload>
                                </li>
                                <li>
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                        beforeUpload={beforeUpload}
                                        onChange={(e) => handleChange(e, setImage7, setselectImage7, setLoadingImage7)}
                                    >
                                        {Image7 ? <img src={Image7} alt="Ảnh sản phẩm" style={{ width: '100%' }} /> : <UploadButton loading={loadingImage7} />}
                                    </Upload>
                                </li>
                                <li>
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                        beforeUpload={beforeUpload}
                                        onChange={(e) => handleChange(e, setImage8, setselectImage8, setLoadingImage8)}
                                    >
                                        {Image8 ? <img src={Image8} alt="Ảnh sản phẩm" style={{ width: '100%' }} /> : <UploadButton loading={loadingImage8} />}
                                    </Upload>
                                </li>
                                <li>
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                        beforeUpload={beforeUpload}
                                        onChange={(e) => handleChange(e, setImage9, setselectImage9, setLoadingImage9)}
                                    >
                                        {Image9 ? <img src={Image9} alt="Ảnh sản phẩm" style={{ width: '100%' }} /> : <UploadButton loading={loadingImage9} />}
                                    </Upload>
                                </li>
                            </ul>
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

