import classNames from "classnames/bind";
import styles from "./Contact.module.scss";
import routes from "~/config/routes";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function Contact() {
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('breadcrumb')}>
                        <Link to={routes.home}>Trang chủ&nbsp;</Link>
                        <span> / Liên hệ</span>
                        {/* <Link to={`/category/${product.category_slug}`}>&nbsp;{product.category_name}&nbsp;</Link> */}
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('title')}>
                            <span>Liên hệ</span>
                        </div>
                        <div className={cx('content-main')}>
                            <span>Thông tin đang được cập nhật</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contact;