// 一些全局的config配置
const modeUrlObj = {
  // 生产环境-build
  'production': {
    baseURL: 'production',
    mapServiceUrl:"",
    authBaseURL: ''
  },
  // 开发环境-dev
  'development': {
    baseURL: 'development',
    mapServiceUrl:"",
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
