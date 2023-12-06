
import { useRequest } from 'ahooks';
import React, { useEffect, useState } from 'react';
import {
    Table,
    Button,
    Avatar,
    Modal,
    Form,
    Input,
    Typography,
    Image,
} from "antd";
import axios from 'axios';
import images from '~/assets/images';

const { Title } = Typography;

const UserAddressTable = (record) => {
    const [listAddressUser, setListAddressUser] = useState([]);
    const noDataText = 'Khách hàng chưa thêm địa chỉ';

    const columns = [
        // {
        //     title: 'Tên khách hàng',
        //     dataIndex: 'first_name',
        //     filterSearch: true,
        //     onFilter: (value, record) => record.name.startsWith(value),
        //     render: (text, data) => {

        //         return (
        //             <>
        //                 <Avatar.Group>
        //                     <Avatar
        //                         className="shape-avatar"
        //                         shape="square"
        //                         size={40}
        //                         src={images.account}
        //                     ></Avatar>
        //                     <div className="avatar-info">
        //                         <Title style={{ marginLeft: '12px' }} level={5}>{`${data.first_name} ${data.last_name}`}</Title>
        //                     </div>
        //                 </Avatar.Group>{" "}
        //             </>
        //         )
        //     }
        // },
        {
            title: 'Họ và tên',
            dataIndex: 'full_name',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone_number',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
        },
        {
            title: 'Địa chỉ cụ thể',
            dataIndex: 'province',
        },
        // {
        //     title: 'Admin',
        //     dataIndex: 'is_admin',
        //     render: (text, data) => {
        //         const admin = data.is_admin ? 'admin' : 'user';
        //         return (
        //             <>
        //                 <Title style={{ marginLeft: '12px' }} level={5}>{admin}</Title>

        //             </>
        //         )
        //     }
        // },
        // {
        //     title: 'Hoạt động',
        //     dataIndex: 'address',
        //     render: (text, data) => {
        //         return (
        //             <>
        //                 <Button onClick={() => handleEdit(data)} style={{ backgoundColor: '#77d2a1' }}>Edit</Button>
        //                 <Button onClick={() => handleDelete(data)} style={{ marginLeft: '12px' }}>Delete</Button>
        //             </>

        //         )
        //     }
        // },
    ];
    useEffect(() => {
        axios.get(`/account/list_user_address_by_user/${record.record.id}/`)
            .then(function (res) {
                setListAddressUser(res.data);
                console.log(res.data);
            })
            .catch(function (error) {

            })
    }, [record]);

    return (
        <>
            <div style={{ padding: '6px', maxHeight: '300px', overflowY: 'scroll' }}>
                <div>
                    <Title level={3}>Danh sách địa chỉ của khách hàng:</Title>
                </div>
                <Table columns={columns} dataSource={listAddressUser} pagination={{ position: ['topRight'] }} locale={{
                    emptyText: noDataText,
                }} />
            </div>
        </>
    );
};

export default UserAddressTable;

// function CategoryManager() {
//     return (<>hi</>);
// }

// export default CategoryManager;