
// import { useState } from "react";
import { Menu, Button } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import routes from "~/config/routes";
// import logo from "../../assets/images/logo.png";
import classNames from "classnames/bind";
import styles from "./NavBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChain, faShop, faTableCells } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
function Navbar({ color }) {
    const { pathname } = useLocation();
    const page = pathname.replace("/", "");

    return (
        <>
            <div className={cx("brand")}>
                {/* <img src={logo} alt="" /> */}
                <span>Quản lý</span>
            </div>
            <hr />
            <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <NavLink to={routes.categoryManager}>
                        <FontAwesomeIcon className={cx("icon")} icon={faShop} />
                        <span className={cx("label")}>Loại sản phẩm</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                    <NavLink to={routes.productManager}>
                        <FontAwesomeIcon className={cx("icon")} icon={faTableCells} />
                        <span className={cx("label")}>Sản phẩm</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                    <NavLink to={routes.customerManager}>
                        <FontAwesomeIcon className={cx("icon")} icon={faChain} />
                        <span className={cx("label")}>Khách hàng</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="4">
                    <NavLink to={routes.orderManager}>
                        <FontAwesomeIcon className={cx("icon")} icon={faChain} />
                        <span className={cx("label")}>Đơn hàng</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="5">
                    <NavLink to={routes.statiscalReports}>
                        <FontAwesomeIcon className={cx("icon")} icon={faChain} />
                        <span className={cx("label")}>Thống kê</span>
                    </NavLink>
                </Menu.Item>
            </Menu>

        </>
    );
}

export default Navbar;
