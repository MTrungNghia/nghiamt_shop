import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import Button from "~/components/Button";
import { Link, useNavigate } from "react-router-dom";
import routes from "~/config/routes";
import images from "~/assets/images";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "~/context/userContext";

const cx = classNames.bind(styles);

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, login } = useContext(UserContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({ email: '', password: '' });

    useEffect(() => {
        if (user !== null) {
            setTimeout(() => {
                navigate(routes.home);
            }, 500);
        }
    }, [user]);

    const validateForm = () => {
        let isValid = true;
        const newErrors = { email: '', password: '' };

        // Kiểm tra hợp lệ cho email
        if (!email) {
            isValid = false;
            newErrors.email = 'Vui lòng nhập email.';
        }
        // else if (!isValidEmail(email)) {
        //     isValid = false;
        //     newErrors.email = 'Email không hợp lệ.';
        // }

        // Kiểm tra hợp lệ cho password
        if (!password) {
            isValid = false;
            newErrors.password = 'Vui lòng nhập mật khẩu.';
        }
        // else if (!isValidPassword(password)) {
        //     isValid = false;
        //     newErrors.password = 'Hãy nhập lại password( Bao gồm trên 8 kí tự và có kí tự hoa).';
        // }

        // Cập nhật state errors để hiển thị lỗi (nếu có)
        setErrors(newErrors);

        return isValid;
    };

    const isValidEmail = (email) => {
        // Sử dụng biểu thức chính quy để kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@gmail\.com$/i;
        return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
        // Sử dụng biểu thức chính quy để kiểm tra định dạng email
        const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
        return passwordRegex.test(password);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            // localStorage.clear();
            // setAuth(false);
            // axios.defaults.headers.common['Authorization'] = null;
            // const sessionId = Cookies.get('sessionid', { domain: 'localhost', path: '/' });
            // console.log('Giá trị của sessionid:', sessionId);
            // Cookies.remove('sessionid');
            // axios.post("account/login/", {
            //     email: email,
            //     password: password,
            // })
            const userData = {
                email: email,
                password: password,
            };
            await login(userData);
        } else {
            console.log('form is not valid')
        }
    }

    return (
        <>
            <div className={cx("wrapper"
            )}>
                <div className={cx("inner")}>
                    <div className={cx("login__title")}>
                        <h4>Đăng nhập</h4>
                        <div className={cx('url')}>
                            <Link to={routes.home}>Trang chủ </Link>
                            <span>/ Đăng nhập tài khoản</span>
                        </div>
                    </div>
                    <form onSubmit={handleLogin} className={cx("login__form")}>
                        <input placeholder="Email" value={email} name="email" onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && <div className={cx("error")}>{errors.email}</div>}
                        <input type="password" placeholder="Mật khẩu" value={password} name="password" onChange={(e) => setPassword(e.target.value)} />
                        {errors.password && <div className={cx("error")}>{errors.password}</div>}
                        <div className={cx("login__form--btn")}>
                            <Button type="submit">Đăng nhập</Button>
                            <Link to={routes.forgotPassword}>Quên mật khẩu?</Link>
                        </div>
                    </form>
                    <div className={cx("diferent__login")}>
                        <div className={cx("diferent__login--title")}>
                            <span>Hoặc đăng nhập qua</span>
                        </div>
                        <div className={cx("diferent__login--btns")}>
                            <img src={images.facebookBtn.default} alt="Đăng nhập bằng Facebook" />
                            <img src={images.googleBtn.default} alt="Đăng nhập bằng Google" />
                        </div>
                    </div>
                    <div className={cx("register")}>
                        <h4>Đăng ký</h4>
                        <span>Tạo tài khoản để quản lý đơn hàng, và các thông tin thanh toán, gửi hàng một cách đơn giản hơn.</span>
                        <Button to={routes.register}>Tạo tài khoản</Button>
                        <Button to={routes.home}>Quay về trang chủ</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;