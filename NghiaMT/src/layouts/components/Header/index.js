import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import images from "~/assets/images";
import Search from "../Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCartShopping, faCircleUser, faHome, faMapLocation, faPhone, faPhoneVolume, faUser } from "@fortawesome/free-solid-svg-icons";
import config from "~/config";
import routes from "~/config/routes";
import { useContext, useEffect, useState } from "react";
import { ListCategory } from "./ListCategory";
import { notification } from "antd";
import { CartContext } from "~/context/cartContext";
import { UserContext } from "~/context/userContext";

const cx = classNames.bind(styles);

function Header() {
    const [showUserOperations, setShowUserOperations] = useState(false);
    const location = useLocation();
    const [activeLink, setActiveLink] = useState("");
    const { listProduct } = useContext(CartContext);
    const { user } = useContext(UserContext);

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [activeLink]);

    const navigate = useNavigate();

    function ItemNavbar({
        item }) {
        return (<div className={cx('navbar__category')}>
            <Link title={item.title} to={`/category${item.link}`} className={cx('navbar__category--title')}>
                <h5>{item.title}</h5>
            </Link>
            {item.itemsCategory && (
                <div className={cx('navbar__category--items')}>
                    {item.itemsCategory.map((childItem, index) => (
                        <Link title={childItem.title} to={`/category/${childItem.link}`} key={index}>{childItem.title}</Link>
                    ))}
                </div>
            )}
        </div>)
    };

    function ItemMobileNavbar({ icon, to, onClick, title, className }) {
        const WrapperElement = to ? 'a' : 'button';

        const handleClick = () => {
            if (onClick) {
                onClick();
            }
        };

        return (
            <WrapperElement
                href={to}
                onClick={handleClick}
                className={cx({ active: to === activeLink })}
            >
                <FontAwesomeIcon icon={icon} />
                <h5>{title}</h5>
            </WrapperElement>
        );
    }

    function show() {
        setShowUserOperations(!showUserOperations);
    };

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description,
        });
    };

    function hanldeCart() {
        console.log(user);
        if (user !== null) {
            navigate(routes.cart);
        } else {
            openNotificationWithIcon('warning', 'Thông báo', 'Hãy đăng nhập hoặc tạo tài khoản để tiếp tục!');
            setTimeout(() => {
                navigate(routes.login);
            }, 2000);
        }
    };

    return (
        <header className={cx('wrapper')}>
            {contextHolder}
            <div className={cx('inner')}>
                <Link to={routes.home} className={cx('logo')}>
                    <img src={images.logo} alt="logo" />
                </Link>
                <div className={cx('container')}>
                    <div className={cx('content')}>
                        <Search />
                        <div className={cx('store-infor')}>
                            <Link to="tel:0981313335" title="Liên hệ" className={cx('hotline')}>
                                <FontAwesomeIcon icon={faPhoneVolume} />
                                <span>Hotline: <br></br> 0123456789</span>
                            </Link>
                            <Link title="Hệ thống cửa hàng" className={cx('store-system')}>
                                <FontAwesomeIcon icon={faMapLocation} />
                                <span>Hệ thống <br></br> cửa hàng</span>
                            </Link>
                        </div>
                        <div className={cx('user-infor')}>
                            <div title="Thông tin đăng nhập" className={cx('user')} onClick={show}>
                                <FontAwesomeIcon icon={faCircleUser} />
                                {showUserOperations && (
                                    <div className={cx("user-operations")}>
                                        {
                                            (user === null) ?
                                                (<ul>
                                                    <li><a href={routes.login}>Đăng nhập</a></li>
                                                    <li><a href={routes.register}>Đăng ký</a></li>
                                                </ul>) : (
                                                    <ul>
                                                        <li><a href={routes.profile}>Xem thông tin</a></li>
                                                    </ul>)
                                        }

                                    </div>
                                )}
                            </div>
                            <Link onClick={hanldeCart} to={(user === null) ? routes.login : routes.cart} title="Giỏ hàng" className={cx('cart')}>
                                <FontAwesomeIcon icon={faCartShopping} />
                                <span>{listProduct.length}</span>
                            </Link>
                        </div>
                    </div>
                    <ul className={cx('navbar')}>
                        <div className={cx('navbar_inner')}>
                            <li>
                                <Link to={config.routes.home} title="Trang chủ">Trang chủ</Link>
                            </li>
                            <li>
                                <Link to={config.routes.introduce} title="Giới thiệu">Giới thiệu</Link>
                            </li>
                            <li>
                                <Link to={config.routes.promotion} title="Khuyến mãi hot">Khuyến mãi hot</Link>
                            </li>
                            <li>
                                <Link to={config.routes.new} title="Tin tức">Tin tức</Link>
                            </li>
                            <li>
                                <Link to={config.routes.contact} title="Liên hệ">Liên hệ</Link>
                            </li>
                            <li
                                className={cx('products__navbar')}
                                title="Sản phẩm"
                            >
                                <Link>Sản phẩm</Link>
                                <FontAwesomeIcon icon={faCaretDown} />
                                <div className={cx('products')}>
                                    {ListCategory.map((item, index) => (
                                        <ItemNavbar key={index} item={item} />
                                    ))}
                                </div>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
            <div className={cx('mobile_navbar')}>
                <div className={cx('mobile_navbar--inner')}>
                    <ItemMobileNavbar to={routes.home} title={"Trang chủ"} icon={faHome} />
                    <ItemMobileNavbar to={routes.contact} title={"Liên hệ"} icon={faPhone} />
                    <ItemMobileNavbar to={(user !== null) ? (routes.profile) : (routes.login)} title={"Tài khoản"} icon={faUser} />
                    <ItemMobileNavbar to={routes.cart} title={"Giỏ hàng"} icon={faCartShopping} />
                </div>
            </div>
        </header>
    );
}

export default Header;