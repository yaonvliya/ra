<template>
    <el-row class="sys-head" type="flex" justify="space-between">
        <el-col :span="12" class="col">
            <img :src="logo" class="logo"/>
            <p class="title">XX市道路交通安全分析预警系统</p>
        </el-col>
        <el-col :span="12" class="col">
            <div class="menu">
                <p class="module-now">{{nowModule}}</p>
                <img :src="home" @mouseover="miniModules=true">
                <!--<router-link to="/modules"><img :src="home" @mouseover="miniModules=true"></router-link>-->
            </div>

            <el-collapse-transition>
                <div class="miniM" @mouseleave="miniModules=false" v-show="miniModules">
                    <el-col v-for="(item,index) in modules" :key="index" class="module-name"
                            :class="i == index ?'onThisM':''" @click.native="onModules(index,item.to)">
                        <img class="module-icon" :src="item.icon"/>{{item.name}}
                    </el-col>
                </div>
            </el-collapse-transition>
        </el-col>
    </el-row>
</template>

<script>
    import logo from '@/assets/images/logo.png';
    import home from '@/assets/images/home.png';

    export default {
        name: "Head",
        data() {
            return {
                logo,//警标
                home,//home键
                miniModules: false,//小型模块菜单显示
                i: 0,//小型模块菜单选中
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
                    {name: "用户中心", to: "/modules", icon: ""},
                ],
                nowModule: "安全态势",//当前选中的模块名称
            }
        },
        methods: {
            onModules(index, path) {
                this.miniModules = false
                this.i = index
                this.nowModule = this.modules[index].name
                this.$router.push({path: path});
            }
        }
    }
</script>

<style lang="scss" scoped>
    .sys-head {
        height: px2rem(63);
        width: 100%;

        .col:nth-child(1) {
            @include flex-xlyc();
        }

        .col:nth-child(2) {
            @include flex-xryc();
        }

        .logo {
            height: 4.27vh;
            margin: 0 0.36vw 0 1.3vw;
        }

        .title {
            font-size: 0.13rem;
            color: #fff;
            text-shadow: 1px 1px 3px #23449D;;
        }

        .police {
            height: 3.2vh;
            border-radius: 50%;
        }

        .police-name {
            height: 3.2vh;
            line-height: 3.2vh;
            font-size: 0.06rem;
            padding: 0 0.05vw;
            margin-right: 0.05vw;
            border-right: 1px solid #fff;
            text-align: center;
        }

        .menu {
            min-width: 9.22vw;
            height: 4.05vh;
            border-radius: 200px;
            margin-right: 0.88vw;
            background-color: rgba(26, 106, 206, 0.5);
            @include flex-xlyc();

            .module-now {
                color: #FFFFFF;
                font-size: 0.09rem;
                width: calc(100% - 2.39vw);
                text-align: center;
            }

            img {
                width: 2.39vw;
                height: 4.9vh;
            }
        }

        .miniM {
            position: absolute;
            z-index: 99;
            top: 6.08vh;
            right: 17px;
            padding: 1.38vh 0 !important;
            width: 9.375vw;
            background: #ffffff;
            box-shadow: 0px 3px 6px rgba(194, 193, 211, 0.73);
            border-radius: 4px;

            .module-name {
                font-size: 0.07rem;
                line-height: px2rem(40);
                padding: 0 px2rem(10);
                color: #4B5774;
                cursor: pointer;
                transition: all 0.1s linear;
                @include flex-xlyc();

                &:hover {
                    background-color: #3397EA;
                    color: #ffffff;
                }
            }

            .module-name:nth-child(1) {
                border-top: 1px dashed #F5F5F5;
            }

            .module-name:last-child {
                border-bottom: 1px dashed #F5F5F5;
            }


            .onThisM {
                background-color: #3397EA;
                color: #ffffff !important;
            }

            .module-icon {
                width: 20px;
                height: 20px;
                margin: 0 10px 0 15px;
            }
        }
    }
</style>