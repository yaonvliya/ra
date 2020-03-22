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
        height: calc(100% - 5.23vh);
        padding: px2rem(13) px2rem(10) px2rem(34) px2rem(19);

        .wfgk-head {
            height: 25%;
            margin-bottom: px2rem(20);
            padding: 0 px2rem(16) 0 px2rem(7);
            @include flex-xlryc();

            .el-col {
                text-align: left;
            }

            .num {
                font-size: px2rem(24);
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
                font-size: px2rem(12);
                color: #97A4B2;
            }
        }

        .wfgk-head > .el-col:nth-child(1) {
            padding-left: px2rem(8);
        }

        .wfgk-head > .el-col:nth-child(2) {
            padding-left: px2rem(20);
        }

        .wfgk-head > .el-col:nth-child(3) {
            padding-left: px2rem(20);
        }
    }
</style>