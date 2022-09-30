import Mock from 'mockjs'
// 登录信息
const userInfo = Mock.mock('http://www.test.com/user',{
    "code": 200,
    "data": {
        "id": 1,
        "tokenName": "小哪吒",
        "readwrite": [],
        "token": '121nwefwefunasndiWRURWQWE  QWE QWEQE UHDASDASDQEQWEQ',
        "group_name": '管理员',
        "left_nav":[]
    },
    "msg": "请求成功"
})