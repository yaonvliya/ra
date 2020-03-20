<template>
    <el-col class="col-top">
        <el-col class="col-head-a">
            <div class="title-block"></div>
            <p class="title">事故概况</p>
        </el-col>

        <el-col class="col-body-a">
            <div class="col-body-1">
                <div :span="12" class="gk-total">
                    <div class="gk-total-a"></div>
                    <div class="gk-total-right">
                        <el-col class="gk-total-p-1">事故总数</el-col>
                        <el-col class="gk-total-p-2 gk-sg-p">256<span>起</span></el-col>
                        <el-col class="gk-total-p-1">同比
                            <i class="el-icon-caret-top num-top"></i>
                            <span class="num-top">{{sgzs_tb}}%</span>
                        </el-col>
                        <el-col class="gk-total-p-1">环比
                            <i class="el-icon-caret-bottom num-bottom"></i>
                            <span class="num-bottom">{{sgzs_hb}}%</span>
                        </el-col>
                    </div>
                </div>

                <div>
                    <el-col :span="12" class="gk-list">一般事故
                        <span class="gk-list-num gk-sg-p">{{ybsg}}</span>起
                    </el-col>
                    <el-col :span="12" class="gk-list">
                        简易事故
                        <span class="gk-list-num gk-sg-p">{{jysg}}</span>起
                    </el-col>
                    <el-col :span="12" class="gk-list">
                        快撤事故
                        <span class="gk-list-num gk-sg-p">{{kcsg}}</span>起
                    </el-col>
                </div>
            </div>

            <div class="col-body-2">
                <div :span="12" class="gk-total">
                    <div class="gk-total-b"></div>
                    <div class="gk-total-right">
                        <el-col class="gk-total-p-1">伤亡人数</el-col>
                        <el-col class="gk-total-p-3">132<span>人</span></el-col>
                        <el-col class="gk-total-p-1">同比
                            <i class="el-icon-caret-top num-top"></i>
                            <span class="num-top">{{sgzs_tb}}%</span>
                        </el-col>
                        <el-col class="gk-total-p-1">环比
                            <i class="el-icon-caret-bottom num-bottom"></i>
                            <span class="num-bottom">{{sgzs_hb}}%</span>
                        </el-col>
                    </div>
                </div>

                <div>
                    <el-col :span="12" class="gk-list">
                        死亡人数
                        <span>{{swrs}}</span>人
                    </el-col>
                    <el-col :span="12" class="gk-list">
                        受伤人数
                        <span>{{ssrs}}</span>起
                    </el-col>
                </div>
            </div>
        </el-col>
    </el-col>
</template>

<script>
    export default {
        name: "Sggk",
        data() {
            return {
                sgzs_tb: 60,//事故总数同比
                sgzs_hb: 58,//事故总数环比
                swrs_tb: 53,//伤亡人数同比
                swrs_hb: 42,//伤亡人数环比
                ybsg: 2323,//一般事故
                swrs: 2323,//死亡人数
                jysg: 2323,//简易事故
                ssrs: 2323,//受伤人数
                kcsg: 2323,//快撤事故
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "../../../assets/css/styles/security.scss";
</style>