<template>
  <div class="json-editor">
    <textarea ref="textarea" />
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
// import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/rubyblue.css'
import 'codemirror/mode/javascript/javascript'
// require('script-loader!jsonlint')
// import 'codemirror/addon/lint/lint'
// import 'codemirror/addon/lint/json-lint'
// TODO
// import 'codemirror/mode/xml/xml.js'
// import 'codemirror/mode/htmlmixed/htmlmixed.js'
export default {
  name: 'JsonEditor',
  /* eslint-disable vue/require-prop-types */
  props: ['value'],
  data() {
    return {
      jsonEditor: false
    }
  },
  watch: {
    value(value) {
      const editorValue = this.jsonEditor.getValue()
      if (value !== editorValue) {
        this.jsonEditor.setValue(typeof this.value === 'string' ? this.value : JSON.stringify(this.value, null, 2))
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
        lineNumbers: true, // 是否在编辑器左侧显示行号
        //  readOnly: 'nocursor', // 编辑器是否只读,并且不能获得焦点
        readOnly: true,
        mode: 'application/json',
        // mode: 'text/html',
        // mode: 'xml',
        // mode: 'XHTML',
        // mode: 'htmlmixed',
        // mode: 'text/plain',
        // 在行槽中添加行号显示器
        gutters: ['CodeMirror-linenumbers'],
        // gutters: ['CodeMirror-lint-markers'],
        theme: 'rubyblue',
        lint: true,
        lineWrapping: true, // 自动换行
        smartIndent: true // 自动缩进

      })
      this.jsonEditor.setValue(typeof this.value === 'string' ? this.value : JSON.stringify(this.value, null, 2))
      this.jsonEditor.on('change', cm => {
        this.$emit('changed', cm.getValue())
        this.$emit('input', cm.getValue())
      })
    })
  },
  methods: {
    getValue() {
      return this.jsonEditor.getValue()
    }
  }
}
</script>

<style lang="scss" scoped>
.json-editor {
  position: relative;
  height: 100%;

  ::v-deep {
    .CodeMirror {
      height: auto;
      min-height: 300px;
    }

    .CodeMirror-scroll {
      min-height: 300px;
    }

    .cm-s-rubyblue span.cm-string {
      color: #f08047;
    }
  }
}
</style>
