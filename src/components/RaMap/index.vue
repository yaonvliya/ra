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
    import raMap from './RaMap.js'

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

    import blackSpot_url from '../../assets/images/blackspot.png'

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
            /*销毁地图*/
            destroy() {
                if (this.myMap) {
                    this.myMap.destroy();
                    this.map = null;
                    this.myMap = null;
                }
            },
            /*加载图层-系统默认 业务serviceLayer、操作炳operateLayer、标注labelLayer、辅助supLayer*/
            initLayers() {
                let colorFillList = [[255, 0, 0], [153, 0, 0], [102, 0, 0]]
                /*业务图层 参数：type、level,方法：点击事件*/
                let serviceStyle = function (feature) {
                    let type = feature.get('type');
                    let level = feature.get('level');
                    let color = level ? colorFillList[level] : colorFillList[0]
                    if (type == "analysis_points") {
                        return new Style({
                            image: new Circle({
                                radius: 4,
                                stroke: new Stroke({
                                    color: '#000000',
                                    width: 1
                                }),
                                fill: new Fill({
                                    color: 'rgba(' + color.join(",") + ',1)'
                                })
                            })
                        })
                    } else if (type == "analysis_lines") {
                        return [new Style({
                            stroke: new Stroke({
                                color: 'rgba(' + color.join(",") + ',1)',
                                width: 4
                            })
                        })];
                    } else if (type == "analysis_areas") {
                        return new Style({
                            fill: new Fill({
                                color: 'rgba(' + color.join(",") + ',0.5)'
                            }),
                            stroke: new Stroke({
                                color: 'rgba(' + color.join(",") + ',1)',
                                width: 1,
                                lineDash: [10, 10]
                            })
                        });
                    } else if (type == "grids") {
                        let fillColor = feature.get('fillColor');
                        let borderColor = feature.get('borderColor');
                        let opacity = feature.get('opacity');
                        let fillc = raMap.colorRgb(fillColor);
                        fillc.push(opacity);
                        let borferc = raMap.colorRgb(borderColor);
                        borferc.push(opacity);
                        return new Style({
                            fill: new Fill({
                                color: fillc
                            }),
                            stroke: new Stroke({
                                color: borferc,
                                width: 1
                            })
                        });
                    }
                }
                let serviceOption = {
                    lyName: 'serviceLayer',
                    lyType: 'vec',
                    zIndex: 100,
                    style: serviceStyle
                }
                this.layerManager.addLayer(serviceOption)
                this.layerManager.onClickEvent('serviceLayer', e => {
                });
                /*操作炳图层 参数：type,方法：上浮事件*/
                let operateStyle = function (feature) {
                    let type = feature.get('type');
                    let level = feature.get('level');
                    let color = level ? colorFillList[level] : colorFillList[0]
                    if (type == "analysis_points" || type == "analysis_lines" || type == "analysis_areas") {
                        return new Style({
                            image: new Circle({
                                radius: 5,
                                fill: new Fill({
                                    color: 'rgba(' + color.join(",") + ',1)'
                                })
                            })
                        });
                    } else if (type == "blackSpot") {
                        return new Style({
                            image: new Icon({
                                src: blackSpot_url,
                                scale: feature.get('scale')
                            })
                        });
                    }
                };
                let operateOpt = {
                    lyName: 'operateLayer',
                    lyType: 'vec',
                    zIndex: 100,
                    style: operateStyle
                };
                this.layerManager.addLayer(operateOpt);
                this.layerManager.onMouseEvent('operateLayer', e => {
                });
                /*标注图层 参数：text*/
                let labelStyle = function (feature) {
                    return new Style({
                        text: new Text({
                            textAlign: 'center', //位置
                            textBaseline: 'middle', //基准线
                            font: 'bold 14px 微软雅黑', //文字样式
                            text: feature.get('text'), //文本内容
                            fill: new Fill({color: '#0dfffc'}), //文本填充样式（即文字颜色）
                            stroke: new Stroke({color: '#001a20', width: 3}),
                            overflow: false, //文字之间是否压盖
                            placement: 'point',
                            offsetY: 15,//向下偏移
                        })
                    });
                };
                let labelOpt = {
                    lyName: 'labelLayer',
                    lyType: 'vec',
                    zIndex: 100,
                    style: labelStyle
                };
                this.layerManager.addLayer(labelOpt);
                /*辅助图层 参数：type*/
                let supStyle = function (feature) {
                    let type = feature.get('type');
                    if (type == "startPt" || type == "endPt") {
                        return new Style({
                            image: new Icon({
                                src: eval(type + "_url"),
                                anchor: [0.5, 1]
                            })
                        })
                    }
                };
                let supOpt = {
                    lyName: 'supLayer',
                    lyType: 'vec',
                    zIndex: 1000,
                    style: supStyle
                };
                this.layerManager.addLayer(supOpt);

                this.selectTool.startSelect({layers: [this.layerManager.getLayer('serviceLayer')]});
            },
            /*更新地图尺寸*/
            updateMapSize() {
                let _this = this
                setTimeout(function () {
                    _this.map.updateSize()
                }, 500)
            },
            /*改变图层显示隐藏*/
            changeLayerVisible(layerName, visible) {
                this.layerManager.setVisible(layerName, visible);
            },
            /*清空图层*/
            clearMap(layerName) {
                this.stopMeasure()
                this.clearMeasure()
                this.selectTool.clear()
                if(layerName){
                    this.layerManager.clearLayer(layerName)
                }else{
                    this.layerManager.clearLayer('serviceLayer')
                    this.layerManager.clearLayer('operateLayer')
                    this.layerManager.clearLayer('labelLayer')
                    this.layerManager.clearLayer('supLayer')
                }

            },
            /*添加点要素、文字要素、操作炳*/
            addPonit(x, y, attr,layerName) {
                let pt = UnitilyGis.createPointFt([Number(x), Number(y)],attr)
                this.layerManager.addFeature(layerName, pt)
            },
            /*添加线要素*/
            addLine(points,attr,layerName){
                let lineFt = UnitilyGis.createLineFt(points,attr)
                this.layerManager.addFeature(layerName, lineFt)
            },
            /*添加面要素*/
            addArea(points,attr,layerName){
                let polygonFt = UnitilyGis.createPolygonFt(points,attr)
                this.layerManager.addFeature(layerName, polygonFt)
            },
            /*定位到*/
            centerTo(location, level) {
                this.myMap.centerTo(location, level);
            },
            /*根据id查找到点要素，定位并缩放*/
            centerAndZoom(lyName, id) {
                let fts = this.layerManager
                    .getLayer(lyName)
                    .getSource()
                    .getFeatures();
                for (let i = 0; i < fts.length; i++) {
                    if (fts[i].get('id') == id) {
                        this.myMap.centerTo(fts[i].getGeometry().getCoordinates(), 12);
                        break;
                    }
                }
            },
            /*高亮显示要素并缩放到制定范围*/
            extentAndselect(lyName, id) {
                let fts = this.layerManager.getLayer(lyName).getSource().getFeatures();
                for (let i = 0; i < fts.length; i++) {
                    if (fts[i].get('id') == id) {
                        let ext = fts[i].getGeometry().getExtent();
                        this.myMap.setExtent(ext);
                        this.selectTool.clear();
                        this.selectTool.push(fts[i]);
                        break;
                    }
                }
            },
            /*在图层中去除要素*/
            deleteFeature(lyName, id) {
                let fts = this.layerManager.getLayer(lyName).getSource().getFeatures();
                for (let i = 0; i < fts.length; i++) {
                    if (fts[i].get('id') == id) {
                        this.layerManager.getLayer(lyName).getSource().removeFeature(fts[i]);
                        break;
                    }
                }
            },
            /*获取图层中的要素线性*/
            getPathFromLayer(layer) {
                let fs = this.layerManager.getLayer(layer).getSource().getFeatures();
                let resList = []
                for (let i = 0; i < fs.length; i++) {
                    let coords = fs[i].getGeometry().getCoordinates()
                    resList.push(coords)
                }
                return resList
            },
            /*开始绘图*/
            startDraw(type, isSnap, callback) {
                this.drawTool.startDraw(type, isSnap, callback);
            },
            /*关闭绘图*/
            stopDraw() {
                this.drawTool.stopDraw();
            },
            /*重启绘图*/
            reStartDraw() {
                this.drawTool.reStartDraw();
            },
            /*清空绘图*/
            clearDraw() {
                this.drawTool.clearDraw();
            },
            /*开始测量*/
            startMeasure(type) {
                this.measureTool.startMeasure(type);
            },
            /*结束测量*/
            stopMeasure() {
                this.measureTool.stopMeasure();
            },
            /*清空测量*/
            clearMeasure() {
                this.measureTool.clearMeasure();
            }
        },
        mounted: function () {
            let _this = this
            setTimeout(function () {
                _this.destroy();
                _this.initMap();
                _this.updateMapSize()
            }, 500);
        }
    }
</script>

<style scoped>
    .map_div {
        height: 100%;
        width: 100%;
    }
    #ra_map {
        position: relative;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
    }
</style>