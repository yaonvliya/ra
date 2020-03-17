<template>
    <div class="bg">
        <Header></Header>
        <transition name="el-fade-in-linear">
            <div class="sys-body">
                <router-view></router-view>
            </div>
        </transition>
    </div>
</template>

<script>
    import Header from './components/Head'

    export default {
        name: 'MainPanel',
        components: {
            Header,
        },
        data() {
            return {}
        },
        methods: {},
    }
</script>

<style lang="scss" scoped>
    .bg {
        background-color: rgba(9, 110, 255, 0.5);
        width: 100%;
        height: 100%;

        .sys-body {
            width: calc(100% - 20px);
            height: calc(100% - 60px);
            margin: 0 auto;
            /*background-color: #bbd8ff;*/
        }
    }

    .com {
        font-size: px2rem(12);
        width: px2rem(1920);
        height: 20%;
        color: $red;
        background-color: #222222;
        @include flex-xcyc();

        .com-item {
            padding: px2rem(12);
            color: red;
        }
    }
</style>
