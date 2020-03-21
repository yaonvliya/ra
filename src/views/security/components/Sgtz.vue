<template>
    <el-col class="col-middle">
        <el-col class="col-head">
            <el-col>
                <div class="title-block"></div>
                <p class="title">事故特征</p>
            </el-col>
            <i class="el-icon-full-screen" @click="fullscreen('sgtz','left',$event)"></i>
        </el-col>
        <el-col class="col-body-b">
            <div class="radio-list-a">
                <el-radio v-model="sgtzRadio" label="1">事故原因</el-radio>
                <el-radio v-model="sgtzRadio" label="2">事故形态</el-radio>
            </div>
            <div id="securitySGTZBarChart" :style="{width: '100%', height: '100%'}"></div>
        </el-col>
    </el-col>
</template>

<script>
    export default {
        name: "Sgtz",
        data() {
            return {
                sgtzRadio: '',//事故特征单选
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>