import config from "~/config";

import Home from "~/pages/Home";
import Cart from "~/pages/Cart";
import Search from "~/pages/Search";
import Product from "~/pages/Detail/Product";
import Category from "~/pages/Detail/Category";
import Introduce from "~/pages/Introduce";
import Login from "~/pages/Account/Login";
import Register from "~/pages/Account/Register";
import ForgotPassword from "~/pages/Account/ForgotPassword";
import Profile from "~/pages/Account/Profile";
import AddressSaved from "~/pages/Account/AddressSaved";
import ChangePassword from "~/pages/Account/ChangePassword";
import Orders from "~/pages/Account/Orders";
import CheckOut from "~/pages/CheckOut";

import CategoryManager from "~/pages/Admin/pages/CategoryManager";
import ProductManager from "~/pages/Admin/pages/ProductManager";
import StatiscalReports from "~/pages/Admin/pages/StatiscalReports";
import CustomerManager from "~/pages/Admin/pages/CustomerManager";
import OrderManager from "~/pages/Admin/pages/OrderManager";
import SeacrhImage from "~/pages/Search/Image";

export const publicRoutes = [
    { path: config.routes.home, component: Home },

    { path: config.routes.cart, component: Cart },
    { path: config.routes.checkout, component: CheckOut, layout: null },

    { path: config.routes.search, component: Search },
    { path: config.routes.searchImage, component: SeacrhImage },

    { path: config.routes.proDetail, component: Product },


    { path: config.routes.cateDetail, component: Category },
    { path: config.routes.introduce, component: Introduce },

    { path: config.routes.profile, component: Profile },
    { path: config.routes.addressSaved, component: AddressSaved },
    { path: config.routes.changePassword, component: ChangePassword },
    { path: config.routes.orders, component: Orders },

    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },
    { path: config.routes.forgotPassword, component: ForgotPassword, layout: null },

];

export const privateRoutes = [
    { path: config.routes.categoryManager, component: CategoryManager },
    { path: config.routes.productManager, component: ProductManager },
    { path: config.routes.customerManager, component: CustomerManager },
    { path: config.routes.orderManager, component: OrderManager },
    { path: config.routes.statiscalReports, component: StatiscalReports },

];
