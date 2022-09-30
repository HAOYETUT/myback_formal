<!--车队充值-->
<template>
  <table-layout>
    <template #header>
      <simple-search :is-float-right="false" :search-columns="searchColumns" button-name="搜索" @query-search="" @form-change="">
        <!-- <search-item>
          <el-button type="primary" @click="openLineChart()">统计图</el-button>
        </search-item>
        <search-item>
          <el-button :loading="qrCodeLoading" type="primary" @click="wxPay()">扫码支付测试</el-button>
        </search-item> -->
      </simple-search>
    </template>
    <vxe-table
      ref="xTable"
      row-id="id"
      auto-resize
      height="100%"
      :data="tableData"
      highlight-hover-row
      column-min-width="120"
      :loading="listLoading"
      :checkbox-config="{highlight: false}"
    >
      <!-- <vxe-table-column type="checkbox" width="40" /> -->
      <vxe-table-column type="seq" title="序号" width="60" align="center" />
      <vxe-table-column field="add_time" title="时间" />
      <vxe-table-column field="forwarder_name" title="名称" width="120" />
      <vxe-table-column field="phone" title="手机号" />
      <vxe-table-column field="name" title="操作人" />
      <!-- <vxe-table-column field="money1" title="增减" :formatter="formatterAddmin" /> -->
      <vxe-table-column field="balance" title="余额" />
      <vxe-table-column field="channel" title="渠道" />
      <vxe-table-column field="note" title="备注">
        <template v-slot="{row}">
          <span v-if="row.data">{{ row.data.title || "" }}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column align="center" width="80" title="操作">
        <template v-slot="{row}">
          <template v-if="row.refund_money === 0 && (row.channel === '微信' || row.channel === 2)">
            <el-button type="primary" size="mini" @click.stop="BackMoney(row)">退款</el-button>
          </template>
          <template v-else-if="row.refund_money === 1">已退款</template>
          <template v-else />
        </template>
      </vxe-table-column>
    </vxe-table>
    <template #footer>
      <el-pagination
        v-if="pagination.count > 0"
        :current-page="pagination.page"
        :layout="pagination.layout"
        :page-size="pagination.limit"
        :total="pagination.count"
        :page-sizes="pagination.pageSizes"
        @size-change="limitChange"
        @current-change="pageChange"
      />
    </template>
    <el-dialog  title="统计" :visible.sync="dialogVisible">
      <c-line ref="Chart" :chart-data="chartData" />
    </el-dialog>
    <el-dialog  width="160px" title="支付测试" :visible.sync="dialogQrCode" >
      <div ref="qrcode" />
    </el-dialog>
  </table-layout>
</template>

<script>

// import QRCode from 'qrcodejs2'
// import cLine from '@/components/Charts/Line'
// import { formateChooseTime, uuid } from '@/utils'
// import { RECHARGE_TYPE, CITYS_OPTIONS } from '@/utils/constant'
import resetPagination from '@/mixins/resetPagination'
// import { portFromList } from '@/api/db'
// import { getListForwardersMoney, ajaxCarMoney, BackMoney, weChatPay } from '@/api/forwarders'
export default {
  name: 'ForwardersMoneyList',
  // components: {
  //   // cLine
  // },
  mixins: [resetPagination],
  data() {
    return {
      chartData: {},
      dialogVisible: false,
      dialogQrCode: false,
      qrCodeLoading: false,
      qrCode: null,
      data: null,
      // 搜索列
      searchColumns: [
        // { tagName: 'select', prop: 'channel', value: '0', options: RECHARGE_TYPE, clearable: true },
        // { tagName: 'select', prop: 'city_from', value: '', placeholder: '所属港区', options: CITYS_OPTIONS, className: 'w120px' },
        { tagName: 'select', prop: 'port_from_id', value: '', placeholder: '所属港区', options: [], className: 'w200px', multiple: true, collapseTags: true },
        { tagName: 'datePicker', prop: 'add_time', value: '' },
        { tagName: 'input', prop: 'key', value: '', placeholder: '名称' },
        
      ]
    }
  },
  mounted() {
    // this.portFromList()
    // console.log(store)
  },
  methods: {
   //港区名称
    //  async portFromList() {
    //    const { data } = await portFromList()
    //   this.GainNodevalueSelect=this.searchColumns[1].options = data || []
    // },
    // async getCustomList() {
    //   return await getListForwardersMoney({ page: this.pagination.page, limit: this.pagination.limit, ...this.condition })
    // },
    // qSearch(queryForm) {
    //   // 格式化日期
    //   queryForm.add_time = formateChooseTime(queryForm.add_time)
    //   this.condition = queryForm
    //   this.getList()
    // },
    // formChange(queryForm) {
    //   queryForm.add_time = formateChooseTime(queryForm.add_time)
    //   this.condition = queryForm
    // },
    // async openLineChart() {
    //   const { value, x } = await ajaxCarMoney(this.condition)
    //   if (!value || !x) return this.$message.warning('暂无数据！')
    //   this.chartData = { value, x }
    //   this.dialogVisible = true
    // },
    // // 退款
    // BackMoney(row) {
    //   this.$baseConfirm('确定要退款吗？', '信息', async() => {
    //     const { msg } = await BackMoney({ id: row.id })
    //     row.refund_money = 1
    //     this.$message.success(msg || 'success')
    //   })
    // },
    // async wxPay() {
    //   if (this.qrCodeLoading) return
    //   this.qrCodeLoading = true
    //   const { data } = await weChatPay({ money: 0.01, trade_type: 'NATIVE', back_url: 'https://www.baidu.com', form: 'v3', s_id: uuid() }).finally(() => { this.qrCodeLoading = false })
    //   if (!data) return this.$message.warning('data值不能为空！')
    //   this.data = data
    //   this.dialogQrCode = true
    // },
    // qrCodeOpen() {
    //   this.$nextTick(() => {
    //     if (!this.qrcode) {
    //       // 生成二维码
    //       this.qrcode = new QRCode(this.$refs.qrcode, {
    //         width: 140,
    //         height: 140,
    //         colorDark: '#000',
    //         colorLight: '#fff',
    //         text: this.data
    //       })
    //     } else {
    //       this.qrcode.makeCode(this.data)
    //     }
    //   })
    // },
    // // 格式化增减 channel1 6:预录 ,7:定位,10:后台扣款 加上-号,其他不加
    // formatterAddmin({ row }) {
    //   return row.money1
    // }
  }
}
</script>
