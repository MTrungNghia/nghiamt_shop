import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import { Redirect, Link, Route, useNavigate } from "react-router-dom";
import routes from "~/config/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchange, faLocation, faPowerOff, faUser, faUserGear } from "@fortawesome/free-solid-svg-icons";
import images from "~/assets/images";
import { Suspense, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "~/redux/slice/authSlide";
import { Switch } from "antd";
import RightNavbar from "../components/RightNavbar";
import { UserContext } from "~/context/userContext";

const cx = classNames.bind(styles);

function Profile() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    return (
        <RightNavbar>
            <>
                <div className={cx('profile__detail--infor')}>
                    <h3>Thông tin tài khoản</h3>
                    {user !== null &&
                        <>
                            <span><b>Họ tên:</b> {user.last_name + " " + user.first_name}</span>
                            <span><b>Email:</b> {user.email}</span>
                        </>
                    }
                </div>
            </>
        </RightNavbar>
        // <div className={cx('wrapper')}>
        //     <div className={cx('inner')}>
        //         <div className={cx('breadcrumb')}>
        //             <Link to={routes.home}>Trang chủ&nbsp;</Link>
        //         </div>
        //         <div className={cx('content')}>
        //             <div className={cx('profile__detail')}>
        //                 <div className={cx('profile__detail--main')}>
        //                     <div className={cx('order-history')}>
        //                         {user?.is_admin ? (
        //                             <Link to={routes.categoryManager}>
        //                                 <img src={images.orderHistory} alt="Chức năng cho Admin" />
        //                                 <span>Chức năng cho Admin</span>
        //                             </Link>
        //                         ) : (
        //                             <Link to={routes.orders}>
        //                                 <img src={images.orderHistory} alt="Lịch sử đơn hàng" />
        //                                 <span>Lịch sử đơn hàng</span>
        //                             </Link>
        //                         )}

        //                     </div>
        //                     <div className={cx('profile__detail--welcome')}>
        //                         <Link>
        //                             {
        //                                 user?.avatar !== null ? (
        //                                     <img src={`http://localhost:8000${user?.avatar}`} alt="Account" />
        //                                 ) : (
        //                                     <img src={images.account} alt="Account" />
        //                                 )
        //                             }
        //                             {user !== null && (

        //                                 <span>Xin chào, <span className={cx('profile__detail--name')}>{user.first_name}</span></span>
        //                             )}
        //                         </Link>
        //                     </div>
        //                 </div>

        //                 <div className={cx('profile__detail--infor')}>
        //                     <h3>Thông tin tài khoản</h3>
        //                     {user !== null && (
        //                         <span><b>Họ tên:</b> {user.last_name + " " + user.first_name}</span>
        //                     )}
        //                     {user !== null && (
        //                         <span><b>Email:</b> {user.email}</span>
        //                     )}
        //                 </div>

        //             </div>
        //             <div className={cx('profile__function')}>
        //                 <ul className={cx('profile__function--list')}>
        //                     <li>
        //                         <ListLi to={routes.profile} icon={faUser} title={"Thông tin cá nhân"} />
        //                     </li>
        //                     <li>
        //                         <ListLi to={routes.addressSaved} icon={faLocation} title={"Địa chỉ đã lưu (0)"} />
        //                     </li>
        //                     <li>
        //                         <ListLi to={routes.changePassword} icon={faExchange} title={"Đổi mật khẩu"} />
        //                     </li>
        //                     <li>
        //                         <ListLi onClick={handleLogout} icon={faPowerOff} title={"Đăng xuất"} />
        //                     </li>
        //                 </ul>
        //             </div>

        //         </div>


        //     </div>
        // </div>
    );
}

export default Profile;