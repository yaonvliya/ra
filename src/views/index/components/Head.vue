<template>
    <el-row class="sys-head" type="flex" justify="space-between">
        <el-col :span="12" class="col">
            <img :src="logo" class="logo"/>
            <p class="title">XX市道路交通安全分析预警系统</p>
        </el-col>
        <el-col :span="12" class="col">
            <img :src="police" class="police"/>
            <p class="police-name">刘xx</p>
            <p class="menu">安全态势<i class="el-icon-caret-bottom"></i></p>
        </el-col>
    </el-row>
</template>

<script>
    import logo from '@/assets/images/logo.png';
    import police from '@/assets/images/police.jpg';

    export default {
        name: "Head",
        data() {
            return {
                logo,
                police
            }
        }
    }
</script>

<style lang="scss" scoped>
    .sys-head {
        height: 50px;
        width: 100%;

        .col:nth-child(1) {
            @include flex-xlyc();
        }

        .col:nth-child(2) {
            @include flex-xryc();
        }

        .logo {
            height: 30px;
            margin: 0 10px;
        }

        .title {
            font-size: 16px;
        }

        .police {
            height: 30px;
            border-radius: 50%;
        }

        .police-name {
            height: 30px;
            line-height: 30px;
            font-size: 13px;
            padding: 0 10px;
            margin-right: 10px;
            border-right: 1px solid #fff;
            text-align: center;
        }

        .menu {
            margin-right: 10px;
            cursor: pointer;
            
            &:hover {
                color: #181e8f;
            }
        }
    }
</style>