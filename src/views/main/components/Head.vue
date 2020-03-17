<template>
    <el-row class="sys-head" type="flex" justify="space-between">
        <el-col :span="12" class="col">
            <img :src="logo" class="logo"/>
            <p class="title">XX市道路交通安全分析预警系统</p>
        </el-col>
        <el-col :span="12" class="col">
            <img :src="police" class="police"/>
            <p class="police-name">刘xx</p>
            <p class="menu" @mouseover="miniModules=true">
                <router-link to="/modules">安全态势<i class="el-icon-caret-bottom"></i></router-link>
            </p>

            <el-collapse-transition>
                <div class="miniM" @mouseleave="miniModules=false" v-show="miniModules">
                    <el-col v-for="(item,index) in modules" :key="index" class="module-name" :class="i == index ?'onThisM':''" @click.native="onModules(index,item.to)">
                        <img class="module-icon" :src="item.icon"/>{{item.name}}
                    </el-col>
                </div>
            </el-collapse-transition>
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
                logo,//标题图标
                police,//头像
                miniModules: false,//小型模块菜单显示
                i:0,//小型模块菜单选中
                modules: [//小型模块菜单
                    {name: "安全态势", to: "/security", icon: ""},
                    {name: "区域安全管理", to: "/area", icon: ""},
                    {name: "道路安全管理", to: "/road", icon: ""},
                    {name: "营运安全管理", to: "", icon: ""},
                    {name: "勤务优化管理", to: "", icon: ""},
                    {name: "车辆安全管理", to: "", icon: ""},
                    {name: "驾驶员安全管理", to: "", icon: ""},
                    {name: "报表报告", to: "", icon: ""},
                    {name: "预警设置", to: "", icon: ""},
                    {name: "数据管理", to: "", icon: ""},
                ]
            }
        },
        methods: {
            onModules(index,path) {
                this.miniModules = false
                this.i = index
                this.$router.push({path: path});
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

        .miniM {
            position: absolute;
            z-index: 99;
            top: 40px;
            right: 10px;
            padding: 10px 0 !important;
            max-width: 170px;
            background: #ffffff;
            box-shadow: 0px 0 5px rgba(60, 60, 63, 0.7);

            .module-name {
                font-size: 13px;
                line-height: 30px;
                padding: 0 10px;
                cursor: pointer;
                transition: all 0.1s linear;
                @include flex-xlyc();

                &:hover {
                    background-color: #3c7eff;
                    color: #ffffff;
                }
            }

            .onThisM{
                background-color: #3c7eff;
                color: #ffffff;
            }

            .module-icon {
                width: 20px;
                height: 20px;
                margin: 0 10px 0 15px;
            }
        }
    }
</style>