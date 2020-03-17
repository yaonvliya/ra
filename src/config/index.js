// 一些全局的config配置
const modeUrlObj = {
  // 生产环境-build
  'production': {
    baseURL: 'production',
    mapServiceUrl:"http://50.73.141.76:8080",
    layerType:"sz_loc",
    authBaseURL: ''
  },
  // 开发环境-dev
  'development': {
    baseURL: 'development',
    mapServiceUrl:"http://192.168.5.56:8080",
    layerType:"sz_online",
    authBaseURL: ''
  },
  // 测试环境-test
  'test': {
    baseURL: 'test',
    mapServiceUrl:"",
    authBaseURL: ''
  }
}
export default modeUrlObj[process.env.NODE_ENV]
