<!--日志管理-->
<template>
  <table-layout>
    <template #header>
      <simple-search :search-columns="searchColumns" @query-search="querySearch">
        <search-item>
          <base-button :checked-length="checkedData.length " @click="openEdit()">编辑</base-button>
        </search-item>
        <search-item>
          <el-button type="primary" @click="openAdd()">添加</el-button>
        </search-item>
        <search-item>
          <el-button type="primary" @click="qignqiu()">请求</el-button>
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
      <vxe-table-column type="checkbox" width="50" />
      <vxe-table-column field="song_title" title="影音名" />
      <vxe-table-column field="port_name" title="歌手名" />
      <vxe-table-column field="song_format" title="影音格式" :formatter="getSongFormat"/>
      <vxe-table-column field="addTime" title="影音上传时间" />
      <vxe-table-column field="downloads" title="影音下载数" />
      <vxe-table-column field="state" title="状态">
        <template v-slot="{row}">
          <span :style="{color: getStateColor(row.state)}">{{getState(row.state)}}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="uploader" title="上传人" />
      <vxe-table-column field="song_style" title="影音风格" :formatter="getSongStyle"/>
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
      <video-list-form
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
import videoListForm from './video-list-form'
// import { deleteCommon } from '@/api'
import { MV_OPTION_TYPE, MV_OPTION_FORMAT, AV_OPTION_TYPE } from '@/option'
export default {
  name: 'SourceVideoList',
  components: {
    videoListForm
  },
  mixins: [resetPagination],
  data() {
    return {
      // 搜索列
      searchColumns: [
        { tagName: 'input', prop: 'port_name', value: '', placeholder: '歌手名', className: 'w140px' },
        { tagName: 'input', prop: 'song_title', value: '', placeholder: '歌曲名', className: 'w140px' },
        { tagName: 'select', prop: 'song_format', value: '', placeholder: '歌曲格式', className: 'w180px', options:  MV_OPTION_FORMAT, multiple: true, collapseTags: true},
        { tagName: 'select', prop: 'song_style', value: '', placeholder: '歌曲风格', className: 'w180px', options: MV_OPTION_TYPE, multiple: true, collapseTags: true},
        { tagName: 'select', prop: 'state', value: '', placeholder: '歌曲状态', className: 'w180px', options: AV_OPTION_TYPE, multiple: true, collapseTags: true},
      ],
      postOption:''
    }
  },
  methods: {
    async getCustomList() {
      // return await portList({ page: this.pagination.page, limit: this.pagination.limit, ...this.condition, autoId:this.autoId})
    },
    getSongFormat({ row }) {
      if (!row) return ''
      return MV_OPTION_FORMAT?.find(it=> it.value === row.song_format)?.label
    },
    getSongStyle({ row }) {
      if (!row) return ''
      return MV_OPTION_TYPE?.find(it=> it.value === row.song_style)?.label
    },
    getState(val) {
      return AV_OPTION_TYPE?.find(it=> it.value === val)?.label
    },
    getStateColor(val) {
      return AV_OPTION_TYPE?.find(it=> it.value === val)?.color
    }
  }
}
</script>
