import {
    Table,
    Avatar,
    Modal,
    Form,
    notification,
    Typography,
    Image,
} from "antd";
import axios from "axios";

function DeleteAddress({ onOk, onCancel, title, open, data }) {
    const handleDeleteAddress = () => {
        axios.delete(`http://127.0.0.1:8000/account/delete_user_address/${data.id}/`)
            .then(function (response) {
                // Xử lý phản hồi từ server (nếu cần)
                notification.success({ message: 'Xóa địa chỉ', description: 'Xóa địa chỉ thành công' });
                setTimeout(() => {
                    onOk();
                }, 2000);
            })
            .catch(function (error) {
                // Xử lý lỗi (nếu có)
                console.error(error);
                notification.success({ message: 'Xóa địa chỉ', description: 'Lỗi xóa địa chỉ hãy kiểm tra lại.' });

            });
    };

    return (
        <>
            <Modal
                title={`${title} ${data?.full_name}`}
                open={open}
                onOk={handleDeleteAddress}
                onCancel={onCancel}
            >
                <p>{'Bạn có thực sự muốn xóa địa chỉ này không?'}</p>
            </Modal>
        </>
    );
}

export default DeleteAddress;