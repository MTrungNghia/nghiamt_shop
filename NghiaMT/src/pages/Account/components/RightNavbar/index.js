import React, { useState, useEffect } from "react";
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

const cx = classNames.bind(styles);

function RightNavbar({ children, index }) {
    const [user, setUser] = useState(null);
    const [activeLink, setActiveLink] = useState(""); // Thêm state cho link đang được chọn
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setActiveLink(location.pathname);
        console.log(activeLink);
    }, [activeLink]);

    useEffect(() => {
        setIsAdmin(user?.is_admin);
    }, [user]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        axios
            .get("account/user/")
            .then((res) => {
                setUser(res.data);
                dispatch(setAuth(true));
            })
            .catch(function (error) {
                dispatch(setAuth(false));
                if (error.response.status === 403) {
                    navigate(routes.home);
                }
            });
    }, [dispatch, navigate]);

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

    function handleLogout() {
        localStorage.clear();
        setAuth(false);
        axios.defaults.headers.common["Authorization"] = null;
        axios
            .post("account/logout/")
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
        navigate(routes.login);
    }

    return (
        <>
            <div className={cx("wrapper")}>
                <div className={cx("inner")}>
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
                                        <ListLi to={routes.addressSaved} icon={faLocation} title={"Địa chỉ đã lưu (0)"} />
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
            </div>
        </>
    );
}

export default RightNavbar;
