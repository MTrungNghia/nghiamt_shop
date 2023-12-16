import axios from "axios";
import { useSelector } from "react-redux";
import { UserContext } from "./userContext";
import { notification } from "antd";
const { createContext, useState, useEffect, useContext } = require("react");

const AddressContext = createContext();

const AddressProvider = ({ children }) => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user !== null) {
            axios.get(`account/list_user_address_by_user/${user.id}/`)
                .then((response) => {
                    setAddresses(response.data);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [user, loading]);

    const addAddres = (dataAdd) => {
        try {
            axios.post('account/create_user_address/', dataAdd)
                .then(function (response) {
                    // openNotificationWithIcon('success', 'Thêm địa chỉ mới', `Bạn đã thêm địa chỉ mới thành công.`);
                    // setTimeout(() => {
                    //     onOk();
                    // }, 2000);
                    setLoading(!loading);
                    console.log(response.data);
                })
                .catch(function (error) {
                    // openNotificationWithIcon('error', 'Thêm địa chỉ mới', `Lỗi thêm địa chỉ hãy kiểm tra lại.`);
                    // Xử lý lỗi (nếu có)
                    console.error(error);
                });
        } catch (error) {
            throw (error);
        }
    }

    const removeAddress = (dataRemove) => {
        try {
            axios.delete(`account/delete_user_address/${dataRemove}/`)
                .then(function (response) {
                    // openNotificationWithIcon('success', 'Thêm địa chỉ mới', `Bạn đã thêm địa chỉ mới thành công.`);
                    // setTimeout(() => {
                    //     onOk();
                    // }, 2000);
                    notification.success({ message: 'Xóa địa chỉ', description: 'Xóa địa chỉ thành công' });
                    setLoading(!loading);
                    console.log(response.data);
                })
                .catch(function (error) {
                    // openNotificationWithIcon('error', 'Thêm địa chỉ mới', `Lỗi thêm địa chỉ hãy kiểm tra lại.`);
                    // Xử lý lỗi (nếu có)
                    notification.error({ message: 'Xóa địa chỉ', description: 'Xóa địa chỉ thất bại' });
                    console.error(error);
                });
        } catch (error) {
            throw (error);
        }
    }

    const value = {
        addresses,
        addAddres,
        removeAddress,
    };
    return <AddressContext.Provider value={value}>
        {children}
    </AddressContext.Provider>
};
export { AddressContext, AddressProvider };