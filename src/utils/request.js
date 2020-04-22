import axios from 'axios'
import config from '../config/index' // 路径配置

// 创建axios 实例
const service = axios.create({
    baseURL: config.baseURL, // api的base_url
    timeout: 10000 // 请求超时时间
})

let ajaxMethod = ['get', 'post', 'delete', 'put'];
let api = {};

ajaxMethod.forEach(method => {
    //数组取值的两种方式
    api[method] = function(uri, data, type) {
        return new Promise(function(resolve, reject) {
            service[method](uri, data)
                .then(response => {
                    if (response.data.code == 0||response.data.status == 200) {
                        resolve(response.data);
                    } else {
                        reject(response.data);
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    };
});

api.getWithHeaders = function(url, token) {
    return axios
        .get(url, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(res => {
            return res;
        })
        .catch(e => {
            return 'error';
        });
};

export default api
