/*
 * @Description:地图画图封装类
 * @Author: gaop
 * @Date: 2019-06-27 14:10:22
 * @LastEditTime: 2019-08-28 17:25:15
 */
import proj from 'ol/proj';
import Stroke from 'ol/style/stroke';
import Style from 'ol/style/style';
import Circle from 'ol/style/circle';
import Fill from 'ol/style/fill';
import Icon from 'ol/style/icon';
import Draw from 'ol/interaction/draw';
import Snap from 'ol/interaction/snap';
import VectorSource from 'ol/source/vector';
import VectorLayer from 'ol/layer/vector';
import GeoJSON from 'ol/format/geojson';

let DrawTool = function(options) {
  this._init(options);
};
DrawTool.prototype = {
  /**
   * 工具初始化函数
   */
  _init(options) {
    this.map = options.map;
    this.draw = null;
    this.snap = null;
    this.isSnap = false;
    this._source = new VectorSource();
    this._vectorLayer = new VectorLayer({
      source: this._source,
      name: 'draw_temply',
      zIndex: 9999
    });
    if (options.style != null || options.style != undefined) {
      this._vectorLayer.setStyle(options.style);
    }
    this.map.addLayer(this._vectorLayer);
  },
  /**
   * 根据类型添加画图工具
   * param: type ('Point', 'LineString', 'Polygon',  'Circle' ，'Square'， 'Box'，'MultiPoint', 'MultiLineString', 'MultiPolygon')
   */
  startDraw(type, isSnap = false, callback) {
    if (this.draw) {
      this.map.removeInteraction(this.draw);
      this.draw = null;
    }
    this.draw = this._newInteraction(type);
    this.snap = new Snap({
      source: this._source
    });
    this.map.addInteraction(this.draw);
    this.map.addInteraction(this.snap);
    this.isSnap = isSnap;
    this.snap.setActive(this.isSnap);
    this.draw.on('drawend', evt => {
      if (callback) {
        //如果是画圆，需要定制，此处未处理
        callback({ feature: new GeoJSON().writeFeatureObject(evt.feature) });
      }
    });
  },
  /**
   * 地图画点线面要素封装类
   */
  _newInteraction(type) {
    let geometryFunction = null;
    let newDraw = null;
    if (type === 'Square') {
      geometryFunction = Draw.createRegularPolygon(4);
      newDraw = new Draw({
        source: this._source,
        type: 'Circle',
        geometryFunction: geometryFunction,
        style: this.drawStyleFunction
      });
    } else if (type === 'Box') {
      geometryFunction = Draw.createBox();
      newDraw = new Draw({
        source: this._source,
        type: 'Circle',
        geometryFunction: geometryFunction,
        style: this.drawStyleFunction
      });
    } else if(type==='Line'){
      newDraw = new Draw({
        source: this._source,
        type: 'LineString',
        maxPoints:2,
        style: this.drawStyleFunction
      });
    }
     else {
      newDraw = new Draw({
        source: this._source,
        type: type,
        style: this.drawStyleFunction
      });
    }
    return newDraw;
  },
  /**
   * @description:打开捕捉
   * @Author: gaop
   * @param :
   * @return:
   * @Date: 2019-08-28 16:31:22
   */
  startSnap() {
    this.isSnap = true;
    this.snap.setActive(true);
  },
  /**
   * @description:关闭捕捉
   * @Author: gaop
   * @param :
   * @return:
   * @Date: 2019-08-28 16:31:40
   */
  stopSnap() {
    this.isSnap = false;
    this.snap.setActive(false);
  },

  clearDraw() {
    this._source.clear();
  },

  /**
   * 重启画图工具
   */
  reStartDraw() {
    this.draw.setActive(true);
    // this.map.addInteraction(this.draw);
  },
  /**
   * 关闭画图工具
   */
  stopDraw() {
    if(this.draw){
      this.draw.setActive(false);
    }
    // this.map.removeInteraction(this.draw);
  },
  /**
   * 事件对象，数据转换函数，将画完的图形转换为WGS-84坐标的geojson格式
   * param:ol.interaction.Draw.Event
   */
  eventDataTools: function(evt) {
    let cFeature = evt.feature;
    if (evt.feature.getGeometry().getType() === 'Circle') {
      let data = {};
      data.type = 'Circle';
      data.center = evt.feature.getGeometry().getCenter();
      data.radius = evt.feature.getGeometry().getRadius();
      return data;
    } else {
      let geoFormat = new GeoJSON();
      let data = geoFormat.writeFeature(cFeature, {
        dataProjection: proj.get('EPSG:4326'),
        featureProjection: proj.get('EPSG:3857')
      });
      return data;
    }
  },
  drawStyleFunction() {
    return new Style({
      image: new Circle({
        radius: 8,
        stroke: new Stroke({
          color: '#000000',
          width: 1
        }),
        fill: new Fill({
          color: '#ffcc33'
        })
      }),

      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new Stroke({
        color: '#ffcc33',
        width: 2
        // lineDash: [10, 10]
      })
    });
  }
};

export default DrawTool;
