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
                            <span class="num-top">{{sgzs_tb}}%</span>
                        </el-col>
                        <el-col class="gk-total-p-1">环比
                            <i class="el-icon-caret-bottom num-bottom"></i>
                            <span class="num-bottom">{{sgzs_hb}}%</span>
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
                swrs_tb: "-",//伤亡人数同比
                swrs_hb: "-",//伤亡人数环比
                ybsg: 0,//一般事故
                jysg: 0,//简易事故
                kcsg: 0,//快撤事故
                swrs: 0,//死亡人数
                ssrs: 0,//受伤人数
                ybsg_per: 0,//一般事故同比
                jysg_per: 0,//简易事故同比
                kcsg_per: 0,//快撤事故同比
                swrs_per: 0,//死亡人数同比
                ssrs_per: 0,//受伤人数同比
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
    .col-body {
        width: 100%;
        height: calc(100% - 49px);
        padding: 8px 10px 23px 19px;
        @include flex-xlyc();
    }

    .col-body-left {
        height: 100%;
        width: calc(50% - 4px);
        margin-right: 8px;
    }

    .col-body-right {
        height: 100%;
        width: calc(50% - 4px);
    }

    .gk-total {
        height: 43%;
        margin-bottom: 17px;
        border-radius: 5px;
        color: #4B5774;
        font-size: 11px;
        @include flex-xlyc();

        .gk-total-p-1 {
            height: 17px;
            line-height: 17px;

            i {
                margin: 0 4px 0 6px;
            }
        }

        .gk-total-p-2 {
            height: 40px;
            line-height: 40px;
            font-size: 30px;
            font-weight: bold;
        }

        .gk-total-p-2 span {
            font-size: 12px;
            font-weight: normal;
            margin-left: 3px;
        }

        .gk-total-p-3 {
            height: 40px;
            line-height: 40px;
            font-size: 30px;
            font-weight: bold;
        }

        .gk-total-p-3 span {
            font-size: 12px;
            font-weight: normal;
            margin-left: 3px;
        }
    }

    .gk-total-line-a {
        margin-right: 12px;
        width: 3px;
        height: 100%;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        background-image: linear-gradient(45deg, #4072EE, #679CF6);
    }

    .gk-total-line-b {
        margin-right: 12px;
        width: 3px;
        height: 100%;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        background-image: linear-gradient(45deg, #FA7E78, #FF5F58);
    }

    .gk-total-right {
        width: calc(100% - 15px);
    }

    .gk-list-body {
        height: calc(57% - 17px);
    }

    .gk-list {
        position: relative;
        width: 100%;
        background-color: #f2f6fc;
        height: 27px;
        border-radius: 0 1px 1px 0;
        margin-bottom: 8px;
        padding: 0 8px;
        color: #4B5774;
        overflow: hidden;
        @include flex-xlyc();

        .gk-list-num {
            font-size: 15px;
            font-weight: bold;
            margin: 0 5px;
        }

        .list-percent {
            position: absolute;
            z-index: 51;
            top: 0;
            right: 6px;
            height: 27px;
            @include flex-xlyc();

            .per_num {
                font-size: 11px;
                font-weight: bold;
            }
        }

        .list-corner {
            position: absolute;
            z-index: 52;
            top: -15px;
            right: -17px;
            padding: 15px 15px 6px 8px;
            border-radius: 40%;
            background: rgba(222, 223, 230, 1);
            color: #4B5774;
            font-size: 10px;
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