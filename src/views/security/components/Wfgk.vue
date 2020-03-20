<template>
    <el-col class="col-bottom">
        <el-col class="col-head">
            <el-col>
                <div class="title-block"></div>
                <p class="title">违法概况</p>
            </el-col>
            <i class="el-icon-full-screen"></i>
        </el-col>
        <el-col class="col-body-c">
            <el-row class="wfgk-head">
                <el-col><p class="num">256</p>
                    <p class="name">执法总数</p></el-col>
                <el-col><p class="num">26</p>
                    <p class="name">现场执法</p></el-col>
                <el-col><p class="num">157</p>
                    <p class="name">非现场执法</p></el-col>
            </el-row>
            <div id="securityWFGKBarChart" :style="{width: '100%', height: '100%'}"></div>
        </el-col>
    </el-col>
</template>

<script>
    export default {
        name: "Wfgk",
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/styles/security.scss";
</style>