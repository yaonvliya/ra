<template>
    <div class="bg">
        <Header></Header>
        <transition name="el-fade-in-linear">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import Header from './components/Head'

    export default {
        name:'Index',
        components: {
            Header,

        },
        data() {
            return {

            }
        },
        methods:{

        },
    }
</script>

<style lang="scss" scoped>
    .bg {
        background-color: rgba(9, 110, 255, 0.5);
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
