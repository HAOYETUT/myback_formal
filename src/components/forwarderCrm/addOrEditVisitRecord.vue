<template>
  <div>
    <el-form :model="addVisitRecordRuleForm" size="small" :rules="addVisitRecordRules" ref="addVisitRecordRuleForm" label-width="100px" class="demo-ruleForm" >
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系人" prop="contact_id">
            <el-select v-model="addVisitRecordRuleForm.contact_id" filterable clearable class="inputForm" placeholder="">
              <el-option
                v-for="item in contactSelect"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="跟进时间" prop="visit_time">
            <el-date-picker
              ref="datepicker"
              v-model="addVisitRecordRuleForm.visit_time"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions"
              @focus="focusVisitTime"
              :disabled="editVisitRecordId!=0"
              style="width:275px;">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="跟进方式" prop="visit_type">
            <el-select v-model="addVisitRecordRuleForm.visit_type" filterable clearable class="inputForm" placeholder="">
              <el-option
                v-for="item in visitTypeSelect"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">

        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="跟进内容" prop="visit_record">
            <el-input v-model="addVisitRecordRuleForm.visit_record" type="textarea" size="medium" :autosize="{ minRows: 10, maxRows: 10 }" style="width:655px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { CRM_API } from '@/config'
import axios from 'axios'
import request from '@/utils/request'
export default {
  name: 'addOrEditVisitRecord',
  props: [
    "addOrEditVisitRecordDialog",
    "editVisitRecordId",
    "editCustomerId",
    "admin_id",
    "visitTypeSelect",
    "activeName"
  ],
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      addVisitRecordRuleForm:{
        contact_id:'',
        visit_record:'',
        visit_time: '',
        visit_type: '',
      },
      addVisitRecordRules:{
        contact_id: [
          { required: true, message: '请选择联系人', trigger: 'change' },
        ],
        visit_time:[
          {required:true,message:'请选择时间',trigger:'blur'}
        ],
        visit_record:[
          {required:true,message:'请输入跟进内容',trigger:'blur'}
        ]
      },
      contactSelect:[],
      defaultTime:'',
    }
  },
  watch:{
    addOrEditVisitRecordDialog: {
      handler(val) {
        if(val){
          this.resetForm();
          this.$nextTick(()=>{
            this.defaultTime = window.setInterval(() => {
              if(this.editVisitRecordId==0){
                this.addVisitRecordRuleForm.visit_time = this.getNowFormatDate();
              }
            }, 1000);
            if(this.editVisitRecordId==0){
              this.addVisitRecordRuleForm.visit_time = this.getNowFormatDate();
            }else{
              window.clearInterval(this.defaultTime);
            }
          });
          this.getContactSelectByCustomerId();
          if(this.editVisitRecordId>0){
            this.getVisitRecordById();
          }
        }
      },
      immediate: true,
      deep: true
    },
  },
  created(){
  },
  methods: {
    focusVisitTime(){
      window.clearInterval(this.defaultTime);
    },
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      var hours = date.getHours();
      if(hours >=0 && hours <=9){
          hours = "0" + hours;
      }
      var minutes = date.getMinutes();
      if(minutes >=0 && minutes <=9){
          minutes = "0" + minutes;
      }
      var seconds = date.getSeconds();
      if(seconds >=0 && seconds <=9){
          seconds = "0" + seconds;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
              + " " + hours + seperator2 + minutes
              + seperator2 + seconds;
      return currentdate;
    },
    preserveVisitRecord(){
      var self = this;
      this.$refs['addVisitRecordRuleForm'].validate((valid) => {
        if(!valid){
          self.$message.warning("请输入正确信息");
          return;
        }
        if(self.editVisitRecordId>0){
          //编辑模式
          self.updateVisitRecord();
        }else{
          //新增模式
          self.addVisitRecord();
        }
      });
    },
    resetForm() {
      this.$nextTick(()=>{
        this.$refs["addVisitRecordRuleForm"].resetFields();
        // this.addVisitRecordRuleForm.visit_time = '';
      });
    },
    getContactSelectByCustomerId(){
      var self = this;
      request({
        method: 'post',
        url: `${CRM_API}/crm/forwarder/getContactSelectByCustomerId`,
        data: {customer_id:self.editCustomerId}
      }).then(res=>{
        self.contactSelect = res.data;
        res.data.forEach(element => {
          if(element.is_main==1){
            self.addVisitRecordRuleForm.contact_id = element.id;
            return;
          }
        });
      }).catch(res=>{
      })
    },
    getVisitRecordById(){
      var self = this;
      request({
        method: 'post',
        url: `${CRM_API}/crm/forwarder/getVisitRecordById`,
        data: {id:self.editVisitRecordId}
      }).then(res=>{
        var resp = res.data;
        self.addVisitRecordRuleForm.contact_id = resp.contact_id;
        self.addVisitRecordRuleForm.visit_record = resp.visit_record;
        self.addVisitRecordRuleForm.visit_time = resp.visit_time;
        self.addVisitRecordRuleForm.visit_type = resp.visit_type;
      }).catch(res=>{
      })
    },
    addVisitRecord(){
      var self = this;
      var visitRecord = self.addVisitRecordRuleForm;
      visitRecord.customer_id = self.editCustomerId;
      visitRecord.admin_id = self.admin_id;
      request({
        method: 'post',
        url: `${CRM_API}/crm/forwarder/addVisitRecord`,
        data: visitRecord
      }).then(res=>{
        if(self.activeName=="3"){
          self.$emit("loadVisitRecordList");
        }else if(self.activeName=="4"){
          self.$emit("getOperationLogByCustomerId");
        }
        self.$emit("closeVisitRecordList");
        self.$emit("loadTable");
        self.$message.success("添加成功");
      }).catch(res=>{
      })
    },
    updateVisitRecord(){
      var self = this;
      var visitRecord = self.addVisitRecordRuleForm;
      visitRecord.id = self.editVisitRecordId;
      request({
        method: 'post',
        url: `${CRM_API}/crm/forwarder/updateVisitRecord`,
        data: visitRecord
      }).then(res=>{
        // self.$emit("getOperationLogByCustomerId");
        self.$emit("closeVisitRecordList");
        self.$emit("loadVisitRecordList");
        self.$message.success("修改成功");
      }).catch(res=>{
      })
    }
  }
}
</script>
