<template>
    <el-col class="col-top">
        <el-col class="col-head">
            <el-col>
                <div class="title-block"></div>
                <p class="title">区域安全</p>
            </el-col>
            <i class="el-icon-full-screen"></i>
        </el-col>
        <el-col class="col-body">
            <div class="security-right-table">
                <el-table
                        :data="tableData">
                    <el-table-column
                            align="center"
                            prop="name"
                            label="大队">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="sgzs"
                            label="事故总数">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="swsg"
                            label="死亡事故">
                        <template slot-scope="scope">
                            <span style="color: #FF5F58;">{{scope.row.swsg}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-col>
    </el-col>
</template>

<script>
    import esApi from '../../../api/esApi.js'
    import esJson from '../esJson.js'

    export default {
        name: "Qyaq",
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            getAreaSafe(time, type) {
                esApi.searchESProxy({
                    "index": "事故20",
                    "type": "doc",
                    "jsonCommand": esJson.qyaq(time, type)
                }).then(res => {
                    let result = res["data"]["aggregations"]["a1"]["buckets"]
                    let data = []
                    for (let i = 0; i < result.length; i++) {
                        data.push({
                            name: result[i]["key"],
                            sgzs: result[i]["doc_count"],
                            swsg: result[i]["a2"]["value"],
                        })
                    }
                    this.tableData = data
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .col-body {
        height: calc(100% - 5.23vh);
        padding: px2rem(13) px2rem(13) px2rem(26) px2rem(16);
    }
</style>