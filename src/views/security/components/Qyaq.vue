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
                        :data="tableData"
                        height="197">
                    <el-table-column
                            align="center"
                            prop="date"
                            label="大队"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="name"
                            label="事故总数">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="address"
                            label="死亡事故">
                        <template slot-scope="scope">
                            <span style="color: #FF5F58;">{{scope.row.address}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-col>
    </el-col>
</template>

<script>
    export default {
        name: "Qyaq",
        data() {
            return {
                tableData: [{
                    date: '2016-05-03',
                    name: '12',
                    address: '12'
                }, {
                    date: '2016-05-02',
                    name: '21',
                    address: '32'
                }, {
                    date: '2016-05-04',
                    name: '21',
                    address: '12'
                }, {
                    date: '2016-05-01',
                    name: '34',
                    address: '32'
                }, {
                    date: '2016-05-08',
                    name: '23',
                    address: '1'
                }, {
                    date: '2016-05-06',
                    name: '12',
                    address: '23'
                }, {
                    date: '2016-05-07',
                    name: '12',
                    address: '23'
                }]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .col-body {
        height: calc(100% - 49px);
        padding: 13px 13px 26px 16px;
    }
</style>