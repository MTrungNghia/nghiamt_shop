import { useLocation } from 'react-router-dom';
import classNames from "classnames/bind";
import styles from "./SearchImage.module.scss";
import ProductItem from '~/components/ProductItem';

const cx = classNames.bind(styles);

function SeacrhImage() {
    const location = useLocation();
    const { productsSearch, url } = location.state || {};
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('breadcrumb')}>
                    <span>Ảnh cần tìm kiếm: </span>
                    <img style={{ marginLeft: '10px' }} width="50" height="60" src={url} alt='Ảnh tìm kiếm' />
                </div>
                <div className={cx('content')}>
                    <div className={cx('content-main')}>
                        <h5>Kết quả tìm kiếm: </h5>
                        {/* <div className={cx('product-sort')}>
                            <h5>Sắp xếp:</h5>
                            <ul className={cx('product-sort--list')}>
                                <li><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />A -&gt; Z</li>
                                <li><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />Z -&gt; A</li>
                                <li><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />Giá tăng dần</li>
                                <li><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />Giá giảm dần</li>
                                <li><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />Hàng mới nhất</li>
                                <li><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />Hàng cũ nhất</li>
                            </ul>
                        </div> */}
                        <div className={cx('content-main__product')}>
                            <div className={cx('content-main__product--list')}>
                                {productsSearch && productsSearch.map((product, index) => (
                                    <ProductItem imageUrl={true} key={index} colum4={true} product={product} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SeacrhImage;