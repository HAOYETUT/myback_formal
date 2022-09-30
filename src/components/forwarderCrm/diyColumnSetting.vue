<template>
    <div class="diyColumnSetting">
      <el-table row-key="prop" class="diyColumnSettingTable" border :data="tableData" style="width: 100%;" ref="multipleTable" v-loading="tableLoading" @select="handleSelect" @select-all="handleSelectAll" @row-contextmenu="handleRowContextMenu">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column label="字段名称" prop="label" align="center">
            <template slot-scope="scope">
                <el-input v-model="scope.row.label" placeholder="请输入字段名称" :disabled="!scope.row.status"></el-input>
            </template>
        </el-table-column>
        <el-table-column label="对齐方式" prop="align" align="center">
            <template slot-scope="scope">
                <el-select v-model="scope.row.align" placeholder="请选择对齐方式" :disabled="!scope.row.status">
                    <el-option
                    v-for="item in alignSelect"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </template>
        </el-table-column>
        <el-table-column label="字段宽度" prop="width" align="center">
            <template slot-scope="scope">
                <el-input-number v-model="scope.row.width" controls-position="right" placeholder="请输入字段宽度" :min="0" :max="500" :disabled="!scope.row.status"></el-input-number>
            </template>
        </el-table-column>
        <el-table-column label="字段排序" prop="sortable" align="center">
            <template slot-scope="scope">
                <el-select v-model="scope.row.sortable" placeholder="请选择" :disabled="!scope.row.status">
                    <el-option
                    v-for="item in sortSelect"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </template>
        </el-table-column>
        <el-table-column label=" " prop="" width="50" align="center">
            <template slot-scope="scope">
                <div style="cursor:pointer;">
                    <div>
                        <span class="el-icon-minus"></span>
                    </div>
                    <div style="margin-top:-20px;">
                        <span class="el-icon-minus"></span>
                    </div>
                    <div style="margin-top:-20px;">
                        <span class="el-icon-minus"></span>
                    </div>
                </div>
            </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
