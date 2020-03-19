const esJson = {
    /*事故概况-一般事故、简易事故、快撤事故*/
    sggk1: (startTime, endTime) => {
        return {
            "query": {
                "bool": {
                    "must": [
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
                }
            },
            "from": 0,
            "size": 0,
            "sort": [],
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
                    "must": [
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
                }
            },
            "from": 0,
            "size": 0,
            "sort": [],
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
    /*区域安全*/
    qyaq: (startTime, endTime) => {
        return {
            "query": {
                "bool": {
                    "must": [
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
                    "must": [
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
}
export default esJson