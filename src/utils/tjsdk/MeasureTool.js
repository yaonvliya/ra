/*
 * @Description:测量工具类
 * @Author: gaop
 * @Date: 2019-08-28 17:34:34
 * @LastEditTime: 2019-09-18 09:36:58
 */
import VectorSource from 'ol/source/vector';
import VectorLayer from 'ol/layer/vector';
import Sphere from 'ol/sphere';
import Stroke from 'ol/style/stroke';
import proj from 'ol/proj';
import LineString from 'ol/geom/linestring';
import Polygon from 'ol/geom/polygon';
import Style from 'ol/style/style';
import Circle from 'ol/style/circle';
import Fill from 'ol/style/fill';
import Observable from 'ol/observable';
import Draw from 'ol/interaction/draw';
import Overlay from 'ol/overlay';

let MeasureTool = function(options) {
  this._init(options);
  this._initStyleString();
};
MeasureTool.prototype = {
  /**
   * 工具初始化函数
   */
  _init(options) {
    this.map = options.map; //地图对象
    this.helpTipElement = null;
    this.sketch = null;
    this.helpTip = null;
    this.measureTipElementTemp = null;
    this.measureTipTemp = null;
    this.geodesicBool = false; //开启椭球体测量
    this.wgs84Sphere = new Sphere(6378137);
    this._source = null;
    this.measure = null;
    this.pointermoveKey = null;
    this.num = 0;
    this._source = new VectorSource(); //图层数据源
    let ly = new VectorLayer({
      source: this._source,
      name: 'measure_temply',
      zIndex: 9999,
      // 绘制结束测量图形样式
      style: new Style({
        //图层样式
        fill: new Fill({
          color: 'rgba(0, 255, 0, 0.3)' //填充颜色
        }),
        stroke: new Stroke({
          color: '#000000', //边框颜色
          lineDash: [10, 10],
          width: 2.5 // 边框宽度
        }),
        image: new Circle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33'
          })
        })
      })
    });
    this.map.addLayer(ly);
  },
  /**
   * 启用大地测量
   */
  activeGeodesic() {
    this.geodesicBool = true;
  },
  /**
   * 关闭大地线测量
   */
  disactiveGeodesic() {
    this.geodesicBool = false;
  },
  /**
   * 开始测量
   * param type :传入"area"则测量面积，否则测量长度
   */
  startMeasure(type) {
    type = type == 'area' ? 'Polygon' : 'LineString';
    this.stopMeasure();
    this.measure = new Draw({
      source: this._source, //测量绘制层数据源
      type: type, //几何图形类型
      style: new Style({
        //绘制几何图形的样式
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.5)',
          lineDash: [10, 10],
          width: 2
        }),
        image: new Circle({
          radius: 5,
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.7)'
          }),
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          })
        })
      })
    });
    this.map.addInteraction(this.measure);
    this._createMeasureTipTemp(); //创建测量工具提示框
    this._createHelpTip(); //创建帮助提示框
    this.pointermoveKey = this.map.on(
      'pointermove',
      evt => {
        if (evt.dragging) {
          return;
        }
        /** @type {string} */
        let helpMsg = '单击开始测量'; //当前默认提示信息
        if (this.sketch) {
          let geom = this.sketch.getGeometry();
          if (geom instanceof Polygon) {
            helpMsg = '双击完成测量面积'; //绘制多边形时提示相应内容
          } else if (geom instanceof LineString) {
            helpMsg = '双击完成测量距离'; //绘制线时提示相应内容
          }
        }
        this.helpTipElement.innerHTML = helpMsg; //将提示信息设置到对话框中显示
        this.helpTip.setPosition(evt.coordinate); //设置帮助提示框的位置
      },
      this
    );

    //绑定交互绘制工具开始绘制的事件
    this.measure.on(
      'drawstart',
      evt => {
        this.sketch = evt.feature; //绘制的要素
        let tooltipCoord = evt.coordinate; // 绘制的坐标
        //绑定change事件，根据绘制几何类型得到测量长度值或面积值，并将其设置到测量工具提示框中显示
        this.geomChangeListener = this.sketch.getGeometry().on('change', evt => {
          let geom = evt.target; //绘制几何要素
          let output;
          if (geom instanceof Polygon) {
            output = this._formatArea(geom); //面积值
            tooltipCoord = geom.getInteriorPoint().getCoordinates(); //坐标
          } else if (geom instanceof LineString) {
            output = this._formatLength(geom); //长度值
            tooltipCoord = geom.getLastCoordinate(); //坐标
          }
          this.measureTipElementTemp.innerHTML = output; //将测量值设置到测量工具提示框中显示
          this.measureTipTemp.setPosition(tooltipCoord); //设置测量工具提示框的显示位置
        });
      },
      this
    );
    //绑定交互绘制工具结束绘制的事件
    this.measure.on(
      'drawend',
      evt => {
        this.sketch = evt.feature; // 置空当前绘制的要素对象
        let geom = this.sketch.getGeometry();
        let tooltipCoord;
        let output;
        if (geom instanceof Polygon) {
          output = this._formatArea(geom); // 面积值
          tooltipCoord = geom.getInteriorPoint().getCoordinates(); // 坐标
        } else if (geom instanceof LineString) {
          output = this._formatLength(geom); // 长度值
          tooltipCoord = geom.getLastCoordinate(); // 坐标
        }
        this.measureTipElement = null; // 置空测量工具提示框对象
        this.measureTipElement = document.createElement('div');
        this.measureTipElement.innerHTML = output; // 将测量值设置到测量工具提示框中显示
        this.measureTipElement.className = 'tooltip tooltip-static'; // 设置测量提示框的样式
        this.measureTip = new Overlay({
          id: 'measure-overlay' + this.num,
          element: this.measureTipElement,
          offset: [0, -15],
          positioning: 'bottom-center'
        });
        this.map.addOverlay(this.measureTip);
        this.measureTip.setPosition(tooltipCoord); // 设置测量工具提示框的显示位置
        Observable.unByKey(this.geomChangeListener);
        this.num++;
        this.sketch = null;
        this.measureTipTemp.setPosition(null);
      },
      this
    );
  },
  /**
   * 结束测量
   */
  stopMeasure() {
    if (this.pointermoveKey) {
      Observable.unByKey(this.pointermoveKey);
      this.pointermoveKey = null;
    }
    if (this.measure) {
      this.map.removeInteraction(this.measure);
      this.measure = null;
    }
    if (this.helpTipElement) {
      this.helpTipElement.parentNode.removeChild(this.helpTipElement);
      this.map.removeOverlay(this.helpTip);
      this.helpTipElement = null;
      this.helpTip = null;
    }
    if (this.measureTipElementTemp) {
      this.measureTipElementTemp.parentNode.removeChild(this.measureTipElementTemp);
      this.map.removeOverlay(this.measureTipTemp);
      this.measureTipElementTemp = null;
      this.measureTipTemp = null;
    }
  },
  /**
   * 清除地图上的测量标记
   */
  clearMeasure() {
    if (this._source) {
      this._source.clear();
    }

    // 清除全部测量overlays
    let lays = this.map.getOverlays().getArray();
    for (let i = 0; i < lays.length; i++) {
      let lyName = lays[i].id + '';
      if (lyName) {
        if (lyName.indexOf('measure-overlay') !== -1) {
          this.map.removeOverlay(lays[i]);
          i--;
        }
      }
    }
  },

  _createHelpTip() {
    if (this.helpTipElement) {
      this.helpTipElement.parentNode.removeChild(this.helpTipElement);
      this.map.removeOverlay(this.helpTip);
    }
    this.helpTipElement = document.createElement('div');
    this.helpTipElement.className = 'tooltip hidden';
    this.helpTip = new Overlay({
      element: this.helpTipElement,
      offset: [15, 0],
      positioning: 'center-left'
    });
    this.map.addOverlay(this.helpTip);
  },

  /**
   *创建一个新的测量工具提示框（tooltip）
   */
  _createMeasureTipTemp() {
    if (this.measureTipElementTemp) {
      this.measureTipElementTemp.parentNode.removeChild(this.measureTipElementTemp);
      this.map.removeOverlay(this.measureTipTemp);
    }
    this.measureTipElementTemp = document.createElement('div');
    this.measureTipElementTemp.className = 'tooltip tooltip-measure';
    this.measureTipTemp = new Overlay({
      id: 2,
      element: this.measureTipElementTemp,
      offset: [0, -15],
      positioning: 'bottom-center'
    });
    this.map.addOverlay(this.measureTipTemp);
  },
  _formatLength(line) {
    let length;
    if (this.geodesicBool) {
      //若使用测地学方法测量
      let coordinates = line.getCoordinates(); //解析线的坐标
      length = 0;
      let sourceProj = this.map.getView().getProjection(); //地图数据源投影坐标系
      //通过遍历坐标计算两点之前距离，进而得到整条线的长度
      for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
        let c1 = proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
        let c2 = proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
        length += this.wgs84Sphere.haversineDistance(c1, c2);
      }
    } else {
      length = Math.round(line.getLength() * 100) / 100; //直接得到线的长度
    }
    let output;
    if (length > 100) {
      output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km'; //换算成KM单位
    } else {
      output = Math.round(length * 100) / 100 + ' ' + 'm'; //m为单位
    }
    return output; //返回线的长度
  },
  _formatArea(polygon) {
    let area;
    if (this.geodesicBool) {
      //若使用测地学方法测量
      let sourceProj = this.map.getView().getProjection(); //地图数据源投影坐标系
      let geom = polygon.clone().transform(sourceProj, 'EPSG:4326'); //将多边形要素坐标系投影为EPSG:4326
      let coordinates = geom.getLinearRing(0).getCoordinates(); //解析多边形的坐标值
      area = Math.abs(this.wgs84Sphere.geodesicArea(coordinates)); //获取面积
    } else {
      area = polygon.getArea(); //直接获取多边形的面积
    }
    let output;
    if (area > 10000) {
      output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>'; //换算成KM单位
    } else {
      output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>'; //m为单位
    }
    return output; //返回多边形的面积
  },
  _initStyleString() {
    let cssString = `.tooltip-static:before { 
        border-top: 6px solid rgba(0, 0, 0, 0.5);
       border-right: 6px solid transparent;
        border-left: 6px solid transparent;
        content: "";
        position: absolute;
        bottom: -6px;
        margin-left: -7px;
        left: 50%;
    }
    .tooltip-static:before {
        border-top-color: #98F5FF;
    }        .tooltip {
        position : relative;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        color: white;
        padding: 4px 8px;
        opacity: 0.7;
        white-space: nowrap;
    }
    .tooltip-measure {
        opacity: 1;
        font-weight: bold;
    }
    .tooltip-static {
        background-color: #98F5FF;
        color: black;
        border: 1px solid white;
       font-weight: bold;
    }`; //测量图层的标识样式
    let style = document.createElement('style');
    style.type = 'text/css';
    try {
      style.appendChild(document.createTextNode(cssString));
    } catch (ex) {
      style.styleSheet.cssText = cssString;
    }
    let head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
  }
};

export default MeasureTool;
