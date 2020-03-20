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
        <el-col class="col-body-d">
            <el-table
                    :data="tableData"
                    height="197"
                    class="right-table">
                <el-table-column
                        align="center"
                        prop="date"
                        label="大队"
                        width="120">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="name"
                        label="事故总数">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="address"
                        label="死亡事故">
                </el-table-column>
            </el-table>
        </el-col>
    </el-col>
</template>

<script>
    import $ from 'jquery'
    export default {
        name: "YyaqClaqJsyaq",
        data() {
            return {
                rightIndex: 0,//营运、车辆、驾驶员tab
                rightTab: [{name: "营运安全"}, {name: "车辆安全"}, {name: "驾驶员安全"}],
                tableData: [{
                    date: '2016-05-03',
                    name: '12',
                    address: '12'
                }, {
                    date: '2016-05-02',
                    name: '21',
                    address: '32'
                }, {
                    date: '2016-05-04',
                    name: '21',
                    address: '12'
                }, {
                    date: '2016-05-01',
                    name: '34',
                    address: '32'
                }, {
                    date: '2016-05-08',
                    name: '23',
                    address: '1'
                }, {
                    date: '2016-05-06',
                    name: '12',
                    address: '23'
                }, {
                    date: '2016-05-07',
                    name: '12',
                    address: '23'
                }]
            }
        },
        methods: {
            changeTab2(index, event) {//自制tab 右下
                this.rightIndex = index
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

        },
        mounted() {
            $(".tab-line").css("transform", "translateX(17px)")
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/styles/security.scss";
</style>