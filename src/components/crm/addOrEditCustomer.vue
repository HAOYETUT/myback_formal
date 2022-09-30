<template>
  <div>
    <el-form :model="addCustomerRuleForm" size="small" :rules="addCustomerRules" ref="addCustomerRuleForm" label-width="100px" class="demo-ruleForm" >
      <el-row>
        <el-col :span="12">
          <el-form-item label="车队名称" prop="car_name">
            <el-input v-model="addCustomerRuleForm.car_name" clearable class="inputForm"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="区域" prop="region">
            <el-select v-model="addCustomerRuleForm.region" filterable clearable class="inputForm" placeholder="">
              <el-option
                v-for="item in regionSelect"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="地址" prop="address">
            <el-input v-model="addCustomerRuleForm.address" clearable class="inputForm"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮政编码" prop="postcode">
            <el-input v-model="addCustomerRuleForm.postcode" clearable class="inputForm"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系人" prop="contact_name">
            <el-input v-model="addCustomerRuleForm.contact_name" clearable class="inputForm"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话" prop="contact_telephone">
            <el-input v-if="!insertStatus" v-model="addCustomerRuleForm.contact_telephone" clearable class="inputForm"></el-input>
            <el-input v-else v-model="addCustomerRuleForm.contact_telephone" clearable style="width:205px;" @focus="contactTelephoneFocus"></el-input>
            <el-link type="primary" style="margin-left:10px;" :underline="false" @click="associateAccountConfirm" v-if="insertStatus&&!isAssociated" :disabled="associateBtn">关联车队</el-link>
            <el-link type="primary" style="margin-left:10px;" :underline="false" @click="cancelAssociateAccount" v-if="insertStatus&&isAssociated">取消关联</el-link>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="客户类型" prop="type">
            <el-select v-model="addCustomerRuleForm.type" filterable clearable class="inputForm" placeholder="">
              <el-option
                v-for="item in typeSelect"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="重要等级" prop="level">
            <el-select v-model="addCustomerRuleForm.level" filterable clearable class="inputForm" placeholder="">
              <el-option
                v-for="item in levelSelect"
                :key="item.code"
                :label="item.name"
                :value="item.code">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.description }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="信息来源" prop="source">
            <el-select v-model="addCustomerRuleForm.source" filterable clearable class="inputForm" placeholder="">
              <el-option
                v-for="item in sourceSelect"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="跟进进度" prop="progress">
            <el-select v-model="addCustomerRuleForm.progress" filterable clearable class="inputForm" placeholder="">
              <el-option
                v-for="item in progressSelect"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="客户状态" prop="status">
            <el-select v-model="addCustomerRuleForm.status" filterable clearable class="inputForm" placeholder="">
              <el-option
                v-for="item in statusSelect"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合作销售" prop="cooperative_sale">
            <el-select v-model="addCustomerRuleForm.cooperative_sale" filterable clearable class="inputForm" placeholder="">
              <el-option
                v-for="item in applierSelect"
                :key="item.admin_id"
                :label="item.name"
                :value="item.admin_id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="自定义字段1" prop="diy_field1">
            <el-input v-model="addCustomerRuleForm.diy_field1" clearable class="inputForm"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="自定义字段2" prop="diy_field2">
            <el-input v-model="addCustomerRuleForm.diy_field2" clearable class="inputForm"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="自定义字段3" prop="diy_field3">
            <el-input v-model="addCustomerRuleForm.diy_field3" clearable class="inputForm"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="EIR代码" prop="eir">
            <el-input v-model="addCustomerRuleForm.eir" clearable class="inputForm"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="介绍人" prop="introducer">
            <el-input v-model="addCustomerRuleForm.introducer" clearable class="inputForm"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="系统车队" prop="systemCarName" class="boldItem" v-if="isAssociated">
            <el-input v-model="systemCarName" clearable class="inputForm" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="车队主账号" prop="associateAccount" class="boldItem" v-if="isAssociated">
            <el-input v-model="associateAccount" clearable class="inputForm" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组织代码" class="boldItem" prop="car_id" v-if="isAssociated">
            <el-input v-model="car_id" :disabled="true" clearable class="inputForm"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="会员等级" class="boldItem" prop="car_id" v-if="isAssociated">
            <el-input v-model="auth_group_name" :disabled="true" clearable class="inputForm"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公司抬头" class="boldItem" prop="rise" v-if="isAssociated">
            <el-input v-model="rise" :disabled="true" clearable class="inputForm"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="注册时间" class="boldItem" prop="add_time" v-if="isAssociated">
            <el-input v-model="add_time" :disabled="true" clearable class="inputForm"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="付费时间" class="boldItem" prop="add_time" v-if="isAssociated">
            <el-input v-model="pay_time" :disabled="true" clearable class="inputForm"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="到期时间" class="boldItem" prop="expiry_time" v-if="isAssociated">
            <el-input v-model="expiry_time" :disabled="true" clearable class="inputForm"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="北斗公司" class="boldItem" prop="beidou" v-if="isAssociated">
            <el-select
              v-model="beidou"
              filterable
              clearable
              :disabled="true"
              placeholder=" "
              class="boldItem inputForm"
            >
              <el-option
                v-for="item in Beidoucompany"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="放箱销售" class="boldItem" prop="box_sale" v-if="isAssociated">
            <el-select
              v-model="box_sale"
              filterable
              clearable
              :disabled="true"
              placeholder=" "
              class="boldItem inputForm"
            >
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
          <el-form-item label="北斗销售" class="boldItem" prop="beidou_sale" v-if="isAssociated">
            <el-select
              v-model="beidou_sale"
              filterable
              clearable
              :disabled="true"
              placeholder=" "
              class="boldItem inputForm"
            >
              <el-option
                v-for="item in applierSelect"
                :key="item.admin_id"
                :label="item.name"
                :value="item.admin_id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="开票销售" class="boldItem" prop="order_sale" v-if="isAssociated">
            <el-select
              v-model="order_sale"
              filterable
              clearable
              :disabled="true"
              placeholder=" "
              class="boldItem inputForm"
            >
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
          <el-form-item label="进口放箱公司" class="boldItem" prop="expiry_time" v-if="isAssociated">
            <el-input v-model="in_box_company" :disabled="true" clearable class="inputForm" type="textarea" autosize></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="出口放箱公司" class="boldItem" prop="expiry_time" v-if="isAssociated">
            <el-input v-model="out_box_company" :disabled="true" clearable class="inputForm" type="textarea" autosize></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label=" " class="boldItem" prop="is_big_dipper" v-if="isAssociated">
            <el-checkbox v-model="is_big_dipper" :disabled="true" :true-label="1" :false-label="0" class="boldItem">是否绑定北斗</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="addCustomerRuleForm.remark" type="textarea" size="medium" :autosize="{ minRows: 6, maxRows: 6 }" style="width:650px;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="editCustomerId==0">
        <el-col :span="24">
          <el-form-item label="跟进内容" prop="visit_record">
            <el-input v-model="addCustomerRuleForm.visit_record" type="textarea" size="medium" :autosize="{ minRows: 6, maxRows: 6 }"></el-input>
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
  name: 'addOrEditCustomer',
  props: [
    "addCustomerDialog",
    "editCustomerDrawer",
    "editCustomerId",
    "regionSelect",
    "progressSelect",
    "admin_id",
    "group_name",
    "pagetype",
    "applierSelect",
    "typeSelect",
    "levelSelect",
    "Beidoucompany"
  ],
  data() {
    var checkphone = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入手机号"));
        return;
      } else if (!this.isCellPhone(value)) {//引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的手机号!"));
        return;
      }
      this.checkContact_TelephoneExist(value).then((res)=>{
        if(!res){
          callback(new Error("该联系人手机号已存在，换一个试试!"));
        }else{
          callback();
        }
      });
    };
    var checkType = (rule,value,callback) => {
      if(value === ""){
        callback(new Error("请选择客户类型"));
      }else if(this.validAuthPaidUser(value)){
        callback(new Error("权限不足，无法设置为付费客户"));
      }else{
        callback();
      }
    };
    var checkCar_name = (rule, value, callback) => {
      var self = this;
      if (value == "") {
        callback(new Error("请输入车队名称"));
        return;
      }
      this.checkCar_nameExist(value).then((res)=>{
        if(!res){
          callback(new Error("该车队名称已存在，换一个试试!"));
        }else{
          callback();
        }
      });
    };
    return {
      addCustomerRuleForm:{
        address:'',
        region:'',
        car_name:'',
        postcode:'',
        contact_name:'',
        contact_telephone:'',
        type:'',
        level:'',
        source:'',
        progress:'',
        status:'',
        remark:'',
        // car_id:'',
        cooperative_sale:'',
        visit_record:'',
        eir:'',
        introducer:'',
        diy_field1:'',
        diy_field2:'',
        diy_field3:'',
      },
      addCustomerRuleFormTemp:{},
      initType:'',
      systemCarName:'',
      associateAccount:'',
      rise:'',
      add_time:'',
      pay_time:'',
      expiry_time:'',
      is_big_dipper:'',
      car_id:'',
      beidou:'',
      box_sale:'',
      beidou_sale:'',
      order_sale:'',
      in_box_company:'',
      out_box_company:'',
      auth_group_name:'',
      addCustomerRules:{
        car_name: [
          { required: true, validator:checkCar_name, trigger: 'blur' },
        ],
        contact_name: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
        ],
        contact_telephone: [
          { required: true,validator: checkphone , trigger: 'blur' },
        ],
        region:[
          {required:true,message:'请选择区域',trigger:'change'}
        ],
        address:[
          {required:true,message:'请输入地址',trigger:'blur'}
        ],
        type:[
          {required:true,validator:checkType,trigger:'change'}
        ],
        source:[
          {required:true,message:'请选择信息来源',trigger:'change'}
        ],
        level:[
          {required:true,message:'请选择重要等级',trigger:'change'}
        ],
        visit_record:[
          {required:true,message:'请输入跟进内容',trigger:'blur'}
        ]
      },
      sourceSelect:[],
      statusSelect:[],
      insertStatus:true,
      associateBtn:false,
      isAssociated:false,
    }
  },
  watch:{
    addCustomerDialog: {
      handler(val) {
        if(val){
          this.insertStatus = false;
          this.resetForm();
        }
      },
      immediate: true,
      deep: true
    },
    editCustomerDrawer:{
      handler(val){
        if(val){
          this.insertStatus = true;
          this.resetForm();
          this.getCustomerById();
        }
      },
      immediate:true,
      deep:true
    }
  },
  created(){
    this.getSourceSelect();
    this.getStatusSelect();
  },
  methods: {
      cancelAssociateAccount(){
        var self = this;
        this.$confirm('是否确定取消绑定车队?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request({
            method: 'post',
            url: `${CRM_API}/crm/cancelAssociateAccount`,
            data: {id:self.editCustomerId}
          }).then(res=>{
            if(res.code==200){
              self.isAssociated = false;
              self.associateAccount = '';
              self.systemCarName = '';
              self.$emit("loadTable");
              self.$message.success("取消关联成功");
            }
          }).catch(res=>{
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      contactTelephoneFocus(){
        if(this.editCustomerId!=0){
          this.associateBtn = true;
        }
      },
      getStatusSelect(){
        var self = this;
        request({
          method: 'post',
          url: `${CRM_API}/crm/getStatusSelect`,
          data: {}
        }).then(res=>{
          self.statusSelect = res.data;
        }).catch(res=>{
        })
      },
      associateAccountConfirm(){
        this.$refs['addCustomerRuleForm'].validateField("contact_telephone",(valid)=>{
          if(valid){
            return;
          }
          this.$confirm('是否确定绑定车队?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.getAssociateAccountMessage();
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消绑定操作'
            });
          });
        });
      },
      getAssociateAccountMessage(){
        var self = this;
        request({
          method: 'post',
          url: `${CRM_API}/crm/getAssociateAccountMessage`,
          data: {'contact_telephone':this.addCustomerRuleForm.contact_telephone,'id':this.editCustomerId,"admin_id":this.admin_id}
        }).then(res=>{
          if(res.code==200){
            var resp = res.data;
            if(resp.car_id!=undefined){
              self.getCustomerById();
              self.isAssociated = true;
              self.$emit("loadTable");
              self.$message.success("关联成功");
            }else{
              self.$message.warning("该用户未注册账户，请新增账户后再做关联");
            }
          }else{
            self.$message.warning(res.data);
          }
        }).catch(res=>{
        })
      },
      preserveAddCustomer(){
        var self = this;
        this.$refs['addCustomerRuleForm'].validate((valid) => {
          if(!valid){
            self.$message.warning("请输入正确信息");
            return;
          }
          var customer = this.addCustomerRuleForm;
          customer.admin_id = self.admin_id;
          customer.pagetype = self.pagetype;
          customer.group_name = self.group_name;
          request({
            method: 'post',
            url: `${CRM_API}/crm/addCustomer`,
            data: customer
          }).then(res=>{
            if(res.code==200){
              self.$emit("closeAddCustomerDislog");
              self.$emit("search");
              self.$message.success("新增客户成功");
            }else{
              self.$message.warning(res.data.data);
            }
          }).catch(res=>{
              self.$emit("closeAddCustomerDislog");
              self.$message.error("新增失败");
          })
        });
      },
      preserveEditCustomer(){
        var self = this;
        this.$refs['addCustomerRuleForm'].validate((valid) => {
          if(!valid){
            self.$message.warning("请输入正确信息");
            return;
          }
          if(self.addCustomerRuleForm.address === self.addCustomerRuleFormTemp.address
          &&self.addCustomerRuleForm.car_name === self.addCustomerRuleFormTemp.car_name
          &&self.addCustomerRuleForm.region === self.addCustomerRuleFormTemp.region
          &&self.addCustomerRuleForm.postcode === self.addCustomerRuleFormTemp.postcode
          &&self.addCustomerRuleForm.contact_name === self.addCustomerRuleFormTemp.contact_name
          &&self.addCustomerRuleForm.contact_telephone === self.addCustomerRuleFormTemp.contact_telephone
          &&self.addCustomerRuleForm.type === self.addCustomerRuleFormTemp.type
          &&self.addCustomerRuleForm.level === self.addCustomerRuleFormTemp.level
          &&self.addCustomerRuleForm.source === self.addCustomerRuleFormTemp.source
          &&self.addCustomerRuleForm.progress === self.addCustomerRuleFormTemp.progress
          &&self.addCustomerRuleForm.remark === self.addCustomerRuleFormTemp.remark
          &&self.addCustomerRuleForm.status === self.addCustomerRuleFormTemp.status
          &&self.addCustomerRuleForm.cooperative_sale === self.addCustomerRuleFormTemp.cooperative_sale
          &&self.addCustomerRuleForm.eir === self.addCustomerRuleFormTemp.eir
          &&self.addCustomerRuleForm.introducer === self.addCustomerRuleFormTemp.introducer
          &&self.addCustomerRuleForm.diy_field1 === self.addCustomerRuleFormTemp.diy_field1
          &&self.addCustomerRuleForm.diy_field2 === self.addCustomerRuleFormTemp.diy_field2
          &&self.addCustomerRuleForm.diy_field3 === self.addCustomerRuleFormTemp.diy_field3){
            self.$message.warning("数据未修改无法保存");
            return;
          }
          var customer = this.addCustomerRuleForm;
          customer.admin_id = self.admin_id;
          customer.id = self.editCustomerId;
          customer.group_name = self.group_name;
          request({
            method: 'post',
            url: `${CRM_API}/crm/updateCustomer`,
            data: customer
          }).then(res=>{
            if(res.code==200){
              self.$emit("closeEditCustomerDrawer");
              self.$emit("loadTable");
              self.$message.success("修改客户成功");
            }else{
              self.$message.warning(res.data);
            }
          }).catch(res=>{
            self.$emit("closeEditCustomerDrawer");
            self.$message.error("修改失败！");
          })
        });
      },
      getCustomerById(){
        var self = this;
        request({
          method: 'post',
          url: `${CRM_API}/crm/getCustomerById`,
          data: {id:self.editCustomerId}
        }).then(res=>{
          var resp = res.data;
          if(resp.car_id!=''){
            this.isAssociated = true;
          }else{
            this.isAssociated = false;
          }
          self.addCustomerRuleForm.address = resp.address;
          self.addCustomerRuleForm.car_name = resp.car_name;
          self.addCustomerRuleForm.region = resp.region;
          self.addCustomerRuleForm.postcode = resp.postcode;
          self.addCustomerRuleForm.contact_name = resp.contact_name;
          self.addCustomerRuleForm.contact_telephone = resp.contact_telephone;
          self.addCustomerRuleForm.type = resp.type;
          self.addCustomerRuleForm.level = resp.level;
          self.addCustomerRuleForm.source = resp.source;
          self.addCustomerRuleForm.progress = resp.progress;
          self.addCustomerRuleForm.remark = resp.remark;
          self.addCustomerRuleForm.status = resp.status;
          self.addCustomerRuleForm.cooperative_sale = resp.cooperative_sale;
          self.addCustomerRuleForm.eir = resp.eir;
          self.addCustomerRuleForm.introducer = resp.introducer;
          self.addCustomerRuleForm.diy_field1 = resp.diy_field1;
          self.addCustomerRuleForm.diy_field2 = resp.diy_field2;
          self.addCustomerRuleForm.diy_field3 = resp.diy_field3;
          self.initType = resp.type;
          self.systemCarName = resp.systemCarName;
          self.associateAccount = resp.associateAccount;
          self.rise = resp.rise;
          self.add_time = resp.add_time;
          self.pay_time = resp.pay_time;
          self.expiry_time = resp.expiry_time;
          self.is_big_dipper = resp.is_big_dipper;
          self.car_id = resp.car_id;
          self.beidou = resp.beidou;
          self.box_sale = resp.box_sale;
          self.beidou_sale = resp.beidou_sale;
          self.order_sale = resp.order_sale;
          self.auth_group_name = resp.group_name;
          self.in_box_company = '';
          self.out_box_company = '';
          if(resp.box_company.length>0){
            resp.box_company.forEach(element => {
              // box_company_type 进口为1 出口为2 进出口为3
              if(element.box_company_type==1){
                self.in_box_company += element.box_name + '\n';
              }else if(element.box_company_type==2){
                self.out_box_company += element.box_name + '\n';
              }else if(element.box_company_type==3){
                self.in_box_company += element.box_name + '\n';
                self.out_box_company += element.box_name + '\n';
              }
            });
          }


          self.addCustomerRuleFormTemp.address = resp.address;
          self.addCustomerRuleFormTemp.car_name = resp.car_name;
          self.addCustomerRuleFormTemp.region = resp.region;
          self.addCustomerRuleFormTemp.postcode = resp.postcode;
          self.addCustomerRuleFormTemp.contact_name = resp.contact_name;
          self.addCustomerRuleFormTemp.contact_telephone = resp.contact_telephone;
          self.addCustomerRuleFormTemp.type = resp.type;
          self.addCustomerRuleFormTemp.level = resp.level;
          self.addCustomerRuleFormTemp.source = resp.source;
          self.addCustomerRuleFormTemp.progress = resp.progress;
          self.addCustomerRuleFormTemp.remark = resp.remark;
          self.addCustomerRuleFormTemp.status = resp.status;
          self.addCustomerRuleFormTemp.cooperative_sale = resp.cooperative_sale;
          self.addCustomerRuleFormTemp.eir = resp.eir;
          self.addCustomerRuleFormTemp.introducer = resp.introducer;
          self.addCustomerRuleFormTemp.diy_field1 = resp.diy_field1;
          self.addCustomerRuleFormTemp.diy_field2 = resp.diy_field2;
          self.addCustomerRuleFormTemp.diy_field3 = resp.diy_field3;

          self.$emit("closeEditCustomerLoading");
        }).catch(res=>{
        })
      },
      getSourceSelect(){
        var self = this;
        request({
          method: 'post',
          url: `${CRM_API}/crm/getSourceSelect`,
          data: {}
        }).then(res=>{
          self.sourceSelect = res.data;
        }).catch(res=>{
        })
      },
      resetForm() {
        this.$nextTick(()=>{
          this.$refs["addCustomerRuleForm"].resetFields();
        });
      },
      validAuthPaidUser(val){
        if(val==1){
          if(this.group_name==='运营'||this.group_name==='销售主管'){
            return false;
          }else{
            if(this.initType == val){
              return false;
            }else{
              return true;
            }
          }
        }else{
          return false;
        }
      },
      //检查手机号
	    isCellPhone(val) {
	      if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(val)) {
	        return false;
	      } else {
	        return true;
	      }
	    },
      async checkCar_nameExist(val){
        var self = this;
        let flag="";
        await request({
          method: 'post',
          url: `${CRM_API}/crm/validcarname`,
          data: {car_name:val}
        }).then(res=>{
          if(self.editCustomerId==0){
            //新增状态
            if(res.data!=""){
              flag = false;
            }else{
              flag = true;
            }
          }else{
            //编辑状态
            if(res.data!=""){
              if(res.data.id==self.editCustomerId){
                flag = true;
              }else{
                flag = false;
              }
            }else{
              flag = true;
            }
          }
        }).catch(res=>{
        })
        return flag;
      },
      async checkContact_TelephoneExist(val){
          var self = this;
          let flag="";
          await request({
            method: 'post',
            url: `${CRM_API}/crm/validContactTelephone`,
            data: {contact_telephone:val}
          }).then(res=>{
            if(self.editCustomerId==0){
              //新增状态
              if(res.data!=""){
                flag = false;
              }else{
                flag = true;
              }
            }else{
              //编辑状态
              if(res.data!=""){
                if(res.data.id==self.editCustomerId){
                  flag = true;
                  this.associateBtn = false;
                }else{
                  flag = false;
                }
              }else{
                flag = true;
                this.associateBtn = false;
              }
            }
          }).catch(res=>{
          })
          return flag;
      }
  }
}
</script>
