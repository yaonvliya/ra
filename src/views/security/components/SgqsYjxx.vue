<template>
    <el-col>
        <el-col class="col-head-a">
            <div class="title-block"></div>
            <div class="tab-head">
                <div class="tab-line"></div>
                <p v-for="(item,index) in bottomTab" :key="index" class="title-a title-b"
                   :class="bottomIndex == index?'tabOnThis':''" @click="changeTab(index,$event)">
                    {{item.name}}</p>
            </div>
        </el-col>
        <el-col class="tab-body">
            <div class="radio-list">
                <el-radio-group v-model="bottomRadio" @change="changeR">
                    <el-radio :label="1">月度</el-radio>
                    <el-radio :label="2">时段</el-radio>
                    <el-radio :label="3">星期</el-radio>
                </el-radio-group>
            </div>
            <div id="securityBottomLineChart" :style="{width: '100%', height: '100%'}" v-on-echart-resize></div>
        </el-col>
    </el-col>
</template>

<script>
    import $ from 'jquery'
    import chartParam from '../chartparams.js';
    import esApi from '../../../api/esApi.js'
    import esJson from '../esJson.js'

    export default {
        name: "SgqsYjxx",
        data() {
            return {
                bottomIndex: 0,//事故趋势、预警信息tab
                bottomTab: [{name: "事故趋势"}, {name: "预警信息"}],
                bottomRadio: 1,//事故趋势、预警信息tab中单选按钮
            }
        },
        methods: {
            changeTab(index, event) {//自制tab 底部
                this.bottomIndex = index
                this.tabEvent(event)
            },

            tabEvent(event) {//线条选中切换
                let leftPx = event.currentTarget.offsetLeft
                let widthPx = event.currentTarget.clientWidth / 2
                let widthPx2 = event.currentTarget.parentNode.childNodes[0].clientWidth / 2
                let offsetPx = leftPx + (widthPx - widthPx2)
                let line = event.currentTarget.parentNode.childNodes[0]
                line.style.transform = "translateX(" + offsetPx + "px)"
            },

            fullscreen(name, position, event) {//模块放大展示
                // debugger
                // event.currentTarget.parentNode.parentNode.style.width = '30%'
                // event.currentTarget.parentNode.parentNode.style.height = '100%'
                // event.currentTarget.parentNode.parentNode.style.height = '100%'
            },
            /*事故趋势-月度*/
            getAccTrend_month(time, type) {
                let timeList = [time.substr(0, 4) - 2, time.substr(0, 4) - 1, time.substr(0, 4) - 0]
                esApi.searchESProxy({
                    "index": "事故20",
                    "type": "doc",
                    "jsonCommand": esJson.sgqs_month(timeList, type)
                }).then(res => {
                    let result = res["data"]["aggregations"]["model"]["buckets"]
                    let xData = Array.from({length: 12}, (v, i) => i + 1 + "月")
                    let month0 = Array.from({length: 12}, (v, i) => 0);
                    let month1 = Array.from({length: 12}, (v, i) => 0);
                    let month2 = Array.from({length: 12}, (v, i) => 0);
                    for (let i = 0; i < result.length; i++) {
                        for (let j = 0; j < timeList.length; j++) {
                            if (result[i]["key"] == timeList[j]) {
                                for (let k = 0; k < result[i]["fxmb"]["buckets"].length; k++) {
                                    eval("month" + j)[result[i]["fxmb"]["buckets"][k]["key"] - 1] = result[i]["fxmb"]["buckets"][k]["doc_count"]
                                }
                            }
                        }
                    }
                    const yData = [month0, month1, month2]
                    const lData = Array.from(timeList, (v, i) => v + "年")
                    this.drawSecurityBottomLineChart(xData, yData, lData)
                })
            },
            /*事故趋势-小时*/
            getAccTrend_hour(time, type) {
                esApi.searchESProxy({
                    "index": "事故20",
                    "type": "doc",
                    "jsonCommand": esJson.sgqs('sj_h', time, type)
                }).then(res => {
                    let result = res["data"]["aggregations"]["model"]["buckets"]
                    let xData = Array.from({length: 24}, (v, i) => i)
                    let yData = Array.from({length: 24}, (v, i) => 0)
                    for (let i = 0; i < result.length; i++) {
                        yData[result[i]["key"]] = result[i]["doc_count"]
                    }
                    let lData = ["本期", "", ""]
                    this.drawSecurityBottomLineChart(xData, [yData, [], []], lData)
                })
            },
            /*事故趋势-星期*/
            getAccTrend_week(time, type) {
                esApi.searchESProxy({
                    "index": "事故20",
                    "type": "doc",
                    "jsonCommand": esJson.sgqs('xq', time, type)
                }).then(res => {
                    let result = res["data"]["aggregations"]["model"]["buckets"]
                    let xData = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]
                    let yData = Array.from({length: 7}, (v, i) => 0)
                    for (let i = 0; i < result.length; i++) {
                        if (result[i]["key"] >= 1 && result[i]["key"] <= 7) {
                            yData[result[i]["key"] - 1] = result[i]["doc_count"]
                        }
                    }
                    let lData = ["星期分布", "", ""]
                    this.drawSecurityBottomLineChart(xData, [yData, [], []], lData)
                })
            },
            /*事故趋势、预警信息-折线图*/
            drawSecurityBottomLineChart(xData, yData, lData) {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById("securityBottomLineChart"))
                // 绘制图表
                chartParam.securityBottomLineOption.legend.data = lData;
                chartParam.securityBottomLineOption.xAxis.data = xData;
                chartParam.securityBottomLineOption.series[0].name = lData[0];
                chartParam.securityBottomLineOption.series[0].data = yData[0];
                chartParam.securityBottomLineOption.series[1].name = lData[1];
                chartParam.securityBottomLineOption.series[1].data = yData[1];
                chartParam.securityBottomLineOption.series[2].name = lData[2];
                chartParam.securityBottomLineOption.series[2].data = yData[2];
                myChart.setOption(chartParam.securityBottomLineOption);
            },
            changeR() {
                if (this.bottomIndex == 0) {
                    if (this.bottomRadio == 1) {
                        this.getAccTrend_month(this.$parent.$parent.time, "")
                    } else if (this.bottomRadio == 2) {
                        this.getAccTrend_hour(this.$parent.$parent.time, "")
                    } else if (this.bottomRadio == 3) {
                        this.getAccTrend_week(this.$parent.$parent.time, "")
                    }
                } else {

                }

            },
            search(time, type) {
                if (this.bottomIndex == 0) {
                    if (this.bottomRadio == 1) {
                        this.getAccTrend_month(time, type)
                    } else if (this.bottomRadio == 2) {
                        this.getAccTrend_hour(time, type)
                    } else if (this.bottomRadio == 3) {
                        this.getAccTrend_week(time, type)
                    }
                } else {

                }

            }
        },
        mounted() {
            $(".tab-line").css("transform", "translateX(17px)")
        }
    }
</script>

<style lang="scss" scoped>

</style>
<style lang="scss">
    .radio-list > .el-radio__input.is-checked + .el-radio__label {
        color: #4B5774;
    }

    .radio-list > .el-radio {
        color: #4B5774;
    }

    .radio-list > .el-radio__label {
        font-size: 11px;
    }
</style>