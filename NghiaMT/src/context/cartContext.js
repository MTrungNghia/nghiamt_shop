import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from 'js-cookie';
import { notification } from "antd";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [orderWithCart, setOrderWithCart] = useState(null);
    const [listProduct, setListProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const auth = useSelector(state => state.auth.value);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        const fetchCart = async () => {
            axios.get(`cart/cart_detail/`)
                .then((response) => {
                    console.log(response.data.cart_detail.cart);
                    setCart(response.data.cart_detail);
                    setListProduct(response.data.cart_detail.list_product);
                })
                .catch((error) => {
                });
        }
        fetchCart();
    }, [auth, loading]);

    // const addToCart = async (productId, quantity, name, price, imageUrls) => {
    //     try {
    //         const cartDocRef = doc(db, "carts", user.uid);
    //         const cartDocSnap = await getDoc(cartDocRef);

    //         if (cartDocSnap.exists()) {
    //             const existingCartItem = cartDocSnap
    //                 .data()
    //                 .cartItems.find((item) => item.productId === productId);

    //             if (existingCartItem) {
    //                 // Product already exists in the cart, update the quantity
    //                 const updatedQuantity = existingCartItem.quantity + quantity;

    //                 await updateDoc(cartDocRef, {
    //                     cartItems: cartDocSnap
    //                         .data()
    //                         .cartItems.map((item) =>
    //                             item.productId === productId
    //                                 ? { ...item, quantity: updatedQuantity }
    //                                 : item
    //                         ),
    //                 });

    //                 setCart((prevCart) =>
    //                     prevCart.map((item) =>
    //                         item.productId === productId
    //                             ? { ...item, quantity: updatedQuantity }
    //                             : item
    //                     )
    //                 );
    //             } else {
    //                 // Product doesn't exist in the cart, add a new item
    //                 await updateDoc(cartDocRef, {
    //                     cartItems: arrayUnion({
    //                         productId,
    //                         quantity,
    //                         name,
    //                         price,
    //                         imageUrls,
    //                     }),
    //                 });

    //                 setCart((prevCart) => [
    //                     ...prevCart,
    //                     { productId, quantity, name, price, imageUrls },
    //                 ]);
    //             }
    //         }
    //     } catch (error) {
    //         throw error;
    //     }
    // };

    // const removeFromCart = async (productId) => {
    //     try {
    //         const cartDocRef = doc(db, "carts", user.uid);

    //         await updateDoc(cartDocRef, {
    //             cartItems: arrayRemove(
    //                 ...cart.filter((item) => item.productId === productId)
    //             ),
    //         });

    //         setCart((prevCart) =>
    //             prevCart.filter((item) => item.productId !== productId)
    //         );
    //     } catch (error) {
    //         throw error;
    //     }
    // };

    const reloadCart = () => {
        setLoading(!loading);
    };

    const updateCartItemQuantity = async (updatedCart) => {
        const csrfToken = Cookies.get('csrftoken');
        try {
            axios.post("cart/update_cart_item/", {
                product_slug: updatedCart.product_slug,
                p_quantity: updatedCart.p_quantity,
            }, {
                headers: {
                    'X-CSRFToken': csrfToken,
                },
            })
                .then((response) => {
                    setLoading(!loading);
                })
        } catch (error) {
            throw error;
        }

    };

    const addToCart = async (addCart) => {
        const csrfToken = Cookies.get('csrftoken');
        try {
            axios.post("cart/add_item_cart/", {
                product_slug: addCart.product_slug,
                p_quantity: addCart.p_quantity,
            }, {
                headers: {
                    'X-CSRFToken': csrfToken,
                },
            })
                .then((response) => {
                    // alert("Thêm sản phẩm vào giỏ hàng thành công");
                    notification.success({ message: 'Thêm sản phẩm', description: 'Thêm sản phẩm vào giỏ hàng thành công.' });
                    setLoading(!loading);
                })
                .catch(function (error) {
                    notification.error({ message: 'Thêm sản phẩm', description: 'Hãy đăng nhập để thêm sản phẩm!' });
                    // notification.error({ message: 'Thêm sản phẩm', description: 'Thêm sản phẩm vào giỏ hàng thành công.' });
                    console.log(error);
                });
        } catch (error) {
            throw error;
        }
    };

    const removeFromCart = async (dataRemoveCart) => {
        const csrfToken = Cookies.get('csrftoken');
        try {
            axios.post("cart/remove_item_in_cart/", {
                product_slug: dataRemoveCart.product_slug,
            }, {
                headers: {
                    'X-CSRFToken': csrfToken,
                },
            })
                .then((response) => {
                    // alert("Thêm sản phẩm vào giỏ hàng thành công");
                    setLoading(!loading);
                })
                .catch(function (error) {

                });
        } catch (error) {
            throw error;
        }
    };

    const applyOrderId = (orderId) => {
        console.log(orderId);
        setOrderWithCart(orderId);
    };

    const deleteCart = async () => {
        const csrfToken = Cookies.get('csrftoken');
        try {
            axios.delete(`cart/delete/${cart.cart.id}/`, {
                headers: {
                    'X-CSRFToken': csrfToken,
                },
            })
                .then((response) => {
                    setLoading(!loading);
                })
                .catch(function (error) {

                });
        } catch (error) {
            throw error;
        }
    };

    const deleteCartNotToken = async () => {
        try {
            axios.delete(`cart/delete/${cart.cart.id}/`)
                .then((response) => {
                    setLoading(!loading);
                })
                .catch(function (error) {

                });
        } catch (error) {
            throw error;
        }
    };

    const value = {
        cart,
        orderWithCart,
        listProduct,
        deleteCartNotToken,
        // loading,
        addToCart,
        removeFromCart,
        deleteCart,
        reloadCart,
        applyOrderId,
        updateCartItemQuantity,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider }
