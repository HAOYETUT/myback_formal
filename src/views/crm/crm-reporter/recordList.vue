<!--出口放箱统计-->
<template>
  <table-layout>
    <template #header>
      <simple-search :is-float-right="false" :search-columns="searchColumns" @query-search="querySearch">
        <template #prefix>
          <search-item>
            <el-select v-model="type" class="w140px" @change="sysChange" v-if="pagetype==1">
              <el-option v-for="item in sysTypeOptions" :key="item.value" :value="item.value" :label="item.name" />
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
        <!-- <search-item><el-button type="primary">导出</el-button></search-item> -->
      </simple-search>
    </template>
    <vxe-table
      ref="xTable"
      auto-resize
      show-footer
      height="100%"
      :data="tableData"
      highlight-hover-row
      column-min-width="120"
      :loading="listLoading"
      :footer-method="footerMethod"
      :checkbox-config="{highlight: false}"
    >
      <vxe-table-column type="seq" field="seq" title="序号" width="60" align="center" fixed="left" />
      <vxe-table-column field="total_chart" title="统计" width="60" align="center" fixed="left">
        <template>
          <i class="el-icon-data-line" />
        </template>
      </vxe-table-column>
      <vxe-table-column field="name" title="车队名" fixed="left" width="200" />
      <vxe-table-column field="num" sortable title="合计" fixed="left" />
      <vxe-table-column v-for="(item,index) in 31" :key="index" sortable :title="`${pad(item)}`" :field="`a${pad(item)}`" />
    </vxe-table>
  </table-layout>
</template>

<script>
import XEUtils from 'xe-utils'
import { pad, formatTime } from '@/utils'
// import { PreRecordMonthOrder } from '@/api/business'
import carDictionary from '@/mixins/carDictionary'
import resetPagination from '@/mixins/resetPagination'

export default {
  name: 'CrmRecordList',
  mixins: [resetPagination, carDictionary],
  data() {
    return {
      dt: '',
      autoId: '',
      condition: { time: formatTime(new Date(), 'YYYY-MM') },
      searchColumns: [
        { tagName: 'date', prop: 'time', value: formatTime(new Date(), 'YYYY-MM'), placeholder: '选择日期', type: 'month', valueFormat: 'yyyy-MM' }
      ],
      pagetype:2,
    }
  },
  methods: {
    pad,
    async getCustomList() {
      var requestdata = { page: this.pagination.page, limit: this.pagination.limit, ...this.condition, type: this.type };
      // admin_id: this.admin_id, shop_id: this.shop_id
      if(this.pagetype==1){
          requestdata.admin_id = this.admin_id;
          requestdata.shop_id = this.shop_id;
      }else{
        requestdata.shop_ids = this.shop_ids;
      }
      // return await PreRecordMonthOrder(requestdata)
    },
    // 统计合计
    footerMethod({ columns, data }) {
      const sums = []
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          sums.push('合计', '', '')
        } else {
          if (['seq', 'total_chart', 'name'].indexOf(column.property) === -1) {
            const sumCell = XEUtils.sum(data, column.property)
            sums.push(sumCell)
          }
        }
      })
      return [sums]
    }
  }
}
</script>
