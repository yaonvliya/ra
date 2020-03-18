<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse"
                 text-color="#9C9EA9" active-text-color="#ffffff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <img :src="item.icon" class="menu-icon"/><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index" @click="handleCol">
                                <template slot="title">
                                    <img :src="subItem.icon" class="menu-icon"/><span
                                        slot="title">{{ subItem.title }}</span>
                                </template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index" @click="handleCol">
                                <img :src="subItem.icon" class="menu-icon"/><span
                                    slot="title">{{ subItem.title }}</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index" @click="handleCol">
                        <img :src="item.icon" class="menu-icon"/><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '@/utils/bus';
    import img_1 from '';

    export default {
        data() {
            return {
                collapse: false,
                items: [
                    {
                        icon: '',
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
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        created() {
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        },
        methods: {
            handleCol() {
                this.collapse = true
                this.$parent.collapse = this.collapse
            }
        }
    }
</script>

<style scoped>
    .sidebar {
        display: block;
        position: absolute;
        left: 0;
        top: 64px;
        bottom: 0;
        overflow-y: scroll;
    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }

    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 250px;
    }

    .sidebar > ul {
        height: 100%;
    }

    .menu-icon {
        width: 16px;
        height: 16px;
        margin-right: 7px;
    }
    .el-menu-item:focus, .el-menu-item:hover, .el-submenu__title:focus, .el-submenu__title:hover {
        color: #ffffff !important;
    }

</style>
