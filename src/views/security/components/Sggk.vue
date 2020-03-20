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
                        <el-col class="gk-total-p-2 gk-sg-p">{{sgzs}}<span>起</span></el-col>
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
                        <el-col class="gk-total-p-3">{{ssswrs}}<span>人</span></el-col>
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
    import esApi from '../../../api/esApi.js'
    import esJson from '../esJson.js'

    export default {
        name: "Sggk",
        data() {
            return {
                sgzs: 0,//事故总数
                ssswrs: 0,//伤亡人数
                sgzs_tb: "-",//事故总数同比
                sgzs_hb: "-",//事故总数环比
                swrs_tb: "-",//伤亡人数同比
                swrs_hb: "-",//伤亡人数环比
                ybsg: 0,//一般事故
                swrs: 0,//死亡人数
                jysg: 0,//简易事故
                ssrs: 0,//受伤人数
                kcsg: 0,//快撤事故
            }
        },
        methods: {
            /*事故概况-事故总数、一般、简易、快撤*/
            getAccBasic1(time, type) {
                this.ybsg = 0//一般事故
                this.swrs = 0//死亡人数
                this.jysg = 0//简易事故
                this.ssrs = 0//受伤人数
                this.kcsg = 0//快撤事故
                this.sgzs_tb = "-"//事故总数同比
                this.sgzs_hb = "-"//事故总数环比
                this.swrs_tb = "-"//伤亡人数同比
                this.swrs_hb = "-"//伤亡人数环比
                esApi.searchESProxy({
                    "index": "事故20",
                    "type": "doc",
                    "jsonCommand": esJson.sggk1(time, type)
                }).then(res => {
                    let result = res["data"]["aggregations"]["model"]["buckets"]
                    this.sgzs = res["data"]["hits"]["total"]
                    for (let i = 0; i < result.length; i++) {
                        if (result[i]["key"] == "简易事故") {
                            this.jysg = result[i]["doc_count"]
                        } else if (result[i]["key"] == "一般事故") {
                            this.ybsg = result[i]["doc_count"]
                        } else {
                            this.kcsg = result[i]["doc_count"]
                        }
                    }
                })
            },
            /*事故总数-伤亡人数*/
            getAccBasic2(time, type) {
                esApi.searchESProxy({
                    "index": "事故20",
                    "type": "doc",
                    "jsonCommand": esJson.sggk2(time, type)
                }).then(res => {
                    let result = res["data"]["aggregations"]
                    this.swrs = result["swrs"]["value"] / 1
                    this.ssrs = result["ssrs"]["value"] / 1
                    this.ssswrs = this.swrs + this.ssrs
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../../assets/css/styles/security.scss";
</style>