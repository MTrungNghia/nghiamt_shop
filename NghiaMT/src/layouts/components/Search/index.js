import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faFileImage } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Upload, Button, message, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const cx = classNames.bind(styles);

function Search() {
    const [textSearch, setTextSearch] = useState("");
    const navigate = useNavigate();

    function handleSubmitSearch() {
        if (textSearch !== "") {
            navigate(`/search/${textSearch}`);
            setTextSearch("");
        }
    }


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            // Click enter => search
            handleSubmitSearch();
        }
    };

    function handleImageChange(e) {
        const file = e?.target?.files[0];
        const formData = new FormData();
        formData.append('image', file);
        if (!file) {
            return; // Nếu không có tệp, thoát khỏi hàm
        }
        const fileURL = URL.createObjectURL(file);

        axios
            .post('http://127.0.0.1:5000/api/search', formData)
            .then(function (response) {
                // Handle response from API
                console.log(response.data);
                const state = { productsSearch: response.data, url: fileURL };
                navigate(`/search_image`, { state });
                setTextSearch("");
            })
            .catch(function (error) {
                // Handle error if any
                console.error(error);
            });
    }

    return (
        <div className={cx('search')}>
            <input
                value={textSearch}
                placeholder="Nhập từ khóa..."
                spellCheck={false}
                onKeyDown={handleKeyDown}
                onChange={(e) => { setTextSearch(e.target.value) }}
            />
            <button
                title="Tìm kiếm bằng hình ảnh"
                className="search-btn"
                onClick={() => document.querySelector('input[name="productImage"]').click()}
                onMouseDown={(e) => e.preventDefault()}
                style={{ width: '30px' }}
            >
                <FontAwesomeIcon icon={faFileImage} />
            </button>
            <Input
                className="search-btn"
                type="file"
                name="productImage"
                style={{ display: 'none' }}
                onChange={(e) => handleImageChange(e)}
            >
            </Input>
            <button type="submit" onClick={handleSubmitSearch} className={cx('search-btn')} onMouseDown={e => e.preventDefault()}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </div>
    );
}

export default Search;