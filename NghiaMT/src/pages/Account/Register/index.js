import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import Button from "~/components/Button";
import { Link, useNavigate } from "react-router-dom";
import routes from "~/config/routes";
import images from "~/assets/images";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { notification } from 'antd';
import { UserContext } from "~/context/userContext";

const cx = classNames.bind(styles);

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const auth = useSelector(state => state.auth.value);
    const { user, register } = useContext(UserContext);

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description,
        });
    };

    useEffect(() => {
        if (user !== null) {
            setTimeout(() => {
                navigate(routes.home);
            }, 500);
        }
    }, [user]);

    const handleRegister = async (e) => {
        e.preventDefault();
        const dataUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };

        // axios.post("account/register/", {
        //     first_name: firstName,
        //     last_name: lastName,
        //     email: email,
        //     password: password,
        // })
        await register(dataUser)
            .then((response) => {
                // Xử lý việc chuyển hướng sau khi đăng ký thành công
                openNotificationWithIcon('success', 'Đăng ký thành công', `Đăng ký tài khoản thành công!`);
                // navigate('/login');
                setTimeout(() => {
                    navigate(routes.login);
                }, 2000);
            })
            .catch((error) => {
                openNotificationWithIcon('error', 'Đăng ký lỗi', `Thông tin tài khoản đã tồn tại`);
                // Xử lý khi có lỗi xảy ra trong quá trình đăng ký
                console.error(error);
            });
    }
    return (
        <>
            {contextHolder}
            <div className={cx("wrapper")}>
                <div className={cx("inner")}>
                    <div className={cx("register__title")}>
                        <h4>Đăng ký tài khoản</h4>
                        <div className={cx('url')}>
                            <Link to={routes.home}>Trang chủ</Link>
                            <span>/ Đăng ký tài khoản</span>
                        </div>
                    </div>
                    <form onSubmit={handleRegister} className={cx("register__form")}>
                        <input placeholder="Tên" value={firstName} name="lastName" onChange={(e) => setFirstName(e.target.value)} />
                        <input placeholder="Họ" value={lastName} name="firstName" onChange={(e) => setLastName(e.target.value)} />
                        <input placeholder="Email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" value={password} placeholder="Mật khẩu" name="password" onChange={(e) => setPassword(e.target.value)} />
                        <div className={cx("register__form--btn")}>
                            <Button type="submit">Đăng ký</Button>
                        </div>
                    </form>
                    <div className={cx("diferent__register")}>
                        <div className={cx("diferent__register--title")}>
                            <span>Hoặc đăng ký qua</span>
                        </div>
                        <div className={cx("diferent__register--btns")}>
                            <img src={images.facebookBtn.default} alt="Đăng nhập bằng Facebook" />
                            <img src={images.googleBtn.default} alt="Đăng nhập bằng Google" />
                        </div>
                    </div>
                    <div className={cx("login")}>
                        <Button to={routes.login}>Đăng nhập</Button>
                        <Button to={routes.home}>Quay về trang chủ</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;