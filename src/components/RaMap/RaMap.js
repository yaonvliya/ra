const RaMap = {
    /*rgb处理*/
    colorRgb: (hex) => {
        let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        let sColor = hex.toLowerCase();
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                let sColorNew = '#';
                for (let i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            let sColorChange = [];
            for (let i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
            }
            return sColorChange;
        } else {
            return sColor;
        }
    },
    /*maptool-全图*/
    mapTool_zoomAll: (_this) => {
        _this.centerTo(_this.mapOption.center, _this.mapOption.zoom)
    },
    /*maptool-测量面积*/
    mapTool_measureArea(_this) {
        _this.startMeasure("area")
    },
    /*maptool-测量面积*/
    mapTool_measureLength(_this) {
        _this.startMeasure("line")
    },
    /*maptool-拖动地图*/
    mapTool_moveMap(_this){
        _this.stopMeasure()
    },
    /*maptool-清空图层*/
    mapTool_clearMap(_this){
        _this.clearMap()
    },
    /*maptool-切换底图*/
    mapTool_changeBaseLayer(_this){
        // let layer = _this.myMap.baseLys["sz_online"]
        // layer.setVisible(false)
    }
}

export default RaMap