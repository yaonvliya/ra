import api from '@/utils/request'

const userApi = {
    getUserInfo: (id) => (api.get(`/userinfo`)),// 获取用户信息
    login: (obj) => (api.post("/login?data=", obj)),// 登录

    // login (data) {
    //   return request({
    //     url: '/login',
    //     method: 'post',
    //     data
    //   })
    // },
    // // 获取用户信息
    // getUserInfo () {
    //   return request({
    //     url: '/userinfo',
    //     method: 'get'
    //   })
    // }
}

export default userApi;
