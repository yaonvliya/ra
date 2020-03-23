<template>
    <el-col class="col-bottom">
        <el-col class="col-head-b">
            <div class="col-head-b-a">
                <div class="title-block"></div>
                <div class="tab-head">
                    <div class="tab-line"></div>
                    <p v-for="(item,index) in rightTab" :key="index" class="title-a title-c"
                       :class="rightIndex == index?'tabOnThis':''" @click="changeTab2(index,$event)">
                        {{item.name}}</p>
                </div>
            </div>
            <i class="el-icon-full-screen"></i>
        </el-col>
        <el-col class="col-body">
            <div class="security-right-table">
                <el-table
                        :data="tableData">
                    <el-table-column
                            align="center"
                            prop="name"
                            :label="title">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="wfzs"
                            label="违法总数">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="sgzs"
                            label="事故总是">
                        <template slot-scope="scope">
                            <span style="color: #FF5F58;">{{scope.row.sgzs}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-col>
    </el-col>
</template>

<script>
    import $ from 'jquery'
    import esApi from '../../../api/esApi.js'
    import esJson from '../esJson.js'
    import config from '@/config/index'

    export default {
        name: "YyaqClaqJsyaq",
        data() {
            return {
                rightIndex: 0,//营运、车辆、驾驶员tab
                rightTab: [{name: "营运安全"}, {name: "车辆安全"}, {name: "驾驶员安全"}],
                tableData: [],
                title: "企业名称"
            }
        },
        methods: {
            changeTab2(index, event) {//自制tab 右下
                this.rightIndex = index
                this.tabEvent(event)
                this.changeSearch()
            },

            tabEvent(event) {//线条选中切换
                let leftPx = event.currentTarget.offsetLeft
                let widthPx = event.currentTarget.clientWidth / 2
                let widthPx2 = event.currentTarget.parentNode.childNodes[0].clientWidth / 2
                let offsetPx = leftPx + (widthPx - widthPx2)
                let line = event.currentTarget.parentNode.childNodes[0]
                line.style.transform = "translateX(" + offsetPx + "px)"
            },
            getSafety(time, index, type) {
                esApi.searchESProxy({
                    "index": index,
                    "type": "doc",
                    "jsonCommand": esJson.safety(type, time, time)
                }).then(res => {
                    let result = res["data"]["aggregations"]["model"]["buckets"]
                    let data = []
                    for (let i = 0; i < result.length; i++) {
                        data.push({
                            name: result[i]["key"],
                            wfzs: result[i]["a1"]["value"],
                            sgzs: result[i]["a2"]["value"]
                        })
                    }
                    this.tableData = data
                })
            },
            changeSearch() {
                if (this.rightIndex == 0) {
                    this.title = "企业名称"
                    this.getSafety(this.$parent.$parent.time, config.company_index, "所属单位")
                } else if (this.rightIndex == 1) {
                    this.title = "号牌号码"
                    this.getSafety(this.$parent.$parent.time, config.vehicle_index, "号牌号码")
                } else {
                    this.title = "姓名"
                    this.getSafety(this.$parent.$parent.time, config.human_index, "姓名")
                }
            },
            search(time) {
                if (this.rightIndex == 0) {
                    this.title = "企业名称"
                    this.getSafety(time, config.company_index, "所属单位")
                } else if (this.rightIndex == 1) {
                    this.title = "号牌号码"
                    this.getSafety(time, config.vehicle_index, "号牌号码")
                } else {
                    this.title = "姓名"
                    this.getSafety(time, config.human_index, "姓名")
                }
            }
        },
        mounted() {
            $(".tab-line").css("transform", "translateX(17px)")
        }
    }
</script>

<style lang="scss" scoped>
    .col-body {
        height: calc(100% - 5.23vh);
        padding: px2rem(13) px2rem(13) px2rem(26) px2rem(16);
    }
</style>