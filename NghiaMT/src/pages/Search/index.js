import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { Link, useParams } from 'react-router-dom';
import routes from '~/config/routes';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from '~/components/ProductItem';

const cx = classNames.bind(styles);

function Search() {
    const { searchName } = useParams();
    const [listProduct, setListProduct] = useState([]);

    const [nextPager, setNextPager] = useState(1);
    const [currentPager, setCurrentPager] = useState(1);
    const [previosPager, setPreviosPager] = useState(1);
    const [numberPager, setnumberPager] = useState(1);
    const [selectedSortOption, setSelectedSortOption] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/product/search/${searchName}/?page=${currentPager}&sort_option=${selectedSortOption}`)
            .then((res) => {
                let data = res.data;
                setListProduct(data.results);
                setnumberPager(data.pages);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [currentPager, searchName, selectedSortOption])

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

    const handleSortOptionChange = (value) => {
        setSelectedSortOption(value);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('breadcrumb')}>
                    <Link to={routes.home}>Trang chủ&nbsp;</Link>
                    <span> / &nbsp; Tìm kiếm từ khóa: </span>
                    <span to={routes.home}>&nbsp;{searchName}&nbsp;</span>
                </div>
                <div className={cx('content')}>
                    <div className={cx('content-main')}>
                        <h5><span>Tìm kiếm từ khóa: </span>{searchName}</h5>
                        <div className={cx('product-sort')}>
                            <h6>Sắp xếp:</h6>
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
                                {listProduct && listProduct.map((product, index) => (
                                    <ProductItem key={index} colum4={true} product={product} />
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
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Search;