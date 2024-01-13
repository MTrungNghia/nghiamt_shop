import classNames from "classnames/bind";
import styles from './ThanksCheckOut.scss';
import Button from "~/components/Button";
import { useNavigate } from "react-router-dom";
import routes from "~/config/routes";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "~/context/cartContext";
import axios from "axios";
import { notification } from "antd";

const cx = classNames.bind(styles);

function ThanksCheckOut() {
    const queryParams = new URLSearchParams(window.location.search);
    const navigate = useNavigate();
    const result = queryParams.get('resultCode');
    const paymentMethod = queryParams.get('paymentMethod');
    const orderInfo = queryParams.get('orderInfo');
    const [paymentStatus, setPaymentStatus] = useState(true);

    const { deleteCart, orderWithCart, deleteCartNotToken } = useContext(CartContext);

    useEffect(() => {
        if (paymentMethod === 'COD') {
            setTimeout(() => {
                navigate(routes.orders);
            }, 5000);
        } else {
            if (result == 0) {
                setPaymentStatus(true);
                const stringArray = orderInfo.split(' ');
                const orderId = stringArray[stringArray.length - 1];
                if (orderId !== null) {
                    axios.post(`http://127.0.0.1:8000/order/success-order/${orderId}/`)
                        .then(function (response) {
                            deleteCartNotToken();
                            notification.success({ message: 'Tạo đơn hàng', description: 'Tạo và thanh toán đơn hàng thành công!' });
                            console.log(response.data);
                        })
                        .catch(function (error) {
                            console.error(error);
                            notification.error({ message: 'Tạo đơn hàng', description: 'Tạo đơn hàng thất bại!' });
                        });
                }
                setTimeout(() => {
                    deleteCart();
                    navigate(routes.orders);
                }, 5000);
            }
            else {
                const stringArray = orderInfo.split(' ');
                const orderId = stringArray[stringArray.length - 1];
                console.log(stringArray);
                console.log(orderId);
                setPaymentStatus(false);
                notification.error({ message: 'Thanh toán đơn hàng', description: 'Thanh toán không thành công.Hãy thử lại!' });
                if (orderId !== null) {
                    axios.delete(`http://127.0.0.1:8000/order/delete-order/${orderId}/`)
                        .then(function (response) {
                            // Xử lý phản hồi từ server (nếu cần)
                            // setTimeout(() => {
                            //     navigate(routes.cart);
                            // }, 7000);
                            console.log(response.data);
                        })
                        .catch(function (error) {
                            // Xử lý lỗi (nếu có)
                            console.error(error);
                            notification.success({ message: 'Thanh toán đơn hàng', description: 'Thanh toán đơn hàng thất bại!' });
                        });
                }

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
                        {paymentStatus === true ? (
                            <>
                                <h4>Thank You!</h4>
                                <p>Cảm ơn bạn đã đặt hàng</p>
                                <p>Trang web sẽ tự động chuyển hướng về trang quản lý đơn hàng!</p>
                                <Button onClick={handleBtnHome} primary effect>Quay lại trang chủ</Button>
                            </>
                        ) : (
                            <>
                                <h4>Sorry!</h4>
                                <p>Thanh toán đơn hàng không thành công.Hãy đặt lại đơn hàng!</p>
                                <p>Trang web sẽ tự động chuyển hướng về trang quản lý giỏ hàng!</p>
                                <Button onClick={handleBtnHome} primary effect>Quay lại trang chủ</Button>
                            </>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}

export default ThanksCheckOut;
// http://127.0.0.1:3000/thankyou?partnerCode=MOMOBKUN20180529&orderId=df007bbc-dc6d-4bf5-adf0-340f6f0f8bd9&requestId=46f4f696-15a1-473e-ac61-4583d1508250&amount=41000&orderInfo=Thanh+toan+don+hang+NghiaMT+Shop&orderType=momo_wallet&transId=3108065159&resultCode=0&message=Successful.&payType=qr&responseTime=1702605117023&extraData=&signature=3f9dc92d7b4e2b95145362ce0484fdd08f63a003ccea7734a39954e2d187c720&paymentOption=momo
//http://localhost:3000/thankyou?partnerCode=MOMOBKUN20180529&orderId=008bada3-62ab-4c2c-8939-b3300403f260&requestId=42622f36-5e35-4cf8-82c7-91c63452315b&amount=50000&orderInfo=Thanh+toan+don+hang+NghiaMT+Shop+63&orderType=momo_wallet&transId=1703237009938&resultCode=99&message=Declined+due+to+general+reasons.+Please+contact+MoMo+for+more+details.&payType=qr&responseTime=1703237039015&extraData=&signature=d495831aa128297d2f01e8372d03d8b3a3623f926b98a7f7243a4078c00b725d&paymentOption=momo
//http://localhost:3000/thankyou?partnerCode=MOMOBKUN20180529&orderId=a27d6794-3194-4920-ab15-c1f95964ac30&requestId=12895e99-89d9-4847-b4e6-54215653b6d9&amount=45000&orderInfo=Thanh+toan+don+hang+NghiaMT+Shop+77&orderType=momo_wallet&transId=3113042011&resultCode=0&message=Successful.&payType=qr&responseTime=1704336141101&extraData=&signature=13adddf70573604969a2e64f9ac6b29d4a8820082ff145ef1d0da36513cadb51&paymentOption=momo