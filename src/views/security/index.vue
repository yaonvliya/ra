<template>
    <div class="content">
        <!--地图-->
        <RaMap></RaMap>

        <!--地图组件-->
        <div class="analysis-scope-1">
            <el-col class="scope-col">
                <img :src="icon"/>
                <el-dropdown class="areaDropdown" trigger="click" @command="chooseArea">
                    <span class="el-dropdown-link">
                        {{area}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" class="mapDropdownItem">
                        <el-dropdown-item v-for="(item,index) in areas" :key="index" :command=item.name>{{item.name}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
            <el-col class="scope-col" v-for="(item,index) in roads" :key="index" @click.native="chooseType(index)"
                    :class="index == roadIndex?'onThisRoad':''">
                <i :class=item.icon></i>
                <p>{{item.name}}</p>
            </el-col>
        </div>

        <div class="analysis-scope-2">
            <div class="zq">周期</div>
            <div>
                <el-date-picker
                        v-model="time"
                        type="month"
                        value-format="yyyyMM"
                        format="yyyy年MM月"
                        placeholder="选择周期"
                        class="timeDropdown"
                @change="test()">
                </el-date-picker>
            </div>
        </div>

        <div class="analysis-scope-3">
            <el-checkbox-group v-model="mapList">
                <el-checkbox label="事故分布图" class="map-checkbox"></el-checkbox>
                <el-checkbox label="事故热力图" class="map-checkbox"></el-checkbox>
                <el-checkbox label="执法热力图" class="map-checkbox"></el-checkbox>
            </el-checkbox-group>
        </div>

        <!--左侧-->
        <el-row class="s-left">
            <sggk></sggk>


            <sgtz></sgtz>


            <wfgk></wfgk>

        </el-row>

        <!--底部-->
        <el-row class="s-bottom">

            <sgqs-yjxx></sgqs-yjxx>

        </el-row>

        <!--右侧-->
        <el-row class="s-right">

            <qyaq></qyaq>

            <dlaq></dlaq>

            <yyaq-claq-jsyaq></yyaq-claq-jsyaq>

        </el-row>
    </div>
</template>

<script>
    import icon from '@/assets/images/home.png'
    // import securityMethods from 'src/views/security/security-methods.js'
    import RaMap from "components/RaMap/index.vue"
    import Sggk from './components/Sggk'
    import Sgtz from './components/Sgtz'
    import Wfgk from './components/Wfgk'
    import SgqsYjxx from './components/SgqsYjxx'
    import Qyaq from './components/Qyaq'
    import Dlaq from './components/Dlaq'
    import YyaqClaqJsyaq from './components/YyaqClaqJsyaq'

    export default {
        name: "security",
        components: {
            RaMap,
            Sggk,
            Sgtz,
            Wfgk,
            SgqsYjxx,
            Qyaq,
            Dlaq,
            YyaqClaqJsyaq,
        },
        data() {
            return {
                icon,//分析范围图标
                areas: [{name: "全市"}, {name: "虎丘区"}, {name: "姑苏区"}, {name: "太湖度假区"},],//分析的区域
                area: "全市",//当前选择区域
                roads: [{name: "高速公路", icon: ""}, {name: "城市快速路", icon: ""}, {name: "地面道路", icon: ""}],//分析的道路类型
                roadIndex: 0,//分析的道路类型选中
                time: this.$publicMethods.getMonthStr(),//周期
                mapList: [""],//专题图


            }
        },
        methods: {
            chooseArea(command) {//选择当前分析区域
                this.area = command
            },

            chooseType(i) {//选择分析的道路类型
                this.roadIndex = i
            },

        },
        mounted() {

        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/css/styles/security.scss";

    .content {
        position: relative;
        width: 100%;
        height: 100%;

        /*地图组件*/
        .analysis-scope-1 {
            position: absolute;
            z-index: 50;
            top: 22px;
            left: calc(21% + 22px);
            border-radius: 2px;
            box-shadow: 0 1px 3px #BCBCBC;
            padding: 10px 13px;
            background: #fff;
            @include flex-xlyc();

            .scope-col {
                padding: 0 13px;
                border-right: 1px dashed rgba(130, 145, 169, 0.25);
                cursor: pointer;
                @include flex-xlyc();

                img {
                    width: 11px;
                    height: 11px;
                    margin-right: 6px;
                }

                p {
                    font-size: 12px;
                    color: #4B5774;
                    white-space: nowrap;
                }
            }

            .scope-col:last-child {
                border-right: 0;
            }

            .onThisRoad {
                color: #387DFF;
            }
        }

        .analysis-scope-2 {
            position: absolute;
            z-index: 50;
            top: 22px;
            right: calc(21% + 22px);
            height: 40px;
            border-radius: 2px;
            box-shadow: 0 3px 6px rgba(194, 193, 211, 0.6);
            background: #fff;
            @include flex-xlyc();

            .zq {
                height: 100%;
                width: 70px;
                color: #fff;
                font-size: 13px;
                @include flex-xcyc();
                background-image: linear-gradient(to bottom, #679CF6, #4072EE);
            }
        }

        .analysis-scope-3 {
            position: absolute;
            z-index: 50;
            bottom: calc(33.33% + 12px);
            right: calc(21% + 22px);
            height: 40px;
            @include flex-xlyc();
        }
    }
</style>

<style lang="scss">
    .areaDropdown, .timeDropdown {
        color: #4B5774;
        font-size: 12px;
        white-space: nowrap;
    }

    .timeDropdown {
        width: 150px !important;
    }

    .mapDropdownItem {
        li {
            color: #4B5774;
            font-size: 12px;
        }
    }

    .map-checkbox {
        height: 40px;
        line-height: 40px;
        padding: 0 13px;
        border-radius: 2px;
        background: rgba(255, 255, 255, 0.9);

        .el-checkbox__label {
            font-size: 12px;
            color: #4B5774;
        }
    }

    .right-table .el-table thead {
        color: #4B5774;
        font-size: 12px;
    }

    .right-table .el-table__body-wrapper {
        color: #172034;
        font-size: 13px;
    }
</style>