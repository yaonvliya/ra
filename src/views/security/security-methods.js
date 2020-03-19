/**
 *@author 李占盛
 *@name 安全概况
 */
import chartParam from './chartparams.js';
import esApi from '../../api/esApi.js'
import esJson from './esJson.js'


var securityMethods = {
    search(_this) {
        securityMethods.getAccBasic1(_this)
    },
    /*事故概况-事故总数、一般、简易、快撤*/
    getAccBasic1(_this) {
        esApi.searchESProxy({
            "index": "事故20",
            "type": "doc",
            "jsonCommand": esJson.sggk1('2020-02-01', '2020-02-29')
        }).then(res => {
            let result = res["data"]["aggregations"]["model"]["buckets"]
            debugger
        })
    },
    /*事故总数-伤亡人数*/
    getAccBasic2(_this) {
        esApi.searchESProxy({
            "index": "事故20",
            "type": "doc",
            "jsonCommand": esJson.sggk2('2020-02-01', '2020-02-29')
        }).then(res => {
            let result = res["data"]["aggregations"]["model"]["buckets"]
            debugger
        })
    },
    /*事故趋势、预警信息-折线图*/
    drawSecurityBottomLineChart(yData, _this) {
        // 基于准备好的dom，初始化echarts实例
        let myChart = _this.$echarts.init(document.getElementById("weekSpread"))
        // 绘制图表
        chartParam.securityBottomLineOption.xAxis.data = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
        chartParam.securityBottomLineOption.series[0].data = yData;
        myChart.setOption(chartParam.securityBottomLineOption);
    },
}

export default securityMethods
