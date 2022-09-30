<template>
  <div>
    <el-form :model="applyOrCancelRuleForm" size="small" :rules="addVisitRecordRules" ref="applyOrCancelRuleForm" label-width="100px" class="demo-ruleForm" >
      <el-row>
        <el-col :span="12">
          <el-form-item :label="applyOrCancelPerson" prop="applier">
            <el-select v-model="applyOrCancelRuleForm.applier" filterable clearable :disabled="applierSelectDisable" class="inputForm" placeholder="">
              <el-option
                v-for="item in applierSelect"
                :key="item.admin_id"
                :label="item.name"
                :value="item.admin_id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="applyOrCancelTime" prop="applyOrCancelTime">
            <el-date-picker
              ref="datepicker"
              v-model="applyOrCancelRuleForm.applyOrCancelTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              disabled
              style="width:275px;">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item :label="applyOrCancelReason" prop="remark">
            <el-input v-model="applyOrCancelRuleForm.remark" type="textarea" size="medium" :autosize="{ minRows: 10, maxRows: 10 }"></el-input>
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
  name: 'applyOrCancel',
  props: [
    "applyOrCancelDialog",
    "admin_id",
    "applyOrCancelCustomerId",
    "applyOrCancelOperationType",
    "group_name",
    "my_push_admin_temp",
    "applyOrCancelApplier"
  ],
  data() {
    return {
      applyOrCancelPerson:'',
      applyOrCancelTime:'',
      applyOrCancelReason:'',
      applyOrCancelRuleForm:{
        //真正申领人
        applier:'',
        applyOrCancelTime:'',
        remark: '',
      },
      addVisitRecordRules:{
        applier: [
          { required: true, message: '请选择联系人', trigger: 'change' },
        ],
        applyOrCancelTime:[
          {required:true,message:'请选择时间',trigger:'blur'}
        ],
        remark:[
          {required:true,message:'请输入原因',trigger:'blur'}
        ]
      },
      applierSelectDisable:false,
      applierSelect:[],
      my_push_admin:[],
    }
  },
  watch:{
    applyOrCancelDialog: {
      handler(val) {
        if(val){
          this.$emit("renewApplyOrCancelPreserveButton");
          this.resetForm();
          this.$nextTick(()=>{
            this.my_push_admin = this.my_push_admin_temp;
            if(this.applyOrCancelOperationType==0){
              this.applyOrCancelPerson = "申领人";
              this.applyOrCancelTime = "申领时间";
              this.applyOrCancelReason = "申领原因";
              if(this.group_name=="销售"){
                this.applierSelectDisable = true;
                this.my_push_admin = '';
                this.applyOrCancelRuleForm.applier = this.admin_id;
              }else if(this.group_name=="运营"){
                this.applyOrCancelRuleForm.admin_id = '';
                this.applierSelectDisable = false;
                this.my_push_admin = '';
                this.applyOrCancelRuleForm.applier = '';
              }else if(this.group_name=="销售主管"){
                this.applierSelectDisable = false;
                this.applyOrCancelRuleForm.applier = this.admin_id;
                var index = this.my_push_admin.indexOf(this.admin_id.toString());
                if(index<0){
                  this.my_push_admin.push(this.admin_id.toString());
                }
              }
              this.getSaleSelectByAdminIds();
            }else{
              this.applierSelectDisable = true;
              this.applyOrCancelPerson = "放弃人";
              this.applyOrCancelTime = "放弃时间";
              this.applyOrCancelReason = "放弃原因";
              this.applyOrCancelRuleForm.applier = this.applyOrCancelApplier;
              this.my_push_admin = '';
              this.getSaleSelectByAdminIds();
            }
            this.applyOrCancelRuleForm.applyOrCancelTime = this.getNowFormatDate();
            window.setInterval(() => {
              this.applyOrCancelRuleForm.applyOrCancelTime = this.getNowFormatDate();
            }, 1000);
          });
        }
      },
      immediate: true,
      deep: true
    },
  },
  created(){
  },
  methods: {
    getSaleSelectByAdminIds() {
      var self = this;
      request({
        method: 'post',
        url: `${CRM_API}/crm/getSaleSelectByAdminIds`,
        data: {
          adminIds:self.my_push_admin
        }
      }).then(res => {
        self.applierSelect = res.data;
      }).catch(res => {})
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
    resetForm() {
      this.$nextTick(()=>{
        this.$refs["applyOrCancelRuleForm"].resetFields();
        this.applyOrCancelRuleForm.applyOrCancelTime = '';
      });
    },
    apply(){
      var self = this;
      this.$refs['applyOrCancelRuleForm'].validate((valid) => {
        if(!valid){
          return;
        }
        this.$emit("prohibitApplyOrCancelPreserveButton");
        var apply = self.applyOrCancelRuleForm;
        apply.id = self.applyOrCancelCustomerId;
        apply.admin_id = self.admin_id;
        request({
          method: 'post',
          url: `${CRM_API}/crm/updateStatusToApplied`,
          data: apply
        }).then(res=>{
          self.$emit("loadTable");
          self.$emit("closeApplyOrCancelDialog");
          if(res.code==200){
            self.$message.success("申领成功");
          }else{
            self.$message.warning(res.data);
          }
        }).catch(res=>{
        })
      });
    },
    cancelApply(){
      var self = this;
      this.$refs['applyOrCancelRuleForm'].validate((valid) => {
        if(!valid){
          return;
        }
        this.$emit("prohibitApplyOrCancelPreserveButton");
        var cancel = self.applyOrCancelRuleForm;
        cancel.id = self.applyOrCancelCustomerId;
        cancel.admin_id = self.admin_id;
        request({
          method: 'post',
          url: `${CRM_API}/crm/cancelApplyStatus`,
          data: cancel
        }).then(res=>{
          self.$emit("loadTable");
          self.$emit("closeApplyOrCancelDialog");
          self.$message.success("取消申领成功");
        }).catch(res=>{
        })
      });
    },
  }
}
</script>
