/*
 * 重写分页mixins
 */
// import { deleteCommon, saveStatus } from '@/api'
// import { CRM_API } from '@/config'
// import axios from 'axios'

export default {
  data() {
    return {
      // 分页
      pagination: {
        // 当前页
        page: 1,
        // 页长
        limit: 30,
        // 总个数
        count: 0,
        // 调整每页显示条数
        pageSizes: [30, 50, 100, 200],
        // 分页布局
        layout: 'prev,pager,next,sizes,jumper,total'
      },
      // 搜索条件
      condition: {},
      // 增,删,改按钮loading
      load: {
        addLoading: false,
        deleteLoading: false,
        editLoading: false
      },
      // 列表loading
      listLoading: true,
      // 状态loading
      statusLoading: false,
      // 列表导出loading
      listExportLoading: false,
      // table list
      tableData: [],
      // checkbox选中的数据
      checkedData: [],
      /**
       *  当前组件 vxe table的引用, ref必须取名为 xTable
       *  或者在组件内自定义 tableRefName
       */
      tableRef: {},
      // add:添加模式, edit:修改模式
      mode: '',
      // 编辑时传递的行对象
      formData: {},
      // 抽屉展开收起变量
      drawerVisible: false,
      // pagetype:'',
      my_push_admin:[], //用户下绑定的销售以及自己的id集合
      my_push_admin_str:'',
      adminSelect:[], //crm中销售下拉框
      carSelect:[], //crm中车队下拉框
      all_shop_ids:[],
      shop_ids:[],
      current_admin_id:'',
    }
  },
  created() {
    // this.pagetype = this.getQueryVariable("pagetype");
    if(this.pagetype==2){
      if(localStorage.getItem("userInfo")!=null){
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.nav_group_id = userInfo.nav_group_id;
        this.group_name = userInfo.group_name;
        this.current_admin_id = userInfo.admin_id;
        var adminIds = '';
        if(this.group_name==='销售主管'){
          adminIds = userInfo.my_push_admin;
          this.my_push_admin_str = adminIds+","+this.current_admin_id;
        }else{
          this.my_push_admin_str+=this.current_admin_id;
        }
        if(this.my_push_admin_str!=''){
          this.my_push_admin = this.my_push_admin_str.split(',');
          if(this.group_name==='销售主管'){
            this.getSaleSelectByAdminIds();
          }
          this.getCarSelectByAdminIds().then((res)=>{
            if(this.carSelect!=[]){
              this.getList(this.initNoAjax || '');
            }
          });
        }
      }
    }else{
      this.getList(this.initNoAjax || '');
    }
    this.$nextTick(() => {
      this.tableRef = this.$refs[this.tableRefName || 'xTable']
    })
  },
  methods: {
    changeCar(val){
      if(val==""){
        this.shop_ids = this.all_shop_ids;
      }else{
        this.shop_ids = [];
        this.shop_ids.push(val);
      }
    },
    changeSale(val){
      this.shop_id = '';
      if(val!=""){
        this.getCarSelectBySalemanId(val);
      }else{
        this.getCarSelectByAdminIds();
      }
    },
    getSaleSelectByAdminIds(){
      var self = this;
      // axios({
      //   method: 'post',
      //   url: `${CRM_API}/crm/getSaleSelectByAdminIds`,
      //   data: {"adminIds":self.my_push_admin},
      //   headers: { sk: this.$baseAccessToken() }
      // }).then(res=>{
      //   self.adminSelect = res.data.data;
      // }).catch(res=>{
      // })
    },
    getCarSelectByAdminIds(){
      var self = this;
      return new Promise(function(resolve,reject){
        // axios({
        //   method: 'post',
        //   url: `${CRM_API}/crm/getCarSelectByAdminIds`,
        //   data: {"adminIds":self.my_push_admin},
        //   headers: { sk: self.$baseAccessToken() }
        // }).then(res=>{
        //   self.carSelect = res.data.data;
        //   self.all_shop_ids = [];
        //   self.shop_ids = [];
        //   self.carSelect.forEach(element => {
        //     self.all_shop_ids.push(element.shop_id);
        //     self.shop_ids = self.all_shop_ids;
        //   });
        //   resolve();
        // }).catch(res=>{
        // })
      })
    },
    getCarSelectBySalemanId(admin_id){
      var self = this;
      // axios({
      //   method: 'post',
      //   url: `${CRM_API}/crm/getCarSelectBySalemanId`,
      //   data: {"admin_id":admin_id},
      //   headers: { sk: this.$baseAccessToken() }
      // }).then(res=>{
      //   self.carSelect = res.data.data;
      //   self.all_shop_ids = [];
      //   self.shop_ids = [];
      //   self.carSelect.forEach(element => {
      //     self.all_shop_ids.push(element.shop_id);
      //     self.shop_ids = self.all_shop_ids;
      //   })
      // }).catch(res=>{
      // })
    },
    getQueryVariable(variable){
      if(location.href.indexOf('?')>0){
        var query = location.href.split('?')[1];
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == variable){return pair[1];}
        }
        return(false);
      }
      return(false);
    },
    // 组件内需定义getCustomList方法
    getList() {
      this.listLoading = true
      // this.getCustomList(this.pagination).then(({ data, count }) => {
        this.tableData = [
          {song_title: '连借口都没有', port_name: '孙子涵', song_format: 'mp3', addTime:'2022-10-01', downloads: 100, state: '允许下载', uploader: '小哪吒', song_style: '经典'},
          {song_title: '灵魂摆渡人(dj版)-深七', port_name: '深七', song_format: 'mp3', addTime:'2021-09-02', downloads: 28, state: '允许下载', uploader: '小哪吒2', song_style: '喊麦'},
          {song_title: '练习', port_name: '刘德华', song_format: 'mp3', addTime:'2022-04-01', downloads: 2995, state: '允许下载', uploader: '小哪吒3', song_style: '经典'},
          {song_title: '恋人心', port_name: '魏新雨', song_format: 'mp3', addTime:'2022-03-28', downloads: 2, state: '禁止下载', uploader: '小哪吒1', song_style: '经典'},
          {song_title: '连借口都没有', port_name: '孙子涵', song_format: 'mp3', addTime:'2022-10-01', downloads: 145, state: '允许下载', uploader: '小哪吒', song_style: '经典'},
          {song_title: '连借口都没有', port_name: '孙子涵', song_format: 'mp3', addTime:'2022-10-01', downloads: 4565, state: '禁止下载', uploader: '小哪吒', song_style: '经典'},
          {song_title: '连借口都没有', port_name: '孙子涵', song_format: 'mp3', addTime:'2022-10-01', downloads: 897, state: '允许下载', uploader: '小哪吒', song_style: '经典'},
          {song_title: '连借口都没有', port_name: '孙子涵', song_format: 'mp3', addTime:'2022-10-01', downloads: 457, state: '允许下载', uploader: '小哪吒', song_style: '经典'},
          {song_title: '连借口都没有', port_name: '孙子涵', song_format: 'mp3', addTime:'2022-10-01', downloads: 77545, state: '禁止下载', uploader: '小哪吒', song_style: '经典'},
          {song_title: '连借口都没有', port_name: '孙子涵', song_format: 'mp3', addTime:'2022-10-01', downloads: 13242, state: '允许下载', uploader: '小哪吒', song_style: '经典'},
          {song_title: '连借口都没有', port_name: '孙子涵', song_format: 'mp3', addTime:'2022-10-01', downloads: 634534, state: '禁止下载', uploader: '小哪吒', song_style: '经典'},
          {song_title: '连借口都没有', port_name: '孙子涵', song_format: 'mp3', addTime:'2022-10-01', downloads: 3, state: '允许下载', uploader: '小哪吒', song_style: '经典'},
          {song_title: '连借口都没有', port_name: '孙子涵', song_format: 'mp3', addTime:'2022-10-01', downloads: 23423, state: '禁止下载', uploader: '小哪吒', song_style: '经典'},
          {song_title: '连借口都没有', port_name: '孙子涵', song_format: 'mp3', addTime:'2022-10-01', downloads: 54, state: '允许下载', uploader: '小哪吒', song_style: '经典'},
          {song_title: '连借口都没有', port_name: '孙子涵', song_format: 'mp3', addTime:'2022-10-01', downloads: 23, state: '禁止下载', uploader: '小哪吒', song_style: '经典'},
          {song_title: '连借口都没有', port_name: '孙子涵', song_format: 'mp3', addTime:'2022-10-01', downloads: 3423, state: '禁止下载', uploader: '小哪吒', song_style: '经典'},
          {song_title: '连借口都没有', port_name: '孙子涵', song_format: 'mp3', addTime:'2022-10-01', downloads: 56, state: '允许下载', uploader: '小哪吒', song_style: '经典'},
          {song_title: '连借口都没有', port_name: '孙子涵', song_format: 'mp3', addTime:'2022-10-01', downloads: 678, state: '禁止下载', uploader: '小哪吒', song_style: '经典'},
        ]
        this.pagination.count = count || 0
        this.checkedData = []
        this.goEasy = false
      // }).finally(() => {
      //   this.listLoading = false
      //   this.goEasy = false
      // })
    },
    // 改变页码handle
    pageChange(val) {
      this.pagination.page = val
      this.getList()
    },
    // 改变显示条数handle
    limitChange(val) {
      this.pagination.page = 1
      this.pagination.limit = val
      this.getList()
    },
    // Open add Drawer
    openAdd() {
      this.mode = 'add'
      this.drawerVisible = true
      // 需在组件内自定义openAddBack方法
      if (Object.prototype.toString.call(this.openAddBack) === '[object Function]') this.openAddBack()
    },
    // Open edit Drawer
    openEdit() {
      if (!this.checkedData[0]) return this.$message.warning('未选中数据！')
      this.formData = { ...this.checkedData[0] }
      this.mode = 'edit'
      this.drawerVisible = true
      
      // 需在组件内自定义openAddBack方法
      if (Object.prototype.toString.call(this.openEditBack) === '[object Function]') this.openEditBack(this.formData)
    },
    // add success 回调
    addSuccess(row) {
      // 如果列表长度等于页长
      if (this.tableData.length >= this.pagination.limit) {
        // 去除最后一条数据和选中状态
        const lastRow = this.tableData.pop()
        this.$nextTick(() => {
          this.tableRef.setCheckboxRow(lastRow, false)
          this.checkedData = this.tableRef.getCheckboxRecords()
        })
      }
      this.tableData.unshift(row)
      this.pagination.count += 1
    },
    // edit success 回调
    editSuccess(row) {
      if (!this.autoId) throw new Error('请定义autoId!')
      const index = this.tableData.findIndex(el => el[this.autoId] === row[this.autoId])
      // 没找到,重新刷新列表
      if (index === -1) {
        this.getList()
      } else {
        this.$set(this.tableData, index, row)
        this.$nextTick(() => {
          this.tableRef.setCheckboxRow(row, true)
          this.checkedData = this.tableRef.getCheckboxRecords()
        })
      }
    },
    /*
     * 统一删除方法
     * 自定义 autoId: id字段名
     * dt: 表名
     * type: 类型 tree类型和普通表格
     */
    handleDel(type) {
      this.$baseConfirm('确定要删除吗？', '信息', async() => {
        const ids = this.checkedData.map(item => item[this.autoId])
        const { msg } = await deleteCommon({ dt: this.dt, status: 3, auto_id: this.autoId, id: ids })
        this.$message.success(msg || 'success')
        // tree 删除后
        if (type === 'tree') {
          this.getList()
        } else {
          this.tableData = this.tableData.filter(item => ids.indexOf(item[this.autoId]) === -1)
          this.checkedData = []
          this.pagination.count -= ids.length
          if (this.tableData.length <= 0) {
            this.pagination.page--
            if (this.pagination.page <= 0) {
              this.pagination.page = 1
            }
            this.getList()
          }
        }
      })
    },
    /* 改变状态 */
    async changeStatus(id, key, val, row) {
      if (val === null || val === undefined) return this.$message.warning('值不能为空！')
      const statusVal = [1, 0][val]
      if (statusVal === null || statusVal === undefined) return this.$message.warning('没有找到状态！')
      if (this.statusLoading) return
      this.statusLoading = true
      const { autoId, dt } = this
      const params = { auto_id: autoId, dt, id, save: {}}
      params.save[key] = statusVal
      const { msg } = await saveStatus(params).finally(() => { this.statusLoading = false })
      row[key] = statusVal
      this.$message.success(msg || '修改成功')
    },
    // 根据查询条件搜索
    querySearch(queryForm) {
      this.condition = queryForm
      this.pagination.page = 1
      this.getList()
      this.goEasy = true
    }
  }
}
