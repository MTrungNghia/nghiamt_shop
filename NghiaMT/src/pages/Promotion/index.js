import classNames from "classnames/bind";
import styles from "./Promotion.module.scss";
import routes from "~/config/routes";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
function Promotion() {
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('breadcrumb')}>
                        <Link to={routes.home}>Trang chủ&nbsp;</Link>
                        <span> / Khuyến mãi hot</span>
                        {/* <Link to={`/category/${product.category_slug}`}>&nbsp;{product.category_name}&nbsp;</Link> */}
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('title')}>
                            <span>Khuyến mãi hot</span>
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

export default Promotion;