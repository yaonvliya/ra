/**
 * @author lzs
 * @name 安全态势api
 */
import api from '@/utils/request'

const esApi = {
    searchESProxy: (param) => (api.post("/ESProxy/search", param)),//es直接查询
};

export default esApi;