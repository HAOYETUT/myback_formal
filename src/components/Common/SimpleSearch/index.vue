<!--搜索组件-->
<template>
  <el-form class="search-form" :inline="inline" @keyup.enter.native="querySearch()" @submit.native.prevent>
    <!--前缀-->
    <slot name="prefix" />
    <el-form-item v-for="(item,index) in formArr" :key="index" :label="item.label || ''">
      <!--下拉列表-->
      <el-select
        v-if="item.tagName === 'select'"
        v-model="item.value"
        :multiple="!item.multiple? false : true"
        :collapse-tags="!item.collapseTags? false : true"
        class="w140px"
        :filterable="!!item.filterable"
        :class="[item.className ? item.className: '']"
        :clearable="item.clearable === false ? false : true"
        :placeholder="item.placeholder || ''"
        @change="changeValue"
      >
        <!--labelProp,valueProp下拉列表的label和value-->
        <el-option
          v-for="option in (item.options || [])"
          :key="option[item.valueProp || 'value']"
          :value="option[item.valueProp || 'value']"
          :label="option[item.labelProp || 'label']"
        />
      </el-select>
      <!--分组下拉列表-->
      <el-select v-else-if="item.tagName === 'selectGroup'" v-model="item.value" clearable :placeholder="item.placeholder">
        <el-option-group
          v-for="(group,gIndex) in (item.groupOptions || [])"
          :key="gIndex"
          :label="group.name"
        >
          <el-option
            v-for="option in (group.options || [])"
            :key="option[item.valueProp || 'value']"
            :value="option[item.valueProp || 'value']"
            :label="option[item.labelProp || 'label']"
          />
        </el-option-group>
      </el-select>
      <!--日期选择器-->
      <el-date-picker
        v-else-if="item.tagName === 'datePicker'"
        v-model="item.value"
        class="w240px"
        type="daterange"
        :clearable="item.clearable === false ? false : true"
        range-separator="-"
        :start-placeholder="item.startPlaceholder || '开始日期'"
        :end-placeholder="item.endPlaceholder || '结束日期'"
        :value-format="item.valueFormat || 'yyyy-MM-dd'"
        :picker-options="item.pickerOptions || {}"
      />
      <!--日期-->
      <el-date-picker
        v-else-if="item.tagName === 'date'"
        v-model="item.value"
        :type="item.type || 'date'"
        class="w140px"
        :value-format="item.valueFormat || 'yyyy-MM-dd'"
        :placeholder="item.placeholder || '选择日期'"
      />
      <el-input
        v-else
        v-model="item.value"
        :disabled="!item.disabledall? false : true"
        :placeholder="item.placeholder || ''"
        :class="[item.className ? item.className: '']"
        clearable
      />
    </el-form-item>
    <!--后缀-->
    <slot name="suffix" />
    <el-form-item v-if="searchColumns && searchColumns.length>0">
      <el-button icon="el-icon-search" type="primary" @click="querySearch()" :loading="goEasy">{{ buttonName }}</el-button>
    </el-form-item>
    <!--搜索按钮之后-->
    <slot name="buttonAfter" />
    <div v-if="isFloatRight" :class="[isFloatRight ? 'search-content' : '']">
      <slot />
    </div>
    <template v-else>
      <slot />
    </template>
  </el-form>

</template>

<script>
import _ from 'lodash'
export default {
  name: 'SimpleSearch',
  props: {
    /* [{
        label: '客户名',
        prop: 'name',
        value: '张三',
        placeholder: '请输入客户名',
      }]
      labelProp,valueProp下拉列表的label和value
    */
    searchColumns: {
      type: Array,
      default() {
        return []
      }
    },
    inline: {
      type: Boolean,
      default: true
    },
    buttonName: {
      type: String,
      default: '搜索'
    },
    // 是否右浮动
    isFloatRight: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      formArr: [],
      initValues: [], // 初始化数据
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      goEasy: false
    }
  },
  watch: {
    searchColumns: {
      handler(newVal) {
        const columns = this.formatOptionsProp(_.cloneDeep(this.searchColumns))
        this.initValues = columns.map(el => el.value)
        this.formArr = columns
      },
      deep: true,
      immediate: true
    },
    // 监听表单数据变化
    formArr: {
      handler(value) {
        const obj = this.getFormObject()
        this.$emit('form-change', obj)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    changeValue(vals) {
      this.$emit('change-back', vals)
    },
    querySearch() {
      const obj = this.getFormObject()
      this.$emit('query-search', obj)
      this.goEasy = true
      setTimeout(() => {
            this.goEasy = false
        }, 5000)
    },
    getFormObject() {
      const obj = {}
      this.formArr.forEach(el => {
        obj[el.prop] = el.value
      })
      return obj
    },
    // 添加下拉列表的属性名为 label value
    formatOptionsProp(columns) {
      return columns.map(item => {
        const opt = item.options || []
        opt.forEach((obj = {}) => {
          for (const [prop, val] of Object.entries(obj)) {
            if (prop.indexOf('name') !== -1) obj.label = val
            if (prop.indexOf('id') !== -1) obj.value = val
          }
        })
        return item
      })
    },
    // 将所有字段值重置为初始值
    resetFields() {
      this.formArr.forEach((el, index) => {
        el.value = this.initValues[index] || ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/* edit margin-bottom */
.search-form {
  .search-content {
    float: right;
  }

  .not-float-right {
    display: inline-block;
  }

  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 10px;
  }
}
</style>
