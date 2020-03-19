const esJson = {
    /*查询条件*/
    searchParam: (startTime, endTime) => {
        const organizationNumber = localStorage.setItem('v3_organizationNo', 'organizationNumber')
        let param = [
            {
                "range": {
                    "sgfssj": {
                        "gte": startTime,
                        "lte": endTime
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
    /*事故概况-一般事故、简易事故、快撤事故*/
    sggk1: (startTime, endTime) => {
        return {
            "query": {
                "bool": {
                    "must": esJson.searchParam(startTime, endTime)
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
    sggk2: (startTime, endTime) => {
        return {
            "query": {
                "bool": {
                    "must": esJson.searchParam(startTime, endTime)
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
    sgqs_month: (startTime, endTime) => {
        return {
            "query": {
                "bool": {
                    "must": esJson.searchParam(startTime, endTime)
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
    sgqs: (type, startTime, endTime) => {
        return {
            "query": {
                "bool": {
                    "must": esJson.searchParam(startTime, endTime)
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
                        "field": type
                    }
                }
            }
        }
    },
    /*区域安全*/
    qyaq: (startTime, endTime) => {
        return {
            "query": {
                "bool": {
                    "must": esJson.searchParam(startTime, endTime)
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
    dlaq: (startTime, endTime) => {
        return {
            "query": {
                "bool": {
                    "must": esJson.searchParam(startTime, endTime)
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
                                    "gte": "201907",
                                    "lte": "201907"
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
                        "size": 99,
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
    }
}
export default esJson