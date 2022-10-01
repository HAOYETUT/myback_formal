<!--表格column列表拖拽排序-->
<template>
  <el-popover
    width="500"
    trigger="click"
    :append-to-body="false"
  >
    <el-row ref="rowSort" class="row-sort mb10" :gutter="20">
      <el-col v-for="(column,index) in filterColumns" :key="index" class="col-sort ell" :span="8">
        <el-checkbox v-if="column.type !== 'checkbox'" v-model="column.visible" @change="tableRef && tableRef.refreshColumn()">{{ `${(index + 1)}：${column.title || ''}` }}</el-checkbox>
      </el-col>
    </el-row>
    <el-divider />
    <div class="fr">
      <el-button @click="recovery()">恢复</el-button>
      <el-button type="primary">保存</el-button>
    </div>
    <el-button slot="reference" round icon="el-icon-sort">列排序</el-button>
  </el-popover>
</template>

<script>
import Sortable from 'sortablejs'
export default {
  name: 'TableColTool',
  props: {
    // table columns 列表
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    // vxe-table的引用
    tableRef: {
      type: Object,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      filterColumns: []
    }
  },
  watch: {
    // 过滤column字段
    columns: {
      handler() {
        this.filterColumns = this.columns.filter(el => ['checkbox', 'seq'].indexOf(el.type) === -1)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 注册拖拽
      this.sortable = Sortable.create(this.$refs.rowSort.$el, {
        handle: '.col-sort',
        onEnd: ({ newIndex, oldIndex }) => {
          if (newIndex === oldIndex) return
          const targetItem = this.filterColumns.splice(oldIndex, 1)[0]
          this.filterColumns.splice(newIndex, 0, targetItem)
          const newColumns = this.filterColumns.slice(0)
          this.filterColumns = []
          this.$nextTick(() => {
            this.filterColumns = newColumns
          })
        }
      })
    })
  },
  beforeDestroy() {
    if (this.sortable) this.sortable.destroy()
  },
  methods: {
    // 还原
    recovery() {
      this.tableRef && this.tableRef.resetColumn()
    }
  }
}
</script>
