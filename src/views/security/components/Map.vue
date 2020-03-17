<template>
    <div class="map">
        <RaMap>
            安全态势地图
        </RaMap>
    </div>
</template>

<script>
    import RaMap from "../../../components/RaMap/index.vue"

    export default {
        name: "S-MAP",
        components: {
            RaMap,
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .map {
        width: 100%;
        height: 100%;
        @include flex-xcyc();
    }
</style>