import { Button } from "antd";
import classNames from "classnames/bind";
import styles from "./ButtonCustomer.module.scss";

const cx = classNames.bind(styles);
function CustomButton({ ...props }) {

    return (
        <Button className={cx('custome-btn')} {...props}>
            {props.children}
        </Button>
    );
}

export default CustomButton;