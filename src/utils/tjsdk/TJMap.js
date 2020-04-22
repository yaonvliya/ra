/*
 * @Description:地图加载类,用于加载高德、百度、天地图、自定义地图
 * @Author: gaop
 * @Date: 2019-08-20 14:46:42
 * @LastEditTime: 2019-11-01 14:56:46
 * @LastEditors: Do not edit
 */
import Map from 'ol/map';
import View from 'ol/view';
import proj4 from 'proj4';
import proj from 'ol/proj';
import GeoJSON from 'ol/format/geojson';
import Attribution from 'ol/control/attribution';
import FullScreen from 'ol/control/fullscreen';
import MousePosition from 'ol/control/mouseposition';
import OverviewMap from 'ol/control/overviewmap';
import Rotate from 'ol/control/rotate';
import ScaleLine from 'ol/control/scaleline';
import Zoom from 'ol/control/zoom';
import Zoomslider from 'ol/control/zoomslider';
import ZoomToExtent from 'ol/control/zoomtoextent';
import BaseTileLy from './BaseTileLy';
import TileLayer from "ol/layer/tile";
import TileWMSSource from "ol/source/tilewms";
import TileGrid from "ol/tilegrid/tilegrid";

/**
 * params:  target,controlNames,center,zoom,maxZoom,minZoom
 */
/**
 * @description:地图初始化
 * @param :options = {
 *    target: 'map',
 *    controlNames: ["FullScreen","Zoom"],//参见loadControls方法
 *    center: [0, 0],//必须是经纬度点
 *    zoom: 10,
 *    maxZoom: 18,
 *    minZoom: 3,
 *    mapType:"gd", //gd、bd、tdt
 *    lyTyles: []
 *  };
 * @return:
 */
