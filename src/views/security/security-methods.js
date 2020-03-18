/**
 *@author 李占盛
 *@name 安全概况
 */
// import es from "@/lib/elasticsearch.js";
import chartParam from './chartparams.js';
// import analyzeApi from '@/api/analyzeapi.js'

var securityMethods = {
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
