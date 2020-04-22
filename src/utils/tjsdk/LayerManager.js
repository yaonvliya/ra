/*
 * @Description:图层控制,用来控制矢量、聚合、WMS图层
 * @Author: gaop
 * @Date: 2019-08-21 11:00:50
 * @LastEditTime: 2019-10-31 10:52:56
 * @LastEditors: Do not edit
 */
import AnimatedCluster from 'ol-ext/layer/AnimatedCluster';
import VectorSource from 'ol/source/vector';
import VectorLayer from 'ol/layer/vector';
import GeoJSON from 'ol/format/geojson';
import ClusterSource from 'ol/source/cluster';
import Stroke from 'ol/style/stroke';
import Style from 'ol/style/style';
import Circle from 'ol/style/circle';
import Fill from 'ol/style/fill';
import Icon from 'ol/style/icon';
import Collection from 'ol/collection';
import Text from 'ol/style/text';
import Feature from 'ol/feature';
import LineString from 'ol/geom/linestring';
import Observable from 'ol/observable';
import Easing from 'ol/easing';
import Point from 'ol/geom/point';

let LayerManager = function(options) {
  this._init(options);
  // this._initVecClickEvent(); //初始化矢量图层点击事件
  this._initClickEvent(); //初始化图层点击事件
  this._initMouseCursorEvent(); //初始化图层鼠标滑过事件
  this._initAuxiliaryClear();
};
LayerManager.prototype = {
  _init(options) {
    this.map = options.map;
    this.veclys = {};
    this.clulys = {};
    this.wmslys = {};
    this.clickEvents = {}; //点击事件管理 = {};
    this.mouseEvents = {}; //滑动事件管理 = {};
  },

  addLayer(params) {
    if (!params.lyType) {
      params.lyType = 'vec';
    }
    if (!params.lyName) {
      console.log('请给lyName参数一个值');
      return false;
    }
    if (this.hasLayer(params.lyName)) {
      console.log('图层添加', '已存在名称为 ' + params.lyName + ' 的图层');
      return false;
    }
    let ly = null;
    switch (params.lyType) {
      case 'vec':
        params.lyName = params.lyName + '_vec';
        ly = new VectorLayer({
          source: new VectorSource(),
          name: params.lyName,
          zIndex: params.zIndex
        });
        if (params.style != null || params.style != undefined) {
          ly.setStyle(params.style);
        }
        // ly.setStyle(() => {
        //   return new Style({
        //     image: new Circle({
        //       radius: 8,
        //       stroke: new Stroke({
        //         color: '#000000',
        //         width: 1
        //       }),
        //       fill: new Fill({
        //         color: '#ffcc33'
        //       })
        //     }),

        //     fill: new Fill({
        //       color: 'rgba(255, 255, 255, 1)'
        //     }),
        //     stroke: new Stroke({
        //       color: '#ffcc33',
        //       width: 2
        //       // lineDash: [10, 10]
        //     })
        //   });
        // });
        this.map.addLayer(ly);
        this.veclys[params.lyName] = ly;
        return true;
      case 'clu':
        params.lyName = params.lyName + '_clu';
        ly = {
          iconUrls: params.iconUrls, //放大到单个时显示的符号
          fieldName: params.fieldName, //区分符号的字段
          zIndex: params.zIndex, //图层层级
          name: params.lyName, //图层名称
          styleCache: {}, //符号缓存
          style: null,
          ////////
          styleIndex: params.styleIndex || 1, //聚簇显示样式
          maxSelect: params.maxSelect || 30, //最大可以展开的点数量
          pointRadius: params.pointRadius || 25, //设置半径，为了计算线长度
          circleMaxObjects: params.circleMaxObjects || 10, //一圈最大数据量
          animate: params.animate !== false, //是否显示动画
          animationDuration: params.animationDuration || 500, //动画时间
          auxiliaryLy: null, //辅助图层
          animatedCluster: null //聚簇图层
          // popPtSideLineColor: '#ff00ff',
          // popPtSideLineWidth: 1,
          // popPtColor: '#ffff00',
          // popPtRidaus: 5,
          // popLineColor: '#00ff00',
          // popLineWidth: 1
        };

        let clusterSource = new ClusterSource({
          distance: 40,
          source: new VectorSource() //必填
        });

        ly.style = (feature, resolution) => {
          let size = feature.get('features').length;
          let style = null;
          if (size == 1) {
            let ft = feature.get('features')[0];
            let styName = null;
            if (ly.fieldName) {
              styName = ft.get(ly.fieldName);
            }
            let img = null;
            if (styName) {
              img = ly.iconUrls[styName]; //获取符号
            }
            if (img) {
              style = new Style({
                image: new Icon({
                  scale: 0.8, //图标缩放比例
                  src: img //图标的url
                })
              });
            } else {
              style = new Style({
                image: new Circle({
                  radius: 5,
                  // stroke: new Stroke({
                  //   color: 'rgba(0, 0, 0, 0.7)'
                  // }),
                  fill: new Fill({
                    color: 'rgba(255, 255, 0,0.8)'
                  })
                })
              });
            }
          } else {
            style = ly.styleCache[size];
            //聚簇多点的样式
            if (!style) {
              let color = size > 40 ? '192,0,0' : size > 10 ? '255,128,0' : '0,128,0';
              let lineWidth = size > 40 ? 10 : size > 12 ? 9 : 5;
              let radius = Math.max(10, Math.min(size * 0.75, 25));
              style = ly.styleCache[size] = new Style({
                image: new Circle({
                  radius: radius,
                  stroke: new Stroke({
                    color: 'rgba(' + color + ',0.5)',
                    width: lineWidth
                  }),
                  fill: new Fill({
                    color: 'rgba(' + color + ',1)'
                  })
                }),
                text: new Text({
                  text: size.toString(),
                  fill: new Fill({
                    color: '#fff'
                  })
                })
              });
            }
          }
          return [style];
        };
        ly.animatedCluster = new AnimatedCluster({
          source: clusterSource,
          animationDuration: 500,
          name: params.lyName,
          zIndex: ly.zIndex,
          //利用bind()将当前的对象绑定到getStyle函数中，便于在getStyle函数作用域中拿到当前实例化对象的属性，
          style: ly.style //聚簇的样式,
        });
        this.map.addLayer(ly.animatedCluster);
        this.clulys[params.lyName] = ly;
        //聚合升级版样式
        switch (params.styleIndex) {
          case 1: //第一种样式，
            this._cluClickStyle1(ly);
            break;
        }
        break;
      case 'wms':
        break;
    }
  },
  //初始化聚簇辅助图层清理事件
  _initAuxiliaryClear() {
    this.map.getView().on('change:resolution', () => {
      this._clearAuxiliary();
    });
  },
  //清空聚簇辅助图层
  _clearAuxiliary() {
    for (let i in this.clulys) {
      if (this.clulys[i].auxiliaryLy != null) {
        this.clulys[i].auxiliaryLy.getSource().clear();
      } else {
        console.log('聚簇辅助清理');
      }
    }
  },

  /**
   * 第一种选择样式
   * @param {*} ly
   */
  _cluClickStyle1(ly) {
    let openClusterstyle = ft => {
      let geoType = ft.getGeometry().getType();
      let style = null;
      if (geoType == 'Point') {
        let styName = null;
        styName = ft.get('styleName');
        let img = null;
        if (styName) {
          img = ly.iconUrls[styName]; //获取符号
        }
        if (img) {
          style = new Style({
            image: new Icon({
              scale: 0.5, //图标缩放比例
              src: img //图标的url
            })
          });
        } else {
          style = new Style({
            image: new Circle({
              stroke: new Stroke({ color: '#ff0000', width: 2 }),
              fill: new Fill({ color: '#00ffff' }),
              radius: 5
            })
          });
        }
      } else {
        style = new Style({
          // 弹出图层中间线
          stroke: new Stroke({
            color: '#ffff00',
            width: 2
          })
        });
      }
      return [style];
    };

    ly.auxiliaryLy = new VectorLayer({
      source: new VectorSource({
        features: new Collection(),
        useSpatialIndex: true
      }),
      name: ly.name + '_auxi', //辅助图层
      zIndex: ly.zIndex + 1, //图层层级
      updateWhileAnimating: true,
      updateWhileInteracting: true,
      displayInLayerSwitcher: false,
      style: openClusterstyle
    });
    this.map.addLayer(ly.auxiliaryLy);
    this._onClickEvent(ly.name + '_Multi', e => {
      //聚簇点选事件
      let feature = e.feature;
      let source = ly.auxiliaryLy.getSource();
      source.clear();
      let cluster = feature.get('features');
      // Not a cluster (or just one feature)
      if (!cluster || cluster.length == 1) return;
      let center = feature.getGeometry().getCoordinates();
      let pix = this.map.getView().getResolution();
      let r = pix * ly.pointRadius * (0.5 + cluster.length / 4);
      //画一个圆
      if (cluster.length <= ly.circleMaxObjects) {
        let max = Math.min(cluster.length, ly.circleMaxObjects);
        for (let i = 0; i < max; i++) {
          let a = (2 * Math.PI * i) / max;
          if (max == 2 || max == 4) a += Math.PI / 4;
          let p = [center[0] + r * Math.sin(a), center[1] + r * Math.cos(a)];
          let cf = new Feature({ selectclusterfeature: true, styleName: cluster[i].get(ly.fieldName), features: [cluster[i]], geometry: new Point(p) });
          cf.setStyle(cluster[i].getStyle());
          source.addFeature(cf);
          let lk = new Feature({ selectclusterlink: true, geometry: new LineString([center, p]) });
          source.addFeature(lk);
        }
      } else {
        // Start angle
        let a = 0;
        let r;
        let d = 2 * ly.pointRadius;
        let features = new Array();
        let links = new Array();
        let max = cluster.length;
        //  let max = Math.min(ly.maxObjects, cluster.length);
        // Feature on a spiral
        if (max < ly.maxSelect) {
          //如果聚合数大于maxSelect则不能点开
          for (let i = 0; i < max; i++) {
            // New radius => increase d in one turn
            r = d / 2 + (d * a) / (2 * Math.PI);
            // Angle
            a = a + (d + 0.1) / r;
            let dx = pix * r * Math.sin(a);
            let dy = pix * r * Math.cos(a);
            let p = [center[0] + dx, center[1] + dy];
            let cf = new Feature({ selectclusterfeature: true, styleName: cluster[i].get(ly.fieldName), features: [cluster[i]], geometry: new Point(p) });
            cf.setStyle(cluster[i].getStyle());
            source.addFeature(cf);
            let lk = new Feature({ selectclusterlink: true, geometry: new LineString([center, p]) });
            source.addFeature(lk);
          }
        } //如果聚合数大于maxSelect则不能点开
      }

      this._animateCluster(center, ly);
    });

    // 绑定选择图层的点击事件
    // this.onClickEvent(ly.auxiliaryLy.get('name'), function(e) {
    //   console.log('aaa', e);
    // });
  },
  _animateCluster(center, ly) {
    // Stop animation (if one is running)
    if (ly._listenerKey) {
      ly.auxiliaryLy.setVisible(true);
      Observable.unByKey(ly._listenerKey);
    }

    // Features to animate
    let features = ly.auxiliaryLy.getSource().getFeatures();
    if (!features.length) return;

    ly.auxiliaryLy.setVisible(false);
    let style = ly.auxiliaryLy.getStyle();
    let stylefn =
      typeof style == 'function'
        ? style
        : style.length
        ? function() {
            return style;
          }
        : function() {
            return [style];
          };
    let duration = ly.animationDuration || 500;
    let start = new Date().getTime();

    // Start a new postcompose animation
    ly._listenerKey = this.map.on(
      'postcompose',
      event => {
        let vectorContext = event.vectorContext;
        // Retina device
        let ratio = event.frameState.pixelRatio;
        let res = event.target.getView().getResolution();
        let e = Easing.easeOut((event.frameState.time - start) / duration);
        for (let i = 0, feature; (feature = features[i]); i++)
          if (feature.get('features')) {
            let pt = feature.getGeometry().getCoordinates();
            pt[0] = center[0] + e * (pt[0] - center[0]);
            pt[1] = center[1] + e * (pt[1] - center[1]);
            let geo = new Point(pt);
            // Image style
            let st = stylefn(feature, res);
            for (let s = 0; s < st.length; s++) {
              let sc;
              // OL < v4.3 : setImageStyle doesn't check retina
              let imgs = Map.prototype.getFeaturesAtPixel ? false : st[s].getImage();
              if (imgs) {
                sc = imgs.getScale();
                imgs.setScale(ratio);
              }
              // OL3 > v3.14
              if (vectorContext.setStyle) {
                vectorContext.setStyle(st[s]);
                vectorContext.drawGeometry(geo);
              }
              // older version
              else {
                vectorContext.setImageStyle(imgs);
                vectorContext.drawPointGeometry(geo);
              }
              if (imgs) imgs.setScale(sc);
            }
          }
        // Stop animation and restore cluster visibility
        if (e > 1.0) {
          Observable.unByKey(ly._listenerKey);
          ly.auxiliaryLy.setVisible(true);
          ly.auxiliaryLy.changed();
          return;
        }
        // tell OL3 to continue postcompose animation
        event.frameState.animate = true;
      },
      this
    );
    this.map.renderSync();
  },

  /**
   * @description: 获取指定名称的图层
   * @Author: gaop
   * @param :图层名
   * @return: 图层对象或者null
   * @Date: 2019-08-22 09:46:30
   */
  getLayer(lyName) {
    let ly;
    ly = this.veclys[lyName + '_vec'];
    if (ly != null || ly != undefined) {
      return ly;
    }
    ly = this.clulys[lyName + '_clu'];
    if (ly != null || ly != undefined) {
      return ly;
    }
    return null;
  },

  /**
   * @description: 判断图层是否存在
   * @Author: gaop
   * @param : 图层名
   * @return: true或false
   * @Date: 2019-08-22 09:47:12
   */
  hasLayer(lyName) {
    let ly;
    ly = this.veclys[lyName + '_vec'];
    if (ly != null || ly != undefined) {
      return true;
    }
    ly = this.clulys[lyName + '_clu'];
    if (ly != null || ly != undefined) {
      return true;
    }
    return false;
  },

  /**
   * @description:移除一个图层
   * @Author: gaop
   * @param : 图层名
   * @return: true或false
   * @Date: 2019-08-22 09:48:11
   */
  removeLayer(lyName) {
    let ly;
    ly = this.veclys[lyName + '_vec'];
    if (ly != null || ly != undefined) {
      this.map.removeLayer(ly);
      for (let i = 0; i < this.veclys.length; i++) {
        if (this.veclys[i] === ly) {
          this.veclys.splice(i, 1);
          break;
        }
      }
      return true;
    }
    ly = this.clulys[lyName + '_clu'];
    if (ly != null || ly != undefined) {
      this.map.removeLayer(ly.animatedCluster);
      this.map.removeLayer(ly.auxiliaryLy);
      for (let i = 0; i < this.clulys.length; i++) {
        if (this.clulys[i] === ly) {
          this.clulys.splice(i, 1);
          break;
        }
      }
      return true;
    }
    return false;
  },
  /**
   * @description:删除多个图层
   * @Author: gaop
   * @param : 图层名数组['name1','name2']
   * @return:
   * @Date: 2019-08-22 17:11:07
   */
  removeLayers(lyNames) {
    for (let i = 0; i < lyNames.length; i++) {
      if (!this.removeLayer(lyNames[i])) {
        return false;
      }
    }
    return true;
  },
  /**
   * @description:设置图层的可见性
   * @Author: gaop
   * @param :图层名, 可见性
   * @return:
   * @Date: 2019-08-22 17:19:33
   */
  setVisible(lyName, visible) {
    let ly;
    ly = this.veclys[lyName + '_vec'];
    if (ly != null || ly != undefined) {
      ly.setVisible(visible);
      return;
    }
    ly = this.clulys[lyName + '_clu'];
    if (ly != null || ly != undefined) {
      ly.animatedCluster.setVisible(visible);
      ly.auxiliaryLy.setVisible(visible);
      return;
    }
    console.log('设置可见性', '图层: ' + lyName + ' 未找到');
  },

  /**
   * @description:添加要素集到指定图层中
   * @Author: gaop
   * @param :要素集对象featureCollection(切记不是json,也不是字符串),图层名
   * @return:
   * @Date: 2019-08-22 17:30:15
   */
  addFeatures(lyName, fts) {
    let ly;
    ly = this.veclys[lyName + '_vec'];
    if (ly != null || ly != undefined) {
      ly.getSource().addFeatures(fts);
      return;
    }
    ly = this.clulys[lyName + '_clu'];
    if (ly != null || ly != undefined) {
      ly.animatedCluster
        .getSource()
        .getSource()
        .addFeatures(fts);
      return;
    }
    console.log('要素添加', '图层: ' + lyName + ' 未找到');
  },

  /**
   * @description:添加要素到图层中
   * @Author: gaop
   * @param :
   * @return:
   * @Date: 2019-08-26 10:30:49
   */
  addFeature(lyName, ft) {
    let ly;
    ly = this.veclys[lyName + '_vec'];
    if (ly != null || ly != undefined) {
      ly.getSource().addFeature(ft);
      return;
    }
    ly = this.clulys[lyName + '_clu'];
    if (ly != null || ly != undefined) {
      ly.animatedCluster
        .getSource()
        .getSource()
        .addFeature(ft);
      return;
    }
    console.log('要素添加', '图层: ' + lyName + ' 未找到');
  },

  /**
   * @description: 删除图层中指定要素
   * @Author: gaop
   * @param :
   * @return:
   * @Date: 2019-08-26 10:31:06
   */
  removeFeature(lyName, ft) {
    let ly;
    ly = this.veclys[lyName + '_vec'];
    if (ly != null || ly != undefined) {
      ly.getSource().removeFeature(ft);
      return;
    }
    ly = this.clulys[lyName + '_clu'];
    if (ly != null || ly != undefined) {
      ly.animatedCluster
        .getSource()
        .getSource()
        .removeFeature(ft);
      return;
    }
    console.log('要素删除', '图层: ' + lyName + ' 未找到');
  },
  /**
   *
   * @param {*} lyName
   * @param {*} param:{"id":1101,"name":"lilei"}
   */
  getFeature(lyName, params) {
    let ly;
    let feature;
    ly = this.veclys[lyName + '_vec'];
    if (ly != null || ly != undefined) {
      let fts = ly.getSource().getFeatures();
      for (let i = 0; i < fts.length; i++) {
        let tag = true;
        for (let key in params) {
          if (fts[i].get(key) != params[key]) {
            tag = false;
            break;
          }
        }
        if (tag) {
          return fts[i];
        }
      }
      return;
    }
    ly = this.clulys[lyName + '_clu'];
    if (ly != null || ly != undefined) {
      let fts = ly.animatedCluster
        .getSource()
        .getSource()
        .getFeatures();
      for (let i = 0; i < fts.length; i++) {
        let tag = true;
        for (let key in params) {
          if (fts[i].get(key) != params[key]) {
            tag = false;
            break;
          }
        }
        if (tag) {
          return fts[i];
        }
      }
      return;
    }
    console.log('要素删除', '图层: ' + lyName + ' 未找到');
  },
  /**
   * @description: 清除指定图层中所有数据
   * @Author: gaop
   * @param :
   * @return:
   * @Date: 2019-08-26 10:31:18
   */
  clearLayer(lyName) {
    let ly;
    ly = this.veclys[lyName + '_vec'];
    if (ly != null || ly != undefined) {
      ly.getSource().clear();
      return;
    }
    ly = this.clulys[lyName + '_clu'];
    if (ly != null || ly != undefined) {
      ly.animatedCluster
        .getSource()
        .getSource()
        .clear();
      return;
    }
    console.log('图层清空', '图层: ' + lyName + ' 未找到');
  },
  //初始化聚簇点击事件(可能是聚簇图层,也可能是聚簇辅助图层)
  _initClickEvent() {
    this.map.on('singleclick', e => {
      //先判断是否点击到聚簇相关的图层
      let fts = this.map.getFeaturesAtPixel(e.pixel, {
        layerFilter: layer => {
          //没有name的，不处理
          let lyName = layer.get('name');
          if (lyName === null || lyName === undefined) {
            return false;
          }
          //矢量图层
          let ly = this.veclys[lyName];
          if (ly != null && ly != undefined) {
            return true;
          }
          //聚簇图层
          ly = this.clulys[lyName];
          if (ly != null && ly != undefined) {
            return true;
          }
          //聚簇辅助图层
          if (lyName.indexOf('_auxi') != -1) {
            lyName = lyName.replace('_auxi', '');
            ly = this.clulys[lyName];
            if (ly != null && ly != undefined) {
              return true;
            }
            return false;
          }
          return false;
        },
        hitTolerance: 4
      });
      if (fts === null) {
        //清空所有聚簇选择数据
        for (let key in this.clulys) {
          let ly = this.clulys[key];
          ly.auxiliaryLy.getSource().clear();
        }
      } else {
        this.map.forEachFeatureAtPixel(
          e.pixel,
          (feature, layer) => {
            let lyName = layer.get('name');
            //点击的是矢量图层
            let ly = this.veclys[lyName];
            if (ly != null && ly != undefined) {
              let singleClickEvent = this.clickEvents[lyName];
              if (singleClickEvent) {
                singleClickEvent({ lyName: lyName, feature: new GeoJSON().writeFeatureObject(feature) });
              }

              return;
            }
            //点击的是聚簇图层
            if (lyName.indexOf('_auxi') === -1) {
              let size = feature.get('features').length;
              let singleClickEvent = this.clickEvents[lyName];
              let clusterClickEvent = this.clickEvents[lyName + '_Multi'];
              if (singleClickEvent && size === 1) {
                //当存在事件，同时要素为1时
                singleClickEvent({ lyName: lyName, feature: new GeoJSON().writeFeatureObject(feature.get('features')[0]) });
              } else if (clusterClickEvent && size > 1) {
                //当点击多个点的时候
                clusterClickEvent({ lyName: lyName, feature: feature });
              }
            } else {
              //点击的是聚簇辅助图层
              if (feature.getGeometry().getType() == 'Point') {
                let n = lyName.replace('_auxi', '');
                let size = feature.get('features').length;
                let singleClickEvent = this.clickEvents[n];
                if (singleClickEvent && size === 1) {
                  singleClickEvent({ lyName: n, feature: new GeoJSON().writeFeatureObject(feature.get('features')[0]) });
                }
              }
            }
          },
          {
            layerFilter: layer => {
              //没有name的，不处理
              let lyName = layer.get('name');
              if (lyName === null || lyName === undefined) {
                return false;
              }
              //矢量图层
              let ly = this.veclys[lyName];
              if (ly != null && ly != undefined) {
                return true;
              }
              //聚簇图层
              ly = this.clulys[lyName];
              if (ly != null && ly != undefined) {
                return true;
              }
              //聚簇辅助图层
              if (lyName.indexOf('_auxi') != -1) {
                lyName = lyName.replace('_auxi', '');
                ly = this.clulys[lyName];
                if (ly != null && ly != undefined) {
                  return true;
                }
                return false;
              }
              return false;
            },
            hitTolerance: 4
          }
        );
      }
    });
  },

  //绑定点击事件
  onClickEvent(lyName, callBack) {
    let ly;
    ly = this.veclys[lyName + '_vec'];
    if (ly != null || ly != undefined) {
      lyName += '_vec';
      this._onClickEvent(lyName, callBack);
      return;
    }
    ly = this.clulys[lyName + '_clu'];
    if (ly != null || ly != undefined) {
      lyName += '_clu';
      this._onClickEvent(lyName, callBack);
      return;
    }
    console.log('图层点击事件绑定', '未找到名为' + lyName + '的图层');
  },
  //绑定点击事件
  _onClickEvent(eventName, callBack) {
    this.clickEvents[eventName] = callBack;
  },

  /**
   * @description: 解绑图层点击事件
   * @Author: gaop
   * @param :
   * @return:
   * @Date: 2019-08-26 10:34:35
   */
  unClickEvent(lyName) {
    let ly;
    let eventName;
    ly = this.veclys[lyName + '_vec'];
    if (ly != null || ly != undefined) {
      eventName = lyName + '_vec';
      this._unClickEvent(eventName);
      return;
    }
    ly = this.clulys[lyName + '_clu'];
    if (ly != null || ly != undefined) {
      eventName = lyName + '_clu';
      this._unClickEvent(eventName);
      return;
    }
    console.log('图层点击事件解绑', '未找到名为' + lyName + '的图层');
  },
  /**
   * @description: 解绑点击事件
   * @Author: gaop
   * @param :
   * @return:
   * @Date: 2019-08-27 11:13:22
   */
  _unClickEvent(eventName) {
    let event = this.clickEvents[eventName];
    if (event != null || event != undefined) {
      for (let i in this.clickEvents) {
        if (this.clickEvents[i] === event) {
          this.clickEvents.splice(i, 1);
          break;
        }
      }
    }
  },
  //初始化鼠标滑过事件cursor : default , help , wait , crosshair , move , pointer
  _initMouseCursorEvent() {
    let me = this;
    this.map.on('pointermove', evt => {
      let pixel = this.map.getEventPixel(evt.originalEvent);
      let result = this.map.forEachFeatureAtPixel(
        pixel,
        (feature, layer) => {
          return { feature, layer };
        },
        {
          layerFilter: layer => {
            //没有name的，不处理
            let lyName = layer.get('name');
            if (lyName === null || lyName === undefined) {
              return false;
            }
            //矢量图层
            let ly = this.veclys[lyName];
            if (ly != null && ly != undefined) {
              return true;
            }
            //聚簇图层
            ly = this.clulys[lyName];
            if (ly != null && ly != undefined) {
              return true;
            }
            //聚簇辅助图层
            if (lyName.indexOf('_auxi') != -1) {
              lyName = lyName.replace('_auxi', '');
              ly = this.clulys[lyName];
              if (ly != null && ly != undefined) {
                return true;
              }
              return false;
            }
            return false;
          },
          hitTolerance: 4
        }
      );
      if (result == undefined) {
        this.map.getTargetElement().style.cursor = 'auto';
        for (let i in me.mouseEvents) {
          let mouuseEvent = me.mouseEvents[i];
          mouuseEvent(null);
        }
      } else {
        let coord = this.map.getCoordinateFromPixel(pixel);
        this.map.getTargetElement().style.cursor = 'pointer';
        let lyName = result.layer.get('name');
        //点击的是矢量图层
        let ly = this.veclys[lyName];
        if (ly != null && ly != undefined) {
          let singleMouseEvent = this.mouseEvents[lyName];
          if (singleMouseEvent) {
            singleMouseEvent({ lyName: lyName, feature: new GeoJSON().writeFeatureObject(result.feature), coord: coord });
          }
          return;
        }
        //点击的是聚簇图层
        if (lyName.indexOf('_auxi') === -1) {
          let size = feature.get('features').length;
          let singleMouseEvent = this.mouseEvents[lyName];
          let clusterMouseEvent = this.mouseEvents[lyName + '_Multi'];
          if (singleMouseEvent && size === 1) {
            //当存在事件，同时要素为1时
            singleMouseEvent({ lyName: lyName, feature: new GeoJSON().writeFeatureObject(result.feature.get('features')[0]), coord: coord });
          } else if (clusterMouseEvent && size > 1) {
            //当点击多个点的时候
            clusterMouseEvent({ lyName: lyName, feature: result.feature });
          }
        } else {
          //点击的是聚簇辅助图层
          if (feature.getGeometry().getType() == 'Point') {
            let n = lyName.replace('_auxi', '');
            let size = feature.get('features').length;
            let singleMouseEvent = this.mouseEvents[n];
            if (singleMouseEvent && size === 1) {
              singleMouseEvent({ lyName: n, feature: new GeoJSON().writeFeatureObject(result.feature.get('features')[0]), coord: coord });
            }
          }
        }
      }
    });
  },

  //绑定鼠标滑动事件
  onMouseEvent(lyName, callBack) {
    let ly;
    ly = this.veclys[lyName + '_vec'];
    if (ly != null || ly != undefined) {
      lyName += '_vec';
      this._onMouseEvent(lyName, callBack);
      return;
    }
    ly = this.clulys[lyName + '_clu'];
    if (ly != null || ly != undefined) {
      lyName += '_clu';
      this._onMouseEvent(lyName, callBack);
      return;
    }
    console.log('图层滑动事件绑定', '未找到名为' + lyName + '的图层');
  },
  //绑定鼠标滑动事件
  _onMouseEvent(eventName, callBack) {
    this.mouseEvents[eventName] = callBack;
  },

  /**
   * @description: 解绑图层滑动事件
   * @Author: gaop
   * @param :
   * @return:
   * @Date: 2019-08-26 10:34:35
   */
  unMouseEvent(lyName) {
    let ly;
    let eventName;
    ly = this.veclys[lyName + '_vec'];
    if (ly != null || ly != undefined) {
      eventName = lyName + '_vec';
      this._unMouseEvent(eventName);
      return;
    }
    ly = this.clulys[lyName + '_clu'];
    if (ly != null || ly != undefined) {
      eventName = lyName + '_clu';
      this._unMouseEvent(eventName);
      return;
    }
    console.log('图层滑动事件解绑', '未找到名为' + lyName + '的图层');
  },
  /**
   * @description: 解绑鼠标滑动事件
   * @Author: gaop
   * @param :
   * @return:
   * @Date: 2019-08-27 11:13:22
   */
  _unMouseEvent(eventName) {
    let event = this.mouseEvents[eventName];
    if (event != null || event != undefined) {
      for (let i in me.mouseEvents) {
        if (this.mouseEvents[i] === event) {
          this.mouseEvents.splice(i, 1);
          break;
        }
      }
    }
  }
};

export default LayerManager;
