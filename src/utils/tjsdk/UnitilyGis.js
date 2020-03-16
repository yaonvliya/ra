/*
 * @Description:地图画图封装类
 * @Author: gaop
 * @Date: 2019-06-27 14:10:22
 * @LastEditTime: 2019-11-01 14:58:33
 */
import Feature from 'ol/feature';
import Point from 'ol/geom/point';
import LineString from 'ol/geom/linestring';
import Polygon from 'ol/geom/polygon';
import GeoJSON from 'ol/format/geojson';

let UnitilyGis = {
  /**
   *
   * @param {*} xy  需要是一个数组[121.1,32]
   * @param {*} attrs   需要是一个对象{id:"1",name:"aa"}
   */
  createPointFt(xy, attrs) {
    let ft = new Feature({
      geometry: new Point(xy)
    });
    if (attrs) {
      ft.setProperties(attrs);
    }
    return ft;
  },
  /**
   *
   * @param {*} xy 需要是一个数组[[121.1,32],[111,21]]
   * @param {*} attrs   需要是一个对象{id:"1",name:"aa"}
   */
  createLineFt(xy, attrs) {
    let ft = new Feature({
      geometry: new LineString(xy)
    });
    if (attrs) {
      ft.setProperties(attrs);
    }
    return ft;
  },
  /**
   *
   * @param {*} xy  需要是一个数组[[121.1,32],[111,21]]
   * @param {*} attrs   需要是一个对象{id:"1",name:"aa"}
   */
  createPolygonFt(xy, attrs) {
    let ft = new Feature({
      geometry: new Polygon(xy)
    });
    if (attrs) {
      ft.setProperties(attrs);
    }
    return ft;
  },
  /**
   *
   * @param {*} geom  传入一个字符串 "{\"type\":\"Point\",\"coordinates\":[121.46905898349358,31.24912257399089]}"
   * @param {*} attrs 需要是一个对象{id:"1",name:"aa"}
   */
  createGeomFt(geom, attrs) {
    let ft = new Feature({
      geometry: new GeoJSON().readGeometry(geom)
    });
    if (attrs) {
      ft.setProperties(attrs);
    }
    return ft;
  }
};

export default UnitilyGis;
