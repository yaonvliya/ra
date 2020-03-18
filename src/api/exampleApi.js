/**
 * @author hyy
 * @name 示例api
 */
import api from '@/utils/request'

const exampleApi={
    get:(id)=>(api.get(`/api/traffic/getfieldsbyoperation?operation=${id}`)),
    post:(obj)=>(api.post("/api/traffic/addcodeclass?codeclass=",obj)),//新增指标项分类
    delete:(id)=>(api.delete(`/api/traffic/deletecodeclassbyid?id=${id}`)),//根据id删除指标项分类
    update:(obj={})=>(api.put(`/api/traffic/updatecodeclass?codeclass=`,obj)),
};

export default exampleApi;