let TJMap = function(options) {
  this._init(options);
};
TJMap.prototype = {
  //初始化对象
  _init(options) {
    this.target = options.target ? options.target : 'map'; //必填参数,地图元素
    this.controlNames = options.controlNames ? options.controlNames : [];
    this.center = options.center ? options.center : [0, 0];
    this.zoom = options.zoom ? options.zoom : 10;
    this.maxZoom = options.maxZoom ? options.maxZoom : 18;
    this.minZoom = options.minZoom ? options.minZoom : 3;
    this.mapType = options.mapType ? options.mapType : 'gd';
    this.lyTyles = options.lyTyles ? options.lyTyles : []; //图层数组
    this.map = null;
    this.baseLys = {};
    this.url = options.url;
    this.lyName = options.lyName;
    proj.setProj4(proj4);
    proj4.defs('BD-09', '+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs');
    this._loadMap();
  },
  //加载地图
  _loadMap() {
    this.map = new Map({
      target: this.target,
      controls: this._loadControls(), //为空则使用默认的，否则按需加载
      loadTilesWhileAnimating: false, //动态加载切片，提高用户体验，但在移动设备上影响性能
      view: new View({
        center: this.center,
        zoom: this.zoom,
        maxZoom: this.maxZoom,
        minZoom: this.minZoom,
        projection: this.getProjection()
      })
      //要改成下面的方式。
      // view: new View({}) //视口设置为空
      // view.fitExtent(projectionExtent, map.getSize());
      // view.setCenter(ol.proj.transform([0,0], 'EPSG:4326',epsg_projection ));
      // view.setZoom(10);
    });
    this.addBaseLy();
  },
  //加载openlayer控件
  _loadControls: function() {
    let controls = [];
    this.controlNames.forEach(ctlname => {
      switch (ctlname) {
        case 'Attribution':
          controls.push(new Attribution());
          break;
        case 'FullScreen':
          controls.push(new FullScreen());
          break;
        case 'MousePosition':
          controls.push(new MousePosition());
          break;
        case 'OverviewMap':
          controls.push(new OverviewMap());
          break;
        case 'Rotate':
          controls.push(new Rotate());
          break;
        case 'ScaleLine':
          controls.push(new ScaleLine());
          break;
        case 'Zoom':
          controls.push(new Zoom());
          break;
        case 'Zoomslider':
          controls.push(new Zoomslider());
          break;
        case 'ZoomToExtent':
          controls.push(new ZoomToExtent());
          break;
          default: break;
      }
    });
    return controls;
  },
  //清空OL自带的所有组件
  clearAllControls() {
    let controls = this.map.getControls().getArray();
    for (let i = 0; i < controls.length; i++) {
      this.map.removeControl(controls[i]);
    }
  },
  //获得当前地图的投影
  getProjection() {
    switch (this.mapType) {
      case 'bd':
        //获得BD-09投影
        return proj.get('BD-09');
      case 'gd':
        return proj.get('EPSG:3857');
      case 'tdt':
        return proj.get('EPSG:3857');
      default:
        return proj.get('EPSG:4326');
    }
  },
  //经纬度转平面坐标
  xyfromLonLat(coords) {
    switch (this.mapType) {
      case 'bd':
        return proj.transform(coords, 'EPSG:4326', 'BD-09');
      // return proj4('EPSG:4326', 'BD-09', coords);//也可以这样
      case 'gd':
        return proj.fromLonLat(coords);
      case 'tdt':
        return proj.fromLonLat(coords);
      default:
        return proj.fromLonLat(coords);
    }
  },
  //平面坐标转经纬度
  xytoLonLat(coords) {
    switch (this.mapType) {
      case 'bd':
        return proj.transform(coords, 'BD-09', 'EPSG:4326');
      case 'gd':
        return proj.toLonLat(coords);
      case 'tdt':
        return proj.toLonLat(coords);
      default:
        return proj.toLonLat(coords);
    }
  },
  //居中显示
  centerTo(location, level) {
    let zoom = level ? level : this.map.getView().getZoom();
    this.map.getView().animate({ center: location }, { zoom: zoom });
  },
  //缩放到指定范围
  setExtent(extent) {
    this.map.getView().fit(extent, { duration: 500 });
  },

  //地图销毁
  destroy() {
    if (this.map) {
      this.map
        .getLayers()
        .getArray()
        .forEach(layer => {
          this.map.removeLayer(layer);
        });
      this.map.getOverlays().forEach(overlay => {
        this.map.removeOverlay(overlay);
      });
      this.map.getControls().forEach(control => {
        this.map.removeControl(control);
      });
      this.map.getInteractions().forEach(interaction => {
        this.map.removeInteraction(interaction);
      });
      this.map.setTarget(null);
    }
    this.map = null;
  },
  /**
   * @description:把Json转成feature要素(可以是JSON对象或者JSON字符串)
   * @Author: gaop
   * @param : geojson：要素的JSON(可以是JSON对象或者JSON字符串)，o:源坐标系；t:目标坐标系（4326、3857）
   * @return:返回的是feature
   * @Date: 2019-08-23 14:11:59
   */
  jsonToFeature(geojson, o, t) {
    let feature = new GeoJSON().readFeature(geojson, {
      dataProjection: 'EPSG:' + o,
      featureProjection: 'EPSG:' + t
    });
    return feature;
  },

  /**
   * @description:把Json转成featureCollection要素集合(可以是JSON对象或者JSON字符串)
   * @Author: gaop
   * @param :geojson：要素集合的JSON(可以是JSON对象或者JSON字符串)，o:源坐标系；t:目标坐标系（4326、3857）
   * @return:返回的是feature[] 数组
   * @Date: 2019-08-23 14:14:18
   */
  jsonToFeatures(geojson, o, t) {
    let features = new GeoJSON().readFeatures(geojson, {
      dataProjection: 'EPSG:' + o,
      featureProjection: 'EPSG:' + t
    });
    return features;
  },

  /**
   * @description: 把Json转成Geometry对象(可以是JSON对象或者JSON字符串)
   * @Author: gaop
   * @param :
   * geojson： Geometry的JSON对象(可以是JSON对象或者JSON字符串) "{\"type\":\"Point\",\"coordinates\":[121.46905898349358,31.24912257399089]}"
   * o:源坐标系；t:目标坐标系（4326、3857）
   * @return:
   * @Date: 2019-08-23 14:15:33
   */
  jsonToGeometry(geojson, o, t) {
    let geo = new GeoJSON().readGeometry(geojson, {
      dataProjection: 'EPSG:' + o,
      featureProjection: 'EPSG:' + t
    });
    return geo;
  },

  /**
   * @description:将feature对象转为Json字符串
   * @Author: gaop
   * @param : ft：feature对象，o:源坐标系；t:目标坐标系（4326、3857）
   * @return: JSON字符串
   * @Date: 2019-08-23 14:25:59
   */
  featureToJsonStr(ft, o, t) {
    let jsonStr = new GeoJSON().writeFeature(ft, {
      dataProjection: 'EPSG:' + t,
      featureProjection: 'EPSG:' + o
    });
    return jsonStr;
  },
  /**
   * @description:将feature对象转为Json对象
   * @Author: gaop
   * @param : ft：feature对象，o:源坐标系；t:目标坐标系（4326、3857）
   * @return: JSON对象
   * @Date: 2019-08-23 14:25:59
   */
  featureToJsonObj(ft, o, t) {
    let jsonObj = new GeoJSON().writeFeatureObject(ft, {
      dataProjection: 'EPSG:' + t,
      featureProjection: 'EPSG:' + o
    });
    return jsonObj;
  },
  /**
   * @description: 把featureCollection要素集合转成Json字符串
   * @Author: gaop
   * @param :fts：featureCollection要素集合对象，o:源坐标系；t:目标坐标系（4326、3857）
   * @return:JSON字符串
   * @Date: 2019-08-23 14:28:12
   */
  featuresToJsonStr(fts, o, t) {
    let jsonStr = new GeoJSON().writeFeatures(fts, {
      dataProjection: 'EPSG:' + t,
      featureProjection: 'EPSG:' + o
    });
    return jsonStr;
  },
  /**
   * @description: 把featureCollection要素集合转成Json对象
   * @Author: gaop
   * @param :fts：featureCollection要素集合对象，o:源坐标系；t:目标坐标系（4326、3857）
   * @return:JSON对象
   * @Date: 2019-08-23 14:28:12
   */
  featuresToJsonObj(fts, o, t) {
    let jsonObj = new GeoJSON().writeFeaturesObject(fts, {
      dataProjection: 'EPSG:' + t,
      featureProjection: 'EPSG:' + o
    });
    return jsonObj;
  },

  /**
   * @description:将geometry几何体转为geojson字符串
   * @Author: gaop
   * @param :geo：geometry对象，o:源坐标系；t:目标坐标系（4326、3857）
   * @return:JSON字符串
   * @Date: 2019-08-23 14:29:47
   */
  geometryToJsonStr(geo, o, t) {
    let jsonStr = new GeoJSON().writeGeometry(geo, {
      dataProjection: 'EPSG:' + t,
      featureProjection: 'EPSG:' + o
    });
    return jsonStr;
  },

  /**
   * @description: 将geometry几何体转为geojson对象
   * @Author: gaop
   * @param :geo：geometry对象，o:源坐标系；t:目标坐标系（4326、3857）
   * @return:JSON对象
   * @Date: 2019-08-23 14:42:09
   */
  geometryToJsonObj(geo, o, t) {
    let jsonObj = new GeoJSON().writeGeometryObject(geo, {
      dataProjection: 'EPSG:' + t,
      featureProjection: 'EPSG:' + o
    });
    return jsonObj;
  },

  //增加底图
  addBaseLy() {
    let baseTileLy = new BaseTileLy();
    //当没有选择底图时，默认加载的内容
    if (this.lyTyles === null || this.lyTyles === undefined || this.lyTyles.length === 0) {
      switch (this.mapType) {
        case 'gd':
          this.lyTyles = ['gd_vec'];
          break;
        case 'bd':
          this.lyTyles = ['bd_vec'];
          break;
        case 'tdt':
          this.lyTyles = ['tdt_vec', 'tdt_veca'];
          break;
      }
    }
    let tilelayer = null;
    for (let i = 0, len = this.lyTyles.length; i < len; i++) {
      switch (this.lyTyles[i]) {
        case 'gd_vec':
          tilelayer = baseTileLy.getGdVecLy();
          this.map.addLayer(tilelayer);
          this.baseLys['gd_vec'] = tilelayer;
          break;
        case 'gd_img':
          tilelayer = baseTileLy.getGdImgLy();
          this.map.addLayer(tilelayer);
          this.baseLys['gd_img'] = tilelayer;
          break;
        case 'gd_imga':
          tilelayer = baseTileLy.getGdImgALy();
          this.map.addLayer(tilelayer);
          this.baseLys['gd_imga'] = tilelayer;
          break;
        case 'gd_tra':
          tilelayer = baseTileLy.getGdTrafficLy();
          this.map.addLayer(tilelayer);
          this.baseLys['gd_tra'] = tilelayer;
          break;
        case 'bd_vec':
        case 'bd_vec_0':
        case 'bd_vec_1':
        case 'bd_vec_2':
        case 'bd_vec_3':
        case 'bd_vec_4':
        case 'bd_vec_5':
        case 'bd_vec_6':
        case 'bd_vec_7':
        case 'bd_vec_8':
        case 'bd_vec_9':
        case 'bd_vec_10':
        case 'bd_vec_11':
          let strs = this.lyTyles[i].split('_');
          tilelayer = baseTileLy.getBdVecLy(strs[2]);
          this.map.addLayer(tilelayer);
          this.baseLys['bd_vec'] = tilelayer;
          break;
        case 'bd_img':
          tilelayer = baseTileLy.getBdImgLy();
          this.map.addLayer(tilelayer);
          this.baseLys['bd_img'] = tilelayer;
          break;
        case 'bd_imga':
          tilelayer = baseTileLy.getBdImgALy();
          this.map.addLayer(tilelayer);
          this.baseLys['bd_imga'] = tilelayer;
          break;
        case 'bd_tra':
          tilelayer = baseTileLy.getBdTrafficLy();
          this.map.addLayer(tilelayer);
          this.baseLys['bd_tra'] = tilelayer;
          break;
        case 'qq_vec':
          tilelayer = baseTileLy.getQQVecLy();
          this.map.addLayer(tilelayer);
          this.baseLys['qq_vec'] = tilelayer;
          break;
        case 'qq_tra':
          tilelayer = baseTileLy.getQQTrafficLy();
          this.map.addLayer(tilelayer);
          this.baseLys['qq_tra'] = tilelayer;
          break;
        case 'tdt_vec':
          tilelayer = baseTileLy.getTDTVecLy();
          this.map.addLayer(tilelayer);
          this.baseLys['tdt_vec'] = tilelayer;
          break;
        case 'tdt_veca':
          tilelayer = baseTileLy.getTDTVecALy();
          this.map.addLayer(tilelayer);
          this.baseLys['tdt_veca'] = tilelayer;
          break;
        case 'tdt_img':
          tilelayer = baseTileLy.getTDTImgLy();
          this.map.addLayer(tilelayer);
          this.baseLys['tdt_img'] = tilelayer;
          break;
        case 'tdt_imga':
          tilelayer = baseTileLy.getTDTImgALy();
          this.map.addLayer(tilelayer);
          this.baseLys['tdt_imga'] = tilelayer;
          break;
        case 'sz_online' /*外网*/:
          tilelayer = baseTileLy.getSuZhouWWWLy();
          this.map.addLayer(tilelayer);
          this.baseLys['sz_online'] = tilelayer;
          break;
        case 'sz_loc' /*内网*/:
          tilelayer = baseTileLy.getSuZhouLocLy();
          this.map.addLayer(tilelayer);
          this.baseLys['sz_loc'] = tilelayer;
          break;
      }
    }
  }
};
export default TJMap;
