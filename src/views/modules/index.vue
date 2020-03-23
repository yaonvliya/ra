<template>
    <div class="content">
        <div class="user">
            <p>小刘</p>
            <img :src="police"/>
        </div>
        <div class="modules">
            <el-row :gutter="20">
                <el-col :span="6" v-for="(item,index) in modules" :key="index">
                    <div :style="{backgroundImage:'url(' + item.bg + ')'}" class="m-div"
                         :class="mIndex == index?'on-this':''"
                         @click="changeModule(index,item.to)">
                        <img :src="item.icon"/>
                        <p>{{item.name}}</p>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="team">技术支持：同济大学</div>
    </div>
</template>

<script>
    import police from "@/assets/images/police.png";
    import bg_1 from "@/assets/images/modules/bg_1.png";
    import bg_2 from "@/assets/images/modules/bg_2.png";
    import bg_3 from "@/assets/images/modules/bg_3.png";
    import bg_4 from "@/assets/images/modules/bg_4.png";
    import bg_5 from "@/assets/images/modules/bg_5.png";
    import bg_6 from "@/assets/images/modules/bg_6.png";
    import bg_7 from "@/assets/images/modules/bg_7.png";
    import bg_8 from "@/assets/images/modules/bg_8.png";
    import securityIcon from "@/assets/images/modules/security_icon.png";
    import areaIcon from "@/assets/images/modules/area_icon.png";
    import roadIcon from "@/assets/images/modules/road_icon.png";
    import transportIcon from "@/assets/images/modules/transport_icon.png";
    import serviceIcon from "@/assets/images/modules/service_icon.png";
    import vehicleIcon from "@/assets/images/modules/vehicle_icon.png";
    import driverIcon from "@/assets/images/modules/driver_icon.png";
    import reportIcon from "@/assets/images/modules/report_icon.png";
    import warningIcon from "@/assets/images/modules/warning_icon.png";
    import dataIcon from "@/assets/images/modules/data_icon.png";

    export default {
        name: "modules",
        data() {
            return {
                police,
                mIndex: 0,//当前选中的模块
                modules: [//模块菜单
                    {
                        name: "安全态势",
                        to: "/security",
                        icon: securityIcon,
                        bg: bg_1,
                    },
                    {
                        name: "区域安全管理",
                        to: "/area",
                        icon: areaIcon,
                        bg: bg_2,
                    },
                    {
                        name: "道路安全管理",
                        to: "/road",
                        icon: roadIcon,
                        bg: bg_3,
                    },
                    {
                        name: "营运安全管理",
                        to: "/transport",
                        icon: transportIcon,
                        bg: bg_4,
                    },
                    {
                        name: "勤务优化管理",
                        to: "/service",
                        icon: serviceIcon,
                        bg: bg_5,
                    },
                    {
                        name: "车辆安全管理",
                        to: "/vehicle",
                        icon: vehicleIcon,
                        bg: bg_6,
                    },
                    {
                        name: "驾驶员安全管理",
                        to: "/driver",
                        icon: driverIcon,
                        bg: bg_7,
                    },
                    {
                        name: "报表报告",
                        to: "/report",
                        icon: reportIcon,
                        bg: bg_8,
                    },
                    {
                        name: "预警设置",
                        to: "/warning",
                        icon: warningIcon,
                        bg: bg_1,
                    },
                    {
                        name: "数据管理",
                        to: "/data",
                        icon: dataIcon,
                        bg: bg_2,
                    },
                ],
            }
        },
        methods: {
            changeModule(index, path) {
                this.mIndex = index
                this.$router.push({path: path});

            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                // console.log(to)
                // console.log(from)
                // console.log(from.path)
            })
        },
    }
</script>

<style lang="scss" scoped>
    .content {
        background: rgba(230, 235, 238, 0.3);
        width: calc(100% - 3.75vw);
        height: 100%;
        padding: 0 px2rem(36);

        .user {
            width: 100%;
            height: px2rem(140);
            @include flex-xryc();

            p {
                color: #172034;
                font-size: px2rem(18);
                margin-right: px2rem(14);
            }

            img {
                border-radius: 50%;
                width: px2rem(38);
                height: px2rem(38);
            }
        }

        .modules {
            padding: 0 px2rem(114);
            height: px2rem(565);

            .m-div {
                height: px2rem(160);
                background-size: 100% 100%;
                margin: 0 px2rem(24) px2rem(42);
                border-radius: 6px;
                box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
                transition: all 0.1s linear;
                cursor: pointer;
                @include flex-xccolyc();

                &:hover {
                    border-radius: 10px !important;
                    border: 4px solid rgba(255, 255, 255, 0.85);
                    box-sizing: border-box;
                    transform: scale(1.1);
                    box-shadow: 0 3px 10px rgba(47, 96, 149, 1) !important;
                }

                img {
                    width: px2rem(36);
                    width: px2rem(42);
                    margin-bottom: px2rem(11);
                }

                p {
                    font-size: px2rem(24);
                    color: #fff;
                }
            }

            .el-row>.el-col:nth-child(9) .m-div,
            .el-row>.el-col:nth-child(10) .m-div {
                margin-bottom: 0;
            }
        }

        .on-this {
            border-radius: 10px !important;
            border: 4px solid rgba(255, 255, 255, 0.85);
            box-sizing: border-box;
            transform: scale(1.1);
            box-shadow: 0 3px 10px rgba(47, 96, 149, 1) !important;
        }

        .team {
            width: 100%;
            height: px2rem(130);
            padding-top: px2rem(30);
            color: #C2C7D1;
            font-size: px2rem(12);
            transform: scale(0.9);
            @include flex-xcyc();
        }
    }

</style>