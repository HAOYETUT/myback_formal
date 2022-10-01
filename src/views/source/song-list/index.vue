<!--日志管理-->
<template>
  <table-layout>
    <template #header>
      <simple-search :search-columns="searchColumns" @query-search="querySearch">
        <search-item>
          <base-button :checked-length="checkedData.length " @click="openEditPOST()">编辑</base-button>
        </search-item>
        <search-item>
          <el-button type="primary" @click="openAddPOST()">添加</el-button>
        </search-item>
      </simple-search>
    </template>
    <vxe-table
      ref="xTable"
      auto-resize
      height="100%"
      row-id="port_from_id"
      highlight-hover-row
      :data="tableData"
      column-min-width="120"
      :loading="listLoading"
      @checkbox-all="({ checked, records }) => {checkedData = records}"
      @checkbox-change="({ checked, records }) => {checkedData = records}"
    >
      <vxe-table-column type="checkbox" width="40" />
      <vxe-table-column field="song_title" title="歌曲名" />
      <vxe-table-column field="port_name" title="歌手名" />
      <vxe-table-column field="song_format" title="歌曲格式" />
      <vxe-table-column field="addTime" title="歌曲上传时间" />
      <vxe-table-column field="downloads" title="歌曲下载数" />
      <vxe-table-column field="state" title="状态" />
      <vxe-table-column field="uploader" title="上传人" />
      <vxe-table-column field="song_style" title="风格" />
      
      
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
      <port-list-form
        :visible.sync="drawerVisible"
        :mode="mode"
        :postOption='postOption'
        :form-data="formData"
        @add-success="addSuccess"
        @edit-success="editSuccess"
      />
    </template>
  </table-layout>
</template>

<script>
// import { portList,portFromList } from '@/api/db'
import resetPagination from '@/mixins/resetPagination'
import portListForm from './song-list-form'
// import { deleteCommon } from '@/api'

export default {
  name: 'SourceSongList',
  components: {
    portListForm
  },
  mixins: [resetPagination],
  data() {
    return {
      autoId: 'port_id',
      dt: 'port',
      tableData:[],
      // 搜索列
      searchColumns: [
        { tagName: 'input', prop: 'port_name', value: '', placeholder: '港区名称',className: 'w140px', }
      ],
      postOption:''
    }
  },
  methods: {
    async getCustomList() {
      // return await portList({ page: this.pagination.page, limit: this.pagination.limit, ...this.condition, autoId:this.autoId})
    },
    async openAddPOST() {
      // const { data } = await portFromList(this.form)
      // this.postOption=data || []
      // this.mode = 'add'
      // this.drawerVisible = true
      // if (Object.prototype.toString.call(this.openAddBack) === '[object Function]') this.openAddBack()
    },
    async openEditPOST() {
      // const { data } = await portFromList(this.form)
      // this.postOption=data || []
      // if (!this.checkedData[0]) return this.$message.warning('未选中数据！')
      // this.formData = { ...this.checkedData[0] }
      // this.mode = 'edit'
      // this.drawerVisible = true
      // // 需在组件内自定义openAddBack方法
      // if (Object.prototype.toString.call(this.openEditBack) === '[object Function]') this.openEditBack(this.formData)
    }
  }
}
</script>
