import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookies from 'js-cookie';
import { notification } from 'antd';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [listProduct, setListProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        const fetchUser = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
            axios.get('account/user/')
                .then((res) => {
                    setUser(res.data);
                    console.log(res.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        fetchUser();
    }, [loading]);

    const reloadUser = () => {
        setLoading(!loading);
    };

    const login = async (userInfor) => {
        // const csrfToken = Cookies.get('csrftoken');
        try {
            localStorage.clear();
            axios.defaults.headers.common['Authorization'] = null;
            const sessionId = Cookies.get('sessionid', { domain: 'localhost', path: '/' });
            console.log('Giá trị của sessionid:', sessionId);
            Cookies.remove('sessionid');
            axios.post("account/login/", {
                email: userInfor.email,
                password: userInfor.password,
            })
                .then((response) => {
                    const token = response.data.token;
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    localStorage.setItem('authToken', token);
                    notification.success({ message: 'Đăng nhập thành công', description: 'Đăng nhập tài khoản thành công!' });
                    setLoading(!loading);
                })
                .catch((error) => {
                    notification.error({ message: 'Đăng nhập lỗi', description: 'Hãy nhập lại thông tin hoặc liên hệ cho Admin!' });
                })
        } catch (error) {
            throw error;
        }
    };

    const register = async (dataUser) => {
        // const csrfToken = Cookies.get('csrftoken');
        try {
            axios.post("account/register/", {
                first_name: dataUser.firstName,
                last_name: dataUser.lastName,
                email: dataUser.email,
                password: dataUser.password,
            })
                .then((response) => {
                    notification.success({ message: 'Đăng ký tài khoản', description: 'Đăng ký tài khoản thành công, hãy đăng nhập!' });
                    setLoading(!loading);
                })
                .catch((error) => {
                    notification.error({ message: 'Đăng ký tài khoản', description: 'Lỗi!' });
                })
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            setUser(null);
            localStorage.clear();
            axios.defaults.headers.common['Authorization'] = null;
            axios.post("account/logout/")
                .then((res) => {
                    console.log(res);
                    notification.info({ message: 'Đăng xuất', description: 'Đăng xuất tài khoản thành công!' });
                    setLoading(!loading);
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {
            throw error;
        }
    };

    const value = {
        user,
        listProduct,
        // loading,
        login,
        register,
        logout,
        reloadUser,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider }
