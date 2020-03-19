/**
 *@author 李占盛
 *@name 安全概况
 */
import chartParam from './chartparams.js';
import esApi from '../../api/esApi.js'
import esJson from './esJson.js'


var securityMethods = {
    search(_this) {
        localStorage.setItem('v3_userNumber', '000000');
        localStorage.setItem('v3_organizationNumber', '320500');
        // securityMethods.getAccBasic1(_this)
        securityMethods.getAccTrend_hour(_this)
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
    /*事故趋势-月度*/
    getAccTrend_month(_this) {
        esApi.searchESProxy({
            "index": "事故20",
            "type": "doc",
            "jsonCommand": esJson.sgqs_month('2020-02-01', '2020-02-29')
        }).then(res => {
            let result = res["data"]["aggregations"]["model"]["buckets"]
            let xData = Array.from({length: 12}, (v, i) => i + 1)
            let yData = Array.from({length: 24}, (v, i) => 0)
            debugger
        })
    },
    /*事故趋势-小时*/
    getAccTrend_hour(_this) {
        esApi.searchESProxy({
            "index": "事故20",
            "type": "doc",
            "jsonCommand": esJson.sgqs('sj_h', '2020-02-01', '2020-02-29')
        }).then(res => {
            let result = res["data"]["aggregations"]["model"]["buckets"]
            let xData = Array.from({length: 24}, (v, i) => i)
            let yData = Array.from({length: 24}, (v, i) => 0)
            for (let i = 0; i < result.length; i++) {
                yData[result[i]["key"]] = result[i]["doc_count"]
            }
            securityMethods.drawSecurityBottomLineChart(xData, yData, _this)
            debugger
        })
    },
    /*事故趋势-星期*/
    getAccTrend_week(_this) {
        esApi.searchESProxy({
            "index": "事故20",
            "type": "doc",
            "jsonCommand": esJson.sgqs('xq', '2020-02-01', '2020-02-29')
        }).then(res => {
            let result = res["data"]["aggregations"]["model"]["buckets"]
            let xData = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]

            debugger
        })
    },
    /*事故趋势、预警信息-折线图*/
    drawSecurityBottomLineChart(xData, yData, _this) {
        // 基于准备好的dom，初始化echarts实例
        let myChart = _this.$echarts.init(document.getElementById("securityBottomLineChart"))
        // 绘制图表
        chartParam.securityBottomLineOption.xAxis.data = xData;
        chartParam.securityBottomLineOption.series[0].data = yData;
        myChart.setOption(chartParam.securityBottomLineOption);
    },
    /*区域安全*/
    getAreaSafe(_this) {
        esApi.searchESProxy({
            "index": "事故20",
            "type": "doc",
            "jsonCommand": esJson.qyaq('2020-02-01', '2020-02-29')
        }).then(res => {
            let result = res["data"]["aggregations"]["model"]["buckets"]
            debugger
        })
    },
    /*道路安全*/
    getRoadSafe(_this) {
        esApi.searchESProxy({
            "index": "事故20",
            "type": "doc",
            "jsonCommand": esJson.dlaq('2020-02-01', '2020-02-29')
        }).then(res => {
            let result = res["data"]["aggregations"]["model"]["buckets"]
            debugger
        })
    },
    /*营运安全、车辆安全、驾驶员安全*/
    getSafety(_this,type,index){
        esApi.searchESProxy({
            "index": index,
            "type": "doc",
            "jsonCommand": esJson.safety(type,'201907', '201908')
        }).then(res => {
            let result = res["data"]["aggregations"]["model"]["buckets"]
            debugger
        })
    }
}

export default securityMethods
