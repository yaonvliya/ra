/**
 * @author 李占盛
 * @name 图表相关参数
 * @attention
 */

var chartsParam = {
    /*事故趋势、预警信息-折线图*/
    securityBottomLineOption: {
        title: {
            text: '',
            show: false,
        },
        tooltip: {
            trigger: 'axis',
            padding: [8, 12, 8, 12],
            axisPointer: {
                lineStyle: {
                    color: 'rgba(0,0,0,0.25)',
                    width: 2
                }
            },
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            textStyle: {
                color: '#fff',
                fontSize: 14
            }
        },
        grid: {
            top: 15,
            left: 33,
            right: 33,
            bottom: 64
        },
        legend: {
            show: false,
            right: 15,
            top: 0,
            textStyle: {
                color: '#999999',
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
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: 'rgba(130, 145, 169, 0.25)',
                    width: 1,
                    type: 'solid'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: 'rgba(43, 48, 52, 0.4)',
                fontSize: 12
            },
            splitLine: {
                show: true,
                interval: 4,
                lineStyle: {
                    color: 'rgba(130, 145, 169, 0.25)',
                    width: 1,
                    type: 'dashed'
                }
            },
            data: [],
        },
        yAxis: [{
            name: '',
            axisLine: {
                lineStyle: {
                    color: 'rgba(130, 145, 169, 0.25)',
                    width: 1,
                    type: 'dashed'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: 'rgba(43, 48, 52, 0.4)',
                fontSize: 12,
                formatter: function (value) {
                    let y = value / 1000;
                    return y + "k";
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(130, 145, 169, 0.25)',
                    width: 1,
                    type: 'dashed'
                }
            },
        }, {
            name: '',
            axisLine: {
                lineStyle: {
                    color: 'rgba(130, 145, 169, 0.25)',
                    width: 1,
                    type: 'dashed'
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: 'rgba(43, 48, 52, 0.4)',
                fontSize: 12
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(130, 145, 169, 0.25)',
                    width: 1,
                    type: 'dashed'
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
                symbolSize: 6,
                itemStyle: {
                    color: '#387DFF',
                },
                lineStyle: {
                    color: '#387DFF',
                    width: 2,
                },
                markPoint: {
                    data: [
                        {
                            type: 'max',
                            name: '最大值',
                            symbol: 'circle',
                            symbolSize: 6,
                            itemStyle: {
                                color: '#387DFF',
                                borderColor: '#ffffff',
                                borderWidth: 2,
                            },
                            label: {
                                show: false,
                            }
                        },
                    ]
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(56, 125, 255, 0.45)' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'rgba(56, 125, 255, 0)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                },
                data: []
            },
            {
                name: '',
                type: 'line',
                showSymbol: false,
                smooth: true,
                symbol: 'circle',
                symbolSize: 6,
                itemStyle: {
                    color: '#23B899',
                },
                lineStyle: {
                    color: '#23B899',
                    width: 2,
                },
                markPoint: {
                    data: [
                        {
                            type: 'max',
                            name: '最大值',
                            symbol: 'circle',
                            symbolSize: 6,
                            itemStyle: {
                                color: '#23B899',
                                borderColor: '#fff',
                                borderWidth: 2,
                            },
                            label: {
                                show: false,
                            }
                        },
                    ]
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(35, 184, 153, 0.45)' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'rgba(35, 184, 153, 0)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                },
                data: []
            },
            {
                name: '',
                type: 'line',
                smooth: true,
                showSymbol: false,
                symbol: 'circle',
                symbolSize: 6,
                itemStyle: {
                    color: '#FF5F58',
                },
                lineStyle: {
                    color: '#FF5F58',
                    width: 2,
                },
                markPoint: {
                    data: [
                        {
                            type: 'max',
                            name: '最大值',
                            symbol: 'circle',
                            symbolSize: 6,
                            itemStyle: {
                                color: '#FF5F58',
                                borderColor: '#fff',
                                borderWidth: 2,
                            },
                            label: {
                                show: false,
                            }
                        },
                    ]
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(255, 95, 88, 0.45)' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'rgba(255, 95, 88, 0)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                },
                data: []
            },
        ]
    },
};
export default chartsParam
