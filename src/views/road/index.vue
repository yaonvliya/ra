<template>
    <div class="content">
        <s-sidebar :list="items"></s-sidebar>

        <!--右侧-->
        <router-view tag="div" class="right-content"></router-view>
    </div>
</template>

<script>
    import sSidebar from '@/components/Sidebar';

    export default {
        name: "roadManage",
        components: {
            sSidebar,
        },
        data() {
            return {
                items: [
                    {
                        icon: "el-icon-menu",
                        index: 'roadAnalysis',
                        title: '分析研判',
                        subs: [
                            {
                                icon: '',
                                index: 'roadAnalysisAccident',
                                title: '事故分析',
                            },
                            {
                                icon: '',
                                index: 'roadAnalysisIllegal',
                                title: '违法分析',
                            },
                            {
                                icon: '',
                                index: 'roadAnalysisWarning',
                                title: '警情查询',
                            },
                            {
                                icon: '',
                                index: 'roadAnalysisUserDefined',
                                title: '自定义区域研判',
                            }
                        ]
                    },
                    {
                        icon: '',
                        index: 'roadSpot',
                        title: '黑点管理',
                        subs: [
                            {
                                icon: '',
                                index: 'roadSpotSituation',
                                title: '黑点概况',
                            },
                            {
                                icon: '',
                                index: 'roadSpotReport',
                                title: '手动上报',
                            },
                            {
                                icon: '',
                                index: 'roadSpotAdminister',
                                title: '黑点治理',
                            },
                            {
                                icon: '',
                                index: 'roadSpotQuery',
                                title: '黑点查询',
                            }
                        ]
                    },

                    {
                        icon: '',
                        index: 'roadHidden',
                        title: '隐患管理',
                        subs: [
                            {
                                icon: '',
                                index: 'roadHiddenSituation',
                                title: '隐患概况',
                            },
                            {
                                icon: '',
                                index: 'roadHiddenReport',
                                title: '隐患上报',
                            },
                            {
                                icon: '',
                                index: 'roadHiddenAdminister',
                                title: '隐患治理',
                            },
                            {
                                icon: '',
                                index: 'roadHiddenQuery',
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
        overflow: hidden;
    }
</style>

<style lang="scss">
    @import "../../assets/css/styles/content.scss";
</style>