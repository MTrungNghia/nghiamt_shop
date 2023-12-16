import { Link, useParams } from 'react-router-dom';
import classNames from "classnames/bind";
import styles from "./Category.module.scss";
import routes from '~/config/routes';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from '~/components/ProductItem';

const cx = classNames.bind(styles);

function Category() {
    const { categoryName } = useParams();
    const [category, setcategory] = useState({});
    const [listCategory, setListCategory] = useState([]);

    const [nextPager, setNextPager] = useState(1);
    const [currentPager, setCurrentPager] = useState(1);
    const [previosPager, setPreviosPager] = useState(1);
    const [numberPager, setnumberPager] = useState(1);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedSortOption, setSelectedSortOption] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/category/listOther/${categoryName}/`)
            .then(function (res) {
                setListCategory(res.data)
            })
            .catch(function (error) {

            })
    }, [])

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/category/products/${categoryName}/?page=${currentPager}&price_option=${selectedOption}&sort_option=${selectedSortOption}`)
            .then((res) => {
                let data = res.data;
                setcategory(data);
                setnumberPager(data.pages);

            })
            .catch((error) => {
                console.log(error)
            })
    }, [currentPager, selectedOption, selectedSortOption])

    // function handlePagination(index) {
    //     setCurrentPager(index);
    // }
    const handlePagination = (pageNumber) => () => {
        // Cập nhật currentPage
        setCurrentPager(pageNumber);
        if (pageNumber === 1) {
            setPreviosPager(1);
            setNextPager(pageNumber + 1);
        }
        else if (pageNumber === numberPager) {
            setPreviosPager(pageNumber - 1);
            setNextPager(numberPager);
        } else {
            setPreviosPager(pageNumber - 1);
            setNextPager(pageNumber + 1);
        }
    };

    const handleOptionChange = (value) => {
        setSelectedOption(value);
    };

    const handleSortOptionChange = (value) => {
        setSelectedSortOption(value);
    };

    return (<div className={cx('wrapper')}>
        <div className={cx('inner')}>
            <div className={cx('breadcrumb')}>
                <Link to={routes.home}>Trang chủ&nbsp;</Link>
                <span> / </span>
                <span to={routes.home}>&nbsp;{listCategory.category_name}&nbsp;</span>

            </div>
            <div className={cx('content')}>
                <div className={cx('product-filter')}>
                    <h5>Bộ lọc sản phẩm</h5>
                    <span>Giúp lọc nhanh sản phẩm bạn tìm kiếm</span>
                    <div className={cx('product-brand')}>
                        <h6>Thương hiệu</h6>
                        <span>Đang cập nhật...</span>
                    </div>
                    {category.products?.length !== 0 && (
                        <div className={cx('product-filter__price')}>
                            <h6>Lọc giá</h6>
                            <ul>
                                <li>
                                    <input
                                        type="radio"
                                        id="priceOption1"
                                        name="priceOption"
                                        value="Below1M"
                                        checked={selectedOption === 'Below1M'}
                                        onChange={() => handleOptionChange('Below1M')}
                                    />
                                    <label htmlFor="priceOption1">Giá dưới 1.000.000đ</label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id="priceOption2"
                                        name="priceOption"
                                        value="1Mto5M"
                                        checked={selectedOption === '1Mto5M'}
                                        onChange={() => handleOptionChange('1Mto5M')}
                                    />
                                    <label htmlFor="priceOption2">1.000.000đ - 5.000.000đ</label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id="priceOption3"
                                        name="priceOption"
                                        value="5Mto10M"
                                        checked={selectedOption === '5Mto10M'}
                                        onChange={() => handleOptionChange('5Mto10M')}
                                    />
                                    <label htmlFor="priceOption3">5.000.000đ - 10.000.000đ</label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id="priceOption4"
                                        name="priceOption"
                                        value="10Mto20M"
                                        checked={selectedOption === '10Mto20M'}
                                        onChange={() => handleOptionChange('10Mto20M')}
                                    />
                                    <label htmlFor="priceOption4">10.000.000đ - 20.000.000đ</label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id="priceOption5"
                                        name="priceOption"
                                        value="Above20M"
                                        checked={selectedOption === 'Above20M'}
                                        onChange={() => handleOptionChange('Above20M')}
                                    />
                                    <label htmlFor="priceOption5">Giá trên 20.000.000đ</label>
                                </li>
                            </ul>
                        </div>
                    )}
                    <div className={cx('product-category')}>
                        <h6>Danh mục</h6>
                        <div className={cx('navbar__category')}>
                            {Array.isArray(listCategory.listCategoryDifference) && listCategory.listCategoryDifference.map((childItem, index) => (
                                <a title={childItem.category_name} href={`/category/${childItem.slug}`} key={index}>{childItem.category_name}</a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={cx('content-main')}>
                    <h5>{listCategory.category_name}</h5>
                    {category.products?.length !== 0 ? (<>
                        <div className={cx('product-sort')}>
                            <h6>Sắp xếp:</h6>
                            {/* <ul className={cx('product-sort--list')}>
                                <li><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />A -&gt; Z</li>
                                <li><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />Z -&gt; A</li>
                                <li><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />Giá tăng dần</li>
                                <li><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />Giá giảm dần</li>
                                <li><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />Hàng mới nhất</li>
                                <li><input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />Hàng cũ nhất</li>
                            </ul> */}
                            <ul className={cx('product-sort--list')}>
                                <li>
                                    <input
                                        type="radio"
                                        id="sortOption1"
                                        name="sortOption"
                                        value="A-Z"
                                        checked={selectedSortOption === 'A-Z'}
                                        onChange={() => handleSortOptionChange('A-Z')}
                                    />
                                    <label htmlFor="sortOption1">A -&gt; Z</label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id="sortOption2"
                                        name="sortOption"
                                        value="Z-A"
                                        checked={selectedSortOption === 'Z-A'}
                                        onChange={() => handleSortOptionChange('Z-A')}
                                    />
                                    <label htmlFor="sortOption2">Z -&gt; A</label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id="sortOption3"
                                        name="sortOption"
                                        value="PriceAsc"
                                        checked={selectedSortOption === 'PriceAsc'}
                                        onChange={() => handleSortOptionChange('PriceAsc')}
                                    />
                                    <label htmlFor="sortOption3">Giá tăng dần</label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id="sortOption4"
                                        name="sortOption"
                                        value="PriceDesc"
                                        checked={selectedSortOption === 'PriceDesc'}
                                        onChange={() => handleSortOptionChange('PriceDesc')}
                                    />
                                    <label htmlFor="sortOption4">Giá giảm dần</label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id="sortOption5"
                                        name="sortOption"
                                        value="Newest"
                                        checked={selectedSortOption === 'Newest'}
                                        onChange={() => handleSortOptionChange('Newest')}
                                    />
                                    <label htmlFor="sortOption5">Hàng mới nhất</label>
                                </li>
                                <li>
                                    <input
                                        type="radio"
                                        id="sortOption6"
                                        name="sortOption"
                                        value="Oldest"
                                        checked={selectedSortOption === 'Oldest'}
                                        onChange={() => handleSortOptionChange('Oldest')}
                                    />
                                    <label htmlFor="sortOption6">Hàng cũ nhất</label>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('content-main__product')}>
                            <div className={cx('content-main__product--list')}>
                                {category.results && category.results.map((product, index) => (
                                    <ProductItem key={index} big={true} product={product} />
                                ))}
                            </div>
                            <div className={cx('product-pagination')}>
                                {numberPager > 1 && (
                                    <>
                                        <button href={routes.home}
                                            className={cx(currentPager === 1 && 'disable')}
                                            onClick={handlePagination(previosPager)}
                                        >&laquo;</button>
                                        {[...Array(numberPager)].map((_, index) => (
                                            <button
                                                key={index}
                                                // href={routes.home}
                                                className={cx(index + 1 === currentPager && 'active')}
                                                onClick={handlePagination(index + 1)}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}

                                        <button href={routes.home}
                                            className={cx(currentPager === numberPager && 'disable')}
                                            onClick={handlePagination(nextPager)}>&raquo;</button>
                                    </>
                                )}
                            </div>
                            {/* <a href={routes.home} className={cx('active')}>1</a>
                                <a href={routes.home}>2</a>
                                <a href={routes.home}>3</a>
                                <a href={routes.home}>4</a>
                                <a href={routes.home}>5</a>
                                <a href={routes.home}>6</a>*/}
                        </div>
                    </>
                    ) : (
                        <div>Chưa có sản phẩm nào được thêm vào.</div>
                    )}

                </div>
            </div>

        </div>
    </div>);
}

export default Category;