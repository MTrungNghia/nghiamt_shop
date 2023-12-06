import classNames from "classnames/bind";
import styles from "./EditAddress.module.scss";
import { useEffect, useState } from "react";
import Button from "~/components/Button";
import axios from "axios";
import { Divider, Modal, notification } from "antd";

const cx = classNames.bind(styles);
function EditAddress({ onOk, onCancel, title, open, data, userId }) {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [province, setProvince] = useState('');
    const [division, setDivision] = useState('');
    const [district, setDistrict] = useState('');
    const [address, setAddress] = useState('');
    const [addressDefault, setAddressDefault] = useState(false);
    const [changeAddressDefault, setChangeAddressDefault] = useState(false);

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description,
        });
    };
    const handleSubmit = () => {
        let formData = new FormData();
        formData.append('id', data.id);
        formData.append('user', userId);
        formData.append('full_name', name);
        formData.append('phone_number', phoneNumber);
        formData.append('province', province);
        formData.append('district', division);
        formData.append('wards', district);
        formData.append('address', address);
        formData.append('is_default', addressDefault);

        axios.post('account/update_user_address/', formData)
            .then(function (response) {
                openNotificationWithIcon('success', 'Sửa địa chỉ', `Bạn đã sửa địa chỉ mới thành công.`);
                setTimeout(() => {
                    onOk();
                }, 2000);
            })
            .catch(function (error) {
                openNotificationWithIcon('error', 'Sửa địa chỉ', `Lỗi sửa địa chỉ hãy kiểm tra lại.`);
                // Xử lý lỗi (nếu có)
                console.error(error);
            });
    };

    useEffect(() => {
        setName(data.full_name);
        setPhoneNumber(data.phone_number);
        setAddress(data.address);
        setProvince(data.province);
        setDivision(data.wards);
        setDistrict(data.district);
        setAddressDefault(data.is_default);
        setChangeAddressDefault(data.is_default);
    }, [data]);

    return (
        <>
            {contextHolder}

            <Modal
                title={title}
                open={open}
                onOk={onOk}
                footer={(
                    <>
                        <Button effect onClick={onCancel}>Hủy</Button>
                        <Button primary effect onClick={handleSubmit}>Sửa địa chỉ</Button>
                    </>
                )}
                okText="Thêm sản phẩm"
                cancelText="Hủy"
                onCancel={onCancel}
                width={'50%'}
            >
                <div className={cx('form_main')}>
                    <Divider />
                    <form className={cx('address-form')}>
                        <div className={cx('form-group')}>
                            <div className={cx('input-group')}>
                                <label htmlFor="fullname" className={cx('input-label')}>Họ tên:</label>
                                <input
                                    type="text"
                                    id="fullname"
                                    name="fullname"
                                    className={cx('input-text')}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className={cx('input-group')}>
                                <label htmlFor="phoneNumber" className={cx('input-label')}>Số điện thoại:</label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    className={cx('input-text')}
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className={cx('form-group')}>
                            <div className={cx('input-group')}>
                                <label htmlFor="province" className={cx('input-label')}>Tỉnh, thành:</label>
                                <input
                                    type="text"
                                    id="province"
                                    name="province"
                                    className={cx('input-text')}
                                    value={province}
                                    onChange={(e) => setProvince(e.target.value)}
                                />
                            </div>
                            <div className={cx('input-group')}>
                                <label htmlFor="division" className={cx('input-label')}>Quận, huyện:</label>
                                <input
                                    type="text"
                                    id="division"
                                    name="division"
                                    className={cx('input-text')}
                                    value={division}
                                    onChange={(e) => setDivision(e.target.value)}
                                />
                            </div>
                            <div className={cx('input-group')}>
                                <label htmlFor="district" className={cx('input-label')}>Phường, xã:</label>
                                <input
                                    type="text"
                                    id="district"
                                    name="district"
                                    className={cx('input-text')}
                                    value={district}
                                    onChange={(e) => setDistrict(e.target.value)}
                                />
                            </div>
                            <div className={cx('input-group')}>
                                <label htmlFor="address" className={cx('input-label')}>Địa chỉ:</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    className={cx('input-text')}
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                        </div >
                        <div className={cx('form-group-default')}>
                            < input type="checkbox" id="addressDefault" disabled={changeAddressDefault} name="addressDefault" checked={addressDefault} onChange={(e) => setAddressDefault(e.target.checked)} className={cx('checkbox-input')} />
                            <label htmlFor="addressDefault" className={cx('checkbox-label')}>Đặt địa chỉ làm mặc định</label>
                        </div >
                    </form >

                </div >

            </Modal>
        </>
    )
};

export default EditAddress;