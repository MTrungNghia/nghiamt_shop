import {
    Table,
    Avatar,
    Modal,
    Form,
    Input,
    Typography,
    Image,
} from "antd";
import axios from "axios";

function DeleteProduct({ okOk, onCancel, title, open, data }) {
    console.log(data);

    const handleDeleteProduct = () => {
        axios.delete(`http://127.0.0.1:8000/product/delete/${data}/`)
            .then(function (response) {
                // Xử lý phản hồi từ server (nếu cần)
                console.log(response.data);
                onCancel();
                alert("Xoas thanhf coong");
            })
            .catch(function (error) {
                // Xử lý lỗi (nếu có)
                console.error(error);
                alert("Loi");

            });
    };

    return (
        <>
            <Modal
                title={`${title} ${data?.category_name}`}
                open={open}
                onOk={handleDeleteProduct}
                onCancel={onCancel}
            >
                <p>{'Bạn có thực sự muốn xóa sản phẩm này không?'}</p>
            </Modal>
        </>
    );
}

export default DeleteProduct;