<template>
  <div class="p10">
    <h3 class="mb10">首页</h3>
    <el-button type="primary" @click="dialogVisible = true">数据可视化大屏</el-button>
    <el-button type="primary" @click="dialogVisible2 = true">数据可视化大屏2</el-button>
    <el-dialog
      title="数据大屏"
      :visible.sync="dialogVisible"
      width="100%"
      fullscreen
      :before-close="handleClose">
      <VisualizatioSenior/>
    </el-dialog>
    <el-dialog
      title="数据大屏"
      :visible.sync="dialogVisible2"
      width="100%"
      fullscreen
      >
      <VisualizatioSeniotwo/>
    </el-dialog>
    
    <!-- <el-timeline>
      <el-timeline-item v-for="(activity, index) in activities" :key="index">
        <p class="red f16"> {{ activity.content }}</p>
      </el-timeline-item>
    </el-timeline> -->
  </div>
</template>

<script>
// import { getListCar } from '@/api/car'
import VisualizatioSenior from '@/components/Visualization/visualization-senior'
import VisualizatioSeniotwo from '@/components/Visualization/visualization-senior2'
export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false
    }
  },
  components: {
    VisualizatioSenior,
    VisualizatioSeniotwo
  },
  async mounted() {
    // 主页测试调用
    // await getListCar({ page: 1, limit: 1 })
  },
  methods: {
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    }
  }
}
</script>

<style scoped>
.el-dialog__body {
  height: 100%;
}
</style>
