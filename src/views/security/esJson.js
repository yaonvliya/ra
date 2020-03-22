const esJson = {
    /*查询条件*/
    searchParam: (time, type) => {
        const organizationNumber = localStorage.getItem('v3_organizationNumber')
        let param = [
            {
                "term": {
                    "sj_ym": time
                }
            },
            {
                "term": {
                    "qlbs": "1"
                }
            }
        ]
        if (organizationNumber != "320500") {
            param.push({
                "term": {
                    "dddm": organizationNumber
                }
            })
        }
        return param
    },
    /*事故概况-一般事故、简易事故、快撤事故*/
    sggk1: (time, type) => {
        return {
            "query": {
                "bool": {
                    "must": esJson.searchParam(time, type)
                }
            },
            "size": 0,
            "aggs": {
                "model": {
                    "terms": {
                        "order": {
                            "_count": "desc"
                        },
                        "size": "999",
                        "field": "clcx"
                    }
                }
            }
        }
    },
    /*事故概况-死亡人数、受伤人数*/
    sggk2: (time, type) => {
        return {
            "query": {
                "bool": {
                    "must": esJson.searchParam(time, type)
                }
            },
            "size": 0,
            "aggs": {
                "swrs": {
                    "sum": {
                        "field": "swrs7"
                    }
                },
                "ssrs": {
                    "sum": {
                        "field": "ssrs7"
                    }
                }
            }
        }
    },
    /*事故趋势-月度*/
    sgqs_month: (timeList, type) => {
        return {
            "query": {
                "bool": {
                    "must": [
                        {
                            "terms": {
                                "sj_y": timeList
                            }
                        },
                        {
                            "term": {
                                "qlbs": "1"
                            }
                        }
                    ]
                }
            },
            "size": 0,
            "aggs": {
                "model": {
                    "terms": {
                        "order": {
                            "_term": "asc"
                        },
                        "size": "999",
                        "field": "sj_y"
                    },
                    "aggs": {
                        "fxmb": {
                            "terms": {
                                "order": {
                                    "_count": "desc"
                                },
                                "field": "sj_m",
                                "size": "999"
                            }
                        }
                    }
                }
            }
        }
    },
    /*事故趋势-小时、星期*/
    sgqs: (field, time, type) => {
        return {
            "query": {
                "bool": {
                    "must": esJson.searchParam(time, type)
                }
            },
            "size": 0,
            "aggs": {
                "model": {
                    "terms": {
                        "order": {
                            "_count": "desc"
                        },
                        "size": 999,
                        "field": field
                    }
                }
            }
        }
    },
    /*区域安全*/
    qyaq: (time, type) => {
        return {
            "query": {
                "bool": {
                    "must": esJson.searchParam(time, type)
                }
            },
            "size": 0,
            "aggregations": {
                "a1": {
                    "terms": {
                        "field": "dddm",
                        "size": 99,
                        "order": {
                            "_count": "desc"
                        }
                    },
                    "aggregations": {
                        "a2": {
                            "sum": {
                                "script": {
                                    "inline": "if((doc['swrs7'].value>0)){1} else {0}",
                                    "lang": "painless"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    /*道路安全*/
    dlaq: (time, type) => {
        return {
            "query": {
                "bool": {
                    "must": esJson.searchParam(time, type)
                }
            },
            "size": 0,
            "aggregations": {
                "a1": {
                    "terms": {
                        "field": "lm",
                        "size": 99,
                        "order": {
                            "_count": "desc"
                        }
                    },
                    "aggregations": {
                        "a2": {
                            "sum": {
                                "script": {
                                    "inline": "if((doc['swrs7'].value>0)){1} else {0}",
                                    "lang": "painless"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    /*营运安全、车辆安全、驾驶员安全*/
    safety: (type, startTime, endTime) => {
        return {
            "query": {
                "bool": {
                    "must": [
                        {
                            "range": {
                                "年月": {
                                    "gte": startTime,
                                    "lte": endTime
                                }
                            }
                        }
                    ]
                }
            },
            "size": 0,
            "aggs": {
                "model": {
                    "terms": {
                        "field": type,
                        "size": 20,
                        "order": {
                            "a1": "desc"
                        }
                    },
                    "aggs": {
                        "a1": {
                            "sum": {
                                "field": "违法总数"
                            }
                        },
                        "a2": {
                            "sum": {
                                "field": "事故总数"
                            }
                        }
                    }
                }
            }
        }
    },
    /*事故概况-一般事故、简易事故、快撤事故tb\hb*/
    sggk1_tbhb: (time, type) => {
        return {
            "query": {
                "bool": {
                    "must": esJson.searchParamtbhb(time, type)
                }
            },
            "size": 0,
            "aggs": {
                "model": {
                    "terms": {
                        "order": {
                            "_count": "desc"
                        },
                        "size": "999",
                        "field": "clcx"
                    }
                }
            }
        }
    },
    /*事故概况-死亡人数、受伤人数tb\hb*/
    sggk2_tbhb: (time, type) => {
        return {
            "query": {
                "bool": {
                    "must": esJson.searchParamtbhb(time, type)
                }
            },
            "size": 0,
            "aggs": {
                "swrs": {
                    "sum": {
                        "field": "swrs7"
                    }
                },
                "ssrs": {
                    "sum": {
                        "field": "ssrs7"
                    }
                }
            }
        }
    },
    /*查询条件tbhb*/
    searchParamtbhb: (time, type) => {
        const organizationNumber = localStorage.getItem('v3_organizationNumber')
        let param = [
            {
                "range": {
                    "sj_ymd": {
                        "gte": time[0],
                        "lte": time[1]
                    }
                }
            },
            {
                "term": {
                    "qlbs": "1"
                }
            }
        ]
        if (organizationNumber != "320500") {
            param.push({
                "term": {
                    "dddm": organizationNumber
                }
            })
        }
        return param
    },
}
export default esJson