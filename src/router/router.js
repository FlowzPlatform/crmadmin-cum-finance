import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login'
    },
    component: resolve => {
        require(['@/views/login.vue'], resolve);
    }
};

export const resetPasswordRouter = {
    path: '/reset-password',
    name: 'resetpassword',
    meta: {
        title: 'ResetPassword'
    },
    component: resolve => {
        require(['@/views/reset-password.vue'], resolve);
    }
};

export const purchaseOrderReceived = {
    path: '/purchase-order-received',
    name: 'purchaseorderreceived',
    meta: {
        title: 'purchaseorderreceived'
    },
    component: resolve => {
        require(['@/views/purchase-order-received.vue'], resolve);
    }
};

export const varifyEmailRouter = {
    path: '/varifyEmail',
    name: 'varifyEmail',
    meta: {
        title: 'varifyEmail'
    },
    component: resolve => {
        require(['@/views/varifyEmail/varifyEmail.vue'], resolve);
    }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-Not Found'
    },
    component: resolve => {
        require(['@/views/error-page/404.vue'], resolve);
    }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-forbidden'
    },
    name: 'error-403 Unauthorized request',
    component: resolve => {
        require(['@//views/error-page/403.vue'], resolve);
    }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-general Error'
    },
    name: 'error-500',
    component: resolve => {
        require(['@/views/error-page/500.vue'], resolve);
    }
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: resolve => {
        require(['@/views/form/article-publish/preview.vue'], resolve);
    }
};

// export const locking = {
//     path: '/locking',
//     name: 'locking',
//     component: resolve => { require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve); }
// };

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [{
        path: 'home',
        title: 'Dashboard',
        name: 'Dashboard',
        component: resolve => {
            require(['@/views/home/home.vue'], resolve);
        }
    },
    {
        path: 'ownspace',
        title: 'Own Space',
        name: 'ownspace_index',
        component: resolve => {
            require(['@/views/own-space/own-space.vue'], resolve);
        }
    },
    // { path: 'order/:order_id', title: 'order', name: 'order-info', component: resolve => { require(['@/views/advanced-router/component/order-info.vue'], resolve); } }, // 用于展示动态路由
    {
        path: 'shopping',
        title: 'Shopping',
        name: 'shopping',
        component: resolve => {
            require(['@/views/advanced-router/component/shopping-info.vue'], resolve);
        }
    }, // 用于展示带参路由
    {
        path: 'message',
        title: 'message',
        name: 'message_index',
        component: resolve => {
            require(['@/views/message/message.vue'], resolve);
        }
    },
    {
        path: 'settings',
        title: 'Settings',
        name: 'Settings',
        component: resolve => {
            require(['@/views/settings/settings.vue'], resolve);
        }
    },
    {
        path: 'edit-settingdata',
        title: 'Edit Settingdata',
        name: 'Edit Settingdata',
        props: true,
        component: resolve => {
            require(['@/views/settings/edit-settingdata.vue'], resolve);
        }
    },
    {
        path: 'new-settings',
        title: 'Account Settings',
        name: 'Account Settings',
        component: resolve => {
            require(['@/views/settings/new-settings.vue'], resolve);
        }
    },
    {
        path: 'General-settings',
        title: 'Profile Settings',
        name: 'Profile Settings',
        component: resolve => {
            require(['@/views/settings/General-setting.vue'], resolve);
        }
    },
    {
        path: 'Payment-settings',
        title: 'Payment Settings',
        name: 'Payment Settings',
        component: resolve => {
            require(['@/views/settings/Online-Payment.vue'], resolve);
        }
    },
    // {
    //     path: 'PurchaseOrder-settings',
    //     title: 'PurchaseOrder',
    //     name: 'PurchaseOrder',
    //     component: resolve => {
    //         require(['@/views/settings/poSettings.vue'], resolve);
    //     }
    // },
    {
        path: 'new-poSettings',
        title: 'PurchaseOrder Settings',
        name: 'PurchaseOrder Settings',
        component: resolve => {
            require(['@/views/settings/new-poSettings.vue'], resolve);
        }
    },
    {
        path: 'generatePO',
        title: 'Generate PurchaseOrder',
        name: 'Generate PurchaseOrder',
        component: resolve => {
            require(['@/views/purchaseOrder/generate-purchaseOrder.vue'], resolve);
        }
    },
    {
        path: 'checkout/:id',
        title: 'Checkout',
        name: 'Checkout',
        component: resolve => {
            require(['@/views/invoice/checkout.vue'], resolve);
        }
    },
    {
        path: 'edit-crm/:id',
        title: 'edit-crm',
        icon: 'ios-edit-outline',
        name: 'Edit-relationship',
        component: resolve => {
            require(['@/views/crm/edit-crm.vue'], resolve);
        }
    },
    {
        path: 'change-password',
        title: 'Change Password',
        icon: 'locked',
        name: 'Change Password',
        component: resolve => {
            require(['@/views/admin-account/change-password.vue'], resolve);
        }
    },
    {
        path: 'po-checkout',
        title: 'POCheckout',
        name: 'POCheckout',
        component: resolve => {
            require(['@/views/purchaseOrder/checkout.vue'], resolve);
        }
    },
        // { path: 'address-book/:id',title: 'Edit Address Book', name: 'Edit Addressbook',component: resolve => { require(['@/views/my-account/edit-address-book.vue'], resolve)}}
    ]
};

