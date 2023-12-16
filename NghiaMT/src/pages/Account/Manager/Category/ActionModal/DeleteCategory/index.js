
import {
    Table,
    Avatar,
    Modal,
    Form,
    Input,
    Typography,
    Image,
    notification,
} from "antd";
import axios from "axios";

function DeleteCategory({ onOk, onCancel, title, open, data }) {
    console.log(data);

    const handleDeleteCategory = () => {
        axios.delete(`http://127.0.0.1:8000/category/delete/${data.id}/`)
            .then(function (response) {
                // Xử lý phản hồi từ server (nếu cần)
                console.log(response.data);
                notification.success({ message: 'Xóa loại sản phẩm', description: 'Xóa loại sản phẩm thành công' });
                onOk();
            })
            .catch(function (error) {
                // Xử lý lỗi (nếu có)
                console.error(error);
                notification.error({ message: 'Xóa loại sản phẩm', description: 'Xóa loại sản phẩm thất bại' });
            });
    };

    return (
        <>

            <Modal
                title={`${title} ${data?.category_name}`}
                open={open}
                onOk={handleDeleteCategory}
                onCancel={onCancel}
            >
                <p>{'Bạn có thực sự muốn xóa loại sản phẩm này không?'}</p>
            </Modal>
        </>
    );
}

export default DeleteCategory;