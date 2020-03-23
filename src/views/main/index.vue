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
        background-color: #ffffff;
        background-image: url("../../assets/images/index_bg.png");
        background-size: 100% 100%;
        width: 100%;
        height: 100%;

        .sys-body {
            width: calc(100% - 1.77vw);
            height: calc(100% - 8.43vh);
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
