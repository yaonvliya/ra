/*
 * @Description:地图画图封装类
 * @Author: gaop
 * @Date: 2019-06-27 14:10:22
 * @LastEditTime: 2019-09-19 09:09:45
 */
import proj from 'ol/proj';
import Stroke from 'ol/style/stroke';
import Style from 'ol/style/style';
import Circle from 'ol/style/circle';
import Fill from 'ol/style/fill';
import Select from 'ol/interaction/select';
import VectorSource from 'ol/source/vector';
import VectorLayer from 'ol/layer/vector';
import GeoJSON from 'ol/format/geojson';

let SelectTool = function (options) {
    this._init(options);
};
SelectTool.prototype = {
    /**
     * 工具初始化函数
     */
    _init(options) {
        this.map = options.map;
        this.select = null;
    },

    /**
     *
     * @param {*} options:(layers:[],callback:function,multi:false)
     */
    startSelect(options) {
        let layers = options.layers;
        let callback = options.callback;

        if (this.select) {
            this.map.removeInteraction(this.select);
            this.select = null;
        }
        this.select = new Select({
            layers: layers,
            hitTolerance: 4,
            multi: options.multi ? options.multi : false,
            // style: this.selectStyleFunction()
        });
        this.map.addInteraction(this.select);
        this.select.on('select', evt => {
            if (callback && evt.selected.length > 0) {
                callback({feature: new GeoJSON().writeFeatureObject(evt.selected[0])});
            }
        });
    },
    //清除所有选中
    clear() {
        this.select.getFeatures().clear();
    },
    //增加一个选中要素
    push(ft) {
        this.select.getFeatures().push(ft);
    },

    reStartSelect() {
        this.select.setActive(true);
    },

    stopSelect() {
        this.select.setActive(false);
    },

    selectStyleFunction() {
        return new Style({
            image: new Circle({
                radius: 8,
                stroke: new Stroke({
                    color: 'rgba(0, 255, 255, 1)',
                    width: 1
                }),
                fill: new Fill({
                    color: '#ffcc33'
                })
            }),

            fill: new Fill({
                color: 'rgba(255, 255, 255, 0.4)'
            }),
            stroke: new Stroke({
                color: 'rgba(0, 255, 255, 1)',
                width: 4
                // lineDash: [10, 10]
            })
        });
    }
};

export default SelectTool;
