import { Table } from "antd";
import classNames from "classnames/bind";
import styles from "./TableCustomer.module.scss";
const cx = classNames.bind(styles);
function TableCustom({ ...props }) {
    return (
        <Table className={cx('custome-table')}{...props} />
    );
}

export default TableCustom;