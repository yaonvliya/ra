<template>
    <div class="content">
        <!--地图-->
        <s-map></s-map>
        <!--左侧-->
        <el-row class="s-left">
            <el-col class="col-top">
                <el-col class="col-head-a">
                    <div class="title-block"></div>
                    <p class="title">事故概况</p></el-col>
            </el-col>
            <el-col class="col-middle">
                <el-col class="col-head">
                    <el-col>
                        <div class="title-block"></div>
                        <p class="title">事故特征</p>
                    </el-col>
                    <i class="el-icon-full-screen" @click="fullscreen('sgtz','left',$event)"></i>
                </el-col>
            </el-col>
            <el-col class="col-bottom">
                <el-col class="col-head">
                    <el-col>
                        <div class="title-block"></div>
                        <p class="title">违法概况</p>
                    </el-col>
                    <i class="el-icon-full-screen"></i></el-col>
            </el-col>
        </el-row>
        <!--底部-->
        <el-row class="s-bottom">
            <el-col>
                <el-col class="col-head-a">
                    <div class="title-block"></div>
                    <div class="bottom-tab tab-head">
                        <div class="tab-line"></div>
                        <p v-for="(item,index) in bottomTab" :key="index" class="title-a"
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
        </el-row>
        <!--右侧-->
        <el-row class="s-right">
            <el-col class="col-top">
                <el-col class="col-head">
                    <el-col>
                        <div class="title-block"></div>
                        <p class="title">区域安全</p>
                    </el-col>
                    <i class="el-icon-full-screen"></i></el-col>
            </el-col>
            <el-col class="col-middle">
                <el-col class="col-head">
                    <el-col>
                        <div class="title-block"></div>
                        <p class="title">道路安全</p>
                    </el-col>
                    <i class="el-icon-full-screen"></i></el-col>
            </el-col>
            <el-col class="col-bottom">
                <el-col class="col-head-a">
                    <div class="title-block"></div>
                    <div class="right-tab tab-head">
                        <div class="tab-line"></div>
                        <p v-for="(item,index) in rightTab" :key="index" class="title-a"
                           :class="rightIndex == index?'tabOnThis':''" @click="changeTab2(index,$event)">
                            {{item.name}}</p>
                    </div>
                    <i class="el-icon-full-screen"></i>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import $ from 'jquery'
    import sMap from './components/Map'
    import securityMethods from './security-methods.js'

    export default {
        name: "security",
        components: {
            sMap,
        },
        data() {
            return {
                bottomIndex: 0,//事故趋势、预警信息tab
                bottomTab: [{name: "事故趋势"}, {name: "预警信息"}],
                bottomRadio: 1,//事故趋势、预警信息tab中单选按钮
                rightIndex: 0,//营运、车辆、驾驶员tab
                rightTab: [{name: "营运安全"}, {name: "车辆安全"}, {name: "驾驶员安全"}]
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
                let offsetPx = leftPx + (widthPx - widthPx2) + 5
                let line = event.currentTarget.parentNode.childNodes[0]
                line.style.transform = "translateX(" + offsetPx + "px)"
            },

            fullscreen(name, position, event) {//模块放大展示
                // debugger
                // event.currentTarget.parentNode.parentNode.style.width = '30%'
                // event.currentTarget.parentNode.parentNode.style.height = '100%'
                // event.currentTarget.parentNode.parentNode.style.height = '100%'
            }

        },
        mounted() {
            $(".tab-line").css("transform", "translateX(15px)")
            securityMethods.search()
        }
    }
</script>

<style lang="scss" scoped>
    .content {
        position: relative;
        width: 100%;
        height: 100%;

        .s-left, .s-right, .s-bottom {
            position: absolute;
            z-index: 50;

            > .el-col {
                background-color: rgba(255, 255, 255, 0.9);
                border-radius: 3px;
                box-shadow: 0 0 5px #848484;
                transition: all 0.3s linear;
            }
        }

        .s-left {
            top: 0;
            left: 0;
            width: 20%;
            height: 100%;

            .col-top {
                width: 100%;
                height: 34.67%;
            }

            .col-middle {
                width: 100%;
                height: calc(32% - 10px);
                margin-top: 10px;
            }

            .col-bottom {
                width: 100%;
                height: calc(33.33% - 10px);
                margin-top: 10px;
            }
        }

        .s-right {
            top: 0;
            right: 0;
            width: 20%;
            height: 100%;


            .col-top {
                width: 100%;
                height: 33.33%;
            }

            .col-middle {
                width: 100%;
                height: calc(33.33% - 10px);
                margin-top: 10px;
            }

            .col-bottom {
                width: 100%;
                height: calc(33.33% - 10px);
                margin-top: 10px;
            }
        }

        .s-bottom {
            left: 20%;
            bottom: 0;
            width: calc(60% - 20px);
            height: calc(33.33% - 10px);
            margin-left: 10px;

            > .el-col {
                width: 100%;
                height: 100%;
            }
        }

        .col-head-a {
            width: 100%;
            height: 35px;
            padding: 0 10px 0 0;
            border-bottom: 1px solid #eee;
            @include flex-xlyc();
        }

        .col-head {
            width: 100%;
            height: 35px;
            padding: 0 10px 0 0;
            border-bottom: 1px solid #eee;
            @include flex-xlryc();

            > .el-col {
                @include flex-xlyc();
            }
        }

        .title-block {
            width: 3px;
            height: 20px;
            background-color: #652BF5;
        }

        .title {
            font-size: 13px;
            padding: 0 0 0 10px;
        }

        .title-a {
            position: relative;
            font-size: 13px;
            font-weight: bold;
            padding: 0 0 0 10px;
            color: #817f7e;
            cursor: pointer;
        }

        .tabOnThis {
            position: relative;
            color: #000;
            font-weight: bold;


        }

        .tab-head {
            position: relative;
            height: 100%;
            @include flex-xlyc();

            .tab-line {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 2px;
                width: 40px;
                background-color: #652BF5;
                z-index: 55;
                transition: all 0.3s ease;
            }
        }

        .tab-body {
            width: 100%;
            height: calc(100% - 35px);

            .radio-list {
                width: 100%;
                height: 30px;
                @include flex-xlyc();
            }
        }

    }
</style>