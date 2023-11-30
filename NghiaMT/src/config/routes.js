const routes = {
    home: '/',
    search: '/search/:searchName',
    searchImage: '/search_image',
    cart: '/cart',
    checkout: 'checkout',

    proDetail: '/:productName',

    cateDetail: 'category/:categoryName',
    introduce: '/introduce',
    promotion: '/promotion',
    new: '/news',
    contact: '/contacts',

    login: '/login',
    register: '/register',
    forgotPassword: '/forgot',
    profile: '/account/profile',
    addressSaved: '/account/addresses',
    changePassword: '/account/change_password',
    orders: '/account/orders',

    admin: '/admin/dashboard',
    categoryManager: '/admin/category',
    productManager: '/admin/product',
    customerManager: '/admin/customer',
    orderManager: '/admin/order',
    statiscalReports: '/admin/statistical_reports',
}

export default routes;