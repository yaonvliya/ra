<template>
    <div class="content">
        <!--地图-->
        <s-map></s-map>
        <!--<s-sidebar></s-sidebar>-->
    </div>
</template>

<script>
    import sMap from './components/Map'
    // import sSidebar from './components/Sidebar'

    export default {
        name: "areaManage",
        components: {
            sMap,
            // sSidebar,
        },
    }
</script>

<style lang="scss" scoped>
    .content {
        position: relative;
        width: 100%;
        height: 100%;
    }
</style>