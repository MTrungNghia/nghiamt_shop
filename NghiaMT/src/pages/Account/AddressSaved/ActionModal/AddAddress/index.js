import classNames from "classnames/bind";
import styles from "./AddAddress.module.scss";
import { useContext, useEffect, useState } from "react";
import Button from "~/components/Button";
import axios from "axios";
import { Divider, Modal, notification } from "antd";

const cx = classNames.bind(styles);
function AddAddress({ onOk, onCancel, title, open, userId }) {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [province, setProvince] = useState('');
    const [division, setDivision] = useState('');
    const [district, setDistrict] = useState('');
    const [address, setAddress] = useState('');
    const [addressDefault, setAddressDefault] = useState(false);

    const handleSubmit = () => {
        let formData = new FormData();
        formData.append('user', userId);
        formData.append('full_name', name);
        formData.append('phone_number', phoneNumber);
        formData.append('province', province);
        formData.append('district', division);
        formData.append('wards', district);
        formData.append('address', address);
        formData.append('is_default', addressDefault);
        // alert(formData.data);
        // for (let pair of formData.entries()) {
        //     console.log(pair[0], pair[1]);
        // }
        // Gửi dữ liệu đến server
        axios.post('account/create_user_address/', formData)
            .then(function (response) {
                notification.success({ message: 'Thêm địa chỉ mới', description: `Bạn đã thêm địa chỉ mới thành công.` });
                setTimeout(() => {
                    onOk();
                }, 2000);
                console.log(response.data);
            })
            .catch(function (error) {
                notification.error({ message: 'Thêm địa chỉ mới', description: `Lỗi thêm địa chỉ hãy kiểm tra lại.` });
                // Xử lý lỗi (nếu có)
                console.error(error);
            });
    };

    return (
        <>
            <Modal
                title={title}
                open={open}
                onOk={onOk}
                footer={(
                    <>
                        <Button effect onClick={onCancel}>Hủy</Button>
                        <Button primary effect onClick={handleSubmit}>Thêm địa chỉ</Button>
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
                            < input type="checkbox" id="addressDefault" name="addressDefault" checked={addressDefault} onChange={(e) => setAddressDefault(e.target.checked)} className={cx('checkbox-input')} />
                            <label htmlFor="addressDefault" className={cx('checkbox-label')}>Đặt địa chỉ làm mặc định</label>
                        </div >
                    </form >

                </div >

            </Modal>
        </>
    );
}

export default AddAddress;