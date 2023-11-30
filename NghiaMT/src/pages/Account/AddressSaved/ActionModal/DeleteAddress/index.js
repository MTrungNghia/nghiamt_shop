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
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description,
        });
    };
    const handleDeleteAddress = () => {
        axios.delete(`http://127.0.0.1:8000/account/delete_user_address/${data.id}/`)
            .then(function (response) {
                // Xử lý phản hồi từ server (nếu cần)
                openNotificationWithIcon('success', 'Xóa địa chỉ', `Bạn đã xóa địa chỉ mới thành công.`);
                setTimeout(() => {
                    onOk();
                }, 2000);
            })
            .catch(function (error) {
                // Xử lý lỗi (nếu có)
                console.error(error);
                openNotificationWithIcon('error', 'Xóa địa chỉ', `Lỗi xóa địa chỉ hãy kiểm tra lại.`);

            });
    };

    return (
        <>
            {contextHolder}
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