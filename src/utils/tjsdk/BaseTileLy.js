/*
 * @Description:d底图封装类
 * @Author: gaop
 * @Date: 2019-08-20 17:45:46
 * @LastEditTime: 2019-10-15 17:17:45
 * @LastEditors: Do not edit
 */
import config from '../../config/index.js'
import proj4 from 'proj4';
import proj from 'ol/proj';
import TileLayer from 'ol/layer/tile';
import ImageLayer from 'ol/layer/image';
import XYZ from 'ol/source/xyz';
import TileGrid from 'ol/tilegrid/tilegrid';
import extent from 'ol/extent';
import TileImageSource from 'ol/source/tileimage';
import TileWMSSource from 'ol/source/tilewms';
import ImageWMSSource from 'ol/source/imagewms';

let BaseTileLy = function (options) {
    this._init(options);
};
BaseTileLy.prototype = {
    /**
     * @desc:初始化
     */
    _init: function (options) {
    },
    /**
     * 添加高德地图瓦片
     */
    getGdVecLy() {
        let tilelayer = new TileLayer({
            source: new XYZ({
                crossOrigin: 'anonymous', //打印地图时不设置导致无法输出
                url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'
            }),
            name: 'gd_vec',
            zIndex: 0
        });
        return tilelayer;
    },
    /**
     * 添加高德卫星瓦片
     */
    getGdImgLy() {
        let tilelayer = new TileLayer({
            source: new XYZ({
                url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
            }),
            name: 'gd_img',
            zIndex: 0
        });
        return tilelayer;
    },
    /**
     * 添加高德影像注记,配合高德影像使用
     */
    getGdImgALy() {
        let tilelayer = new TileLayer({
            source: new XYZ({
                url: 'http://webst0{1-4}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
            }),
            name: 'gd_imga',
            zIndex: 1
        });
        return tilelayer;
    },

    /**
     * 高德地图实时路况
     */
    getGdTrafficLy() {
        let timeKey = new Date().getTime();
        let tilelayer = new TileLayer({
            source: new XYZ({
                url: 'http://tm.amap.com/trafficengine/mapabc/traffictile?v=1.0&;t=1&x={x}&y={y}&z={z}&&t=' + timeKey
            }),
            name: 'gd_tra',
            zIndex: 2
        });
        return tilelayer;
    },

    /**
     * 根据样式添加百度地图
     * 默认地图样式(normal)
     * 清新蓝风格(light)
     * 黑夜风格(dark)
     * 红色警戒风格(redalert)
     * 精简风格(googlelite)
     * 自然绿风格(grassgreen)
     * 午夜蓝风格(midnight)
     * 浪漫粉风格(pink)
     * 青春绿风格(darkgreen)
     * 清新蓝绿风格(bluish)
     * 高端灰风格(grayscale)
     * 强边界风格(hardedge)
     * 具体见 http://lbsyun.baidu.com/custom/list.htm
     */
    getBdVecLy(index) {
        let styles = ['normal', 'light', 'dark', 'redalert', 'googlelite', 'grassgreen', 'midnight', 'pink', 'darkgreen', 'bluish', 'grayscale', 'hardedge'];
        if (index === null) {
            index = 0;
        }
        let resolutions = [];
        for (let i = 0; i < 19; i++) {
            resolutions[i] = Math.pow(2, 18 - i);
        }
        let tilegrid = new TileGrid({
            origin: [0, 0],
            resolutions: resolutions
        });
        let baidu_source = new TileImageSource({
            projection: proj.get('BD-09'),
            tileGrid: tilegrid,
            tileUrlFunction: (tileCoord, pixelRatio, proj) => {
                if (!tileCoord) {
                    return '';
                }
                var z = tileCoord[0];
                var x = tileCoord[1];
                var y = tileCoord[2];
                var sub = x % 2;
                if (x < 0) {
                    x = 'M' + -x;
                }
                if (y < 0) {
                    y = 'M' + -y;
                }
                return 'http://api' + sub + '.map.bdimg.com/customimage/tile/?x=' + x + '&y=' + y + '&z=' + z + '&customid=' + styles[index];
            }
        });
        let tilelayer = new TileLayer({
            source: baidu_source,
            name: 'bd_vec',
            zIndex: 0
        });
        return tilelayer;
    },
    /**
     * 百度地图卫星地图
     */
    getBdImgLy() {
        let resolutions = [];
        for (let i = 0; i < 19; i++) {
            resolutions[i] = Math.pow(2, 18 - i);
        }
        let tilegrid = new TileGrid({
            origin: [0, 0],
            resolutions: resolutions
        });
        let baidu_source = new TileImageSource({
            projection: proj.get('BD-09'),
            tileGrid: tilegrid,
            tileUrlFunction: (tileCoord, pixelRatio, proj) => {
                if (!tileCoord) {
                    return '';
                }
                var z = tileCoord[0];
                var x = tileCoord[1];
                var y = tileCoord[2];
                var sub = x % 2;
                if (x < 0) {
                    x = 'M' + -x;
                }
                if (y < 0) {
                    y = 'M' + -y;
                }
                return 'https://ss' + sub + '.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/starpic/?qt=satepc&u=x=' + x + ';y=' + y + ';z=' + z + ';v=009;type=sate&fm=46&app=webearth2&v=009';
            }
        });
        let tilelayer = new TileLayer({
            source: baidu_source,
            name: 'bd_img',
            zIndex: 0
        });
        return tilelayer;
    },
    /**
     * 百度地图注记
     */
    getBdImgALy() {
        let resolutions = [];
        for (let i = 0; i < 19; i++) {
            resolutions[i] = Math.pow(2, 18 - i);
        }
        let tilegrid = new TileGrid({
            origin: [0, 0],
            resolutions: resolutions
        });
        let baidu_source = new TileImageSource({
            projection: proj.get('BD-09'),
            tileGrid: tilegrid,
            tileUrlFunction: (tileCoord, pixelRatio, proj) => {
                if (!tileCoord) {
                    return '';
                }
                var z = tileCoord[0];
                var x = tileCoord[1];
                var y = tileCoord[2];
                var sub = x % 2;
                if (x < 0) {
                    x = 'M' + -x;
                }
                if (y < 0) {
                    y = 'M' + -y;
                }
                return 'http://online' + sub + '.map.bdimg.com/tile/?qt=tile&x=' + x + '&y=' + y + '&z=' + z + '&styles=sl';
            }
        });
        let tilelayer = new TileLayer({
            source: baidu_source,
            name: 'bd_imga',
            zIndex: 1
        });
        return tilelayer;
    },
    /**
     * 百度地图实时路况
     */
    getBdTrafficLy() {
        let resolutions = [];
        for (let i = 0; i < 19; i++) {
            resolutions[i] = Math.pow(2, 18 - i);
        }
        let timeKey = new Date().getTime();
        let tilegrid = new TileGrid({
            origin: [0, 0],
            resolutions: resolutions
        });
        let baidu_source = new TileImageSource({
            projection: proj.get('BD-09'),
            tileGrid: tilegrid,
            tileUrlFunction: (tileCoord, pixelRatio, proj) => {
                if (!tileCoord) {
                    return '';
                }
                let z = tileCoord[0];
                let x = tileCoord[1];
                let y = tileCoord[2];
                if (x < 0) {
                    x = 'M' + -x;
                }
                if (y < 0) {
                    y = 'M' + -y;
                }
                return 'http://its.map.baidu.com:8002/traffic/TrafficTileService?level=' + z + '&x=' + x + '&y=' + y + '&time=' + timeKey + '&v=081&scaler=1';
            }
        });
        let tilelayer = new TileLayer({
            source: baidu_source,
            name: 'bd_tra',
            zIndex: 2
        });
        return tilelayer;
    },

    /**
     * 添加腾讯地图
     */
    getQQVecLy() {
        let projection = proj.get('EPSG:900913');
        let projectionExtent = projection.getExtent();
        let maxResolution = extent.getWidth(projectionExtent) / 256;
        let resolutions = new Array(23);
        let matrixIds = new Array(23);
        for (let z = 0; z < resolutions.length; ++z) {
            resolutions[z] = maxResolution / Math.pow(2, z);
            matrixIds[z] = 'EPSG:900913:' + z;
        }
        let tilelayer = new TileLayer({
            title: 'satelite',
            source: new XYZ({
                url: '',
                projection: 'EPSG:900913',
                tileGrid: new TileGrid({
                    resolutions: resolutions,
                    tileSize: 256,
                    origin: extent.getTopLeft(projectionExtent)
                }),
                tileUrlFunction: (tileCoord, pixelRatio, projection) => {
                    let scale = tileCoord[0];
                    let x = tileCoord[1];
                    let y = -tileCoord[2] - 1;
                    y = Math.pow(2, scale) - 1 - y;
                    return 'http://rt2.map.gtimg.com/tile?z=' + scale + '&x=' + x + '&y=' + y + '&styleid=2000&scene=0&version=236';
                }
            }),
            name: 'qq_vec',
            zIndex: 0
        });
        return tilelayer;
    },

    /**
     * 添加腾讯地图实时路况
     */
    getQQTrafficLy() {
        let projection = proj.get('EPSG:900913');
        let projectionExtent = projection.getExtent();
        let maxResolution = extent.getWidth(projectionExtent) / 256;
        let resolutions = new Array(23);
        let matrixIds = new Array(23);
        for (let z = 0; z < resolutions.length; ++z) {
            resolutions[z] = maxResolution / Math.pow(2, z);
            matrixIds[z] = 'EPSG:900913:' + z;
        }
        let tilelayer = new TileLayer({
            title: 'soso_rtic',
            source: new XYZ({
                url: '',
                projection: 'EPSG:900913',
                tileGrid: new TileGrid({
                    resolutions: resolutions,
                    tileSize: 256,
                    origin: extent.getTopLeft(projectionExtent)
                }),
                tileUrlFunction: (tileCoord, pixelRatio, projection) => {
                    let scale = tileCoord[0];
                    let x = tileCoord[1];
                    let y = -tileCoord[2] - 1;
                    let timeKey = new Date().getTime() / 1000;
                    y = Math.pow(2, scale) - 1 - y;
                    let balance = ['', 'a', 'b', 'c'];
                    let balanceItem = parseInt(4 * Math.random());
                    return 'http://rtt2' + balance[balanceItem] + '.map.qq.com/rtt/?z=' + scale + '&x=' + x + '&y=' + y + '&times=1&time=' + timeKey;
                }
            }),
            name: 'qq_tra',
            zIndex: 2
        });
        return tilelayer;
    },

    /**
     * 天地图矢量图
     * 添加天地图的Key
     */
    getTDTVecLy() {
        let tileLayer = new TileLayer({
            title: '天地图文字标注',
            source: new XYZ({
                url: 'http://t{1-7}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=e7ee2a90f16657549d12c9591bc0e3f9'
            }),
            name: 'tdt_vec',
            zIndex: 0
        });

        return tileLayer;
    },
    /**
     * 天地图注记图
     * 添加天地图的Key
     */
    getTDTVecALy() {
        let tileLayer = new TileLayer({
            title: '天地图文字标注',
            source: new XYZ({
                url: 'http://t{1-7}.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=e7ee2a90f16657549d12c9591bc0e3f9'
            }),
            name: 'tdt_veca',
            zIndex: 1
        });
        return tileLayer;
    },
    /**
     * 天地图影像图
     * 添加天地图的Key
     */
    getTDTImgLy() {
        let tileLayer = new TileLayer({
            title: '天地图影像图',
            source: new XYZ({
                url: 'http://t{1-7}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=e7ee2a90f16657549d12c9591bc0e3f9'
            }),
            name: 'tdt_img',
            zIndex: 0
        });
        return tileLayer;
    },
    /**
     * 天地图影像图注记
     * 添加天地图的Key
     */
    getTDTImgALy() {
        let tileLayer = new TileLayer({
            title: '天地图影像图注记',
            source: new XYZ({
                url: 'http://t{1-7}.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=e7ee2a90f16657549d12c9591bc0e3f9'
            }),
            name: 'tdt_imga',
            zIndex: 1
        });
        return tileLayer;
    },
    /**
     * 调用苏州外网
     */
    getSuZhouWWWLy() {
        let url = config.mapServiceUrl + '/geowebcache/service/wms';
        let lyName = 'suzhou_map_all_OSM';
        let resolutions = [0.0016656227040811962, 7.138383017490841E-4, 4.283029810494504E-4, 2.97432625728785E-4, 1.9035688046642243E-4, 9.517844023321122E-5, 4.758922011660561E-5, 2.3794610058302804E-5, 9.51784402332112E-6, 4.75892201166056E-6];
        let tileLayer = new TileLayer({
            visible:true,
            source: new TileWMSSource({
                url: url,
                params: {
                    LAYERS: lyName,
                    FORMAT: 'image/png',
                    SRS: 'EPSG:4326',
                    SERVICE: 'WMS',
                    VERSION: '1.1.1',
                    REQUEST: 'GetMap',
                },
                tileGrid: new TileGrid({
                    resolutions: resolutions,
                    tileSize: 256,
                    origin: [-400.0, 399.9999999999998]
                }),
                projection: 'EPSG:4326',
            })
        });
        return tileLayer;
    },
    /**
     * 调用苏州内网地图
     */
    getSuZhouLocLy() {
        let url = 'http://50.73.141.76:8080/geowebcache/service/wms';
        let lyName = 'suzhou_map_all_OSM';
        let resolutions = [
            0.0016656227040811962,
            7.138383017490841e-4,
            4.283029810494504e-4,
            2.97432625728785e-4,
            1.9035688046642243e-4,
            9.517844023321122e-5,
            4.758922011660561e-5,
            2.3794610058302804e-5,
            9.51784402332112e-6,
            4.75892201166056e-6
        ];
        let tileLayer = new TileLayer({
            source: new TileWMSSource({
                url: url,
                params: {
                    LAYERS: lyName,
                    FORMAT: 'image/png',
                    SRS: 'EPSG:4326',
                    SERVICE: 'WMS',
                    VERSION: '1.1.1',
                    REQUEST: 'GetMap'
                },
                tileGrid: new TileGrid({
                    resolutions: resolutions,
                    tileSize: 256,
                    origin: [-400.0, 399.9999999999998]
                }),
                projection: 'EPSG:4326'
            })
        });
        return tileLayer;
    }
};

export default BaseTileLy;
