<template>
  <div class="p10">
    <h3 class="mb10">首页</h3>
    <!-- <el-timeline>
      <el-timeline-item v-for="(activity, index) in activities" :key="index">
        <p class="red f16"> {{ activity.content }}</p>
      </el-timeline-item>
    </el-timeline> -->
  </div>
</template>

<script>
// import { getListCar } from '@/api/car'

export default {
  data() {
    return {

    }
  },

  async mounted() {
    // 主页测试调用
    // await getListCar({ page: 1, limit: 1 })
  }
}
</script>

<style>

</style>
