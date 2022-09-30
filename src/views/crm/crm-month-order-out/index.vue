<!--出口放箱统计-->
<template>
  <table-layout>
    <template #header>
      <simple-search :search-columns="searchColumns" @query-search="querySearch">
        <template #suffix>
          <search-item>
            <el-select v-model="box_id" clearable filterable class="w140px" placeholder="选择放箱公司">
              <el-option v-for="item in boxCompany" :key="item.box_id" :value="item.box_id" :label="item.box_name" />
            </el-select>
          </search-item>
          <search-item v-if="pagetype==2&&group_name==='销售主管'">
            <el-select v-model="admin_id" clearable filterable class="w140px" placeholder="销售" @change="changeSale">
              <el-option v-for="item in adminSelect" :key="item.admin_id" :value="item.admin_id" :label="item.name" />
            </el-select>
          </search-item>
          <search-item v-if="pagetype==2">
            <el-select v-model="shop_id" clearable filterable class="w140px" placeholder="车队" @change="changeCar">
              <el-option v-for="item in carSelect" :key="item.shop_id" :value="item.shop_id" :label="item.shop_name" />
            </el-select>
          </search-item>
        </template>
      </simple-search>
    </template>
    <vxe-table
      ref="xTable"
      auto-resize
      show-footer
      height="100%"
      row-id="shop_id"
      :data="tableData"
      highlight-hover-row
      column-min-width="120"
      :loading="listLoading"
      :footer-method="footerMethod"
      :checkbox-config="{highlight: false}"
    >
      <vxe-table-column type="seq" field="seq" title="序号" width="60" align="center" fixed="left" />
      <vxe-table-column field="box_name" title="放箱公司" width="200" fixed="left" />
      <vxe-table-column field="shop_name" title="客户" width="200" fixed="left" />
      <vxe-table-column field="num" sortable title="合计 " fixed="left" />
      <vxe-table-column v-for="(item,index) in 31" :key="index" sortable :title="`${pad(item)}`" :field="`a${pad(item)}`" />
    </vxe-table>

  </table-layout>
</template>

<script>
import { pad, formatTime } from '@/utils'
import XEUtils from 'xe-utils'
// import { monthOrderOut, getPutBoxMsg } from '@/api/box'
// import { toInteger } from 'xe-utils/methods'
import { CRM_API } from '@/config'
// import axios from 'axios'
import request from '@/utils/request'

