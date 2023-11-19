import React, { useEffect, useState } from 'react';
import { Button, Divider, Modal, Table } from 'antd';
import TableCustom from '~/components/Antd/Table';
import CustomButton from '~/components/Antd/Button';
function RateProduct({ onCancel, data, onOk, open, title }) {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (data !== null) {
            setLoading(false);
        }
    }, [data]);
    const columns = [
        {
            title: 'Tên thuộc tính',
            dataIndex: 'name_attribute',
            filterSearch: true,
            // onFilter: (value, record) => record.name.startsWith(value),
            // render: (text, data) => {

            //     return (
            //         <>
            //             <Avatar.Group>
            //                 <Avatar
            //                     className="shape-avatar"
            //                     shape="square"
            //                     size={40}
            //                     src={images.account}
            //                 ></Avatar>
            //                 <div className="avatar-info">
            //                     <Title style={{ marginLeft: '12px' }} level={5}>{text}</Title>
            //                 </div>
            //             </Avatar.Group>{" "}
            //         </>
            //     )
            // }
        },
        {
            title: 'Số lượt đánh giá tốt',
            dataIndex: 'positive_count',
        },
        {
            title: 'Tất cả lượt đánh giá',
            dataIndex: 'total_count',
        },
        {
            title: 'Tỉ lệ đánh giá tốt',
            dataIndex: 'result_percentage',
            render: (text) => (
                <span>{text} %</span>
            )
        },
    ];

    const locale = {
        // emptyText: 'Không có dữ liệu',
        loading: 'Đang lấy dữ liệu training...',
    };

    return (

        <>
            <Modal
                open={open}
                title={<span>{title}: {data?.name}</span>}
                onOk={onOk}
                onCancel={onCancel}
                width={'70%'}
                footer={[
                    <CustomButton key="back" onClick={onCancel}>
                        Trở lại
                    </CustomButton>
                ]}
            >
                <>
                    <Divider />
                    {data?.comment_count > 0 ? (
                        <div style={{ minHeight: '400px' }}>
                            <span>Số lượt đánh giá: {data?.comment_count}</span>
                            <TableCustom
                                columns={columns}
                                dataSource={data?.attributes}
                                pagination={false}
                                loading={loading}
                                locale={locale}
                                className={{ margin: '10px 0' }}
                            />
                            <span>Tỉ lệ đánh giá tích cực của cả sản phẩm: {data?.positive_percentage} %</span>
                        </div>
                    ) : (
                        <span>Chưa có đánh giá nào cho sản phẩm này!</span>
                    )}
                </>
            </Modal>
        </>
    );
}

export default RateProduct;