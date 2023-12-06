import { Tabs } from 'antd';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import StatiscalByProduct from './StatiscalByProduct';
import StatiscalByRevenue from './StatiscalByRevenue';
import RightNavbar from '../../components/RightNavbar';

function StatiscalReports() {
    const tabStaticsCalReports = [
        {
            icon: AndroidOutlined,
            title: 'Thống kê theo sản phẩm',
            component: <StatiscalByProduct />,
        },
        {
            icon: AppleOutlined,
            title: 'Thống kê theo doanh thu',
            component: <StatiscalByRevenue />,
        }
    ];

    return (
        <RightNavbar>
            <div style={{ margin: '8px' }}>
                <Tabs defaultActiveKey="1">
                    {tabStaticsCalReports.map((item, i) => {
                        const id = String(i + 1);

                        return (
                            <Tabs.TabPane
                                tab={
                                    <span>
                                        <item.icon />
                                        {item.title}
                                    </span>
                                }
                                key={id}
                            >
                                {item.component}
                            </Tabs.TabPane>
                        );
                    })}
                </Tabs>
            </div>
        </RightNavbar>
    );
}

export default StatiscalReports;