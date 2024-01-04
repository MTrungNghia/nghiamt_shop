import classNames from "classnames/bind";
import styles from "./ChangePassword.module.scss";
import { Link, useNavigate } from "react-router-dom";
import routes from "~/config/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchange, faLocation, faPowerOff, faUser, faUserGear } from "@fortawesome/free-solid-svg-icons";
import images from "~/assets/images";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Button from "~/components/Button";
import { setAuth } from "~/redux/slice/authSlide";
import { notification } from "antd";
import RightNavbar from "../components/RightNavbar";
import { UserContext } from "~/context/userContext";

const cx = classNames.bind(styles);

function ChangePassword() {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [notiWrongPass, setNotiWrongPass] = useState(false);
    const [notiShortPass, setNotiShortPass] = useState(false);
    const [notiDiffPass, setNotiDiffPass] = useState(false);
    const { user } = useContext(UserContext);

    function ListLi({ onClick, to, icon, title }) {
        return (
            <a onClick={onClick} href={to}>
                <FontAwesomeIcon icon={icon} />
                <span>{title}</span>
            </a>
        )
    }

    function reset() {
        setPassword('');
        setNewPassword('');
        setConfirmPassword('');
    }

    function handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData();
        if (newPassword !== confirmPassword) {
            setNotiDiffPass(true);
            setNotiShortPass(false);
            setNotiWrongPass(false);
        }
        else {
            if (newPassword.length < 6) {
                setNotiShortPass(true);
                setNotiDiffPass(false);
                setNotiWrongPass(false);
            }
            else {
                formData.append("password", password);
                formData.append("new_password", newPassword);
                axios.post(`http://127.0.0.1:8000/account/change_password/${user.id}/`, formData)
                    .then(function (response) {
                        // Xử lý phản hồi từ server (nếu cần)
                        console.log(response.data);
                        if (response.data.error === null) {
                            setNotiWrongPass(true);
                            setNotiDiffPass(false);
                            setNotiShortPass(false);
                        } else {
                            setNotiWrongPass(false);
                            setNotiDiffPass(false);
                            setNotiShortPass(false);
                            reset();
                            notification.success({ message: 'Thay đổi mật khẩu', description: `Thay đổi mật khẩu thành công!` });
                            // a1234567
                        }
                    })
                    .catch(function (error) {
                        // Xử lý lỗi (nếu có)
                        notification.success({ message: 'Thay đổi mật khẩu', description: error.response.data.error });
                        console.log(error.response.data.error);
                    });
            }
        }

    }

    return (
        <>
            <RightNavbar>
                <div className={cx('profile__detail--infor')}>
                    <h3>Thông tin tài khoản</h3>
                    {notiWrongPass && (
                        <div className={cx('noti')}>
                            <span>Mật khẩu sai, nhập lại.</span>
                        </div>
                    )}
                    {notiShortPass && (
                        <div className={cx('noti')}>
                            <span>Mật khẩu phải từ 6 ký tự trở lên.</span>
                        </div>
                    )}
                    {notiDiffPass && (
                        <div className={cx('noti')}>
                            <span>Mật khẩu thay đổi cần phải giống nhau.</span>
                        </div>
                    )}

                    <span>Để đảm bảo tính bảo mật vui lòng đặt mật khẩu với ít nhất 8 kí tự</span>
                    <form onSubmit={handleSubmit} className={cx('from__change-password')}>
                        <div className={cx('input__group')}>
                            <span>Mật khẩu cũ *:</span>
                            <input type="password" value={password} name="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={cx('input__group')}>
                            <span>Mật khẩu mới *:</span>
                            <input type="password" name="new_password" value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)} />
                        </div>
                        <div className={cx('input__group')}>
                            <span>Xác nhận lại mật khẩu *:</span>
                            <input type="password" name="confirm_password" value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <div>
                            <Button type="submit" className={cx('btn-add')} primary >Thay đổi mật khẩu</Button>
                        </div>
                    </form>
                </div>
            </RightNavbar>
            {/* <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('breadcrumb')}>
                        <Link to={routes.home}>Trang chủ&nbsp;</Link>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('profile__detail')}>
                            <div className={cx('profile__detail--main')}>
                                <div className={cx('order-history')}>
                                    <Link to={routes.orders}>
                                        <img src={images.orderHistory} alt="Lịch sử đơn hàng" />
                                        <span>Lịch sử đơn hàng</span>
                                    </Link>
                                </div>
                                <div className={cx('profile__detail--welcome')}>
                                    <Link>
                                        <img src={images.account} alt="Account" />
                                        {user !== null && (
                                            <span>Xin chào, <span className={cx('profile__detail--name')}>{user.first_name}</span></span>
                                        )}
                                    </Link>
                                </div>
                            </div>
                            {user !== null && (
                                <div className={cx('profile__detail--infor')}>
                                    <h3>Thông tin tài khoản</h3>
                                    {notiWrongPass && (
                                        <div className={cx('noti')}>
                                            <span>Mật khẩu sai, nhập lại.</span>
                                        </div>
                                    )}
                                    {notiShortPass && (
                                        <div className={cx('noti')}>
                                            <span>Mật khẩu phải từ 6 ký tự trở lên.</span>
                                        </div>
                                    )}
                                    {notiDiffPass && (
                                        <div className={cx('noti')}>
                                            <span>Mật khẩu thay đổi cần phải giống nhau.</span>
                                        </div>
                                    )}

                                    <span>Để đảm bảo tính bảo mật vui lòng đặt mật khẩu với ít nhất 8 kí tự</span>
                                    <form onSubmit={handleSubmit} className={cx('from__change-password')}>
                                        <div className={cx('input__group')}>
                                            <span>Mật khẩu cũ *:</span>
                                            <input type="password" value={password} name="password"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className={cx('input__group')}>
                                            <span>Mật khẩu mới *:</span>
                                            <input type="password" name="new_password" value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)} />
                                        </div>
                                        <div className={cx('input__group')}>
                                            <span>Xác nhận lại mật khẩu *:</span>
                                            <input type="password" name="confirm_password" value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)} />
                                        </div>
                                        <div>
                                            <Button type="submit" className={cx('btn-add')} primary >Thay đổi mật khẩu</Button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                        <div className={cx('profile__function')}>
                            <ul className={cx('profile__function--list')}>
                                <li>
                                    <ListLi to={routes.profile} icon={faUser} title={"Thông tin cá nhân"} />
                                </li>
                                <li>
                                    <ListLi to={routes.addressSaved} icon={faLocation} title={"Địa chỉ đã lưu (0)"} />
                                </li>
                                <li>
                                    <ListLi to={routes.changePassword} icon={faExchange} title={"Đổi mật khẩu"} />
                                </li>
                                <li>
                                    <ListLi onClick={handleLogout} icon={faPowerOff} title={"Đăng xuất"} />
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div> */}
        </>
    );
}

export default ChangePassword;