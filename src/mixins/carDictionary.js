/* 车队条件搜索字典列表和地推搜索字典列表*/
import { getPubSelect } from '@/api'
// eslint-disable-next-line no-unused-vars
import { SYS_SIMPLE_TYPE_OPTIONS } from '@/utils/constant'

export default {
  data() {
    return {
      type: 3, // 搜索条件:系统类型,默认V2版本
      admin_id: '', // 搜索条件: 所属地推ID
      nav_group_id: '',
      group_name: '',
      adminV3: [], // V3地推
      adminV2: [], // V2地推
      adminOptions: [], // 默认V2地推
      shop_id: '', // 搜索条件: 车队ID
      dataV2: [], // 放箱客户V2(车队名)
      dataV3: [], // 放箱客户V3(车队名)
      allCarOptions: [], // 默认V2车队
      sysTypeOptions: SYS_SIMPLE_TYPE_OPTIONS, //  所属版本 V2 V3
      group_id: '',
      groupOptions: [], // 会员等级
      groupv2Options: [], // V2会员等级
      pagev2NavOptions: [] // v2初始页面
    }
  },
  mounted() {
  },
  created() {
    if (this.pagetype !== 2) {
      this.getPubSelect()
    }
  },
  methods: {
    // V2和V3的车队列表和地推列表
    async getPubSelect() {
      let { data } = await getPubSelect()
      data = data || {}
      this.adminOptionss = this.adminV3 = data.admin_region || []
      this.adminOptions = this.adminV3 = data.admin || []
      this.adminV2 = data.admin_v2 || []

      if (this.edition === 2) this.adminOptions = this.adminV2 = data.admin_v2 || []
      this.allCarOptions = this.dataV3 = data.data_v3 || []
      this.dataV2 = data.data_v2 || []
      this.groupOptions = data.group || []
      const navGroupV2 = data.nav_group_v2 || []
      // format groupId to String
      this.groupv2Options = navGroupV2.map(el => {
        el.group_id = `${el.group_id}`
        return el
      })
      this.pagev2NavOptions = data.nav_v2 || []
    },
    // V2和V3版本切换change
    sysChange(val) {
      this.shop_id = ''
      this.admin_id = ''
      this.allCarOptions = val === 2 ? this.dataV2 : this.dataV3
      this.adminOptions = val === 2 ? this.adminV2 : this.adminV3
    }
  }
}
