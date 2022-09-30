<!--vxe-table公共组件-->
<template>
  <div class="flex-table">
    <div class="flex-top">
      <!--搜索条件slot-->
      <slot name="search" />
    </div>
    <!--table容器-->
    <div class="flex-content">
      <vxe-table
        ref="xTable"
        reserve
        border
        :data="data"
        auto-resize
        show-header-overflow
        show-overflow
        highlight-hover-row
        column-min-width="80"
        height="100%"
        v-bind="$attrs"
        v-on="$listeners"
        @scroll="tableScroll"
      >
        <template v-for="(column, index) in columns">
          <!-- 复选框 -->
          <vxe-table-column v-if="column.type === 'checkbox'" :key="index" type="checkbox" :width="columns.width ? columns.width : '40'" />
          <!-- 序号 -->
          <vxe-table-column v-else-if="column.type === 'seq'" :key="index" type="seq" :title="column.title ? column.title: '序号'" :width="columns.width ? columns.width : '65'" show-overflow="title" />
          <!-- 具体内容和slot -->
          <vxe-table-column v-else :key="index" :field="column.field" :title="column.title" :width="column.width">
            <template v-slot="{row}">
              <slot v-if="column.slot" :name="column.slot" :row="row" />
              <template v-else>
                {{ row[column.field] | checkValue }}
              </template>
            </template>
          </vxe-table-column>
        </template>
      </vxe-table>
    </div>
    <div>
      <el-pagination
        v-if="count > 0"
        :current-page="page"
        :layout="layout"
        :page-size="limit"
        :total="count"
        :page-sizes="pageSizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>

/* demo columns
 * columns:[
        { type: 'selection',width: 60},
        { type: 'seq', width: 60},
        { field: 'client_name', title: '客户',width: 60 },
        { field: 'status', title: '状态', slot: 'stateSlot', width: 60 },
        { field: 'operate',title: '操作',slot: 'opearteSlot', width: 60}
    ]
 */
export default {
  name: 'BaseTable',
  filters: {
    checkValue(val) {
      return (val === null || val === undefined) ? '' : val
    }
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    // 当前页
    page: {
      type: Number,
      default: 1
    },
    // 页长
    limit: {
      type: Number,
      default: 30
    },
    // 总个数
    count: {
      type: Number,
      default: 0
    },
    // 分页布局
    layout: {
      type: String,
      default: 'prev,pager,next,sizes,jumper,total'
    },
    // 调整每页显示条数
    pageSizes: {
      type: Array,
      default() {
        return [10, 50, 100, 200]
      }
    }
  },
  methods: {
    // 页长变化
    handleSizeChange(val) {
      this.$emit('limit-change', val)
    },
    // 页码变化
    handleCurrentChange(val) {
      this.$emit('page-change', val)
    },

    tableScroll({ type, scrollTop, scrollLeft, isX, isY, $event }) {
      // 不是纵向滚动
      if (!isY) return
      const { scrollHeight, clientHeight } = $event.srcElement
      if (clientHeight + scrollTop >= scrollHeight) {
        console.log('到底了！！')
        this.$emit('bottom')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/* table自适应父容器 */
.flex-table {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.flex-content {
  flex: 1;
  overflow: auto;
}
</style>
