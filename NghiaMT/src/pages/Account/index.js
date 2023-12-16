import classNames from "classnames/bind";
import styles from "./Account.module.scss";
import { Link, Route, useNavigate } from "react-router-dom";
import routes from "~/config/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchange, faLocation, faPowerOff, faUser, faUserGear } from "@fortawesome/free-solid-svg-icons";
import images from "~/assets/images";
import { Suspense, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "~/redux/slice/authSlide";
import AddressSaved from "./AddressSaved";
import ChangePassword from "./ChangePassword";
import Profile from "./Profile";
import { Switch } from "antd";
import { UserContext } from "~/context/userContext";

const cx = classNames.bind(styles);

function InforAccount() {
    const navigate = useNavigate();
    const { user, logout } = useContext(UserContext);

    const ROUTER_ACCOUNT_FUNCTION = [
        {
            title: "Thông tin cá nhân",
            Component: Profile,
            route: routes.admin1,
        },
        {
            title: "Địa chỉ đã lưu (0)",
            Component: AddressSaved,
            route: routes.categoryManager1,
        },
        {
            title: "Đổi mật khẩu",
            Component: ChangePassword,
            route: routes.customerManager1,
        },
        {
            title: "Đăng xuất",
            Component: ChangePassword,
            route: routes.customerManager1,
        },
    ];


    function ListLi({ onClick, to, icon, title }) {
        return (
            <a onClick={onClick} href={to}>
                <FontAwesomeIcon icon={icon} />
                <span>{title}</span>
            </a>
        )
    };

    const handleLogout = async () => {
        // localStorage.clear();
        // setAuth(false);
        // axios.defaults.headers.common['Authorization'] = null;
        // axios.post("account/logout/")
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })
        await logout()
            .then(() => {
                navigate(routes.home);
            })
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('breadcrumb')}>
                        <Link to={routes.home}>Trang chủ&nbsp;</Link>
                    </div>
                    <div className={cx('content')}>
                        <>
                            {/* return ( */}
                            <>
                                <Suspense>
                                    <Switch>
                                        {ROUTER_ACCOUNT_FUNCTION.map(({ title, Component, route }) => {
                                            console.log(`${routes.admin1}${route}`);
                                            return (
                                                <Route key={title} path={`${routes.admin1}${route}`}>
                                                    <div className={cx('profile__detail')}>
                                                        <div className={cx('profile__detail--main')}>
                                                            <div className={cx('order-history')}>
                                                                <Link to={routes.categoryManager}>
                                                                    <img src={images.orderHistory} alt="Quản lý đơn hàng" />
                                                                    <span>Quản lý đơn hàng</span>
                                                                </Link>
                                                            </div>
                                                            <div className={cx('profile__detail--welcome')}>
                                                                <Link>
                                                                    {
                                                                        user?.avatar !== null ? (
                                                                            <img src={`http://localhost:8000${user?.avatar}`} alt="Account" />
                                                                        ) : (
                                                                            <img src={images.account} alt="Account" />
                                                                        )
                                                                    }
                                                                    {user !== null && (
                                                                        <span>Xin chào, <span className={cx('profile__detail--name')}>{user.first_name}</span></span>
                                                                    )}
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className={cx('profile__detail--infor')}>
                                                            <Component />
                                                        </div>
                                                    </div>
                                                    <div className={cx('profile__function')}>
                                                        <ul className={cx('profile__function--list')}>
                                                            <li>
                                                                <ListLi to={routes.profile} icon={faUser} title={"Thông tin cá nhân"} />
                                                            </li>
                                                            <li>
                                                                <ListLi to={routes.addressSaved} icon={faLocation} title={`Địa chỉ đã lưu`} />
                                                            </li>
                                                            <li>
                                                                <ListLi to={routes.changePassword} icon={faExchange} title={"Đổi mật khẩu"} />
                                                            </li>
                                                            <li>
                                                                <ListLi onClick={handleLogout} icon={faPowerOff} title={"Đăng xuất"} />
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </Route>
                                            )
                                        })}
                                    </Switch>
                                </Suspense>
                            </>
                            {/* ); */}
                        </>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InforAccount;