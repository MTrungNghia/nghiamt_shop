import classNames from "classnames/bind";
import styles from "./AddressSaved.module.scss";
import { Link, useNavigate } from "react-router-dom";
import routes from "~/config/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchange, faHome, faLocation, faPenToSquare, faPowerOff, faRecycle, faUser, faUserGear } from "@fortawesome/free-solid-svg-icons";
import images from "~/assets/images";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "~/components/Button";
import { useDispatch } from "react-redux";
import { setAuth } from "~/redux/slice/authSlide";
import AddAddress from "./ActionModal/AddAddress";
import EditAddress from "./ActionModal/EditAddress";
import DeleteAddress from "./ActionModal/DeleteAddress";
import RightNavbar from "../components/RightNavbar";

const cx = classNames.bind(styles);

function AddressSaved() {
    const [user, setUser] = useState(null);
    const [userAddress, setUserAddress] = useState(null);
    const [loadingApi, setLoadingApi] = useState(false);
    const [visitableAdd, setVisitableAdd] = useState(false);
    const [visitableEdit, setVisitableEdit] = useState(false);
    const [visitableDelete, setVisitableDelete] = useState(false);
    const [addressEdit, setAddressEdit] = useState(null);
    const [addressDelete, setAddressDelete] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        axios.get('account/user/')
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

    useEffect(() => {
        if (user != null) {
            axios.get(`account/list_user_address_by_user/${user.id}/`)
                .then((response) => {
                    setUserAddress(response.data);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [user, loadingApi])

    function ListLi({ onClick, to, icon, title }) {
        return (
            <a onClick={onClick} href={to}>
                <FontAwesomeIcon icon={icon} />
                <span>{title}</span>
            </a>
        )
    }

    function handleLogout() {
        localStorage.clear();
        setAuth(false);
        axios.defaults.headers.common['Authorization'] = null;
        axios.post("account/logout/")
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
        navigate(routes.login);
    }

    const handleOk = () => {
        setVisitableAdd(false);
        setVisitableEdit(false);
        setVisitableDelete(false);
        setLoadingApi(!loadingApi);
    };

    const handleCancel = () => {
        setVisitableAdd(false);
        setVisitableEdit(false);
        setVisitableDelete(false);
    };

    const onClickEdit = (selectAddress) => {
        setAddressEdit(selectAddress);
        setVisitableEdit(true);
    };

    const onClickDelete = (selectAddress) => {
        setAddressDelete(selectAddress);
        setVisitableDelete(true);
    };

    return (
        <>
            {visitableAdd && (
                <AddAddress
                    title="Thêm địa chỉ mới"
                    open={visitableAdd}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    userId={user.id}
                />
            )}
            {visitableEdit && (
                <EditAddress
                    title="Sửa thông tin địa chỉ"
                    open={visitableEdit}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    data={addressEdit}
                    userId={user.id}
                />
            )}
            {visitableDelete && (
                <DeleteAddress
                    title="Xóa địa chỉ"
                    open={visitableDelete}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    data={addressDelete}
                // userId={user.id}
                />
            )}
            <RightNavbar>
                <>
                    <Button effect className={cx('btn-add')} onClick={() => setVisitableAdd(true)} primary leftIcon={<FontAwesomeIcon icon={faHome} />} >Thêm địa chỉ</Button>
                    {userAddress !== null && userAddress.map((address, index) => (
                        <div key={index} className={cx('profile__detail--address')}>
                            <div className={cx('address__detail')}>
                                <span><b>Họ tên:</b> {address.full_name}{address.is_default && (<span className={cx('address__default')}> (Địa chỉ mặc định)</span>)}</span>
                                <span><b>Địa chỉ:</b> {address.wards + " - " + address.district + " - " + address.province}</span>
                                <span><b>Địa chỉ chi tiết:</b> {address.address}</span>
                                <span><b>Số điện thoại:</b> {address.phone_number}</span>
                            </div>
                            <div className={cx('profile__detail--btn')}>
                                <button onClick={() => onClickEdit(address)}><FontAwesomeIcon icon={faPenToSquare} />Sửa</button>
                                {!address.is_default && (<button onClick={() => onClickDelete(address)}><FontAwesomeIcon icon={faRecycle} /> Xóa</button>)}
                            </div>
                        </div>
                    ))}
                </>
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
                            <div className={cx('profile__detail--infor')}>
                                <Button className={cx('btn-add')} onClick={() => setVisitableAdd(true)} primary leftIcon={<FontAwesomeIcon icon={faHome} />} >Thêm địa chỉ</Button>
                                {userAddress !== null && userAddress.map((address, index) => (
                                    <div key={index} className={cx('profile__detail--address')}>
                                        <div className={cx('address__detail')}>
                                            <span><b>Họ tên:</b> {address.full_name}{address.is_default && (<span className={cx('address__default')}> (Địa chỉ mặc định)</span>)}</span>
                                            <span><b>Địa chỉ:</b> {address.wards + " - " + address.district + " - " + address.province}</span>
                                            <span><b>Địa chỉ chi tiết:</b> {address.address}</span>
                                            <span><b>Số điện thoại:</b> {address.phone_number}</span>
                                        </div>
                                        <div className={cx('profile__detail--btn')}>
                                            <button onClick={() => onClickEdit(address)}><FontAwesomeIcon icon={faPenToSquare} />Sửa</button>
                                            {!address.is_default && (<button onClick={() => onClickDelete(address)}><FontAwesomeIcon icon={faRecycle} /> Xóa</button>)}
                                        </div>
                                    </div>
                                ))}
                            </div>
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
            </div > */}

        </>
    );
}

export default AddressSaved;