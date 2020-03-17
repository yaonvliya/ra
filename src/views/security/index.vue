<template>
    <div class="content">
        <s-map></s-map>
        <el-row class="s-left">
            <el-col class="col-top">
                <el-col class="col-head">事故概况</el-col>
            </el-col>
            <el-col class="col-middle">
                <el-col class="col-head">
                    <p class="title">事故特征</p>
                    <i class="el-icon-full-screen"></i>
                </el-col>
            </el-col>
            <el-col class="col-bottom">
                <el-col class="col-head">
                    <p class="title">违法概况</p>
                    <i class="el-icon-full-screen"></i></el-col>
            </el-col>
        </el-row>
        <el-row class="s-bottom">
            <el-col>
                <el-col class="col-head">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="事故趋势" name="first">事故趋势</el-tab-pane>
                        <el-tab-pane label="预警信息" name="second">预警信息</el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-col>
        </el-row>
        <el-row class="s-right">
            <el-col class="col-top">
                <el-col class="col-head">
                    <p class="title">区域安全</p>
                    <i class="el-icon-full-screen"></i></el-col>
            </el-col>
            <el-col class="col-middle">
                <el-col class="col-head">
                    <p class="title">道路安全</p>
                    <i class="el-icon-full-screen"></i></el-col>
            </el-col>
            <el-col class="col-bottom">
                <el-col class="col-head">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="营运安全" name="first">营运安全</el-tab-pane>
                        <el-tab-pane label="车辆安全" name="second">车辆安全</el-tab-pane>
                        <el-tab-pane label="驾驶员安全" name="third">驾驶员安全</el-tab-pane>
                    </el-tabs>
                    <i class="el-icon-full-screen"></i></el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import sMap from './components/Map'

    export default {
        name: "security",
        components: {
            sMap,
        },
        data() {
            return {}
        },
        methods: {}
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

            .el-col {
                background-color: rgba(255, 255, 255, 0.9);
                border-radius: 5px;
                box-shadow: 0 0 3px #b4b4b4;
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

            >.el-col {
                width: 100%;
                height: 100%;
            }
        }

        .col-head {
            width: 100%;
            height: 35px;
            border-left: 3px solid #652BF5;

            @include flex-xlryc();
        }
    }
</style>