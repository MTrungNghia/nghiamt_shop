import React, { useState, useEffect, useContext } from "react";
import classNames from "classnames/bind";
import styles from "./RightNavbar.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import routes from "~/config/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faExchange,
    faHome,
    faLocation,
    faPenToSquare,
    faPowerOff,
    faRecycle,
    faUser,
    faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import images from "~/assets/images";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "~/redux/slice/authSlide";
import { UserContext } from "~/context/userContext";
import { Spin } from "antd";

const cx = classNames.bind(styles);

function RightNavbar({ children, index }) {
    const [activeLink, setActiveLink] = useState(""); // Thêm state cho link đang được chọn
    const { user, logout, reloadUser } = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(user?.is_admin);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setActiveLink(location.pathname);
        console.log(activeLink);
    }, [activeLink]);

    useEffect(() => {
        setIsAdmin(user?.is_admin);
    }, [user]);

    function ListLi({ onClick, to, icon, title }) {
        return (
            <a
                onClick={onClick}
                href={to}
                className={cx({ active: to === activeLink })}
            >
                <FontAwesomeIcon icon={icon} />
                <span>{title}</span>
            </a>
        );
    };

    const handleLogout = async () => {
        await logout();
        await reloadUser();
        setTimeout(() => {
            navigate(routes.home);
        }, 1000);
    }

    return (
        <>
            <div className={cx("wrapper")}>
                {
                    user === null ? (
                        <div div className={cx("inner-loading")}>
                            <Spin tip='Loading...'>
                                <div>Loading</div>
                            </Spin>
                        </div>
                    ) : (
                        <div div className={cx("inner")}>
                            <div className={cx("breadcrumb")}>
                                <Link to={routes.home}>Trang chủ&nbsp;</Link>
                            </div>
                            <div className={cx("content")}>
                                <div className={cx("profile__detail")}>
                                    <div className={cx("profile__detail--main")}>
                                        {isAdmin === true ? (
                                            <div className={cx("order-history")}>
                                                <Link className={cx({ active: routes.orderManager === activeLink })} to={routes.orderManager}>
                                                    <img src={images.orderHistory} alt="Quản lý đơn hàng" />
                                                    <span>Quản lý đơn hàng</span>
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className={cx("order-history")}>
                                                <Link className={cx({ active: routes.orders === activeLink })} to={routes.orders}>
                                                    <img src={images.orderHistory} alt="Lịch sử đơn hàng" />
                                                    <span>Lịch sử đơn hàng</span>
                                                </Link>
                                            </div>
                                        )}

                                        <div className={cx("profile__detail--welcome")}>
                                            <Link>
                                                <img src={images.account} alt="Account" />
                                                {user !== null && (
                                                    <span>
                                                        Xin chào,{" "}
                                                        <span className={cx("profile__detail--name")}>
                                                            {user.first_name}
                                                        </span>
                                                    </span>
                                                )}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className={cx("profile__detail--infor")}>{children}</div>
                                </div>
                                <div className={cx("profile__function")}>
                                    {isAdmin === true ? (
                                        <ul className={cx("profile__function--list")}>
                                            <li>
                                                <ListLi to={routes.profile} icon={faUser} title={"Thông tin cá nhân"} />
                                            </li>
                                            <li>
                                                <ListLi to={routes.categoryManager} icon={faLocation} title={"Quản lý loại sản phảm"} />
                                            </li>
                                            <li>
                                                <ListLi to={routes.productManager} icon={faExchange} title={"Quản lý sản phẩm"} />
                                            </li>
                                            <li>
                                                <ListLi to={routes.customerManager} icon={faExchange} title={"Quản lý khách hàng"} />
                                            </li>
                                            <li>
                                                <ListLi to={routes.statiscalReports} icon={faExchange} title={"Xem báo cáo thống kê"} />
                                            </li>
                                            <li>
                                                <ListLi onClick={handleLogout} icon={faPowerOff} title={"Đăng xuất"} />
                                            </li>
                                        </ul>
                                    ) : (
                                        <ul className={cx("profile__function--list")}>
                                            <li>
                                                <ListLi to={routes.profile} icon={faUser} title={"Thông tin cá nhân"} />
                                            </li>
                                            <li>
                                                <ListLi to={routes.addressSaved} icon={faLocation} title={"Địa chỉ đã lưu"} />
                                            </li>
                                            <li>
                                                <ListLi to={routes.changePassword} icon={faExchange} title={"Đổi mật khẩu"} />
                                            </li>
                                            <li>
                                                <ListLi onClick={handleLogout} icon={faPowerOff} title={"Đăng xuất"} />
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div >
        </>
    );
}

export default RightNavbar;
