import classNames from "classnames/bind";
import styles from "./Cart.module.scss";
import { Link, useNavigate } from "react-router-dom";
import routes from "~/config/routes";
import Image from "~/components/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faSubtract } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
// import Button from "~/components/Button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Button, Flex } from 'antd';
import Cookies from 'js-cookie';
import { CartContext } from "~/context/cartContext";

const cx = classNames.bind(styles);

function Cart() {
    const [cartDetail, setCartDetail] = useState({});
    const [listProduct, setListProduct] = useState([]);
    const [loadBack, setLoadBack] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);
    const [transportFee, setTransportFee] = useState(0);
    const { CartProvider, updateCartItemQuantity, removeFromCart } = useContext(CartContext);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        axios.get(`cart/cart_detail/`)
            .then((response) => {
                console.log(response.data.cart_detail.list_product);
                setCartDetail(response.data.cart_detail);
                setListProduct(response.data.cart_detail.list_product);
            })
            .catch((error) => {
                console.error(error);
                if (error.response.status === 403) {
                    alert("Hãy đăng nhập hoặc tạo tài khoản để tiếp tục!");
                    navigate(routes.login);
                }
            });

    }, [loadBack]);

    useEffect(() => {
        let totalPriceProducts = 0;
        // eslint-disable-next-line array-callback-return
        listProduct.map((product, index) => {
            totalPriceProducts += product.quantity * product.price;
        });
        setTotalPrice(totalPriceProducts);

    }, [loadBack, listProduct]);

    const ProductItem = ({ product }) => { //{ cartItem }
        return (
            <Link to={`/${product.slug}`} className={cx('product-item')}>
                <div className={cx('product-item--image')}>
                    <Image src={`http://localhost:8000/media/${product.image}`} alt="Gohan" />
                </div>
                <div className={cx('product-item--title')}>
                    <span>{product.product_name}</span>
                </div>
            </Link>
        )
    };

    const ProductQuantity = ({ product }) => {
        const [productNumber, setProductNumber] = useState(product.quantity);
        const productInvetory = product.inventory;
        const csrfToken = Cookies.get('csrftoken');
        const handleSub = async () => {
            if (productNumber > 1) {
                const updatedQuantity = productNumber - 1;
                const updatedCart = {
                    product_slug: product.slug,
                    p_quantity: updatedQuantity
                };
                await updateCartItemQuantity(updatedCart)
                    .then((response) => {
                        setTimeout(() => {
                            setProductNumber(updatedQuantity);
                            setLoadBack(!loadBack);
                        }, 300);
                    })
                    .catch((error) => {
                        console.log(error);
                    });

            } else {
                alert(`Số lượng cần chọn phải lớn hơn 0`);
            }
        }
        const handleAdd = async () => {
            if (productInvetory >= productNumber + 1) {
                const updatedQuantity = productNumber + 1;
                const updatedCart = {
                    product_slug: product.slug,
                    p_quantity: updatedQuantity
                };
                await updateCartItemQuantity(updatedCart)
                    .then((response) => {
                        setTimeout(() => {
                            setProductNumber(updatedQuantity);
                            setLoadBack(!loadBack);
                        }, 300);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                // axios
                //     .post("cart/update_cart_item/", {
                //         product_slug: product.slug,
                //         p_quantity: updatedQuantity,
                //     }, {
                //         headers: {
                //             'X-CSRFToken': csrfToken,
                //         },
                //     })
                //     .then((response) => {

                //     })
                //     .catch((error) => {
                //         console.log(error);
                //     });
            } else {
                setProductNumber(productInvetory);
                alert(`Số lượng trong kho chỉ là ${productInvetory}`);
            }
        };

        const handleInput = async (e) => {
            if (productInvetory >= (Number(e.target.value))) {
                let updatedQuantity = Number(e.target.value);
                if (updatedQuantity === 0) {
                    updatedQuantity = 1;
                }

                const updatedCart = {
                    product_slug: product.slug,
                    p_quantity: updatedQuantity
                };
                await updateCartItemQuantity(updatedCart)
                    .then((response) => {
                        setTimeout(() => {
                            setProductNumber(updatedQuantity);
                            setLoadBack(!loadBack);
                        }, 300);
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                // axios.post("cart/update_cart_item/", {
                //     product_slug: product.slug,
                //     p_quantity: updatedQuantity,
                // }, {
                //     headers: {
                //         'X-CSRFToken': csrfToken,
                //     },
                // })
                //     .then((response) => {
                //         setProductNumber(updatedQuantity);
                //         setLoadBack(!loadBack);
                //     })
            }
            else {
                setProductNumber(productInvetory);
                alert(`Số lượng trong kho chỉ là ${productInvetory}`);
            }

        }

        const handleDelete = async (e) => {
            e.preventDefault();
            const dataRemove = {
                product_slug: product.slug
            };
            await removeFromCart(dataRemove)
                .then((response) => {
                    setTimeout(() => {
                        setLoadBack(!loadBack);
                    }, 300);
                })
                .catch((error) => {
                    console.log(error);
                });

            // axios.post("cart/remove_item_in_cart/", {
            //     product_slug: product.slug,
            // }, {
            //     headers: {
            //         'X-CSRFToken': csrfToken,
            //     },
            // })
            //     .then((response) => {
            //         console.log(response);
            //         setLoadBack(!loadBack);
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
        }

        return (
            <>
                <td>
                    <div className={cx('product--quantity')}>
                        <button onClick={handleSub}><FontAwesomeIcon icon={faSubtract} /></button>
                        <input value={productNumber} type='text' onChange={handleInput}
                            onKeyPress={(e) => {
                                const charCode = e.which ? e.which : e.keyCode;
                                if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                                    e.preventDefault();
                                }
                            }} />
                        <button onClick={handleAdd}><FontAwesomeIcon icon={faAdd} /></button>

                    </div>
                </td>
                <td>
                    <span>{Number(product.price * productNumber).toLocaleString()}</span>
                </td>
                <td>
                    <Button onClick={handleDelete}>Xóa</Button>
                </td>
            </>

        )
    }

    return (<div className={cx('wrapper')}>
        <div className={cx('inner')}>
            <div className={cx('breadcrumb')}>
                <Link to={routes.home}>Trang chủ&nbsp;</Link>
                <span> / </span>
                <span>&nbsp;Giỏ hàng của bạn</span>
            </div>
            <div className={cx('content')}>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>Sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th>Số tiền</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listProduct.map((item, index) => (
                            <tr key={index}>
                                <td colSpan={2}>
                                    <ProductItem product={item} />
                                </td>
                                <td>
                                    <span>{Number(item.price).toLocaleString()}</span>
                                </td>
                                <ProductQuantity product={item} />

                            </tr>
                        ))}
                    </tbody>

                </table>
                <div className={cx('cart-total')}>
                    <div className={cx('cart-total--title')}>
                        <span>Thông tin giỏ hàng</span>
                    </div>
                    <div className={cx('cart-total--finish')}>
                        <span>Tổng </span>
                        <span>{Number(totalPrice).toLocaleString()} ₫</span>
                    </div>
                    <div className={cx('cart-total--btn')}>
                        <Button style={{ backgroundColor: '#77d2a1', color: '#fff' }} type="primary" disabled={totalPrice === 0} href={'/checkout'}>Thanh toán</Button>
                        {/* <Button onClick={(e) => {
                            e.preventDefault();
                            navigate(routes.home);
                        }} effect>Hủy</Button> */}
                    </div>

                </div>
            </div>
        </div>
    </div>);
}

export default Cart;