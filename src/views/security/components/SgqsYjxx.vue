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
                <el-radio v-model="bottomRadio" label="1">月度</el-radio>
                <el-radio v-model="bottomRadio" label="2">时段</el-radio>
                <el-radio v-model="bottomRadio" label="3">星期</el-radio>
            </div>
            <div id="securityBottomLineChart" :style="{width: '100%', height: '100%'}"></div>
        </el-col>
    </el-col>
</template>

<script>
    import $ from 'jquery'
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

            fullscreen(name, position, event) {//模块放大展示
                // debugger
                // event.currentTarget.parentNode.parentNode.style.width = '30%'
                // event.currentTarget.parentNode.parentNode.style.height = '100%'
                // event.currentTarget.parentNode.parentNode.style.height = '100%'
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