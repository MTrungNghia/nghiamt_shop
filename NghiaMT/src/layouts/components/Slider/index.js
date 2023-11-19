import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Slider.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleDot } from "@fortawesome/free-solid-svg-icons";
import images from "~/assets/images";
const cx = classNames.bind(styles)

function Slider() {
    const listImageBanner = [
        {
            image: images.slide,
        },
        {
            image: images.slide1,
        },
        {
            image: images.bannerDragonBall,
        }
    ];

    const [numberImageBanner, setNumberImageBanner] = useState(0);
    const [imageBanner, setImageBanner] = useState(listImageBanner[numberImageBanner].image);

    useEffect(() => {
        setImageBanner(listImageBanner[numberImageBanner].image);
    }, [numberImageBanner]);

    useEffect(() => {
        const interval = setInterval(() => {
            setNumberImageBanner((prevNumber) => (prevNumber + 1) % listImageBanner.length);
        }, 120000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <img src={imageBanner} alt="Slide" />
                <div className={cx('btn-change-image')}>
                    {listImageBanner.map((item, index) => {
                        return (
                            <FontAwesomeIcon key={index} onClick={() => setNumberImageBanner(index)} className={cx('btn-change-image-item')} icon={(numberImageBanner === index) ? faCircle : faCircleDot} color="#ccc" />
                        )
                    })}
                </div>

            </div>
        </div>
    );
}

export default Slider;
// import { SorterResult } from 'antd/lib/table/interface';

// const handleChange = (sorter: SorterResult<any> | SorterResult<any>[], extra: any) => {
//   const params: { order?: { field: string; dir: 'ascend' | 'descend' } } = {};

//   if (Array.isArray(sorter)) {
//     // Trường hợp có nhiều cột sắp xếp
//     const sortParams = sorter.map((item) => ({
//       field: item.field!,
//       dir: item.order === 'ascend' ? 'ascend' : 'descend',
//     }));
//     params.order = sortParams;
//   } else if (sorter && sorter.hasOwnProperty('column')) {
//     // Trường hợp chỉ có một cột sắp xếp
//     params.order = {
//       field: sorter.field!,
//       dir: sorter.order === 'ascend' ? 'ascend' : 'descend',
//     };
//   }

//   // Gọi API với params
//   fetchData(params);
// };

// const fetchData = async (params: any) => {
//   // Sử dụng params để gọi API
//   // ...
// };

// // Sử dụng hàm handleChange trong component Table
// <Table
//   columns={columns}
//   dataSource={data}
//   onChange={handleChange}
// />