// Main
export const appRouter = [
    // {
    //     path: '/access',
    //     icon: 'key',
    //     name: 'access',
    //     title: '权限管理',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '权限管理', name: 'access_index', component: resolve => { require(['@/views/access/access.vue'], resolve); } }
    //     ]
    // },
    // {
    //     path: '/access-test',
    //     icon: 'lock-combination',
    //     title: '权限测试页',
    //     name: 'accesstest',
    //     access: 0,
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '权限测试页', name: 'accesstest_index', access: 0, component: resolve => { require(['@/views/access/access-test.vue'], resolve); } }
    //     ]
    // },
    {
        path: '/customer',
        icon: 'person',
        title: 'CUSTOMER',
        name: 'CUSTOMER',
        component: Main,
        children: [{
            path: 'new-customer',
            title: 'New',
            icon: 'ios-plus-outline',
            name: 'New Customer',
            component: resolve => {
                require(['@/views/customer/new-customer.vue'], resolve);
            }
        },
        {
            path: 'list-customer',
            title: 'List',
            icon: 'ios-list-outline',
            name: 'Customer List',
            component: resolve => {
                require(['@/views/customer/list-customer.vue'], resolve);
            }
        }
        ]
    },
    {
        path: '/relationship',
        icon: 'ios-people',
        title: 'RELATIONSHIP',
        name: 'RELATIONSHIP',
        component: Main,
        children: [{
            path: 'new-relationship',
            title: 'New',
            icon: 'ios-plus-outline',
            name: 'New Relationship',
            component: resolve => {
                require(['@/views/crm/new-crm.vue'], resolve);
            }
        },
        {
            path: 'list-relationship',
            title: 'List',
            icon: 'ios-list-outline',
            name: 'Relationship List',
            component: resolve => {
                require(['@/views/crm/list-crm.vue'], resolve);
            }
        }
        ]
    },
    {
        path: '/invoice',
        icon: 'document-text',
        title: 'INVOICE',
        name: 'INVOICE',
        component: Main,
        children: [{
            path: 'new-invoice',
            title: 'New',
            icon: 'ios-plus-outline',
            name: 'New Invoice',
            component: resolve => {
                require(['@/views/invoice/new-invoice.vue'], resolve);
            }
        },
        {
            path: 'list-invoice',
            title: 'List',
            icon: 'ios-list-outline',
            name: 'Invoice List',
            component: resolve => {
                require(['@/views/invoice/list-invoice.vue'], resolve);
            }
        }
        ]
    },
    {
        path: '/transaction',
        icon: 'cash',
        title: 'TRANSACTION LIST',
        name: 'TRANSACTION LIST',
        component: Main,
        children: [{
            path: 'list-transaction',
            title: 'List',
            icon: 'ios-list-outline',
            name: 'Transaction List',
            component: resolve => {
                require(['@/views/transaction/list-transaction.vue'], resolve);
            }
        }]
    },
    {
        path: '/order',
        icon: 'ios-cart',
        title: 'ORDER LIST',
        name: 'ORDER LIST',
        component: Main,
        children: [{
            path: 'order-list',
            title: 'Ordered List',
            icon: 'ios-cart',
            name: 'Ordered List',
            component: resolve => {
                require(['@/views/admin-account/order-list.vue'], resolve);
            }
        }]
    },
    {
        path: '/request-quote',
        icon: 'pull-request',
        title: 'REQUEST QUOTES',
        name: 'REQUESTED QUOTES',
        component: Main,
        children: [{
            path: 'request-quote-list',
            title: 'Request Quote',
            icon: 'pull-request',
            name: 'Requested Quotes',
            component: resolve => {
                require(['@/views/admin-account/request-quote.vue'], resolve);
            }
        }]
    },
    {
        path: '/purchaseOrder',
        icon: 'ios-paper',
        title: 'PURCHASE ORDER',
        name: 'PURCHASE ORDER',
        component: Main,
        children: [{
            path: '/purchaseOrder-list-Raised',
            title: 'Raised PO',
            icon: 'ios-compose',
            name: 'Raised PO',
            component: resolve => {
                require(['@/views/purchaseOrder/purchaseOrder-list-Raised.vue'], resolve);
            }
        },
        {
            path: '/po_invoice',
            title: 'PO Invoice',
            name: 'PO Invoice',
            icon: 'ios-paper-outline',
            name: 'PO Invoice',
            component: resolve => {
                require(['@/views/purchaseOrder/po_invoice.vue'], resolve);
            }
        },
        {
            path: 'newpo',
            title: 'New PO',
            icon: 'compose',
            name: 'New PO',
            component: resolve => {
                require(['@/views/purchaseOrder/new_po.vue'], resolve);
            }
        }]
    },
    // {
    //     path: '/admin-account',
    //     icon: 'person',
    //     title: 'ADMIN ACCOUNT',
    //     name: 'adminaccount',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'order-list',
    //             title: 'Order List',
    //             icon: 'ios-cart',
    //             name: 'Ordered List',
    //             component: resolve => { require(['@/views/admin-account/order-list.vue'], resolve); }
    //         },
    //         {
    //             path: 'request-quote',
    //             title: 'Request Quote',
    //             icon: 'pull-request',
    //             name: 'Requested Quotes',
    //             component: resolve => { require(['@/views/admin-account/request-quote.vue'], resolve); }
    //         },
    //         // {
    //         //     path: 'address-book',
    //         //     title: 'Address Book',
    //         //     icon: 'ios-compose',
    //         //     name: 'Address book',
    //         //     component: resolve => { require(['@/views/admin-account/address-book.vue'], resolve);}
    //         // },
    //        // {
    //          //   path: 'list-billing',
    //            // title: 'List of Bills',
    //            // icon: 'ios-list-outline',
    //           //  name: 'Billing List',
    //            // component: resolve => { require(['@/views/my-account/list-billing.vue'], resolve);}
    //        // },
    //         {
    //             path: 'set-swatches',
    //             title: 'Set Swatches',
    //             icon: 'android-color-palette',
    //             name: 'Set Swatches',
    //             component: resolve => { require(['@/views/admin-account/set-swatches.vue'], resolve);}
    //         },
    //         {
    //             path: 'change-password',
    //             title: 'Change Password',
    //             icon: 'locked',
    //             name: 'Change Password',
    //             component: resolve => { require(['@/views/admin-account/change-password.vue'], resolve);}
    //         }
    //     ]
    // },
    {
        path: '/invite',
        icon: 'cash',
        title: 'INVITE',
        name: 'INVITE',
        component: Main,
        children: [{
            path: 'invite',
            title: 'Invite',
            icon: 'ios-list-outline',
            name: 'Invite',
            component: resolve => {
                require(['@/views/invite/invite.vue'], resolve);
            }
        }]
    }
    // {
    //     path: '/invite',
    //     icon: 'cash',
    //     title: 'INVITE',
    //     name: 'INVITE',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'list-transaction',
    //             title: 'List',
    //             icon: 'ios-list-outline',
    //             name: 'Transaction List',
    //             component: resolve => { require(['@/views/transaction/list-transaction.vue'], resolve);}
    //         }
    //     ]
    // },
    // {
    //     path: '/crm',
    //     icon: 'person-stalker',
    //     title: 'CRM',
    //     name: 'CRM',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'new-crm',
    //             title: 'new-crm',
    //             icon: 'ios-plus-outline',
    //             name: 'newcrm',
    //             component: resolve => { require(['@/views/crm/new-crm.vue'], resolve);}
    //         },
    //         {
    //             path: 'list-crm',
    //             title: 'list-crm',
    //             icon: 'ios-list-outline',
    //             name: 'listcrm',
    //             component: resolve => { require(['@/views/crm/list-crm.vue'], resolve);}
    //         }
    //     ]
    // },
    // {
    //     path: '/international',
    //     icon: 'earth',
    //     title: {i18n: 'international'},
    //     name: 'international',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: {i18n: 'international'}, name: 'international_index', component: resolve => { require(['@/views/international/international.vue'], resolve); } }
    //     ]
    // }
    // {
    //     path: '/component',
    //     icon: 'social-buffer',
    //     name: 'component',
    //     title: '组件',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'text-editor',
    //             icon: 'compose',
    //             name: 'text-editor',
    //             title: '富文本编辑器',
    //             component: resolve => { require(['@/views/my-components/text-editor/text-editor.vue'], resolve); }
    //         },
    //         {
    //             path: 'md-editor',
    //             icon: 'pound',
    //             name: 'md-editor',
    //             title: 'Markdown编辑器',
    //             component: resolve => { require(['@/views/my-components/markdown-editor/markdown-editor.vue'], resolve); }
    //         },
    //         {
    //             path: 'image-editor',
    //             icon: 'crop',
    //             name: 'image-editor',
    //             title: '图片预览编辑',
    //             component: resolve => { require(['@/views/my-components/image-editor/image-editor.vue'], resolve); }
    //         },
    //         {
    //             path: 'draggable-list',
    //             icon: 'arrow-move',
    //             name: 'draggable-list',
    //             title: '可拖拽列表',
    //             component: resolve => { require(['@/views/my-components/draggable-list/draggable-list.vue'], resolve); }
    //         },
    //         {
    //             path: 'area-linkage',
    //             icon: 'ios-more',
    //             name: 'area-linkage',
    //             title: '城市级联',
    //             component: resolve => { require(['@/views/my-components/area-linkage/area-linkage.vue'], resolve); }
    //         },
    //         {
    //             path: 'file-upload',
    //             icon: 'android-upload',
    //             name: 'file-upload',
    //             title: '文件上传',
    //             component: resolve => { require(['@/views/my-components/file-upload/file-upload.vue'], resolve); }
    //         },
    //         {
    //             path: 'count-to',
    //             icon: 'arrow-graph-up-right',
    //             name: 'count-to',
    //             title: '数字渐变',
    //             component: resolve => { require(['@/views/my-components/count-to/count-to.vue'], resolve); }
    //         }
    //         // {
    //         //     path: 'clipboard-page',
    //         //     icon: 'clipboard',
    //         //     name: 'clipboard-page',
    //         //     title: '一键复制',
    //         //     component: resolve => { require(['@/views/my-components/clipboard/clipboard.vue'], resolve); }
    //         // }
    //     ]
    // },
    // {
    //     path: '/form',
    //     icon: 'android-checkbox',
    //     name: 'form',
    //     title: '表单编辑',
    //     component: Main,
    //     children: [
    //         { path: 'artical-publish', title: '文章发布', name: 'artical-publish', icon: 'compose', component: resolve => { require(['@/views/form/article-publish/article-publish.vue'], resolve); } },
    //         { path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component: resolve => { require(['@/views/form/work-flow/work-flow.vue'], resolve); } }

    //     ]
    // },
    // {
    //     path: '/charts',
    //     icon: 'ios-analytics',
    //     name: 'charts',
    //     title: '图表',
    //     component: Main,
    //     children: [
    //         { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: resolve => { require('@/views/access/access.vue') },
    //         { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: resolve => { require('@/views/access/access.vue') }

    //     ]
    // },
    // {
    //     path: '/tables',
    //     icon: 'ios-grid-view',
    //     name: 'tables',
    //     title: '表格',
    //     component: Main,
    //     children: [
    //         { path: 'dragableTable', title: '可拖拽排序', name: 'dragable-table', icon: 'arrow-move', component: resolve => { require(['@/views/tables/dragable-table.vue'], resolve); } },
    //         { path: 'editableTable', title: '可编辑表格', name: 'editable-table', icon: 'edit', component: resolve => { require(['@/views/tables/editable-table.vue'], resolve); } },
    //         { path: 'searchableTable', title: '可搜索表格', name: 'searchable-table', icon: 'search', component: resolve => { require(['@/views/tables/searchable-table.vue'], resolve); } },
    //         { path: 'exportableTable', title: '表格导出数据', name: 'exportable-table', icon: 'code-download', component: resolve => { require(['@/views/tables/exportable-table.vue'], resolve); } },
    //         { path: 'table2image', title: '表格转图片', name: 'table-to-image', icon: 'images', component: resolve => { require(['@/views/tables/table-to-image.vue'], resolve); } }
    //     ]
    // },
    // {
    //     path: '/advanced-router',
    //     icon: 'ios-infinite',
    //     name: 'advanced-router',
    //     title: '高级路由',
    //     component: Main,
    //     children: [
    //         { path: 'mutative-router', title: '动态路由', name: 'mutative-router', icon: 'link', component: resolve => { require(['@/views/advanced-router/mutative-router.vue'], resolve); } },
    //         { path: 'argument-page', title: '带参页面', name: 'argument-page', icon: 'android-send', component: resolve => { require(['@/views/advanced-router/argument-page.vue'], resolve); } }
    //     ]
    // },
    // {
    //     path: '/error-page',
    //     icon: 'android-sad',
    //     title: '错误页面',
    //     name: 'errorpage',
    //     component: Main,
    //     children: [
    //         { path: 'index', title: '错误页面', name: 'errorpage_index', component: resolve => { require(['@/views/error-page/error-page.vue'], resolve); } }
    //     ]
    // }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    varifyEmailRouter,
    resetPasswordRouter,
    purchaseOrderReceived,
    otherRouter,
    preview,
    // locking,
    ...appRouter,
    page500,
    page403,
    page404
];
