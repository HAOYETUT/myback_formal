import Layout from '@/layouts'
export const routerList = [
    {
        jump: '',
        title:'海关',
        icon: 'el-icon-document',
        list: [
            {
                jump: 'crm/crm-list/customerList',
                title: '公海客户',
            },
            {
                jump: 'source/video-list/index',
                title:'视频管理',
            }, 
        ]
    },
    {
        jump: '',
        title: '素材管理',
        icon: 'el-icon-document',
        list: [
            {
                jump: 'source/video-list/index',
                title:'视频管理',
            }, 
            {
                jump: 'source/song-list/index',
                title:'歌曲管理',
            }
        ]
    },
    // {
    //     path: '/money',
    //     jump: 'Money',
    //     name: 'Money',
    //     meta: {
    //       title: '会员',
    //       icon: 'el-icon-document',
    //     },
    //     list: [
    //       {
    //         path: '/money-list',
    //         name: 'MoneyList',
    //         jump: 'money/money-list/index',
    //         component: () => import('@/views/money/money-list/index'),
    //         meta: {
    //           title: '充值',
    //           icon: '',
    //           affix: true,
    //           noKeepAlive: true
    //         }
    //       },
    //     ]
    //   }
    //   {
    //     path: '/crm/crm-list/privateCustomerList',
    //     component: Layout,
    //     hidden: true,
    //     redirect: '/crm-list/privateCustomerList',
    //     children: [
    //       {
    //         path: '/crm/crm-list/privateCustomerList',
    //         name: 'privateCustomerList',
    //         component: () => import('@/views/crm/crm-list/customerList'),
    //         meta: {
    //           title: '私海客户'
    //         }
    //       }
    //     ]
    //   },
    //   {
    //     path: '/crm/forwarder-crm-list/forwarderPublicCustomerList',
    //     component: Layout,
    //     hidden: true,
    //     redirect: '/forwarder-crm-list/forwarderPublicCustomerList',
    //     children: [
    //       {
    //         path: '/crm/forwarder-crm-list/forwarderPublicCustomerList',
    //         name: 'forwarderPublicCustomerList',
    //         component: () => import('@/views/crm/forwarder-crm-list/forwarderCustomerList'),
    //         meta: {
    //           title: '管车公海客户',
    //           KeepAlive: true
    //         }
    //       }
    //     ]
    //   },
    //   {
    //     path: '/crm/forwarder-crm-list/forwarderPrivateCustomerList',
    //     component: Layout,
    //     hidden: true,
    //     redirect: '/forwarder-crm-list/forwarderPrivateCustomerList',
    //     children: [
    //       {
    //         path: '/crm/forwarder-crm-list/forwarderPrivateCustomerList',
    //         name: 'forwarderPrivateCustomerList',
    //         component: () => import('@/views/crm/forwarder-crm-list/forwarderCustomerList'),
    //         meta: {
    //           title: '管车私海客户'
    //         }
    //       }
    //     ]
    //   },
]