import Sortable from 'sortablejs';
export default {
    name:"diyColumnSetting",
    props:[
        "diyColumnSettingDialog",
        "pagetype",
        "colTemp"
    ],
    data(){
        return{
            tableData:[],
            tableLoading:false,
            alignSelect:[{
                value:'left',
                label:'左对齐'
            },{
                value:'center',
                label:'居中'
            },{
                value:'right',
                label:'右对齐'
            }],
            sortSelect:[{
                value:true,
                label:'是',
            },{
                value:false,
                label:'否'
            }]
        }
    },
    watch:{
        diyColumnSettingDialog: {
            handler(val) {
                if(val){
                    this.tableLoading = true;
                    this.tableData = [];
                    var columnConfig = '';
                    if(this.pagetype==1){
                        columnConfig = localStorage.getItem('forwarderPublicCustomerList')
                    }else if(this.pagetype==2){
                        columnConfig = localStorage.getItem('forwarderPrivateCustomerList')
                    }
                    columnConfig = JSON.parse(columnConfig);
                    // var reStorage = false;
                    // columnConfig.forEach(element=>{
                    //     if(element.prop=='box_in_name'||element.prop=='box_out_name'){
                    //         if(element.sortable){
                    //             reStorage = true;
                    //             element.sortable = false;
                    //         }
                    //     }
                    // });
                    // if(reStorage){
                    //     if(this.pagetype==1){
                    //         localStorage.setItem('forwarderPublicCustomerList',JSON.stringify(columnConfig));
                    //     }else if(this.pagetype==2){
                    //         localStorage.setItem('forwarderPrivateCustomerList',JSON.stringify(columnConfig));
                    //     }
                    // }

                    this.colTemp.forEach(cte => {
                        var flag = true;
                        columnConfig.forEach(dce => {
                            if(dce.prop==cte.prop){
                                flag = false;
                                return;
                            }
                        })
                        if(flag){
                            var ctetemp = {};
                            Object.assign(ctetemp,cte);
                            ctetemp.status = false;
                            columnConfig.push(ctetemp);
                        }
                    });
                    this.tableData = columnConfig;
                    this.$nextTick(()=>{
                        this.tableData.forEach(element => {
                            if(element.status){
                                this.$refs.multipleTable.toggleRowSelection(element,true);
                            }
                        })
                        this.tableLoading = false;
                    });
                }
            },
            immediate: true,
            deep: true
        },
    },
    created(){

    },
    mounted(){
        this.rowDrop();
    },
    methods:{
        resettingColumn(){
            this.$confirm('是否确认重置列设置并重载页面', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(this.pagetype==1){
                    localStorage.setItem('forwarderPublicCustomerList',JSON.stringify(this.colTemp));
                }else if(this.pagetype==2){
                    localStorage.setItem('forwarderPrivateCustomerList',JSON.stringify(this.colTemp));
                }
                location.reload();
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消重置'
                });          
            });
        },
        rowDrop () {
            // 此时找到的元素是要拖拽元素的父容器
            const tbody = document.querySelector('.diyColumnSettingTable .el-table__body-wrapper tbody');
            const _this = this;
            Sortable.create(tbody, {
                animation: 500,
                delay: 100,
                //  指定父元素下可被拖拽的子元素
                draggable: ".el-table__row",
                onEnd ({ newIndex, oldIndex }) {
                    const currRow = _this.tableData.splice(oldIndex, 1)[0];
                    _this.tableData.splice(newIndex, 0, currRow);
                }
            });
        },
        handleRowContextMenu(row, column, event){
            event.preventDefault();
            if(row.status){
                row.status = !row.status;
                var index = this.tableData.indexOf(row);
                this.tableData.splice(index,1);
                this.tableData.push(row);
                this.$nextTick(()=>{
                    this.tableData.forEach(element => {
                        if(element.status){
                            this.$refs.multipleTable.toggleRowSelection(element,true);
                        }
                    })
                })
            }else{
                row.status = !row.status;
            }
            this.$refs.multipleTable.toggleRowSelection(row,row.status);
        },
        handleSelect(selection, row){
            if(row.status){
                row.status = !row.status;
                var index = this.tableData.indexOf(row);
                this.tableData.splice(index,1);
                this.tableData.push(row);
                this.$nextTick(()=>{
                    this.tableData.forEach(element => {
                        if(element.status){
                            this.$refs.multipleTable.toggleRowSelection(element,true);
                        }
                    })
                })
            }else{
                row.status = !row.status;
            }
        },
        handleSelectAll(selection){
            if(selection.length==0){
                this.tableData.forEach(element => {
                    element.status = false;
                });
            }else{
                this.tableData.forEach(element => {
                    element.status = true;
                });
            }
        },
        preserveColumnConfig(){
            var flag = false;
            this.tableData.forEach(element => {
                if(element.status){
                    if(element.label===''||element.prop===''||element.align===''||element.width==undefined||element.sortable===''){
                        flag = true;
                        return;
                    }
                }
            })
            if(flag){
                this.$message.warning("请将已选中的行设置信息填全，再尝试提交！");
                return;
            }
            var columnConfig = [];
            this.tableData.forEach(element => {
                if(element.status){
                    // if(element.prop=='box_in_name'||element.prop=='box_out_name'){
                    //     if(element.sortable){
                    //         element.sortable = false;
                    //     }
                    // }
                    columnConfig.push(element);
                }
            })
            if(columnConfig.length<3){
                this.$message.warning("请至少选择三列数据进行展示！");
                return;
            }
            this.$confirm('是否确认保存列设置并重载页面', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(this.pagetype==1){
                    localStorage.setItem('forwarderPublicCustomerList',JSON.stringify(columnConfig));
                }else if(this.pagetype==2){
                    localStorage.setItem('forwarderPrivateCustomerList',JSON.stringify(columnConfig));
                }
                location.reload();
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消保存'
                });          
            });
        }
    }
}
</script>