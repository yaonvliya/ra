<template>
    <div class="com">
        <p class="com-item">首页</p>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {

            }
        },
        mounted() {

        },
        methods:{

        }
    }
</script>

<style lang="scss" scoped>
    .com {
        font-size: px2rem(12);
        width: px2rem(1920);
        height: 20%;
        color: $red;
        background-color: #222222;
        @include flex();

        .com-item {
            padding: px2rem(12);
            color: red;
        }
    }
</style>
