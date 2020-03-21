<template>
    <el-col class="col-bottom">
        <el-col class="col-head">
            <el-col>
                <div class="title-block"></div>
                <p class="title">违法概况</p>
            </el-col>
            <i class="el-icon-full-screen"></i>
        </el-col>
        <el-col class="col-body">
            <el-row class="wfgk-head">
                <el-col>
                    <p class="num num-1">256</p>
                    <p class="name">执法总数</p>
                </el-col>
                <el-col>
                    <p class="num num-2">26</p>
                    <p class="name">现场执法</p>
                </el-col>
                <el-col>
                    <p class="num num-3">157</p>
                    <p class="name">非现场执法</p>
                </el-col>
            </el-row>
            <div id="securityWFGKBarChart" :style="{width: '100%', height: '100%'}"></div>
        </el-col>
    </el-col>
</template>

<script>
    export default {
        name: "Wfgk",
        data() {
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    .col-body {
        height: calc(100% - 49px);
        padding: 13px 10px 34px 19px;

        .wfgk-head {
            height: 25%;
            margin-bottom: 20px;
            padding: 0 16px 0 7px;
            @include flex-xlryc();

            .el-col {
                text-align: left;
            }

            .num {
                font-size: 24px;
                font-weight: bold;
            }

            .num-1 {
                color: #FE6283;
            }

            .num-2 {
                color: #25C8B9;
            }

            .num-3 {
                color: #4072EE;
            }

            .name {
                font-size: 12px;
                color: #97A4B2;
            }
        }

        .wfgk-head > .el-col:nth-child(1) {
            padding-left: 8px;
        }

        .wfgk-head > .el-col:nth-child(2) {
            padding-left: 20px;
        }

        .wfgk-head > .el-col:nth-child(3) {
            padding-left: 20px;
        }
    }
</style>