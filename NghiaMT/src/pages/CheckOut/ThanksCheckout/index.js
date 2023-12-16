import classNames from "classnames/bind";
import styles from './ThanksCheckOut.scss';
import Button from "~/components/Button";
import { useNavigate } from "react-router-dom";
import routes from "~/config/routes";
import { useContext, useEffect } from "react";
import { CartContext } from "~/context/cartContext";
import axios from "axios";
import { notification } from "antd";

const cx = classNames.bind(styles);

function ThanksCheckOut() {
    const queryParams = new URLSearchParams(window.location.search);
    const navigate = useNavigate();
    const result = queryParams.get('resultCode');
    const message = queryParams.get('message');
    const paymentMethod = queryParams.get('paymentMethod');

    const { deleteCart, orderWithCart } = useContext(CartContext);

    useEffect(() => {
        console.log(orderWithCart);
        console.log(orderWithCart !== null);
        console.log(paymentMethod);
        console.log(paymentMethod === 'COD');
        if (paymentMethod === 'COD') {
            setTimeout(() => {
                navigate(routes.orders);
            }, 1000);
        }
        if (orderWithCart !== null) {
            if (result == 0) {
                deleteCart();
                if (orderWithCart !== null) {
                    axios.post(`http://127.0.0.1:8000/order/success-order/${orderWithCart}/`)
                        .then(function (response) {
                            // Xử lý phản hồi từ server (nếu cần)
                            notification.success({ message: 'Tạo đơn hàng', description: 'Tạo đơn hàng thành công!' });
                            console.log(response.data);
                        })
                        .catch(function (error) {
                            // Xử lý lỗi (nếu có)
                            console.error(error);
                            notification.success({ message: 'Tạo đơn hàng', description: 'Tạo đơn hàng thất bại!' });
                        });
                }
                setTimeout(() => {
                    navigate(routes.orders);
                }, 1000);
            }
        }
    }, [result, orderWithCart]);

    const handleBtnHome = () => {
        setTimeout(() => {
            navigate(routes.home);
        }, 500);
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('thanks_main')}>
                        <h4>Thank You!</h4>
                        <p>Cảm ơn bạn đã đặt hàng</p>
                        <p>Trang web sẽ tự động chuyển hướng về trang quản lý đơn hàng!</p>
                        <Button onClick={handleBtnHome} primary effect>Quay lại trang chủ</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ThanksCheckOut;
// http://127.0.0.1:3000/thankyou?partnerCode=MOMOBKUN20180529&orderId=df007bbc-dc6d-4bf5-adf0-340f6f0f8bd9&requestId=46f4f696-15a1-473e-ac61-4583d1508250&amount=41000&orderInfo=Thanh+toan+don+hang+NghiaMT+Shop&orderType=momo_wallet&transId=3108065159&resultCode=0&message=Successful.&payType=qr&responseTime=1702605117023&extraData=&signature=3f9dc92d7b4e2b95145362ce0484fdd08f63a003ccea7734a39954e2d187c720&paymentOption=momo