// 一些全局的config配置
const modeUrlObj = {
  // 生产环境-build
  'production': {
    baseURL: 'production',
    mapServiceUrl:"http://50.73.141.76:8080",
    layerType:"sz_loc",
    company_index:"公司事故违法",
    vehicle_index:"车辆事故违法4",
    human_index:"人员事故违法4"
  },
  // 开发环境-dev
  'development': {
    baseURL: 'http://192.168.5.57:8001',
    mapServiceUrl:"http://192.168.5.56:8080",
    layerType:"sz_online",
    company_index:"公司事故违法",
    vehicle_index:"车辆事故违法4",
    human_index:"人员事故违法4"
  },
  // 测试环境-test
  'test': {
    baseURL: 'test',
    mapServiceUrl:"",
    authBaseURL: ''
  }
}
export default modeUrlObj[process.env.NODE_ENV]
