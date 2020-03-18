/**
 * @author 李占盛
 * @name 图表相关参数
 * @attention
 */

var chartsParam = {
    /*事故趋势、预警信息-折线图*/
    securityBottomLineOption: {
    title: {
        text: '月份分布',
            show: false,
    },
    tooltip: {
        trigger: 'axis',
            padding: [8, 12, 8, 12],
            axisPointer: {
            lineStyle: {
                color: 'rgba(23, 98, 249, 0.07)',
                    width: 24
            }
        },
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
            textStyle: {
            color: '#fff',
                fontFamily: 'PingFang',
                fontSize: 14
        }
    },
    grid: {
        top: 50,
            left: 50,
            right: 30,
            bottom: 20
    },
    legend: {
        show: true,
            right: 15,
            top: 5,
            textStyle: {
            color: '#999999',
                fontFamily: 'PingFang',
                fontSize: 12
        },
        // selected: {
        //     '2017年': true,
        //     '2018年': true,
        //     '2019年': true
        // },
        data: [],
    },
    xAxis: {
        axisLine: {
            lineStyle: {
                color: '#DCDFE6'
            }
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            color: '#666666',
                fontFamily: 'PingFang',
                fontSize: 12
        },
        data: [],
    },
    yAxis: [{
        name: '',
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            color: '#666666',
            fontFamily: 'PingFang',
            fontSize: 12,
            formatter: function (value) {
                let y = value / 1000;
                return y + "k";
            }
        },
        splitLine: {
            lineStyle: {
                color: '#E4E7ED',
                width: 1,
                type: 'dotted'
            }
        },
    }, {
        name: '',
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            color: '#666666',
            fontFamily: 'PingFang',
            fontSize: 12
        },
        splitLine: {
            lineStyle: {
                color: '#E4E7ED',
                width: 1,
                type: 'dotted'
            }
        }
    }],
        series: [
        {
            name: '',
            type: 'line',
            showSymbol: false,
            smooth: true,
            symbol: 'circle',
            itemStyle: {
                color: '#268BFF',
            },
            lineStyle: {
                color: '#268BFF',
                width: 2,
                shadowColor: 'rgba(38,139,255,0.88)',
                shadowBlur: 10,
                shadowOffsetY: 3
            },
            markPoint: {
                data: [
                    {
                        type: 'max',
                        name: '最大值',
                        symbol: 'circle',
                        symbolSize: 12,
                        itemStyle: {
                            color: '#fff',
                            borderColor: '#268BFF',
                            borderWidth: 2,
                        },
                        label: {
                            show: false,
                        }
                    },
                ]
            },
            data: []
        },
        {
            name: '',
            type: 'line',
            showSymbol: false,
            smooth: true,
            symbol: 'circle',
            itemStyle: {
                color: '#4DCB73',
            },
            lineStyle: {
                color: '#4DCB73',
                width: 2,
                shadowColor: 'rgba(77,203,115,0.88)',
                shadowBlur: 10,
                shadowOffsetY: 3
            },
            markPoint: {
                data: [
                    {
                        type: 'max',
                        name: '最大值',
                        symbol: 'circle',
                        symbolSize: 12,
                        itemStyle: {
                            color: '#fff',
                            borderColor: '#4DCB73',
                            borderWidth: 2,
                        },
                        label: {
                            show: false,
                        }
                    },
                ]
            },
            data: []
        },
        {
            name: '',
            type: 'line',
            smooth: true,
            showSymbol: false,
            symbol: 'circle',
            itemStyle: {
                color: '#FACC14',
            },
            lineStyle: {
                color: '#FACC14',
                width: 2,
                shadowColor: 'rgba(250,204,20,0.88)',
                shadowBlur: 13,
                shadowOffsetY: 1
            },
            markPoint: {
                data: [
                    {
                        type: 'max',
                        name: '最大值',
                        symbol: 'circle',
                        symbolSize: 12,
                        itemStyle: {
                            color: '#fff',
                            borderColor: '#FACC14',
                            borderWidth: 2,
                        },
                        label: {
                            show: false,
                        }
                    },
                ]
            },
            data: []
        },
    ]
},
};
export default chartsParam
