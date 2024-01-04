import classNames from "classnames/bind";
import styles from "./Promotion.module.scss";
import routes from "~/config/routes";
import { Link } from "react-router-dom";
import images from "~/assets/images";

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
                            <img src={images.promotion} alt="Ảnh mô tả khuyến mãi" />
                            <div className={cx('voucher_register')}>
                                <form className={cx('voucher_register_form')}>
                                    <h5>Đăng ký nhận Voucher khuyến mãi</h5>
                                    <input type="text" placeholder="Họ tên *" />
                                    <input type="email" placeholder="Email *" />
                                    <input type="text" placeholder="Số điện thoại *" />
                                    <p>* Thông tin bắt buộc</p>
                                    <button>Đăng ký ngay</button>
                                </form>
                            </div>
                            {/* <span>Thông tin đang được cập nhật</span> */}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Promotion;