<template>
    <div class="content">
        <!--地图-->
        <s-map></s-map>
        <s-sidebar :list="items"></s-sidebar>
    </div>
</template>

<script>
    import sMap from './components/Map'
    import sSidebar from '@/components/Sidebar'
    import menu_icon from '@/assets/images/menu_2.png';

    export default {
        name: "areaManage",
        components: {
            sMap,
            sSidebar,
        },
        data() {
            return {
                items: [
                    {
                        icon: menu_icon,
                        index: 'securitySituation',
                        title: '分析研判',
                        subs: [
                            {
                                icon: '',
                                index: 'sgRegionAnalysis',
                                title: '事故分析',
                            },
                            {
                                icon: '',
                                index: 'wfRegionAnalysis',
                                title: '违法分析',
                            },
                            {
                                icon: '',
                                index: 'jqRegionAnalysis',
                                title: '警情查询',
                            },
                            {
                                icon: '',
                                index: 'spaceAreaAnalysis',
                                title: '自定义区域研判',
                            }
                        ]
                    },
                    {
                        icon: '',
                        index: 'regionAnalysis',
                        title: '黑点管理',
                        subs: [
                            {
                                icon: '',
                                index: 'sgRegionAnalysis',
                                title: '事故研判',
                            },
                            {
                                icon: '',
                                index: 'wfRegionAnalysis',
                                title: '违法研判',
                            },
                            {
                                icon: '',
                                index: 'jqRegionAnalysis',
                                title: '警情研判',
                            },
                            {
                                icon: '',
                                index: 'spaceAreaAnalysis',
                                title: '自定义区域研判',
                            }
                        ]
                    },

                    {
                        icon: '',
                        index: 'roadAnalysis',
                        title: '隐患管理',
                        subs: [
                            {
                                icon: '',
                                index: 'sgRoadAnalysis',
                                title: '事故研判',
                            },
                            {
                                icon: '',
                                index: 'wfRoadAnalysis',
                                title: '违法研判',
                            },
                            {
                                icon: '',
                                index: 'jqRoadAnalysis',
                                title: '警情研判',
                            },
                            {
                                icon: '',
                                index: 'spaceRoadAnalysis',
                                title: '自定义起止点研判',
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
    }
</style>