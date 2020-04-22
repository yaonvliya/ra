<template>
    <el-col class="col-top">
        <el-col class="col-head-a">
            <div class="title-block"></div>
            <p class="title">事故概况</p>
        </el-col>

        <el-col class="col-body">
            <div class="col-body-left">
                <div :span="12" class="gk-total">
                    <div class="gk-total-line-a"></div>
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

                <div class="gk-list-body">
                    <el-col class="gk-list">一般事故
                        <span class="gk-list-num gk-sg-p">{{ybsg}}</span>起
                        <div class="list-percent num-top">
                            <i class="el-icon-caret-top"></i>
                            <p class="per_num">{{ybsg_per}}%</p>
                        </div>
                        <div class="list-corner">同比</div>
                    </el-col>
                    <el-col class="gk-list">
                        简易事故
                        <span class="gk-list-num gk-sg-p">{{jysg}}</span>起
                        <div class="list-percent num-top">
                            <i class="el-icon-caret-top"></i>
                            <p class="per_num">{{jysg_per}}%</p>
                        </div>
                        <div class="list-corner">同比</div>
                    </el-col>
                    <el-col class="gk-list">
                        快撤事故
                        <span class="gk-list-num gk-sg-p">{{kcsg}}</span>起
                        <div class="list-percent num-bottom">
                            <i class="el-icon-caret-bottom"></i>
                            <p class="per_num">{{kcsg_per}}%</p>
                        </div>
                        <div class="list-corner">同比</div>
                    </el-col>
                </div>
            </div>

            <div class="col-body-right">
                <div :span="12" class="gk-total">
                    <div class="gk-total-line-b"></div>
                    <div class="gk-total-right">
                        <el-col class="gk-total-p-1">伤亡人数</el-col>
                        <el-col class="gk-total-p-3 gk-sw-p">{{ssswrs}}<span>人</span></el-col>
                        <el-col class="gk-total-p-1">同比
                            <i class="el-icon-caret-top num-top"></i>
                            <span class="num-top">{{ssswrs_tb}}%</span>
                        </el-col>
                        <el-col class="gk-total-p-1">环比
                            <i class="el-icon-caret-bottom num-bottom"></i>
                            <span class="num-bottom">{{ssswrs_hb}}%</span>
                        </el-col>
                    </div>
                </div>

                <div class="gk-list-body">
                    <el-col class="gk-list">
                        死亡人数
                        <span class="gk-list-num gk-sw-p">{{swrs}}</span>人
                        <div class="list-percent num-top">
                            <i class="el-icon-caret-top"></i>
                            <p class="per_num">{{swrs_per}}%</p>
                        </div>
                        <div class="list-corner">同比</div>
                    </el-col>
                    <el-col class="gk-list">
                        受伤人数
                        <span class="gk-list-num gk-sw-p">{{ssrs}}</span>起
                        <div class="list-percent num-top">
                            <i class="el-icon-caret-top"></i>
                            <p class="per_num">{{ssrs_per}}%</p>
                        </div>
                        <div class="list-corner">同比</div>
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
                ssswrs_tb: "-",//伤亡人数同比
                ssswrs_hb: "-",//伤亡人数环比
                ybsg: 0,//一般事故
                jysg: 0,//简易事故
                kcsg: 0,//快撤事故
                swrs: 0,//死亡人数
                ssrs: 0,//受伤人数
                ybsg_per: "-",//一般事故同比
                jysg_per: "-",//简易事故同比
                kcsg_per: "-",//快撤事故同比
                swrs_per: "-",//死亡人数同比
                ssrs_per: "-",//受伤人数同比
            }
        },
        methods: {
            tb(time) {
                if (time != this.$publicMethods.getMonthStr()) {
                    time = time - 100
                    return [time + "01", time + "31"]
                } else {
                    time = time - 100
                    return [time + "01", "" + time + this.$publicMethods.getDate()[2]]
                }
            },
            hb(time) {
                if (time != this.$publicMethods.getMonthStr()) {
                    time = time - 1
                    if (time % 100 == 0) {
                        time = time - 100 + 12
                    }
                    return [time + "01", time + "31"]
                } else {
                    time = time - 1
                    if (time % 100 == 0) {
                        time = time - 100 + 12
                    }
                    return [time + "01", "" + time + this.$publicMethods.getDate()[2]]
                }
            },
            /*事故概况-事故总数、一般、简易、快撤*/
            getAccBasic1(time, type) {
                this.sgzs = 0//事故总数
                this.ssswrs = 0//伤亡人数
                this.ybsg = 0//一般事故
                this.swrs = 0//死亡人数
                this.jysg = 0//简易事故
                this.ssrs = 0//受伤人数
                this.kcsg = 0//快撤事故
                this.sgzs_tb = "-"//事故总数同比
                this.sgzs_hb = "-"//事故总数环比
                this.ssswrs_tb = "-"//伤亡人数同比
                this.ssswrs_hb = "-"//伤亡人数环比
                this.ybsg_per = "-"//一般事故同比
                this.jysg_per = "-"//简易事故同比
                this.kcsg_per = "-"//快撤事故同比
                this.swrs_per = "-"//死亡人数同比
                this.ssrs_per = "-"//受伤人数同比
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
                    this.getAccBasic1_tb(time, type)
                    this.getAccBasic1_hb(time, type)
                })
            },
            /*事故概况(同比)-事故总数、一般、简易、快撤*/
            getAccBasic1_tb(time, type) {
                let times = this.tb(time)
                esApi.searchESProxy({
                    "index": "事故20",
                    "type": "doc",
                    "jsonCommand": esJson.sggk1_tbhb(times, type)
                }).then(res => {
                    let result = res["data"]["aggregations"]["model"]["buckets"]
                    let tb = 0
                    for (let i = 0; i < result.length; i++) {
                        tb += result[i]["doc_count"]
                        if (result[i]["key"] == "简易事故") {
                            this.jysg_per = ((this.jysg - result[i]["doc_count"]) / result[i]["doc_count"] * 100).toFixed(0)
                        } else if (result[i]["key"] == "一般事故") {
                            this.ybsg_per = ((this.ybsg - result[i]["doc_count"]) / result[i]["doc_count"] * 100).toFixed(0)
                        } else {
                            this.kcsg_per = ((this.kcsg - result[i]["doc_count"]) / result[i]["doc_count"] * 100).toFixed(0)
                        }
                    }
                    if (tb != 0) {
                        this.sgzs_tb = ((this.sgzs - tb) / tb * 100).toFixed(0)
                    }
                })
            },
            /*事故概况(环比)-事故总数、一般、简易、快撤*/
            getAccBasic1_hb(time, type) {
                let times = this.hb(time)
                if (time % 100 == 0) {
                    time = time - 100 + 12
                }
                esApi.searchESProxy({
                    "index": "事故20",
                    "type": "doc",
                    "jsonCommand": esJson.sggk1_tbhb(times, type)
                }).then(res => {
                    let result = res["data"]["aggregations"]["model"]["buckets"]
                    let hb = 0
                    for (let i = 0; i < result.length; i++) {
                        hb += result[i]["doc_count"]
                    }
                    if (hb != 0) {
                        this.sgzs_hb = ((this.sgzs - hb) / hb * 100).toFixed(0)
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
                    this.getAccBasic2_tb(time, type)
                    this.getAccBasic2_hb(time, type)
                })
            },
            /*事故总数(同比)-伤亡人数*/
            getAccBasic2_tb(time, type) {
                let times = this.tb(time)
                esApi.searchESProxy({
                    "index": "事故20",
                    "type": "doc",
                    "jsonCommand": esJson.sggk2_tbhb(times, type)
                }).then(res => {
                    let result = res["data"]["aggregations"]
                    let swrs = result["swrs"]["value"] / 1
                    let ssrs = result["ssrs"]["value"] / 1
                    let ssswrs = swrs + ssrs
                    if (swrs != 0) {
                        this.swrs_per = ((this.swrs - swrs) / swrs * 100).toFixed(0)
                    }
                    if (ssrs != 0) {
                        this.ssrs_per = ((this.ssrs - ssrs) / ssrs * 100).toFixed(0)
                    }
                    if (ssswrs != 0) {
                        this.ssswrs_tb = ((this.ssswrs - ssswrs) / ssswrs * 100).toFixed(0)
                    }
                })
            },
            /*事故总数(环比)-伤亡人数*/
            getAccBasic2_hb(time, type) {
                let times = this.hb(time)
                if (time % 100 == 0) {
                    time = time - 100 + 12
                }
                esApi.searchESProxy({
                    "index": "事故20",
                    "type": "doc",
                    "jsonCommand": esJson.sggk2_tbhb(times, type)
                }).then(res => {
                    let result = res["data"]["aggregations"]
                    let ssswrs = result["swrs"]["value"] / 1 + result["ssrs"]["value"] / 1
                    if (ssswrs != 0) {
                        this.ssswrs_hb = ((this.ssswrs - ssswrs) / ssswrs * 100).toFixed(0)
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .col-body {
        width: 100%;
        height: calc(100% - 5.23vh);
        padding: px2rem(8) px2rem(10) px2rem(23) px2rem(19);
        @include flex-xlyc();
    }

    .col-body-left {
        height: 100%;
        width: calc(50% - 0.42vh);
        margin-right: px2rem(8);
    }

    .col-body-right {
        height: 100%;
        width: calc(50% - 0.42vh);
    }

    .gk-total {
        height: 43%;
        margin-bottom: px2rem(17);
        border-radius: 5px;
        color: #4B5774;
        font-size: px2rem(11);
        @include flex-xlyc();

        .gk-total-p-1 {
            height: px2rem(17);
            line-height: px2rem(17);

            i {
                margin: 0 px2rem(4) 0 px2rem(6);
            }
        }

        .gk-total-p-2 {
            height: px2rem(40);
            line-height: px2rem(40);
            font-size: px2rem(30);
            font-weight: bold;
        }

        .gk-total-p-2 span {
            font-size: px2rem(12);
            font-weight: normal;
            margin-left: px2rem(3);
        }

        .gk-total-p-3 {
            height: px2rem(40);
            line-height: px2rem(40);
            font-size: px2rem(30);
            font-weight: bold;
        }

        .gk-total-p-3 span {
            font-size: px2rem(12);
            font-weight: normal;
            margin-left: px2rem(3);
        }
    }

    .gk-total-line-a {
        margin-right: px2rem(12);
        width: px2rem(3);
        height: 100%;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        background-image: linear-gradient(45deg, #4072EE, #679CF6);
    }

    .gk-total-line-b {
        margin-right: px2rem(12);
        width: px2rem(3);
        height: 100%;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        background-image: linear-gradient(45deg, #FA7E78, #FF5F58);
    }

    .gk-total-right {
        width: calc(100% - 0.78vw);
    }

    .gk-list-body {
        height: calc(57% - 1.81vh);
    }

    .gk-list {
        position: relative;
        width: 100%;
        background-color: #f2f6fc;
        height: px2rem(27);
        border-radius: 0 1px 1px 0;
        margin-bottom: px2rem(8);
        padding: 0 px2rem(8);
        color: #4B5774;
        overflow: hidden;
        @include flex-xlyc();

        .gk-list-num {
            font-size: px2rem(15);
            font-weight: bold;
            margin: 0 px2rem(5);
        }

        .list-percent {
            position: absolute;
            z-index: 51;
            top: 0;
            right: px2rem(6);
            height: px2rem(27);
            @include flex-xlyc();

            .per_num {
                font-size: px2rem(11);
                font-weight: bold;
            }
        }

        .list-corner {
            position: absolute;
            z-index: 52;
            top: px2rem(-15);
            right: px2rem(-17);
            padding: px2rem(15) px2rem(15) px2rem(6) px2rem(8);
            border-radius: 40%;
            background: rgba(222, 223, 230, 1);
            color: #4B5774;
            font-size: px2rem(10);
            -webkit-transform: scale(0.5);
        }
    }

    .gk-list:last-child {
        margin-bottom: 0;
    }

    .gk-sg-p {
        color: #387DFF;
    }

    .gk-sw-p {
        color: #FF5F58;
    }

    .num-top {
        color: #FF5F58;
    }

    .num-bottom {
        color: #23B899;
    }
</style>