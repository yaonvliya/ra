<template>
    <div>
        <!--地图-->
        <RaMap class="map-div"></RaMap>

        <!--查询分析面板-->
        <div class="analysis-panel" :style="{right:openPanel?'0':'-300px'}">
            <div class="clickBtn xc-yc" @click="changePanel"><i style="font-size: 10px; font-weight: bold"
                                                                :class="openPanel?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i>
            </div>

            <!--<div class="analysis-panel-div">-->
            <el-tabs class="analysis-panel-tabs" v-model="panelName" @tab-click="handleClick">
                <el-tab-pane label="条件" name="select">
                    <div class="analysis-panel-tabs-select">
                        <el-form label-position="right" label-width="65px" :model="form">
                            <el-form-item label="区域范围">
                                <el-row>
                                    <el-col :span="11">
                                        <el-select v-model="form.qyfw[0]" collapse-tags placeholder="请选择"
                                                   class="width100">
                                            <el-option v-for="item in qyfwOptions1" :key="item.value"
                                                       :label="item.label"
                                                       :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="2" class="xc-yc"></el-col>
                                    <el-col :span="11">
                                        <multiple-options :datas="qyfwOptions2" ref="qyfw"
                                                          class="width100"></multiple-options>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item label="时间范围">
                                <el-row>
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="选择日期"
                                                        v-model="form.sjfw[0]"
                                                        value-format="yyyy-MM-dd" :editable="false"
                                                        :clearable="false"
                                                        class="width100"></el-date-picker>
                                    </el-col>
                                    <el-col :span="2" class="xc-yc">-</el-col>
                                    <el-col :span="11">
                                        <el-date-picker type="date" placeholder="选择日期"
                                                        v-model="form.sjfw[1]"
                                                        value-format="yyyy-MM-dd" :editable="false"
                                                        :clearable="false"
                                                        class="width100"></el-date-picker>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item label="分析对象">
                                <el-select v-model="form.fxdx" collapse-tags placeholder="请选择"
                                           class="width100">
                                    <el-option v-for="item in fxdxOptions" :key="item.value"
                                               :label="item.label"
                                               :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="分析层面">
                                <el-row>
                                    <el-col :span="11">
                                        <el-select v-model="form.fxcm[0]" collapse-tags placeholder="请选择"
                                                   class="width100">
                                            <el-option v-for="item in qyfwOptions1" :key="item.value"
                                                       :label="item.label"
                                                       :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="2" class="xc-yc"></el-col>
                                    <el-col :span="11">
                                        <el-select v-model="form.fxcm[0]" collapse-tags placeholder="请选择"
                                                   class="width100">
                                            <el-option v-for="item in qyfwOptions2" :key="item.value"
                                                       :label="item.label"
                                                       :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item label="长度范围">
                                <el-row>
                                    <el-col :span="11">
                                        <el-input v-model="form.cdfw[0]" placeholder=""
                                                  class="width100"></el-input>
                                    </el-col>
                                    <el-col :span="2" class="xc-yc">-</el-col>
                                    <el-col :span="11">
                                        <el-input v-model="form.cdfw[1]" placeholder=""
                                                  class="width100"></el-input>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item label="分析指标">
                                <el-row>
                                    <el-col :span="11">
                                        <el-select v-model="form.fxzb[0]" collapse-tags placeholder="请选择"
                                                   class="width100">
                                            <el-option v-for="item in fxzbOptions1" :key="item.value"
                                                       :label="item.label"
                                                       :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="2" class="xc-yc"></el-col>
                                    <el-col :span="11">
                                        <el-select v-model="form.fxzb[0]" collapse-tags placeholder="请选择"
                                                   class="width100">
                                            <el-option v-for="item in fxzbOptions2" :key="item.value"
                                                       :label="item.label"
                                                       :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item label="分析方法">
                                <el-row>
                                    <el-col :span="11">
                                        <el-select v-model="form.fxff[0]" collapse-tags placeholder="请选择"
                                                   class="width100">
                                            <el-option v-for="item in fxffOptions1" :key="item.value"
                                                       :label="item.label"
                                                       :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="2" class="xc-yc"></el-col>
                                    <el-col :span="11">
                                        <el-select v-model="form.fxff[0]" collapse-tags placeholder="请选择"
                                                   class="width100">
                                            <el-option v-for="item in fxffOptions2" :key="item.value"
                                                       :label="item.label"
                                                       :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                            <el-form-item label="查询数量">
                                <el-select v-model="form.cxsl" collapse-tags placeholder="请选择"
                                           class="width100">
                                    <el-option v-for="item in cxslOptions" :key="item.value"
                                               :label="item.label"
                                               :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="数据来源">
                                <el-select v-model="form.sjly" collapse-tags placeholder="请选择"
                                           class="width100">
                                    <el-option v-for="item in sjlyOptions" :key="item.value"
                                               :label="item.label"
                                               :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="上报类型">
                                <el-select v-model="form.sblx" collapse-tags placeholder="请选择"
                                           class="width100">
                                    <el-option v-for="item in sblxOptions" :key="item.value"
                                               :label="item.label"
                                               :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                    <el-row style="position: fixed; bottom: 31px; width: 301px; z-index: 55">
                        <el-button type="primary" :loading="load" @click="startSearch()"
                                   class=""
                                   style="margin-left: 5px; height: 32px;">
                            分析
                        </el-button>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="结果" name="result">
                    <!--<div class="table-container" v-show="isRS">-->
                    <!--<transition name="el-fade-in-linear">-->
                    <!--<el-row :span="24" class="table-level">-->
                    <!--<div class="table-level-div" v-for="(level,index) in levels" :key="index">-->
                    <!--&lt;!&ndash;<el-col :span="4" v-if="index!=0">-></el-col>&ndash;&gt;-->
                    <!--<el-col :span="20" class="level xc-yc" :class="levelIndex == index ? 'level-on' : ''" @click.native="backSearch(index)">{{ level }}-->
                    <!--</el-col>-->
                    <!--</div>-->
                    <!--</el-row>-->
                    <!--</transition>-->

                    <!--<el-table class="analysis-result-table" :data="dataList" highlight-current-row border @row-click="showMapPop"-->
                    <!--ref="multipleTable" @selection-change="handleSelectionChange">-->
                    <!--<el-table-column type="selection" width="30" align="center"/>-->
                    <!--<el-table-column :prop="`data`+$index" :label="item" sortable-->
                    <!--v-for="(item,$index) in this.titleList"></el-table-column>-->
                    <!--</el-table>-->
                    <!--</div>-->
                    <!--<div class="table-tool xr-yc" style="position: fixed; bottom: 31px; width: 301px; z-index: 55">-->
                    <!--<el-tooltip effect="dark" placement="top" content="控制标注图层"-->
                    <!--class="xr-yc cursor-pointer">-->
                    <!--<i class="el-icon-m el-icon-s-opportunity"-->
                    <!--:class="labelVisable==true?'el-icon-on':''"-->
                    <!--style="font-size: 20px;"-->
                    <!--@click="labelLyrController()"></i>-->
                    <!--</el-tooltip>-->
                    <!--<el-tooltip effect="dark" placement="top" content="分析"-->
                    <!--class="xr-yc cursor-pointer" style="margin-left: 22px;">-->
                    <!--<i class="el-icon-m el-icon-pie-chart"-->
                    <!--style="font-size: 20px; color: #7D8298;" @click="analysisResults()"></i>-->
                    <!--</el-tooltip>-->
                    <!--<el-tooltip effect="dark" placement="top" :content="all_type+'清单'"-->
                    <!--class="xr-yc cursor-pointer" style="margin-left: 22px;">-->
                    <!--<i class="el-icon-m iconfont my-icon-qingdan"-->
                    <!--style="font-size: 20px; color: #7D8298;" @click="showAccidentsList()"></i>-->
                    <!--</el-tooltip>-->
                    <!--<el-tooltip effect="dark" placement="top" content="详细"-->
                    <!--class="xr-yc cursor-pointer" style="margin-left: 22px;">-->
                    <!--<i class="el-icon-m iconfont my-icon-xinxi"-->
                    <!--style="font-size: 20px; color: #7D8298;" @click="showAccidentsDetailList()"></i>-->
                    <!--</el-tooltip>-->
                    <!--</div>-->
                </el-tab-pane>
            </el-tabs>
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    import RaMap from "components/RaMap/index.vue"
    import MultipleOptions from '@/components/MultipleOptions';

    export default {
        name: "AreaAnalysisAccident",
        components: {
            RaMap,
            MultipleOptions,
        },
        data: function () {
            return {
                panelName: 'select',//条件结果显示
                openPanel: true,//panel打开


                /*管辖区域*/
                qyfwOptions1: [
                    {
                        value: 'a',
                        label: '管辖区域'
                    },
                    {
                        value: '',
                        label: '按行政区划'
                    },
                    {
                        value: '',
                        label: '自定义区域'
                    }
                ],
                /*区域范围多选项*/
                qyfwOptions2: {
                    defaultOption: [''],
                    allOption: '',
                    options: []
                },
                /*分析对象*/
                fxdxOptions: [
                    {
                        value: 'a',
                        label: '全部'
                    },
                    {
                        value: '',
                        label: '地面道路'
                    },
                    {
                        value: '',
                        label: '城市快速路'
                    },
                    {
                        value: '',
                        label: '高速公路'
                    }
                ],
                /*分析层面*/
                fxcmOptions1: [
                    {
                        value: 'a',
                        label: '宏观层面'
                    },
                    {
                        value: '',
                        label: '中观层面'
                    },
                    {
                        value: '',
                        label: '微观层面'
                    },
                    {
                        value: '',
                        label: '自定义长度'
                    }
                ],
                fxcmOptions2: [
                    {
                        value: 'a',
                        label: '全部'
                    },
                    {
                        value: '',
                        label: '路口'
                    },
                    {
                        value: '',
                        label: '路段'
                    }
                ],
                /*分析指标*/
                fxzbOptions1: [
                    {
                        value: 'a',
                        label: '处理程序'
                    },
                    {
                        value: '',
                        label: '事故类型'
                    },
                    {
                        value: '',
                        label: '车辆属地'
                    }
                ],
                fxzbOptions2: [
                    {
                        value: 'a',
                        label: '事故总数'
                    },
                    {
                        value: '',
                        label: '简易事故'
                    },
                    {
                        value: '',
                        label: '一般事故（含死亡）'
                    }
                ],
                /*分析方法*/
                fxffOptions: [
                    {
                        value: 'a',
                        label: '绝对数'
                    },
                    {
                        value: '',
                        label: '每公里密度数'
                    },
                    {
                        value: '',
                        label: '安全可提高空间'
                    }
                ],
                /*查询数量*/
                cxslOptions: [
                    {
                        value: 'a',
                        label: '前10'
                    },
                    {
                        value: '',
                        label: '前20'
                    },
                    {
                        value: '',
                        label: '前30'
                    }
                ],
                /*数据来源*/
                sjlyOptions: [
                    {
                        value: 'a',
                        label: '全部'
                    },
                    {
                        value: '',
                        label: '六合一系统'
                    }
                ],
                /*上报类型*/
                sblxOptions: [
                    {
                        value: 'a',
                        label: '全部'
                    },
                    {
                        value: '',
                        label: '上报'
                    },
                    {
                        value: '',
                        label: '非上报'
                    }
                ],

                /*双向绑定的查询条件*/
                form: {
                    "qyfw": ["a", "a"],//区域范围
                    "sjfw": ["2020-03-01", "2020-03-22"],//时间范围
                    "fxdx": "a",//分析对象
                    "fxcm": ["a", "a"],//分析层面
                    "cdfw": ["12","14"],//长度范围
                    "fxzb": ["a", "a"],//分析指标
                    "fxff": "a",//分析方法
                    "cxsl": "a",//查询数量
                    "sjly": "a",//数据来源
                    "sblx": "a",//上报类型
                },

            };
        },
        methods: {
            /*条件panel*/
            changePanel() {
                this.openPanel = !this.openPanel;
            },

            /*tab切换*/
            handleClick() {

            }
        }
    }
</script>

<style lang="scss" scoped>
    .width100 {
        width: 100%;
    }
</style>