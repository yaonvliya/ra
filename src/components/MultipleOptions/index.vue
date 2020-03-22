<template>
    <el-select
            v-model="selectOption"
            multiple
            collapse-tags
            placeholder="请选择"
            class="width100"
            @change="selectChange">
        <el-option
                v-for="item in datas.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>
</template>

<script>
    export default {
        name: 'multselect',
        props:['datas','change'],
        data: function () {
            return {
                selectOption:[],
                oldselectOption:[],
                allValues:[],
                callbackvalues:[]
            }
        },
        created() {
            this.init()
        },
        methods: {
            init(){
                if(this.datas.options){
                    this.allValues = []
                    this.callbackvalues = []
                    if(this.datas.allOption!='') this.callbackvalues = [this.datas.allOption]
                    // 保留所有值
                    for (const item of this.datas.options) {
                        this.allValues.push(item.value)
                    }
                }
                if(this.datas.defaultOption[0]==this.datas.allOption) this.selectOption=this.allValues;
                else this.selectOption=this.datas.defaultOption;

                this.oldselectOption[0] = this.selectOption;
            },
            selectChange: function (val) {
                // 用来储存上一次的值，可以进行对比
                const oldVal = this.oldselectOption.length === 1 ? this.oldselectOption[0] : [];
                // 若是全部选择
                if (val.includes(this.datas.allOption)) this.selectOption =  this.allValues;
                // 取消全部选中 上次有 当前没有 表示取消全选
                if (oldVal.includes(this.datas.allOption) && !val.includes(this.datas.allOption)) this.selectOption = [];
                // 点击非全部选中 需要排除全部选中 以及 当前点击的选项
                // 新老数据都有全部选中
                if (oldVal.includes(this.datas.allOption) && val.includes(this.datas.allOption)) {
                    const index = val.indexOf(this.datas.allOption);
                    val.splice(index, 1); // 排除全选选项
                    this.selectOption = val
                }
                // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
                if (!oldVal.includes(this.datas.allOption) && !val.includes(this.datas.allOption)) {
                    if (val.length ===  this.allValues.length - 1) this.selectOption =  this.allValues
                }
                // 储存当前最后的结果 作为下次的老数据
                this.oldselectOption[0] = this.selectOption;
                if(this.selectOption.includes(this.datas.allOption)) this.callbackvalues=[]
                else this.callbackvalues=this.selectOption

                if(this.datas.allOption!='') this.callbackvalues = [this.datas.allOption]
                //console.log("选择结果="+this.callbackvalues)

                //值改变函数，绑定父页面 父页面中使用:change=""绑定
                if(this.change){
                    this.change(this.selectOption)
                }
            }

        },
        watch:{
            'datas.options'(newValue,oldValue){
                this.init()
            }
        }
    }
</script>

<style scoped>



</style>
