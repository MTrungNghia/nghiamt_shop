import React, { useEffect, useState } from 'react';
import classNames from "classnames/bind";
import styles from "./Comments.module.scss";
import Button from "~/components/Button";
import { Avatar, List, Radio, Input, Space, Rate } from 'antd';
import images from '~/assets/images';
import axios from 'axios';

const cx = classNames.bind(styles);
const { TextArea } = Input;

const paginationpPosition = {
    position: 'top',
    align: 'end',
}

function Comments({ user_id, name, is_comment, slug }) {
    console.log(is_comment);
    const [enableComment, setEnableComment] = useState(false);
    const [reload, setReload] = useState(false);
    const [hiddenAddComment, setHiddenAddComment] = useState(true);
    const [products, setProducts] = useState([]);
    const [data, setData] = useState({});

    useEffect(() => {
        if (slug) {
            axios.get(`http://localhost:8000/product/comments/${slug}/`)
                .then((res) => {
                    setData(res.data);
                    setProducts(res.data.product_list);
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [reload, slug]);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);

    const handleRateChange = (value) => {
        setRating(value);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleAddComment = () => {
        axios.post(`http://localhost:8000/product/create-comment/`, {
            product: data.product,
            user: user_id,
            rate: rating,
            comment: comment,
            product_name: data.product_name,
        })
            .then((res) => {
                setData(res.data);
                setReload(!reload);
                setHiddenAddComment(false);
            })
            .catch((error) => {
                console.log(error)
            })
    };
    const handldeEnableComment = () => {
        console.log(enableComment);
        setEnableComment(true);
    }
    return (
        <>
            {(hiddenAddComment && is_comment === 1) && (
                <>
                    {!enableComment ? (
                        <Button effect primary onClick={handldeEnableComment}>Thêm đánh giá của bạn</Button>
                    ) : (
                        <div>
                            <Avatar src={images.account} />
                            <span className={cx('username')}>{name}</span>
                            <Rate value={rating} onChange={handleRateChange} />
                            <TextArea rows={4} value={comment} onChange={handleCommentChange} />
                            <Button effect primary onClick={handleAddComment}>Thêm đánh giá</Button>
                        </div>
                    )}
                </>
            )
            }
            {products.length !== 0 ? (
                <>
                    <List
                        itemLayout="horizontal"
                        pagination={paginationpPosition}
                        dataSource={products}
                        renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={
                                        <>
                                            <Avatar src={images.account} />
                                        </>
                                    }
                                    title={
                                        <>
                                            <span className={cx('username')}>{item.name}</span>
                                            <Rate allowHalf disabled value={item.rate} />
                                        </>
                                    }
                                    description={item.comment}
                                />
                            </List.Item>
                        )}
                    />
                </>
            ) : (
                <div style={{ margin: '10px 0px' }}>
                    <span> Chưa có đánh giá nào !</span>
                </div>
            )}
        </>
    );
}

export default Comments;