export default {
  name: 'CrmBoxMonthOrderOut',
  data() {
    return {
      dt: '',
      autoId: '',
      tableData: [],
      listLoading: false,
      box_id: '',
      boxCompany: [], // 放箱公司
      condition: {
        time: formatTime(new Date(), 'YYYY-MM')
      },
      searchColumns: [
        { tagName: 'date', prop: 'time', value: formatTime(new Date(), 'YYYY-MM'), placeholder: '选择日期', type: 'month', valueFormat: 'yyyy-MM' },
        { tagName: 'select', prop: 'location', value: '', placeholder: '全部所属类型', options: [], className: 'w120px', filterable: true },
        // { tagName: 'select', prop: 'box_id', value: '', placeholder: '选择放箱公司', options: [], className: 'w120px', filterable: true },
        { tagName: 'select', prop: 'type', value: '', placeholder: '选择客户类型', options: [{ label: '全部车队', value: '1,2' }, { label: '系统车队', value: '1' }, { label: '接口车队', value: '2' }, { label: '放箱公司', value: '3' }], className: 'w120px', filterable: true },
        { tagName: 'select', prop: 'date_type', value: '', placeholder: '选择放箱客户', options: [{ label: '放箱客户', value: '1' }, { label: '3天以上连续未放箱', value: '3' }], className: 'w120px', filterable: true }
      ],
      admin_id:'',
      pagetype:'',
      shop_id:'',
      my_push_admin:[], //用户下绑定的销售以及自己的id集合
      my_push_admin_str:'',
      adminSelect:[], //crm中销售下拉框
      carSelect:[], //crm中车队下拉框
      shop_ids:[],
      current_admin_id:'',
      nav_group_id:'',
      group_name:'',
      pagetype:2,
    }
  },
  created() {
    // this.pagetype = toInteger(this.getQueryVariable("pagetype"));
    if(localStorage.getItem("userInfo")!=null){
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.current_admin_id = userInfo.admin_id;
        this.nav_group_id = userInfo.nav_group_id;
        this.group_name = userInfo.group_name;
        var adminIds = '';
        if(this.group_name==='销售主管'){
          adminIds = userInfo.my_push_admin;
          if(adminIds==""||adminIds==null){
            this.my_push_admin_str+=this.current_admin_id;
          }else{
            this.my_push_admin_str = adminIds+","+this.current_admin_id;
          }
        }else{
          this.my_push_admin_str+=this.current_admin_id;
        }

        if(this.my_push_admin_str!=''){
          this.my_push_admin = this.my_push_admin_str.split(',');
          if(this.group_name==='销售主管'){
            this.getSaleSelectByAdminIds();
          }
          this.getCarSelectByAdminIdsForBox().then((res)=>{
            if(this.carSelect!=[]){
              this.getList();
            }
          });
        }
    }else{
      this.getList();
    }
    // this.getPutBoxMsg()
  },
  methods: {
    changeCar(val){
      if(val==""){
        this.shop_ids = this.all_shop_ids;
      }else{
        this.shop_ids = [];
        this.shop_ids.push(val);
      }
    },
    changeSale(val){
      this.shop_id = '';
      if(val!=""){
        this.getCarSelectBySalemanId(val);
      }else{
        this.getCarSelectByAdminIdsForBox();
      }
    },
    getSaleSelectByAdminIds(){
      var self = this;
      request({
        method: 'post',
        url: `${CRM_API}/crm/getSaleSelectByAdminIds`,
        data: {"adminIds":self.my_push_admin}
      }).then(res=>{
        self.adminSelect = res.data;
      }).catch(res=>{
      })
    },
    getCarSelectByAdminIdsForBox(){
      var self = this;
      return new Promise(function(resolve,reject){
        request({
          method: 'post',
          url: `${CRM_API}/crm/getCarSelectByAdminIdsForBox`,
          data: {"group_name":self.group_name,"adminIds":self.my_push_admin,"userRegion":self.userRegion}
        }).then(res=>{
          self.carSelect = res.data;
          self.all_shop_ids = [];
          self.shop_ids = [];
          self.carSelect.forEach(element => {
            self.all_shop_ids.push(element.shop_id);
            self.shop_ids = self.all_shop_ids;
          });
          resolve();
        }).catch(res=>{
        })
      })
    },
    getCarSelectBySalemanId(admin_id){
      var self = this;
      request({
        method: 'post',
        url: `${CRM_API}/crm/getCarSelectBySalemanId`,
        data: {"admin_id":admin_id}
      }).then(res=>{
        self.carSelect = res.data;
        self.all_shop_ids = [];
        self.shop_ids = [];
        self.carSelect.forEach(element => {
          self.all_shop_ids.push(element.shop_id);
          self.shop_ids = self.all_shop_ids;
        })
      }).catch(res=>{
      })
    },
    getQueryVariable(variable){
      if(location.href.indexOf('?')>0){
        var query = location.href.split('?')[1];
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == variable){return pair[1];}
        }
        return(false);
      }
      return(false);
    },
    pad,
    // 数据字典
    // async getPutBoxMsg() {
    //   const { type, box_company } = await getPutBoxMsg()
    //   this.searchColumns[1].options = type || []
    //   this.boxCompany = box_company || [] // 放箱公司
    // },
    async getList() {
      this.listLoading = true
      var requestdata = {...this.condition, box_id: this.box_id};
      if(this.pagetype==2){
        requestdata.shop_ids = this.shop_ids;
      }
      // const { data } = await monthOrderOut(requestdata).finally(() => { this.listLoading = false })
      this.tableData = []
    },
    // 统计合计
    footerMethod({ columns, data }) {
      const sums = []
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          sums.push('合计', '', '')
        } else {
          if (['seq', 'box_name', 'shop_name'].indexOf(column.property) === -1) {
            const sumCell = XEUtils.sum(data, column.property)
            sums.push(sumCell)
          }
        }
      })
      return [sums]
    },
    // 根据查询条件搜索
    querySearch(queryForm) {
      this.condition = queryForm
      this.getList()
    }
  }
}
</script>
