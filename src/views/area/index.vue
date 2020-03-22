<template>
    <div class="content">
        <s-sidebar :list="items"></s-sidebar>

        <!--右侧-->
        <router-view></router-view>
    </div>
</template>

<script>
    import sSidebar from '@/components/Sidebar'
    import menu_icon from '@/assets/images/menu_2.png';

    export default {
        name: "areaManage",
        components: {
            sSidebar,
        },
        data() {
            return {
                items: [
                    {
                        icon: "el-icon-menu",
                        index: 'areaAnalysis',
                        title: '分析研判',
                        subs: [
                            {
                                icon: '',
                                index: 'areaAnalysisAccident',
                                title: '事故分析',
                            },
                            {
                                icon: '',
                                index: 'areaAnalysisIllegal',
                                title: '违法分析',
                            },
                            {
                                icon: '',
                                index: 'areaAnalysisWarning',
                                title: '警情查询',
                            },
                            {
                                icon: '',
                                index: 'areaAnalysisUserDefined',
                                title: '自定义区域研判',
                            }
                        ]
                    },
                    {
                        icon: '',
                        index: 'areaSpot',
                        title: '黑点管理',
                        subs: [
                            {
                                icon: '',
                                index: 'areaSpotSituation',
                                title: '黑点概况',
                            },
                            {
                                icon: '',
                                index: 'areaSpotReport',
                                title: '手动上报',
                            },
                            {
                                icon: '',
                                index: 'areaSpotAdminister',
                                title: '黑点治理',
                            },
                            {
                                icon: '',
                                index: 'areaSpotQuery',
                                title: '黑点查询',
                            }
                        ]
                    },

                    {
                        icon: '',
                        index: 'areaHidden',
                        title: '隐患管理',
                        subs: [
                            {
                                icon: '',
                                index: 'areaHiddenSituation',
                                title: '隐患概况',
                            },
                            {
                                icon: '',
                                index: 'areaHiddenReport',
                                title: '隐患上报',
                            },
                            {
                                icon: '',
                                index: 'areaHiddenAdminister',
                                title: '隐患治理',
                            },
                            {
                                icon: '',
                                index: 'areaHiddenQuery',
                                title: '隐患查询',
                            }
                        ]
                    },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .content {
        position: relative;
        width: 100%;
        height: 100%;
        @include flex-xl();
    }
</style>

<style lang="scss">
    @import "../../assets/css/styles/content.scss";
</style>