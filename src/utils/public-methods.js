const publicMethods = {
    getDate: function () {
        let now = new Date();
        return [now.getFullYear(), now.getMonth() + 1, now.getDate(),
            now.getHours(), now.getMinutes(), now.getMilliseconds(),
            now.getDay()]
    },
    getDateY: function () {
        let curDate = new Date()
        let now = new Date(curDate.getTime() - 24 * 60 * 60 * 1000)
        return [now.getFullYear(), now.getMonth() + 1, now.getDate(),
            now.getHours(), now.getMinutes(), now.getMilliseconds(),
            now.getDay()]
    },
    /*当前日期yyyy-mm-dd*/
    getNowDate: function () {
        let d = this.getDate()
        return d[0] + "-" + (d[1] < 10 ? "0" + d[1] : d[1]) + "-" + (d[2] < 10 ? "0" + d[2] : d[2])
    },
    /*当前日期yyyymmdd*/
    getNowDateStr: function () {
        let d = this.getDate()
        return d[0] + (d[1] < 10 ? "0" + d[1] : d[1]) + (d[2] < 10 ? "0" + d[2] : d[2])
    },
    /*昨天日期yyyy-mm-dd*/
    getYesterdayDate: function () {
        let d = this.getDateY()
        return d[0] + "-" + (d[1] < 10 ? "0" + d[1] : d[1]) + "-" + (d[2] < 10 ? "0" + d[2] : d[2])
    },
    /*当前日期时间yyyy-mm-dd hh:mm:ss*/
    getNowTime: function () {
        let d = this.getDate()
        return d[0] + "-" + (d[1] < 10 ? "0" + d[1] : d[1]) + "-" + (d[2] < 10 ? "0" + d[2] : d[2]) +
            " " + (d[3] < 10 ? "0" + d[3] : d[3]) + ":" + (d[4] < 10 ? "0" + d[4] : d[4]) + ":" + (d[5] < 10 ? "0" + d[5] : d[5])
    },
    /*本周第一天yyyy-mm-dd*/
    getWeekFirstDate: function () {
        let d = new Date();
        let WeekFirstDay = d.getDay() || 7;
        d.setDate(d.getDate() - WeekFirstDay + 1);
        let Y = d.getFullYear();
        let M = d.getMonth() + 1;
        let D = d.getDate();
        return Y + "-" + (M < 10 ? "0" + M : M) + "-" + (D < 10 ? "0" + D : D)
    },
    /*本月第一天日期yyyy-mm-dd*/
    getMonthFirstDate: function () {
        let d = this.getDate()
        return d[0] + "-" + (d[1] < 10 ? "0" + d[1] : d[1]) + "-01"
    },
    /*本月第一天日期yyyymmdd*/
    getMonthFirstDateStr: function () {
        let d = this.getDate()
        return d[0] + (d[1] < 10 ? "0" + d[1] : d[1]) + "01"
    },
    /*本年第一天日期yyyy-mm-dd*/
    getYearFirstDate: function () {
        let d = this.getDate()
        return d[0] + "-01-01"
    },
    /*本月yyyymm*/
    getMonthStr: function () {
        let d = this.getDate()
        return "" + d[0] + (d[1] < 10 ? "0" + d[1] : d[1])
    },
    /*今年yyyymm*/
    getYearStr: function () {
        let d = this.getDate()
        return d[0] + "01"
    },
    /*获得上周的开始日期 yyyy-mm-dd*/
    getLastWeekStartDate: function () {
        let now = new Date(); //当前日期
        let nowDayOfWeek = now.getDay(); //今天本周的第几天
        let nowDay = now.getDate(); //当前日
        let nowMonth = now.getMonth(); //当前月
        let nowYear = now.getYear(); //当前年
        nowYear += (nowYear < 2000) ? 1900 : 0;
        let weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 6);
        let year = weekStartDate.getFullYear()
        let month = weekStartDate.getMonth() + 1
        let day = weekStartDate.getDate()
        return year + "-" + (month < 10 ? ("0" + month) : month) + "-" + (day < 10 ? ("0" + day) : day)
    },
    /*获得上周的结束日期 yyyy-mm-dd*/
    getLastWeekEndDate: function () {
        let now = new Date(); //当前日期
        let nowDayOfWeek = now.getDay(); //今天本周的第几天
        let nowDay = now.getDate(); //当前日
        let nowMonth = now.getMonth(); //当前月
        let nowYear = now.getYear(); //当前年
        nowYear += (nowYear < 2000) ? 1900 : 0;
        let weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
        let year = weekStartDate.getFullYear()
        let month = weekStartDate.getMonth() + 1
        let day = weekStartDate.getDate()
        return year + "-" + (month < 10 ? ("0" + month) : month) + "-" + (day < 10 ? ("0" + day) : day)
    },
    /*获得上月开始时间 yyyy-mm-dd*/
    getLastMonthStartDate: function () {
        let now = new Date(); //当前日期
        let nowYear = now.getYear(); //当前年
        nowYear += (nowYear < 2000) ? 1900 : 0;
        let lastMonthDate = new Date(); //上月日期
        lastMonthDate.setDate(1);
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
        let lastMonth = lastMonthDate.getMonth();
        let lastMonthStartDate = new Date(nowYear, lastMonth, 1);
        let year = lastMonthStartDate.getFullYear()
        let month = lastMonthStartDate.getMonth() + 1
        let day = lastMonthStartDate.getDate()
        return year + "-" + (month < 10 ? ("0" + month) : month) + "-" + (day < 10 ? ("0" + day) : day)
    },
    /*获得上月结束时间 yyyy-mm-dd*/
    getLastMonthEndDate: function () {
        let now = new Date(); //当前日期
        let nowYear = now.getYear(); //当前年
        nowYear += (nowYear < 2000) ? 1900 : 0;
        let lastMonthDate = new Date(); //上月日期
        lastMonthDate.setDate(1);
        lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
        let lastMonth = lastMonthDate.getMonth();
        let lastMonthEndDate = new Date(nowYear, lastMonth, this.getMonthDays(lastMonth));
        let year = lastMonthEndDate.getFullYear()
        let month = lastMonthEndDate.getMonth() + 1
        let day = lastMonthEndDate.getDate()
        return year + "-" + (month < 10 ? ("0" + month) : month) + "-" + (day < 10 ? ("0" + day) : day)
    },
    /*获取某月天数*/
    getMonthDays: function (myMonth) {
        let now = new Date(); //当前日期
        let nowYear = now.getYear(); //当前年
        nowYear += (nowYear < 2000) ? 1900 : 0;
        let monthStartDate = new Date(nowYear, myMonth, 1);
        let monthEndDate = new Date(nowYear, myMonth + 1, 1);
        let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
        return days;
    },
    /*获取日期相差天数*/
    dateMinus(startDate, endDate) {
        let sdate = new Date(startDate);
        let now = new Date(endDate);
        let days = now.getTime() - sdate.getTime();
        let day = parseInt(days / (1000 * 60 * 60 * 24));
        return day;
    },
    /*给定指定日期mdate，往前推days天、往后推days天 method:before、after*/
    getBeforeDateDate: function (mdate, days, method) {
        let adate = mdate.split("-")
        let newDate = new Date(adate[0] / 1, adate[1] / 1 - 1, adate[2] / 1)
        if (method == "after") {
            newDate.setDate(newDate.getDate() + days)
        } else {
            newDate.setDate(newDate.getDate() - days)
        }
        let year = newDate.getFullYear()
        let month = newDate.getMonth() + 1
        let day = newDate.getDate()
        return year + "-" + (month < 10 ? ("0" + month) : month) + "-" + (day < 10 ? ("0" + day) : day)
    },

    /*深拷贝obj、list*/
    copyObj(obj) {
        let resObj = JSON.parse(JSON.stringify(obj))
        return resObj
    },
    log(mess) {
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

export default publicMethods
