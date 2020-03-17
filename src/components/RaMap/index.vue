<!--
 * @Description: 封装地图组件及地图通用方法
 * @Author: 李占盛
 * @Date: 2020-03-17
 * @Param: 2020-03-17
 -->
<template>
    <div class="map_div">
        <div id="ra_map">
        </div>
    </div>
</template>

<script>
    import 'ol/ol.css';
    import config from '../../config/index.js'
    import TJMap from '../../utils/tjsdk/TJMap.js';
    import LayerManager from '../../utils/tjsdk/LayerManager.js';
    import DrawTool from '../../utils/tjsdk/DrawTool.js';
    import SelectTool from '../../utils/tjsdk/SelectTool.js';
    import MeasureTool from '../../utils/tjsdk/MeasureTool.js';
    import UnitilyGis from '../../utils/tjsdk/UnitilyGis.js';
    import Extent from 'ol/extent';
    import Stroke from 'ol/style/stroke';
    import Style from 'ol/style/style';
    import Circle from 'ol/style/circle';
    import Fill from 'ol/style/fill';
    import Text from 'ol/style/text';
    import Icon from 'ol/style/icon';
    import Overlay from 'ol/overlay';
    import TileLayer from 'ol/layer/tile';
    import TileWMSSource from 'ol/source/tilewms';
    import ImageLayer from 'ol/layer/image';
    import ImageWMSSource from 'ol/source/imagewms';
    import Observable from 'ol/observable';
    import Point from 'ol/geom/point';
    import olColor from 'ol/color';

    export default {
        name: "RaMap",
        data() {
            return {
                myMap: null,
                map: null,
                layerManager: null,
                drawTool: null,
                measureTool: null,
                selectTool: null,
            }
        },
        methods: {
            /*初始化地图*/
            initMap() {
                let options = {
                    target: 'ra_map',
                    controlNames: [],
                    center: [120.819907, 31.317987],
                    zoom: 10,
                    maxZoom: 18,
                    minZoom: 9,
                    mapType: 'custom',
                    lyTyles: [config.layerType]
                }
                this.myMap = new TJMap(options)
                this.map = this.myMap.map
                this.layerManager = new LayerManager({map: this.map})
                this.drawTool = new DrawTool({map: this.map})
                this.measureTool = new MeasureTool({map: this.map})
                this.selectTool = new SelectTool({map: this.map})
                this.updateMapSize()
            },
            /*更新地图尺寸*/
            updateMapSize() {
                let _this = this
                setTimeout(function () {
                    _this.map.updateSize()
                }, 500)
            },
        }
    }
</script>

<style scoped>
    .map_div {
        height: 100%;
        width: 100%;
    }
    #tjmap {
        position: relative;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
    }
</style>