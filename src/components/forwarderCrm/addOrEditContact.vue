<template>
  <div>
    <el-form :model="addContactRuleForm" size="small" :rules="addContactRules" ref="addContactRuleForm" label-width="100px" class="demo-ruleForm" >
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="addContactRuleForm.name" clearable class="inputForm"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="职位" prop="position">
            <el-input v-model="addContactRuleForm.position" clearable class="inputForm"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="工作电话" prop="working_telephone">
            <el-input v-model="addContactRuleForm.working_telephone" clearable class="inputForm"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号码" prop="cell_telephone">
            <el-input v-model="addContactRuleForm.cell_telephone" clearable class="inputForm"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model="addContactRuleForm.email" clearable class="inputForm"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="微信" prop="wechat_number">
            <el-input v-model="addContactRuleForm.wechat_number" clearable class="inputForm"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="QQ号" prop="qq_number">
            <el-input v-model="addContactRuleForm.qq_number" clearable class="inputForm"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="addContactRuleForm.remark" type="textarea" size="medium" :autosize="{ minRows: 8, maxRows: 8 }" style="width:650px;"></el-input>
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
  name: 'addOrEditContact',
  props: [
    "addOrEditContactDialog",
    "editContactId",
    "editCustomerId",
    "admin_id",
    "activeName"
  ],
  data() {
    var checkphone = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入手机号"));
      } else if (!this.isCellPhone(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的手机号!"));
      } else {
        callback();
      }
    };
    var checkWorkPhoneNumber = (rule, value, callback) => {
      if (!this.isWorkPhoneNumber(value)) {//引入methods中封装的检查手机格式的方法
        if(value==""){
          callback();
        }else{
          callback(new Error("请输入正确的电话号码!"));
        }
      } else {
        callback();
      }
    };
    return {
      addContactRuleForm:{
        name:'',
        position:'',
        working_telephone:'',
        cell_telephone:'',
        email:'',
        wechat_number:'',
        qq_number:'',
        remark:'',
      },
      addContactRuleFormTemp:{},
      addContactRules:{
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        working_telephone: [
          { required: false,validator: checkWorkPhoneNumber , trigger: 'blur' },
        ],
        cell_telephone:[
          { required: true,validator: checkphone , trigger: 'blur' },
        ]
      },
    }
  },
  watch:{
    addOrEditContactDialog: {
      handler(val) {
        if(val){
          this.resetForm();
          if(this.editContactId>0){
            this.getContactById(this.editContactId);
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
    preserveContact(){
      var self = this;
      this.$refs['addContactRuleForm'].validate((valid) => {
        if(!valid){
          self.$message.warning("请输入正确信息");
          return;
        }
        if(self.editContactId>0){
          //编辑模式
          if(self.addContactRuleForm.name===self.addContactRuleFormTemp.name
          &&self.addContactRuleForm.position===self.addContactRuleFormTemp.position
          &&self.addContactRuleForm.working_telephone===self.addContactRuleFormTemp.working_telephone
          &&self.addContactRuleForm.cell_telephone===self.addContactRuleFormTemp.cell_telephone
          &&self.addContactRuleForm.email===self.addContactRuleFormTemp.email
          &&self.addContactRuleForm.wechat_number===self.addContactRuleFormTemp.wechat_number
          &&self.addContactRuleForm.qq_number===self.addContactRuleFormTemp.qq_number
          &&self.addContactRuleForm.remark===self.addContactRuleFormTemp.remark){
            self.$message.warning("数据未修改无法保存");
            return;
          }
          self.updateContact();
        }else{
          //新增模式
          self.addContactForCustomer();
        }
      });
    },
    submitForm() {
      this.$refs['addContactRuleForm'].validate((valid) => {
        return valid;
      });
    },
    //检查手机号
    isCellPhone(val) {
      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(val)) {
        return false;
      } else {
        return true;
      }
    },
    isWorkPhoneNumber(val){
      if(!/^\d+$/.test(val)){
        return false;
      }else {
        return true;
      }
    },
    resetForm() {
      this.$nextTick(()=>{
        this.$refs["addContactRuleForm"].resetFields();
      });
    },
    getContactById(id){
      var self = this;
      request({
        method: 'post',
        url: `${CRM_API}/crm/forwarder/getContactById`,
        data: {id:id}
      }).then(res=>{
        var resp = res.data;
        this.addContactRuleForm.name = resp.name;
        this.addContactRuleForm.position = resp.position;
        this.addContactRuleForm.working_telephone = resp.working_telephone;
        this.addContactRuleForm.cell_telephone = resp.cell_telephone;
        this.addContactRuleForm.email = resp.email;
        this.addContactRuleForm.wechat_number = resp.wechat_number;
        this.addContactRuleForm.qq_number = resp.qq_number;
        this.addContactRuleForm.remark = resp.remark;

        this.addContactRuleFormTemp.name = resp.name;
        this.addContactRuleFormTemp.position = resp.position;
        this.addContactRuleFormTemp.working_telephone = resp.working_telephone;
        this.addContactRuleFormTemp.cell_telephone = resp.cell_telephone;
        this.addContactRuleFormTemp.email = resp.email;
        this.addContactRuleFormTemp.wechat_number = resp.wechat_number;
        this.addContactRuleFormTemp.qq_number = resp.qq_number;
        this.addContactRuleFormTemp.remark = resp.remark;
      }).catch(res=>{
      })
    },
    addContactForCustomer(){
      var self = this;
      var contact = self.addContactRuleForm;
      contact.customer_id = self.editCustomerId;
      contact.admin_id = self.admin_id;
      request({
        method: 'post',
        url: `${CRM_API}/crm/forwarder/addContactForCustomer`,
        data: contact
      }).then(res=>{
        if(self.activeName=="2"){
          self.$emit("loadContactList");
        }else if(self.activeName=="4"){
          self.$emit("getOperationLogByCustomerId");
        }
        self.$emit("closeContactDialog");
        self.$message.success("添加成功");
      }).catch(res=>{
      })
    },
    updateContact(){
      var self = this;
      var contact = self.addContactRuleForm;
      contact.customer_id = self.editCustomerId;
      contact.admin_id = self.admin_id;
      contact.id = self.editContactId;
      request({
        method: 'post',
        url: `${CRM_API}/crm/forwarder/updateContact`,
        data: contact
      }).then(res=>{
        // self.$emit("getOperationLogByCustomerId");
        self.$emit("closeContactDialog");
        self.$emit("loadContactList");
        self.$message.success("修改成功");
      }).catch(res=>{
      })
    },
  }
}
</script>
