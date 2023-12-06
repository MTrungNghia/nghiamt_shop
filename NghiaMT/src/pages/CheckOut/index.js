import classNames from "classnames/bind";
import styles from "./CheckOut.module.scss";
import { Link, useNavigate } from "react-router-dom";
import routes from "~/config/routes";
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import Image from "~/components/Image";
import Button from "~/components/Button";
import { useDispatch } from "react-redux";
import { setAuth } from "~/redux/slice/authSlide";
import axios from "axios";
import { useEffect, useState } from "react";
import { notification } from "antd";

const cx = classNames.bind(styles);

// function CheckOut({ user_id, listProduct }) {
function CheckOut() {

    const [cartDetail, setCartDetail] = useState({});
    const [listProduct, setListProduct] = useState([]);
    const [loadBack, setLoadBack] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [transportFee, setTransportFee] = useState(40000);
    const [totalAllPrice, setTotalAllPrice] = useState(0);
    const [user, setUser] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        axios.get(`cart/cart_detail/`)
            .then((response) => {
                console.log(response.data);
                setCartDetail(response.data.cart_detail);
                setListProduct(response.data.cart_detail.list_product);
                setUser(response.data.cart_detail.user);
                fetchData(response.data.cart_detail.user.id);
                dispatch(setAuth(true));
            })
            .catch((error) => {
                console.error(error);
                dispatch(setAuth(false));
                if (error.response.status === 403) {
                    alert("Hãy đăng nhập hoặc tạo tài khoản để tiếp tục!");
                    navigate(routes.login);
                }
            });

    }, []);

    const [listAddress, setListAddress] = useState(null);
    const [currentAddress, setCurrentAddress] = useState(null);
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [province, setProvince] = useState("");
    const [district, setDistrict] = useState("");
    const [wards, setWards] = useState("");
    const [note, setNote] = useState("");

    const [quantity, setQuantity] = useState(0);

    const [discountCode, setDiscountCode] = useState(null);
    const [discountAmount, setDiscountAmounte] = useState(0);
    const [numberAddress, setNumberAddress] = useState(0);

    const [isChecked, setIsChecked] = useState(true);

    useEffect(() => {
        let totalPriceProducts = 0;
        // eslint-disable-next-line array-callback-return
        listProduct.map((product, index) => {
            totalPriceProducts += product.quantity * product.price;
        });
        setTotalPrice(totalPriceProducts);
        if (discountAmount !== 0 && discountAmount > totalPriceProducts + transportFee) {
            setTotalAllPrice(0);
        } else {
            setTotalAllPrice(totalPriceProducts + transportFee);
        }
        console.log(listProduct);
    }, [loadBack, listProduct, discountAmount, transportFee]);

    useEffect(() => {
        if (listAddress !== null) {
            setCurrentAddress(listAddress[numberAddress]);
            if (currentAddress != null) {
                setFullName(currentAddress.full_name);
                setPhoneNumber(currentAddress.phone_number);
                setAddress(currentAddress.address);
                setProvince(currentAddress.province);
                setDistrict(currentAddress.district);
                setWards(currentAddress.wards);
            }
        }
        console.log(listAddress);
    }, [listAddress, currentAddress, numberAddress]);

    const fetchData = async (id) => {
        try {
            const response = await axios.get(`account/list_user_address_by_user/${id}/`);
            console.log(response.data.length);
            if (response.data.length !== 0) {
                setListAddress(response.data);
            } else {
                openNotificationWithIcon('warning', 'Thêm địa chỉ', `Bạn chưa lưu địa chỉ, hãy thêm địa chỉ để tiếp tục!`);
                console.log('hello');
                setTimeout(() => {
                    navigate(routes.addressSaved);
                }, 3000);
            }
            console.log(response.data);
        } catch (error) {
            // Xử lý lỗi nếu cần thiết
        }
    };

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description,
        });
    };

    function handleForm(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append("note", note);
        formData.append("quantity", listProduct.length);
        formData.append("user", user.id);
        console.log(user.id);
        console.log(cartDetail);
        formData.append("cart", cartDetail.cart.id);
        formData.append("user_address", currentAddress.id);
        if (discountCode !== null && discountCode !== '') {
            console.log(discountCode);
            formData.append("discount_code", discountCode.id);
        }
        else
            formData.append("discount_code", discountCode);
        formData.append("total_price", totalAllPrice);
        // formData.append("product", listProduct);
        console.log(listProduct);
        listProduct.forEach((product, index) => {
            console.log(product.id);
            formData.append("product", product.id);
            formData.append("pro_quantity", product.quantity);
            formData.append("price", product.price);
            // Thêm các trường dữ liệu khác của phần tử `product` nếu cần thiết
        });

        // Gửi dữ liệu đến server
        axios.post('http://127.0.0.1:8000/order/create-order/', formData)
            .then(function (response) {
                // Xử lý phản hồi từ server (nếu cần)
                console.log(response.data);
                alert("Đặt hàng thành công");
                navigate(routes.orders);
            })
            .catch(function (error) {
                // Xử lý lỗi (nếu có)
                console.error(error);
                alert("Loi");
            });
    }

    const ProductItem = ({ product }) => {
        return (
            <div className={cx('products')}>
                <div className={cx('product-detail')}>
                    <div className={cx('product-detail--main')}>
                        <div className={cx('product-detail--image')}>
                            <Image src={`http://localhost:8000/media/${product.image}`} alt={product.product_name} />
                            <div className={cx('product-detail--quantity')}>
                                <span>{product.quantity}</span>
                            </div>
                        </div>
                        <div className={cx('product-detail--title')}>
                            <span>{product.product_name}</span>
                        </div>
                    </div>
                </div>
                <div className={cx('product-detail--total-price')}>
                    <span>{Number(product.price).toLocaleString()} ₫</span>
                </div>
            </div>
        )
    }

    const handleInputChange = () => {

    }

    const handleSaleCode = (e) => {
        e.preventDefault();
        axios.get(`order/create-discount-code/?sale_code=${discountCode}`)
            .then(response => {
                // Xử lý dữ liệu khi nhận phản hồi thành công
                console.log(response.data);
                setDiscountAmounte(response.data.discount);
                // setDiscountCode(response.data);
                setLoadBack(!loadBack);
            })
            .catch(error => {
                // Xử lý lỗi khi có lỗi trong quá trình yêu cầu
                console.error(error);
            });
    }

    const handleSelectAddress = (e) => {
        console.log(e.target.value);
        // const selectedValue = e.target.options[e.target.selectedIndex].value;
        // console.log(selectedValue);
        // setCurrentAddress(selectedValue);
        setNumberAddress(e.target.value);
        console.log(numberAddress);
    }

    return (
        <>
            {contextHolder}
            <div className={cx('wrapper')}>
                <form onSubmit={handleForm} className={cx('inner')}>
                    <div className={cx('infor-order')}>
                        <div className={cx('infor-order-header')}>
                            <img src={images.logo} alt="logo" />
                        </div>
                        <div className={cx('infor-order-main')}>
                            <div className={cx('infor-buy')}>
                                <div className={cx('infor-buy--title')}>
                                    <h5>Thông tin mua hàng</h5>
                                </div>
                                <div className={cx('infor-buy--form')}>
                                    <div className={cx('form-group')}>
                                        <select name="address" onChange={handleSelectAddress} className={cx('form-control--select')} id="inputField" required>
                                            {/* <option value="">-- Select an address --</option> */}
                                            {listAddress && listAddress.map((address, index) => (
                                                <option key={index} value={index}>{address.full_name
                                                    + " - " + address.address}</option>
                                            ))}

                                        </select>
                                        <label for="inputField" className={cx('floating-label')}>Chọn địa chỉ cần giao</label>
                                    </div>
                                    {/* <div className={cx('form-group')}>
                                    <input type="text" name="email" value={"hello"} disabled className={cx('form-control')} id="inputField" required onChange={handleInputChange} />
                                    <label for="inputField" className={cx('floating-label')}>Email (tùy chọn)</label>
                                </div> */}
                                    <div className={cx('form-group')}>
                                        <input type="text" name="name" className={cx('form-control')} value={fullName} disabled id="inputField" required onChange={handleInputChange} />
                                        <label for="inputField" className={cx('floating-label')}>Họ và tên</label>
                                    </div>
                                    <div className={cx('form-group')}>
                                        <input type="text" name="phoneNumber" className={cx('form-control')} value={phoneNumber} disabled id="inputField" required onChange={handleInputChange} />
                                        <label for="inputField" className={cx('floating-label')}>Số điện thoại</label>
                                    </div>
                                    <div className={cx('form-group')}>
                                        <input type="text" name="location" className={cx('form-control')} value={address} disabled id="inputField" required onChange={handleInputChange} />
                                        <label for="inputField" className={cx('floating-label')}>Địa chỉ</label>
                                    </div>
                                    <div className={cx('form-group')}>
                                        <input type="text" name="province" className={cx('form-control')} value={province} disabled id="inputField" required onChange={handleInputChange} />
                                        <label for="inputField" className={cx('floating-label')}>Tỉnh thành</label>
                                    </div>
                                    <div className={cx('form-group')}>
                                        <input type="text" name="email" className={cx('form-control')} value={district} disabled id="inputField" required onChange={handleInputChange} />
                                        <label for="inputField" className={cx('floating-label')}>Quận huyện</label>
                                    </div>
                                    <div className={cx('form-group')}>
                                        <input type="text" name="email" className={cx('form-control')} value={wards} disabled id="inputField" required onChange={handleInputChange} />
                                        <label for="inputField" className={cx('floating-label')}>Phường, xã</label>
                                    </div>
                                    <div className={cx('form-group')}>
                                        <textarea type="text" name="note" className={cx('form-control')} value={note} id="inputField" onChange={(e) => setNote(e.target.value)} />
                                        <label for="inputField" className={cx('floating-label')}>Ghi chú</label>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('infor-ship')}>
                                <div className={cx('infor-ship--shipment')}>
                                    <h5>Vận chuyển</h5>
                                    <div className={cx('infor-ship--shipment__main')}>
                                        <div className={cx('shipment__main')}>
                                            <input type="checkbox" checked={isChecked} onChange={handleInputChange} />
                                            <label>Giao hàng tận nơi</label>
                                        </div>
                                        <label>40.000₫</label>
                                    </div>
                                </div>
                                <div className={cx('infor-ship--checkout')}>
                                    <h5>Thanh toán</h5>
                                    <div className={cx('infor-ship--checkout__main')}>
                                        <div className={cx('checkout__main')}>
                                            <input type="checkbox" onChange={handleInputChange} />
                                            <label>Thanh toán khi nhận hàng</label>
                                        </div>
                                        <FontAwesomeIcon icon={faMoneyBill} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('infor-total')}>
                        <div className={cx('infor-total--title')}>
                            <h5>Đơn hàng ({listProduct.length} sản phẩm)</h5>
                        </div>
                        <div className={cx('infor-total--list-products')}>
                            {listProduct.map((product, index) => (
                                <ProductItem key={index} product={product} />

                            ))}
                        </div>
                        <div className={cx('infor-total--code-sale')}>
                            <div className={cx('form-group')}>
                                <input type="name"
                                    name="sale-code"
                                    className={cx('form-control')}
                                    id="inputField"
                                    value={discountCode}
                                    onChange={(e) => setDiscountCode(e.target.value)}
                                />
                                <label for="inputField" className={cx('floating-label')}>Nhập mã giảm giá</label>
                                <Button onClick={handleSaleCode} primary effect>Áp dụng</Button>
                            </div>
                            {discountAmount !== 0 && (
                                <div className={cx('infor-total--main-item')}>
                                    <label>Số tiền giảm giá</label>
                                    <label>{Number(discountAmount).toLocaleString()}₫</label>
                                </div>
                            )}

                        </div>
                        <div className={cx('infor-total--detail')}>
                            <div className={cx('infor-total--main-item')}>
                                <label>Tạm tính</label>
                                <label>{Number(totalPrice).toLocaleString()} đ</label>
                            </div>
                            <div className={cx('infor-total--main-item')}>
                                <label>Phí vận chuyển</label>
                                <label>{Number(transportFee).toLocaleString()} đ</label>
                            </div>
                        </div>
                        <div className={cx('infor-total--total')}>
                            <div className={cx('infor-total--main-item')}>
                                <label>Tổng cộng</label>
                                <label className={cx('total')}>{Number(totalAllPrice).toLocaleString()} ₫</label>
                            </div>
                            <div className={cx('infor-total--function')}>
                                <Button href={'/cart'}>Quay lại giỏ hàng</Button>
                                <Button type="submit" primary effect>Đặt hàng</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CheckOut;
