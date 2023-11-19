import { Col, Row } from "antd";
import classNames from "classnames/bind";
import styles from "./LayoutDefaultAdmin.module.scss";
import Navbar from "./layouts/NavBar";
import DefaultLayout from "~/layouts/Defaulayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import routes from "~/config/routes";

const cx = classNames.bind(styles);
function LayoutDefaultAdmin({ children }) {
    const [checkAdmin, setCheckAdmin] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        axios.get('account/admin/')
            .then((res) => {
                console.log(res);
                setCheckAdmin(true);
            })
            .catch(function (error) {
                console.log(error);
                setCheckAdmin(false);
                navigate(routes.home);
            });
    }, []);

    return (
        <div className={cx('content')}>
            <DefaultLayout>
                <div className={cx('wrapper')}>
                    <div className={cx('inner')}>
                        <Row>
                            <Col span={4}>
                                <Navbar />
                            </Col>
                            <Col span={20}>
                                {children}
                            </Col>
                        </Row>
                    </div>
                </div>

            </DefaultLayout>
        </div>

    );
}

export default LayoutDefaultAdmin;