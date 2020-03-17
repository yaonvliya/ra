window.commonPublic = {
    copyObj(obj) {/*深拷贝obj、list*/
        let resObj = JSON.parse(JSON.stringify(obj))
        return resObj
    },
    log(mess){
        console.log(mess);
    },
    /*可拖动事件
    html中@mousedown="mousedown($event,'mapDraggable')"
    js中mousedown(e,id){
        PublicFuc.dragMethods(e,id)
    }*/
    dragMethods(event, id, isBack, _this) {
        let div1 = document.getElementById(id)
        div1.style.cursor = 'move'
        let distanceX = event.clientX - div1.offsetLeft
        let distanceY = event.clientY - div1.offsetTop
        document.onmousemove = function (ev) {
            let oevent = ev || event
            div1.style.left = oevent.clientX - distanceX + 'px'
            div1.style.top = oevent.clientY - distanceY + 'px'
        }
        document.onmouseup = function () {
            document.onmousemove = null
            document.onmouseup = null
            div1.style.cursor = 'default'
            if (isBack) {
                _this.createList(div1.style.left, div1.style.top)
                div1.style.left = ""
                div1.style.top = ""
            }
        }
    }

}