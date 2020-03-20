<template>
    <el-col class="col-middle">
        <el-col class="col-head">
            <el-col>
                <div class="title-block"></div>
                <p class="title">道路安全</p>
            </el-col>
            <i class="el-icon-full-screen"></i>
        </el-col>
        <el-col class="col-body-d">
            <el-table
                    :data="tableData"
                    height="197"
                    class="right-table">
                <el-table-column
                        align="center"
                        prop="name"
                        label="路名"
                        width="120">
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
                </el-table-column>
            </el-table>
        </el-col>
    </el-col>
</template>

<script>
    import esApi from '../../../api/esApi.js'
    import esJson from '../esJson.js'
    export default {
        name: "Dlaq",
        data() {
            return {
                tableData: []
            }
        },
        methods: {
            getRoadSafe(time, type) {
                esApi.searchESProxy({
                    "index": "事故20",
                    "type": "doc",
                    "jsonCommand": esJson.dlaq(time, type)
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
    @import "../../../assets/css/styles/security.scss";
</style>