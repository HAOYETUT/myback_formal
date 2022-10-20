export const routerList = [
    {
        path: '/source',
        title: '素材管理',
        icon: 'el-icon-star-off',
        list: [
            {
                jump: 'source/video-list/index',
                icon: 'el-icon-video-camera',
                title:'视频管理',
            }, 
            {
                jump: 'source/song-list/index',
                icon: 'el-icon-headset',
                title:'歌曲列表',
            },
            {
                jump: 'source/image-list/index',
                icon: 'el-icon-picture-outline',
                title:'图库列表',
            },
            {
                jump: 'source/move-list/index',
                icon: 'el-icon-picture-outline',
                title:'电影列表',
            }
        ]
    },
    {
        path: '/admin',
        title:'权限管理',
        icon: '',
        list: [
            {
                jump: 'admin/admin-list',
                icon: 'el-icon-user',
                title:'管理员列表',
            },
            {
                jump: 'admin/role-list',
                icon: 'el-icon-user',
                title:'角色列表',
            },
            {
                jump: 'admin/admin-router',
                icon: 'el-icon-guide',
                title:'后台路由',
            },
            {
                jump: 'admin/ct1-router',
                icon: 'el-icon-guide',
                title:'CT1 路由',
            },
            {
                jump: 'admin/ct2-router',
                icon: 'el-icon-guide',
                title:'CT2 路由',
            },
            {
                jump: 'admin/ct3-router',
                icon: 'el-icon-guide',
                title:'CT3 路由',
            }
        ]
    },
    {
        path: '/ct',
        title: '用户管理',
        list: [
            {
            jump: 'ct/ct1-list',
            icon: 'el-icon-user',
            title:'CT1 用户列表',
            }, 
            {
                jump: 'ct/ct2-list',
                icon: 'el-icon-user',
                title: 'CT2 用户列表',
            }, 
            {
            jump: 'ct/ct3-list',
            icon: 'el-icon-user',
            title: 'CT3 用户列表',
            },
        ]
    },
    {
        path: '/setting',
        title: '设置',
        icon: '',
        list: [
            {
                jump: 'setting/setting',
                icon: 'el-icon-setting',
                title: '设置',
            }
        ]
    },

]