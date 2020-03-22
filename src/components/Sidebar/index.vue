<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse"
                 text-color="#4B5774" active-text-color="#FFFFFF" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon" class="menu-icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index" @click="handleCol">
                                <template slot="title">
                                    <i :class="item.icon" class="menu-icon"></i><span
                                        slot="title">{{ subItem.title }}</span>
                                </template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index" @click="handleCol">
                                <i :class="item.icon" class="menu-icon"></i><span
                                    slot="title">{{ subItem.title }}</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index" @click="handleCol">
                        <i :class="item.icon" class="menu-icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>

    export default {
        name: '',
        props: ['list'],
        data() {
            return {
                collapse: false,
                items: this.list,
            }
        },
        computed: {
            onRoutes() {
                return this.$route.path.replace('/', '');
            }
        },
        created() {

        },
        methods: {
            handleCol() {
                // this.collapse = true
                // this.$parent.collapse = this.collapse
            },

            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },

            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .sidebar {
        width: 250px;
        background-color: #fff;
        overflow-y: scroll;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
    }

    .sidebar::-webkit-scrollbar {
        width: 0;
    }
</style>
