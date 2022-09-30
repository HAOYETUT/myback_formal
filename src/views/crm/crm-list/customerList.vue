<template>
  <div class="outer">
    <el-collapse v-model="activeNames" style="margin-bottom: 20px;">
      <el-collapse-item title="搜索条件" name="searchCondition">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="车队名称:">
            <el-input
              v-model="searchRequest.car_name"
              clearable
              prefix-icon="el-icon-search"
              placeholder="请输入车队名称"
              class="inputFrame"
            />
          </el-form-item>
          <el-form-item label="联系电话:">
            <el-input
              v-model="searchRequest.contact_telephone"
              clearable
              prefix-icon="el-icon-search"
              placeholder="请输入联系电话"
              class="inputFrame"
            />
          </el-form-item>
          <el-form-item label="地址:">
            <el-input
              v-model="searchRequest.address"
              clearable
              prefix-icon="el-icon-search"
              placeholder="请输入地址"
              class="inputFrame"
            />
          </el-form-item>
          <el-form-item
            v-if="
              searchRequest.pagetype == 1 &&
                (group_name === '销售主管' ||
                  group_name === '运营' ||
                  group_name === '系统管理')
            "
            label="申领状态:"
          >
            <el-select
              v-model="searchRequest.is_apply"
              filterable
              clearable
              placeholder="请选择申领状态"
              class="inputFrame"
            >
              <el-option
                v-for="item in is_applySelect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="申领人:">
            <el-select
              v-model="searchRequest.applier"
              filterable
              collapse-tags
              multiple
              clearable
              placeholder="请选择申领人"
              class="inputFrame"
              style="width:230px;"
            >
              <el-option
                v-for="item in applierSelect"
                :key="item.admin_id"
                :label="item.name"
                :value="item.admin_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="合作销售:">
            <el-select
              v-model="searchRequest.cooperative_sale"
              filterable
              clearable
              placeholder="请选择合作销售"
              class="inputFrame"
            >
              <el-option
                v-for="item in applierSelect"
                :key="item.admin_id"
                :label="item.name"
                :value="item.admin_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="放箱销售:">
            <el-select
              v-model="searchRequest.box_sale"
              filterable
              clearable
              placeholder="请选择放箱销售"
              class="inputFrame"
            >
              <el-option
                v-for="item in applierSelect"
                :key="item.admin_id"
                :label="item.name"
                :value="item.admin_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="北斗销售:">
            <el-select
              v-model="searchRequest.beidou_sale"
              filterable
              clearable
              placeholder="请选择北斗销售"
              class="inputFrame"
            >
              <el-option
                v-for="item in applierSelect"
                :key="item.admin_id"
                :label="item.name"
                :value="item.admin_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="开票销售:">
            <el-select
              v-model="searchRequest.order_sale"
              filterable
              clearable
              placeholder="请选择开票销售"
              class="inputFrame"
            >
              <el-option
                v-for="item in applierSelect"
                :key="item.admin_id"
                :label="item.name"
                :value="item.admin_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="联系人:">
            <el-input
              v-model="searchRequest.contact_name"
              clearable
              prefix-icon="el-icon-search"
              placeholder="请输入联系人"
              class="inputFrame"
            />
          </el-form-item>
          <el-form-item label="最近跟进时间:">
            <el-date-picker
              v-model="lastVisitStartEndDateTimeTemp"
              type="datetimerange"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              align="right"
              style="width: 330px;"
              @change="changeLastVisitStartEndTime"
            />
          </el-form-item>
          <el-form-item label="最后跟进人:">
            <el-select
              v-model="searchRequest.lastVisitUser"
              filterable
              clearable
              placeholder="请选择最后跟进人"
              class="inputFrame"
            >
              <el-option
                v-for="item in lastVisitUserSelect"
                :key="item.admin_id"
                :label="item.name"
                :value="item.admin_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="跟进进度:">
            <el-select
              v-model="searchRequest.progress"
              filterable
              clearable
              placeholder="请选择跟进进度"
              class="inputFrame"
            >
              <el-option
                v-for="item in progressSelect"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="区域:">
            <el-select
              v-model="searchRequest.region"
              filterable
              clearable
              placeholder="请选择区域"
              class="inputFrame"
            >
              <el-option
                v-for="item in regionSelect"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="重要等级:">
            <el-select v-model="searchRequest.level" filterable clearable class="inputFrame" placeholder="请选择重要等级">
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
          <el-form-item label="EIR代码:">
            <el-input
              v-model="searchRequest.eir"
              clearable
              prefix-icon="el-icon-search"
              placeholder="请输入EIR代码"
              class="inputFrame"
            />
          </el-form-item>
          <el-form-item label="绑定北斗状态:">
            <el-select
              v-model="searchRequest.is_big_dipper"
              filterable
              clearable
              placeholder="请选择绑定北斗状态:"
              class="inputFrame"
              style="width: 165px;"
            >
              <el-option :key="1" label="是" :value="1" />
              <el-option :key="0" label="否" :value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="介绍人:">
            <el-input
              v-model="searchRequest.introducer"
              clearable
              prefix-icon="el-icon-search"
              placeholder="请输入介绍人"
              class="inputFrame"
            />
          </el-form-item>
          <el-form-item label="客户类型:">
            <el-select
              v-model="searchRequest.type"
              filterable
              clearable
              placeholder="请选择客户类型"
              class="inputFrame"
            >
              <el-option
                v-for="item in typeSelect"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="委托人:">
            <el-select
              v-model="searchRequest.appoint_user_id"
              filterable
              clearable
              placeholder="请选择委托人"
              class="inputFrame"
            >
              <el-option
                v-for="item in appointUserSelect"
                :key="item.admin_id"
                :label="item.name"
                :value="item.admin_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="公司抬头:">
            <el-input
              v-model="searchRequest.rise"
              clearable
              prefix-icon="el-icon-search"
              placeholder="请输入公司抬头"
              class="inputFrame"
            />
          </el-form-item>
          <el-form-item label="组织代码:">
            <el-input
              v-model="searchRequest.car_id"
              clearable
              prefix-icon="el-icon-search"
              placeholder="请输入组织代码"
              class="inputFrame"
            />
          </el-form-item>
          <el-form-item label="车队主账号:">
            <el-input
              v-model="searchRequest.mainAccount"
              clearable
              prefix-icon="el-icon-search"
              placeholder="请输入车队主账号"
              class="inputFrame"
            />
          </el-form-item>
          <el-form-item label="注册时间:">
            <el-date-picker
              v-model="registerStartEndDateTimeTemp"
              type="datetimerange"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              align="right"
              style="width: 330px;"
              @change="changeRegisterStartEndTime"
            />
          </el-form-item>
          <el-form-item label="付费时间:">
            <el-date-picker
              v-model="payStartEndDateTimeTemp"
              type="datetimerange"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              align="right"
              style="width: 330px;"
              @change="changePayStartEndTime"
            />
          </el-form-item>
          <el-form-item label="到期时间:">
            <el-date-picker
              v-model="expiryStartEndDateTimeTemp"
              type="datetimerange"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              align="right"
              style="width: 330px;"
              @change="changeExpiryStartEndTime"
            />
          </el-form-item>
          <el-form-item label="自定义字段1:">
            <el-input
              v-model="searchRequest.diy_field1"
              clearable
              prefix-icon="el-icon-search"
              placeholder="请输入自定义字段1"
              class="inputFrame"
              style="width: 175px;"
            />
          </el-form-item>
          <el-form-item label="自定义字段2:">
            <el-input
              v-model="searchRequest.diy_field2"
              clearable
              prefix-icon="el-icon-search"
              placeholder="请输入自定义字段2"
              class="inputFrame"
              style="width: 175px;"
            />
          </el-form-item>
          <el-form-item label="自定义字段3:">
            <el-input
              v-model="searchRequest.diy_field3"
              clearable
              prefix-icon="el-icon-search"
              placeholder="请输入自定义字段3"
              class="inputFrame"
              style="width: 175px;"
            />
          </el-form-item>
          <el-form-item label="会员等级:">
            <el-select
              v-model="searchRequest.auth_group_id"
              filterable
              clearable
              placeholder="请选择会员等级"
              class="inputFrame"
            >
              <el-option
                v-for="item in groupNameSelect"
                :key="item.group_id"
                :label="item.group_name"
                :value="item.group_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="进口放箱公司:">
            <el-select
              v-model="searchRequest.box_id_in"
              filterable
              :filter-method="handleFilterInBoxCompany"
              @visible-change="visibleInBoxCompanySelect"
              clearable
              placeholder="请选择进口放箱公司"
              class="inputFrame"
            >
              <el-option
                v-for="item in inBoxCompanySelect"
                :key="item.box_id"
                :label="item.box_name"
                :value="item.box_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="出口放箱公司:">
            <el-select
              v-model="searchRequest.box_id_out"
              filterable
              :filter-method="handleFilterOutBoxCompany"
              @visible-change="visibleOutBoxCompanySelect"
              clearable
              placeholder="请选择出口放箱公司"
              class="inputFrame"
            >
              <el-option
                v-for="item in outBoxCompanySelect"
                :key="item.box_id"
                :label="item.box_name"
                :value="item.box_id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="北斗公司:">
            <el-select
              v-model="searchRequest.beidou"
              filterable
              clearable
              placeholder="请选择北斗公司"
              class="inputFrame"
            >
              <el-option
                v-for="item in Beidoucompany"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button
          type="primary"
          style="width: 100px;"
          @click="search"
          :loading="goEasy"
        >搜 索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="success"
          style="width: 100px;"
          @click="resettingSearch"
        >重置搜索条件</el-button>
      </el-form-item>
      <el-form-item label="">
        <el-button
          type="warning"
          style="width: 100px;"
          @click="addInternationalCustomer"
        >{{ addCustomerButtonTitle }}</el-button>
      </el-form-item>
      <el-form-item label="">
       <el-button
          type="primary"
          style="width: 80px;"
          @click="openImportCustomerDialog"
        >导入客户</el-button>
      </el-form-item>
      <el-form-item label="" v-if="searchRequest.pagetype == 1">
        <el-popover
          placement="bottom-start"
          width="160"
          v-model="exportCustomerPopoverVisible"
          @show="diableExportCustomerButton = false">
          <p><i class="el-icon-question" style="color: orange;"></i>确定导出客户吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="exportCustomerPopoverVisible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="exportCustomer" :disabled="diableExportCustomerButton">确定</el-button>
          </div>
          <el-button slot="reference" style="width: 80px;" type="success">导出客户</el-button>
        </el-popover>
      </el-form-item>
      <el-form-item lable="">
        <el-button type="danger" @click="openBatchAlterDiyFieldDialog">批量修改自定义字段</el-button>
      </el-form-item>
      <el-form-item label="">
       <el-button
          type="danger"
          @click="confirmBatchDeleteCustomer"
        >删除客户</el-button>
      </el-form-item>
      <el-form-item label="">
        <el-tooltip class="item" effect="dark" content="自定义列设置" placement="bottom-start" :open-delay="500">
          <el-link type="primary" class="el-icon-setting" :underline="false" style="font-size:20px;" @click="openDiyColumnSettingDialog"></el-link>
        </el-tooltip>
      </el-form-item>
      <el-form-item label="">
        <el-tooltip class="item" effect="dark" placement="bottom-start" :open-delay="500">
          <div slot="content">
            <span class="dot" style=" background: #f7b8b8;" ></span>
            ：会员已过期的客户
            <br>
            <span class="dot" style=" background: #fadaab;" ></span>
            ：会员过期时间小于15天的客户
            <br>
            <span class="dot" style=" background: #bfeba9;" ></span>
            ：会员过期时间小于30天的客户
          </div>
          <i class="el-icon-info"></i>
        </el-tooltip>
      </el-form-item>
    </el-form>

    <div>
      <!-- @header-dragend="handleHeaderDragend" -->
      <el-table border :data="tableData" style="width: 100%;" :row-style="tableRowStyle" ref="multipleTable" @selection-change="handleSelectionChange" @sort-change="sortTableChange" v-loading="customerTableLoading" @row-dblclick="handleRowDblClick" @row-contextmenu="handleRowContextMenu">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column v-for="(item, index) in col" :key="`col_${index}`" :prop="dropCol[index].prop" :label="item.label" :align="dropCol[index].align" :width="dropCol[index].width==0?true:dropCol[index].width" :sortable="dropCol[index].sortable" :resizable="false">
            <template slot-scope="scope">
              <span v-if="dropCol[index].prop=='id'">
                {{scope.row.id}}
              </span>
              <span v-else-if="dropCol[index].prop=='car_name'">
                <el-link
                  type="primary"
                  @click="openEditCustomerDrawer(scope.row.id, scope.row.car_name)"
                >{{ scope.row.car_name }}</el-link>
              </span>
              <span v-else-if="dropCol[index].prop=='is_apply_str'">
                {{scope.row.is_apply_str}}
              </span>
              <span v-else-if="dropCol[index].prop=='contact_name'">
                {{scope.row.contact_name}}
              </span>
              <span v-else-if="dropCol[index].prop=='contact_telephone'">
                {{scope.row.contact_telephone}}
              </span>
              <span v-else-if="dropCol[index].prop=='region_str'">
                {{scope.row.region_str}}
              </span>
              <span v-else-if="dropCol[index].prop=='progress_str'">
                {{scope.row.progress_str}}
              </span>
              <span v-else-if="dropCol[index].prop=='applier'">
                <span v-if="scope.row.applier_name != ''">
                  <span>
                    {{ scope.row.applier_name }}
                  </span>
                  <span>
                    <el-link
                      type="danger"
                      class="el-icon-circle-close"
                      :underline="false"
                      :disabled="group_name != '销售' &&group_name != '销售主管' &&group_name != '运营'"
                      v-if="cancelVif(scope.row.applier)"
                      @click="
                        applyOrCancelConfirm(scope.row.id, scope.row.applier, 1)
                      "
                    />
                  </span>
                </span>
                <span v-else>
                  <el-link
                    type="primary"
                    :disabled="
                      group_name != '销售' &&
                        group_name != '销售主管' &&
                        group_name != '运营'
                    "
                    @click="applyOrCancelConfirm(scope.row.id, 0, 0)"
                  >立即申领</el-link>
                </span>
              </span>
              <span v-else-if="dropCol[index].prop=='cooperative_sale_name'">
                {{scope.row.cooperative_sale_name}}
              </span>
              <span v-else-if="dropCol[index].prop=='box_sale_name'">
                {{scope.row.box_sale_name}}
              </span>
              <span v-else-if="dropCol[index].prop=='beidou_sale_name'">
                {{scope.row.beidou_sale_name}}
              </span>
              <span v-else-if="dropCol[index].prop=='order_sale_name'">
                {{scope.row.order_sale_name}}
              </span>
              <span v-else-if="dropCol[index].prop=='followup_time'">
                {{scope.row.followup_time}}
              </span>
              <span v-else-if="dropCol[index].prop=='visit_record'">
                {{scope.row.visit_record}}
              </span>
              <span v-else-if="dropCol[index].prop=='last_visit_user_name'">
                {{scope.row.last_visit_user_name}}
              </span>
              <span v-else-if="dropCol[index].prop=='address'">
                {{scope.row.address}}
              </span>
              <span v-else-if="dropCol[index].prop=='type_str'">
                {{scope.row.type_str}}
              </span>
              <span v-else-if="dropCol[index].prop=='is_big_dipper_str'">
                {{scope.row.is_big_dipper_str}}
              </span>
              <span v-else-if="dropCol[index].prop=='introducer'">
                {{scope.row.introducer}}
              </span>
              <span v-else-if="dropCol[index].prop=='create_user_name'">
                {{scope.row.create_user_name}}
              </span>
              <span v-else-if="dropCol[index].prop=='appoint_time'">
                {{scope.row.appoint_time}}
              </span>
              <span v-else-if="dropCol[index].prop=='appoint_user_name'">
                {{scope.row.appoint_user_name}}
              </span>
              <span v-else-if="dropCol[index].prop=='diy_field1'">
                {{scope.row.diy_field1}}
              </span>
              <span v-else-if="dropCol[index].prop=='diy_field2'">
                {{scope.row.diy_field2}}
              </span>
              <span v-else-if="dropCol[index].prop=='diy_field3'">
                {{scope.row.diy_field3}}
              </span>
              <span v-else-if="dropCol[index].prop=='rise'">
                {{scope.row.rise}}
              </span>
              <span v-else-if="dropCol[index].prop=='car_id'">
                {{scope.row.car_id}}
              </span>
              <span v-else-if="dropCol[index].prop=='main_account'">
                {{scope.row.main_account}}
              </span>
              <span v-else-if="dropCol[index].prop=='group_name'">
                {{scope.row.group_name}}
              </span>
              <span v-else-if="dropCol[index].prop=='add_time'">
                {{scope.row.add_time}}
              </span>
              <span v-else-if="dropCol[index].prop=='pay_time'">
                {{scope.row.pay_time}}
              </span>
              <span v-else-if="dropCol[index].prop=='expiry_time'">
                {{scope.row.expiry_time}}
              </span>
              <span v-else-if="dropCol[index].prop=='box_in_name'">
                <template v-for="(e,i) in scope.row.box_company">
                  <span v-if="e.box_company_type==1||e.box_company_type==3">
                      {{e.box_name}}
                      <br>
                  </span>
                </template>
              </span>
              <span v-else-if="dropCol[index].prop=='box_out_name'">
                <template v-for="(e,i) in scope.row.box_company">
                  <span v-if="e.box_company_type==2||e.box_company_type==3">
                      {{e.box_name}}
                      <br>
                  </span>
                </template>
              </span>
              <span v-else-if="dropCol[index].prop=='beidou_str'">
                {{scope.row.beidou_str}}
              </span>
            </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination
        :current-page="searchRequest.page"
        :hide-on-single-page="true"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="searchRequest.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <div class="commondialog">
      <el-dialog
        :title="addCustomerButtonTitle"
        :visible.sync="addInternationalCustomerDialog"
        :close-on-click-modal="false"
        width="780px"
        top="7vh"
      >
        <div style="margin-right:10px;">
          <addOrEditCustomer
            ref="addCustomer"
            :add-customer-dialog="addInternationalCustomerDialog"
            :edit-customer-id="0"
            :region-select="regionSelect"
            :progress-select="progressSelect"
            :admin_id="admin_id"
            :group_name="group_name"
            :pagetype="searchRequest.pagetype"
            :applier-select="applierSelect"
            :type-select="typeSelect"
            :level-select="levelSelect"
            @search="search"
            @closeAddCustomerDislog="closeAddCustomerDislog"
          />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            class="addCustomerButton"
            @click="preserveAddCustomer"
          >保 存</el-button>
          <el-button
            class="addCustomerButton"
            @click="addInternationalCustomerDialog = false"
          >取 消</el-button>
        </span>
      </el-dialog>
    </div>

    <div class="editCustomerDrawer">
      <el-drawer
        :title="drawTitle"
        :wrapper-closable="false"
        :visible.sync="editCustomerDrawer"
        size="950px"
        direction="rtl"
        @closed="closedCustomerDrawer"
      >
        <div>
          <div class="editCustomerTag">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
              <el-tab-pane label="基本资料" name="1" v-loading="editCustomerLoading">
                <div class="editCustomerTagPage">
                  <addOrEditCustomer
                    ref="editCustomer"
                    :edit-customer-drawer="editCustomerDrawer"
                    :edit-customer-id="editCustomerId"
                    :region-select="regionSelect"
                    :progress-select="progressSelect"
                    :group_name="group_name"
                    :pagetype="searchRequest.pagetype"
                    :admin_id="admin_id"
                    :Beidoucompany="Beidoucompany"
                    :applier-select="applierSelect"
                    :type-select="typeSelect"
                    :level-select="levelSelect"
                    @closeEditCustomerLoading="closeEditCustomerLoading"
                    @closeEditCustomerDrawer="closeEditCustomerDrawer"
                    @loadTable="loadTable"
                  />
                  <div class="basicMessageButton">
                    <el-button
                      type="primary"
                      class="addCustomerButton"
                      @click="preserveEditCustomer"
                    >保 存</el-button>
                    <el-button
                      class="addCustomerButton"
                      @click="editCustomerDrawer = false"
                    >取 消</el-button>
                  </div>
                </div>
              </el-tab-pane>
              <!-- <el-link type="primary" @click="openEditContactDialog(e.id)">修改</el-link> -->
              <el-tab-pane label="联系人" name="2" v-loading="contactListLoading">
                <div>
                  <template v-for="(e, i) in contactList">
                    <el-card class="box-cardMain contact" v-if="e.is_main==1">
                      <div class="cardContent">
                        <el-form label-width="90px">
                          <el-form-item label="姓名：">
                            <span class="overLengthLineFeed">{{ e.name }}</span>
                          </el-form-item>
                          <el-form-item label="手机号码：">
                            <span class="overLengthLineFeed">{{
                              e.cell_telephone
                            }}</span>
                          </el-form-item>
                        </el-form>
                      </div>
                      <div class="bottom clearfix">
                        <el-button
                          type="text"
                          class="button"
                          @click="openEditContactDialog(e.id)"
                        >修改</el-button>
                      </div>
                    </el-card>
                    <el-card class="box-card contact" v-else>
                      <div class="cardContent">
                        <el-form label-width="90px">
                          <el-form-item label="姓名：">
                            <span class="overLengthLineFeed">{{ e.name }}</span>
                          </el-form-item>
                          <el-form-item label="手机号码：">
                            <span class="overLengthLineFeed">{{
                              e.cell_telephone
                            }}</span>
                          </el-form-item>
                        </el-form>
                      </div>
                      <div class="bottom clearfix">
                        <el-button
                          type="text"
                          class="button"
                          @click="openEditContactDialog(e.id)"
                        >修改</el-button>
                      </div>
                    </el-card>
                  </template>
                </div>
              </el-tab-pane>
              <el-tab-pane label="跟进" name="3" v-loading="visitRecordListLoading">
                <div>
                  <template v-for="(e, i) in visitRecordList">
                    <el-card class="box-card visitRecord">
                      <div class="cardContent">
                        <el-form label-width="90px">
                          <el-form-item label="联系人：">
                            <span class="overLengthLineFeed">{{ e.name }}</span>
                          </el-form-item>
                          <el-form-item label="手机号码：">
                            <span class="overLengthLineFeed">{{
                              e.cell_telephone
                            }}</span>
                          </el-form-item>
                          <el-form-item label="微信：" v-if="e.wechat_number!=''">
                            <span class="overLengthLineFeed">{{
                              e.wechat_number
                            }}</span>
                          </el-form-item>
                          <el-form-item label="跟进方式：" v-if="e.visit_type_str!=null&&e.visit_type_str!=''">
                            <span class="overLengthLineFeed">{{
                              e.visit_type_str
                            }}</span>
                          </el-form-item>
                          <el-form-item label="跟进内容：">
                            <span class="overLengthLineFeed">{{
                              e.visit_record
                            }}</span>
                          </el-form-item>
                          <el-form-item label="跟进时间：">
                            <span class="overLengthLineFeed">{{
                              e.visit_time
                            }}</span>
                          </el-form-item>
                        </el-form>
                      </div>
                      <div class="bottom clearfix">
                        <el-button
                          type="text"
                          class="button"
                          @click="openEditVisitRecordDialog(e.id)"
                        >修改</el-button>
                      </div>
                    </el-card>
                  </template>
                </div>
              </el-tab-pane>
              <el-tab-pane label="操作日志" name="4" v-loading="operationLogListLoading">
                <div>
                  <template v-for="(e, i) in operationLogList">
                    <el-card class="box-cardMain contact" v-if="e.operation_usertype==1||e.operation_usertype==2">
                      <div class="cardContent">
                        <el-form label-width="90px">
                          <el-form-item label="时间：">
                            <span class="overLengthLineFeed">{{
                              e.operation_time
                            }}</span>
                          </el-form-item>
                          <el-form-item label="用户类型：">
                            <span class="overLengthLineFeed">{{
                              e.operation_usertype_str
                            }}</span>
                          </el-form-item>
                          <el-form-item label="日志：">
                            <span class="overLengthLineFeed">{{
                              e.operation_log
                            }}</span>
                          </el-form-item>
                          <el-form-item v-if="e.remark != ''" label="备注：">
                            <span class="overLengthLineFeed">{{
                              e.remark
                            }}</span>
                          </el-form-item>
                          <el-form-item label="涉及字段：" v-if="e.field_detail!=null&&e.field_detail!=''">
                            <span class="overLengthLineFeed">
                              <div class="table">
                                  <div class="table-column-group">
                                      <div class="table-column"></div>
                                      <div class="table-column"></div>
                                      <div class="table-column"></div>
                                  </div>
                                  <div class="table-header-group">
                                      <ul class="table-row">
                                          <li class="table-cell">字段</li>
                                          <li class="table-cell">更新前</li>
                                          <li class="table-cell">更新后</li>
                                      </ul>
                                  </div>
                                  <div class="table-row-group">
                                    <template v-for="(fd,i) in e.field_detail">
                                       <ul class="table-row">
                                           <li class="table-cell">{{fd.fieldName}}</li>
                                           <li class="table-cell">{{fd.oldValue}}</li>
                                           <li class="table-cell">{{fd.newValue}}</li>
                                       </ul>
                                    </template>
                                  </div>
                              </div>
                            </span>
                          </el-form-item>
                        </el-form>
                      </div>
                    </el-card>
                    <el-card class="box-card visitRecord" v-else>
                      <div class="cardContent">
                        <el-form label-width="90px">
                          <el-form-item label="时间：">
                            <span class="overLengthLineFeed">{{
                              e.operation_time
                            }}</span>
                          </el-form-item>
                          <el-form-item label="用户类型：">
                            <span class="overLengthLineFeed">{{
                              e.operation_usertype_str
                            }}</span>
                          </el-form-item>
                          <el-form-item label="日志：">
                            <span class="overLengthLineFeed">{{
                              e.operation_log
                            }}</span>
                          </el-form-item>
                          <el-form-item v-if="e.remark != ''" label="备注：">
                            <span class="overLengthLineFeed">{{
                              e.remark
                            }}</span>
                          </el-form-item>
                          <el-form-item label="涉及字段：" v-if="e.field_detail!=null&&e.field_detail!=''">
                            <span class="overLengthLineFeed">
                              <div class="table">
                                  <div class="table-column-group">
                                      <div class="table-column"></div>
                                      <div class="table-column"></div>
                                      <div class="table-column"></div>
                                  </div>
                                  <div class="table-header-group">
                                      <ul class="table-row">
                                          <li class="table-cell">字段</li>
                                          <li class="table-cell">更新前</li>
                                          <li class="table-cell">更新后</li>
                                      </ul>
                                  </div>
                                  <div class="table-row-group">
                                    <template v-for="(fd,i) in e.field_detail">
                                       <ul class="table-row">
                                           <li class="table-cell">{{fd.fieldName}}</li>
                                           <li class="table-cell">{{fd.oldValue}}</li>
                                           <li class="table-cell">{{fd.newValue}}</li>
                                       </ul>
                                    </template>
                                  </div>
                              </div>
                            </span>
                          </el-form-item>
                        </el-form>
                      </div>
                    </el-card>
                  </template>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="addContactAndFollowUp">
            <div style="padding-left: 10px;">
              <div>
                <el-button
                  plain
                  size="mini"
                  style="width: 90px;"
                  @click="openAddContactDialog"
                >新建联系人</el-button>
              </div>
              <div style="margin-top: 20px;">
                <el-button
                  plain
                  size="mini"
                  style="width: 90px;"
                  @click="openAddVisitRecordDialog"
                >新建跟进</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-drawer>
    </div>
    <div class="commondialog">
      <el-dialog
        :title="contactDialogTitle"
        :visible.sync="addOrEditContactDialog"
        :close-on-click-modal="false"
        width="780px"
      >
        <div style="margin-right:10px;">
          <addOrEditContact
            ref="addOrEditContact"
            :add-or-edit-contact-dialog="addOrEditContactDialog"
            :edit-contact-id="editContactId"
            :edit-customer-id="editCustomerId"
            :admin_id="admin_id"
            :activeName="activeName"
            @getOperationLogByCustomerId="getOperationLogByCustomerId"
            @loadContactList="getContactList"
            @closeContactDialog="closeContactDialog"
          />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            class="addCustomerButton"
            @click="preserveContact"
          >保 存</el-button>
          <el-button
            class="addCustomerButton"
            @click="addOrEditContactDialog = false"
          >取 消</el-button>
        </span>
      </el-dialog>
    </div>

    <div class="commondialog">
      <el-dialog
        :title="visitRecordDialogTitle"
        :visible.sync="addOrEditVisitRecordDialog"
        :close-on-click-modal="false"
        width="790px"
      >
        <div style="margin-right:10px;">
          <addOrEditVisitRecord
            ref="addOrEditVisitRecord"
            :add-or-edit-visit-record-dialog="addOrEditVisitRecordDialog"
            :edit-customer-id="editCustomerId"
            :edit-visit-record-id="editVisitRecordId"
            :admin_id="admin_id"
            :visitTypeSelect="visitTypeSelect"
            :activeName="activeName"
            @getOperationLogByCustomerId="getOperationLogByCustomerId"
            @loadVisitRecordList="getVisitRecordListByCustomerId"
            @closeVisitRecordList="closeVisitRecordList"
            @loadTable="loadTable"
          />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            class="addCustomerButton"
            @click="preserveVisitRecord"
          >保 存</el-button>
          <el-button
            class="addCustomerButton"
            @click="addOrEditVisitRecordDialog = false"
          >取 消</el-button>
        </span>
      </el-dialog>
    </div>

    <div class="commondialog">
      <el-dialog
        :title="applyOrCancelDialogTitle"
        :visible.sync="applyOrCancelDialog"
        :close-on-click-modal="false"
        width="780px"
      >
        <div style="margin-right:10px;">
          <applyOrCancel
            ref="applyOrCancel"
            :apply-or-cancel-dialog="applyOrCancelDialog"
            :admin_id="admin_id"
            :apply-or-cancel-customer-id="applyOrCancelCustomerId"
            :apply-or-cancel-operation-type="applyOrCancelOperationType"
            :group_name="group_name"
            :my_push_admin_temp="my_push_admin"
            :apply-or-cancel-applier="applyOrCancelApplier"
            @prohibitApplyOrCancelPreserveButton="
              prohibitApplyOrCancelPreserveButton
            "
            @renewApplyOrCancelPreserveButton="renewApplyOrCancelPreserveButton"
            @loadTable="loadTable"
            @closeApplyOrCancelDialog="closeApplyOrCancelDialog"
          />
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            class="addCustomerButton"
            :disabled="applyOrCancelPreserveButton"
            @click="applyOrCancelClick"
          >保 存</el-button>
          <el-button
            class="addCustomerButton"
            @click="applyOrCancelDialog = false"
          >取 消</el-button>
        </span>
      </el-dialog>
    </div>

    <div class="commondialog">
      <el-dialog
        title="导入客户"
        :visible.sync="importCustomerDialog"
        :close-on-click-modal="false"
        width="800px"
      >
        <div style="margin: 0 auto; width: 98%;">
          <p style="font-weight: bolder;">导入说明：</p>
          <p>
            请根据导入模板进行数据导入，红色标题为必填字段。此处"关联账号"字段是为了关联车队中心账号单独设置的，若能查询到对应车队则自动绑定。
          </p>
          <p>
            其中“信息来源”字段为空，默认“主动推销” ;
            "跟进进度"字段为空，默认“前期接触”。
          </p>
        </div>
        <div style="margin: 0 auto; margin-top: 15px; width: 98%;">
          <span style="float: left;">
            <el-upload
              class="upload-demo"
              :headers="{ sk: this.$baseAccessToken() }"
              name="excelfile"
              :data="{ create_user_id: admin_id,pagetype: searchRequest.pagetype,group_name: group_name }"
              :on-success="importCallback"
              :action="uploadUrl"
            >
              <el-button
                type="primary"
                @click="clearImportMessage"
              >开始导入</el-button>
            </el-upload>
          </span>
          <span style="margin-left: 10px;">
            <el-button @click="downloadImportTemplate">下载模板</el-button>
          </span>
        </div>
        <div style="margin: 0 auto; width: 98%; margin-top: 10px;">
          <el-progress :percentage="importPercentage" />
        </div>
        <div
          style="
            margin: 0 auto;
            margin-top: 5px;
            margin-bottom: 10px;
            width: 98%;
            height: 500px;
            border: 1px solid #cccccc;
            border-radius: 5px;
            overflow-y: auto;
            overflow-x: auto;
          "
        >
          <div
            v-if="importReturnData.totalCount != undefined"
            style="margin-left: 10px; margin-top: 10px;"
          >
            <div>
              <span> 导入总条数：{{ importReturnData.totalCount }} </span>
              <span style="margin-left: 40px;">
                成功条数：{{ importReturnData.insertCount }}
              </span>
              <span style="margin-left: 40px;">
                失败条数：{{ importReturnData.errorCount }}
              </span>
            </div>
            <div style="color: red;">
              <template
                v-for="(element, index) in importReturnData.exceptionRowList"
              >
                <div style="margin-top: 10px;">
                  <p>行号：{{ element.rownum }}</p>
                  <p>报错信息：{{ element.exceptionMessage }}</p>
                </div>
              </template>
            </div>
          </div>
          <div
            v-if="importFailMsg != ''"
            style="margin-left: 10px; margin-top: 10px;"
          >
            <div style="color: red;">
              <span>{{ importFailMsg }}</span>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <div class="commondialog">
      <el-dialog
        title="批量修改自定义字段"
        :visible.sync="batchAlterDiyFieldDialog"
        :close-on-click-modal="false"
        width="500px"
      >
        <div style="margin: 0 auto; width: 98%;">
         <el-form :inline="false" class="demo-form-inline">
            <el-form-item label="">
                <el-col :span="24">
                  <span style="color: #e6a23c;">
                    已选中&nbsp;{{multipleSelection.length}}&nbsp;条客户
                  </span>
                </el-col>
            </el-form-item>
            <el-form-item label="">
                <el-col :span="2">
                  <el-checkbox v-model="batchAlterDiyField.checkedBatchDiyField1" @change="changeCheckedBatchDiyField1"></el-checkbox>
                </el-col>
                <el-col :span="6">
                  自定义字段1:
                </el-col>
                <el-col :span="16">
                  <el-input
                    placeholder="请输入自定义字段1"
                    v-model="batchAlterDiyField.inputBatchDiyField1"
                    :disabled="inputBatchDiyFieldDisabled1"
                    clearable>
                  </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="">
                <el-col :span="2">
                  <el-checkbox v-model="batchAlterDiyField.checkedBatchDiyField2" @change="changeCheckedBatchDiyField2"></el-checkbox>
                </el-col>
                <el-col :span="6">
                  自定义字段2:
                </el-col>
                <el-col :span="16">
                  <el-input
                    placeholder="请输入自定义字段2"
                    v-model="batchAlterDiyField.inputBatchDiyField2"
                    :disabled="inputBatchDiyFieldDisabled2"
                    clearable>
                  </el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="">
                <el-col :span="2">
                  <el-checkbox v-model="batchAlterDiyField.checkedBatchDiyField3" @change="changeCheckedBatchDiyField3"></el-checkbox>
                </el-col>
                <el-col :span="6">
                  自定义字段3:
                </el-col>
                <el-col :span="16">
                  <el-input
                    placeholder="请输入自定义字段3"
                    v-model="batchAlterDiyField.inputBatchDiyField3"
                    :disabled="inputBatchDiyFieldDisabled3"
                    clearable>
                  </el-input>
                </el-col>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            class="addCustomerButton"
            @click="confirmBatchAlterDiyField"
          >确 定</el-button>
          <el-button
            class="addCustomerButton"
            @click="batchAlterDiyFieldDialog = false"
          >取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="commondialog">
      <el-dialog
        title="自定义列设置"
        top="3vh"
        :visible.sync="diyColumnSettingDialog"
        :close-on-click-modal="false"
        width="800px"
      >
        <div>
          <diyColumnSetting ref="diyColumnSetting"
                            :diyColumnSettingDialog="diyColumnSettingDialog"
                            :pagetype="this.searchRequest.pagetype"
                            :colTemp="colTemp">
          </diyColumnSetting>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="warning"
            class="addCustomerButton"
            style="float:left;"
            @click="resettingColumn"
          >重 置</el-button>
          <el-button
            type="primary"
            class="addCustomerButton"
            @click="confirmPreserveDiyColumnSetting"
          >确 定</el-button>
          <el-button
            class="addCustomerButton"
            @click="diyColumnSettingDialog = false"
          >取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>


<script>
import addOrEditCustomer from '@/components/crm/addOrEditCustomer.vue'
import addOrEditContact from '@/components/crm/addOrEditContact.vue'
import addOrEditVisitRecord from '@/components/crm/addOrEditVisitRecord.vue'
import applyOrCancel from '@/components/crm/applyOrCancel.vue'
import diyColumnSetting from '@/components/crm/diyColumnSetting.vue'
import { CRM_API } from '@/config'
import axios from 'axios'
// import { toInteger } from 'xe-utils/methods'
// import commondialog from '@/styles/element-dialog.scss'
import request from '@/utils/request'
import _ from 'lodash'
import PinyinMatch from 'pinyin-match' 
import {Beidou_company} from '@/utils/constant'
import Sortable from 'sortablejs';
export default {
  components: {
    addOrEditCustomer,
    addOrEditContact,
    addOrEditVisitRecord,
    applyOrCancel,
    diyColumnSetting
  },
  data() {
    return {
      col:[],
      dropCol:[],
      colTemp:[{label: 'id', prop: 'id',width:80,align:"center",sortable:true,status:true},
          {label: '车队名称', prop: 'car_name',width:180,align:"center",sortable:true,status:true},
          {label: '区域', prop: 'region_str',width:100,align:"center",sortable:true,status:true},
          {label: '申领状态', prop: 'is_apply_str',width:110,align:"center",sortable:true,status:true},
          {label: '联系人', prop: 'contact_name',width:150,align:"center",sortable:true,status:true},
          {label: '联系电话', prop: 'contact_telephone',width:110,align:"center",sortable:true,status:true},
          {label: '跟进进度', prop: 'progress_str',width:110,align:"center",sortable:true,status:true},
          {label: '申领人', prop: 'applier',width:150,align:"center",sortable:true,status:true},
          {label: '合作销售', prop: 'cooperative_sale_name',width:150,align:"center",sortable:true,status:true},
          {label: '放箱销售', prop: 'box_sale_name',width:110,align:"center",sortable:true,status:true},
          {label: '北斗销售', prop: 'beidou_sale_name',width:110,align:"center",sortable:true,status:true},
          {label: '开票销售', prop: 'order_sale_name',width:150,align:"center",sortable:true,status:true},
          {label: '最近跟进时间', prop: 'followup_time',width:160,align:"center",sortable:true,status:true},
          {label: '最近跟进内容', prop: 'visit_record',width:110,align:"center",sortable:true,status:true},
          {label: '最近跟进人', prop: 'last_visit_user_name',width:110,align:"center",sortable:true,status:true},
          {label: '地址', prop: 'address',width:180,align:"center",sortable:true,status:true},
          {label: '客户类型', prop: 'type_str',width:110,align:"center" ,sortable:true,status:true},
          {label: '是否绑定北斗', prop: 'is_big_dipper_str',width:130,align:"center" ,sortable:true,status:true},
          {label: '介绍人', prop: 'introducer',width:110,align:"center" ,sortable:true,status:true},
          {label: '创建人', prop: 'create_user_name',width:110,align:"center",sortable:true ,status:true},
          {label: '委托时间', prop: 'appoint_time',width:160,align:"center",sortable:true ,status:true},
          {label: '委托人', prop: 'appoint_user_name',width:110,align:"center" ,sortable:true,status:true},
          {label: '自定义字段1', prop: 'diy_field1',width:125,align:"center",sortable:true ,status:true},
          {label: '自定义字段2', prop: 'diy_field2',width:125,align:"center",sortable:true ,status:true},
          {label: '自定义字段3', prop: 'diy_field3',width:125,align:"center" ,sortable:true,status:true},
          {label: '公司抬头', prop: 'rise',width:110,align:"center" ,sortable:true,status:true},
          {label: '组织代码', prop: 'car_id',width:110,align:"center" ,sortable:true,status:true},
          {label: '主账号', prop: 'main_account',width:110,align:"center",sortable:true ,status:true},
          {label: '会员等级', prop: 'group_name',width:180,align:"center" ,sortable:true,status:true},
          {label: '注册时间', prop: 'add_time',width:160,align:"center" ,sortable:true,status:true},
          {label: '付费时间', prop: 'pay_time',width:160,align:"center" ,sortable:true,status:true},
          {label: '到期时间', prop: 'expiry_time',width:160,align:"center" ,sortable:true,status:true},
          {label: '进口放箱公司', prop: 'box_in_name',width:300,align:"center",sortable:false,status:true},
          {label: '出口放箱公司', prop: 'box_out_name',width:300,align:"center",sortable:false,status:true},
          {label: '北斗公司', prop: 'beidou_str',width:160,align:"center",sortable:true,status:true},
          ],
      customerTableLoading: false,
      editCustomerLoading: false,
      contactListLoading: false,
      visitRecordListLoading: false,
      operationLogListLoading: false,
      admin_id: 0,
      nav_group_id: 0,
      group_name: '',
      my_push_admin: [],
      lastVisitStartEndDateTimeTemp: [],
      registerStartEndDateTimeTemp:[],
      payStartEndDateTimeTemp:[],
      expiryStartEndDateTimeTemp:[],
      searchRequest: {
        sortField:'',
        sortOrder:'',
        salemanId: [],
        is_apply: '',
        car_name: '',
        car_id:'',
        applier: [],
        cooperative_sale:'',
        box_sale:'',
        beidou_sale:'',
        order_sale:'',
        contact_name: '',
        contact_telephone: '',
        lastVisitStartDateTime: '',
        lastVisitEndDateTime: '',
        lastVisitUser:'',
        registerStartDateTime:'',
        registerEndDateTime:'',
        payStartDateTime:'',
        payEndDateTime:'',
        expiryStartDateTime:'',
        expiryEndDateTime:'',
        progress: '',
        region: '',
        page: 1,
        limit: 10,
        pagetype: '',
        role: '',
        eir: '',
        is_big_dipper: '',
        introducer: '',
        type: '',
        level:'',
        appoint_user_id:'',
        address:'',
        rise:'',
        mainAccount:'',
        diy_field1:'',
        diy_field2:'',
        diy_field3:'',
        box_id_in:'',
        box_id_out:'',
        beidou:'',
        auth_group_id:'',
      },
      lastVisitUserSelect: [],
      applierSelect: [],
      appointUserSelect:[],
      progressSelect: [],
      regionSelect: [],
      typeSelect: [],
      levelSelect:[],
      visitTypeSelect:[],
      inBoxCompanySelect:[],
      outBoxCompanySelect:[],
      boxCompanySelectTemp:[],
      groupNameSelect:[],
      Beidoucompany: Beidou_company,
      is_applySelect: [
        {
          value: 0,
          label: '未申领'
        },
        {
          value: 1,
          label: '已申领'
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      tableData: [],
      totalCount: 0,
      addInternationalCustomerDialog: false,
      editCustomerDrawer: false,
      activeName: '1',
      drawTitle: '',
      editCustomerId: 0,
      contactList: [],
      addOrEditContactDialog: false,
      contactDialogTitle: '',
      addOrEditVisitRecordDialog: false,
      visitRecordDialogTitle: '',
      editContactId: 0,
      visitRecordList: [],
      operationLogList: [],
      editVisitRecordId: 0,
      multipleSelection: [],
      addCustomerButtonTitle: false,
      createUserColumn: false,
      applyOrCancelDialogTitle: '',
      applyOrCancelDialog: false,
      batchAlterDiyFieldDialog: false,
      applyOrCancelCustomerId: '',
      applyOrCancelApplier: '',
      applyOrCancelOperationType: '',
      applyOrCancelPreserveButton: false,
      fileList: [],
      uploadUrl: `${CRM_API}/crm/importCustomerExcel`,
      importCustomerDialog: false,
      importPercentage: 0,
      importReturnData: {},
      importFailMsg: '',
      userRegion:[],
      exportCustomerPopoverVisible:false,
      diyColumnSettingDialog:false,
      diableExportCustomerButton:false,
      inputBatchDiyFieldDisabled1:true,
      inputBatchDiyFieldDisabled2:true,
      inputBatchDiyFieldDisabled3:true,
      batchAlterDiyField:{
        checkedBatchDiyField1:false,
        checkedBatchDiyField2:false,
        checkedBatchDiyField3:false,
        inputBatchDiyField1:'',
        inputBatchDiyField2:'',
        inputBatchDiyField3:'',
      },
      activeNames: [],
      goEasy: false
    }
  },
  computed: {
  },
  created() {
    this.customerTableLoading = true;
    this.searchRequest.pagetype = this.getPagetype();
    // this.searchRequest.pagetype = toInteger(this.getQueryVariable('pagetype'))
    if (localStorage.getItem('userInfo') != null) {
      var userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.admin_id = userInfo.admin_id
      this.nav_group_id = userInfo.nav_group_id
      this.group_name = userInfo.group_name
      this.userRegion = [];
      if(userInfo.region!=null){
        this.userRegion = userInfo.region;
      }
      if (userInfo.my_push_admin == null || userInfo.my_push_admin == '') {
        this.my_push_admin = []
      } else {
        this.my_push_admin = userInfo.my_push_admin.split(',')
      }
      this.publicOrPrivateControl()
      if (this.searchRequest.pagetype == 1) {
        this.searchRequest.role = this.group_name
        // 公海
        if (this.group_name === '销售') {
          // 销售
          this.searchRequest.salemanId.push(this.admin_id)
          this.loadTable()
        } else if (this.group_name == '销售主管') {
          // 销售主管
          this.searchRequest.salemanId.push(this.admin_id)
          this.getSalemanIdsBySaleManagerId().then((res) => {
            this.loadTable()
          })
        } else {
          // 运营和系统管理 全部
          this.loadTable()
        }
      } else {
        // 私海
        this.searchRequest.salemanId.push(this.admin_id)
        this.loadTable()
      }
    }

    var columnConfig = '';
    if(this.searchRequest.pagetype==1){
      columnConfig = localStorage.getItem('publicCustomerList');
      if(columnConfig==null||columnConfig==''){
        columnConfig = this.colTemp;
        localStorage.setItem('publicCustomerList',JSON.stringify(columnConfig));
      }else{
        columnConfig = JSON.parse(columnConfig);
      }
    }else if(this.searchRequest.pagetype==2){
      columnConfig = localStorage.getItem('privateCustomerList');
      if(columnConfig==null||columnConfig==''){
        columnConfig = this.colTemp;
        localStorage.setItem('privateCustomerList',JSON.stringify(columnConfig));
      }else{
        columnConfig = JSON.parse(columnConfig);
      }
    }
    var reStorage = false;
    columnConfig.forEach(element=>{
      if(element.prop=='box_in_name'||element.prop=='box_out_name'){
        if(element.sortable){
          reStorage = true;
          element.sortable = false;
        }
      }
    });
    if(reStorage){
      if(this.searchRequest.pagetype==1){
        localStorage.setItem('publicCustomerList',JSON.stringify(columnConfig));
      }else if(this.searchRequest.pagetype==2){
        localStorage.setItem('privateCustomerList',JSON.stringify(columnConfig));
      }
    }
    this.dropCol.push(...columnConfig);
    this.col.push(...columnConfig);

    this.querySaleManagerMotionUserSelect();
    this.getCreateUserSelect()
    this.queryAdminByRegion()
    this.getRegionSelectByEnum()
    this.getProgressSelect()
    this.getTypeSelect()
    this.getBoxCompanySelect();
    this.queryGroupNameSelect();
    this.getLevelSelect();
  },
  mounted(){
    this.columnDrop();
  },
  methods: {
    // handleHeaderDragend(newWidth, oldWidth, column, event){
    //   this.col.forEach(element=>{
    //     if(element.prop==column.property){
    //       element.width = newWidth;
    //     }
    //   })
    //   this.dropCol.forEach(element=>{
    //     if(element.prop==column.property){
    //       element.width = newWidth;
    //     }
    //   })
    //   var columnConfig = '';
    //   if(this.searchRequest.pagetype==1){
    //     columnConfig = localStorage.getItem('publicCustomerList',JSON.stringify(this.dropCol));
    //   }else if(this.searchRequest.pagetype==2){
    //     columnConfig = localStorage.getItem('privateCustomerList',JSON.stringify(this.dropCol));
    //   }

    //   columnConfig = JSON.parse(columnConfig);

    //   columnConfig.forEach(element=>{
    //     if(element.prop==column.property){
    //       element.width = newWidth;
    //     }
    //   })

    //   if(this.searchRequest.pagetype==1){
    //     localStorage.setItem('publicCustomerList',JSON.stringify(this.dropCol));
    //   }else if(this.searchRequest.pagetype==2){
    //     localStorage.setItem('privateCustomerList',JSON.stringify(this.dropCol));
    //   }
    // },
    queryAdminByRegion(){
      var self = this
      request({
        method: 'post',
        url: `${CRM_API}/crm/queryAdminByRegion`,
        data: {userRegion:self.userRegion}
      })
        .then((res) => {
          self.lastVisitUserSelect = res.data
        })
        .catch((res) => {})
    },
    handleRowContextMenu(row, column, event){
      event.preventDefault();
      if(this.multipleSelection.indexOf(row.id)==-1){
        this.$refs.multipleTable.toggleRowSelection(row,true);
      }else{
        this.$refs.multipleTable.toggleRowSelection(row,false);
      }
    },
    handleRowDblClick(row, column, event){
      event.preventDefault();
      this.openEditCustomerDrawer(row.id, row.car_name);
    },
    resettingColumn(){
      this.$refs.diyColumnSetting.resettingColumn();
    },
    confirmPreserveDiyColumnSetting(){
      this.$refs.diyColumnSetting.preserveColumnConfig();
    },
    openDiyColumnSettingDialog(){
        var columnConfig = '';
        if(this.pagetype==1){
          columnConfig = localStorage.getItem('publicCustomerList')
        }else if(this.pagetype==2){
          columnConfig = localStorage.getItem('privateCustomerList')
        }
        if(columnConfig==null||columnConfig==''){
          if(this.pagetype==1){
            localStorage.setItem('publicCustomerList',JSON.stringify(this.dropCol));
          }else if(this.pagetype==2){
            localStorage.setItem('privateCustomerList',JSON.stringify(this.dropCol));
          }
        }
        this.diyColumnSettingDialog = true;
    },
    closeDiyColumnSettingDialog(){
        this.diyColumnSettingDialog = false;
    },
    resettingSearch(){
      var sr = this.searchRequest;
      sr.is_apply = '';
      sr.car_name = '';
      sr.car_id = '';
      sr.applier = [];
      sr.cooperative_sale = '';
      sr.box_sale = '';
      sr.beidou_sale = '';
      sr.order_sale = '';
      sr.contact_name = '';
      sr.contact_telephone = '';
      sr.lastVisitStartDateTime = '';
      sr.lastVisitEndDateTime = '';
      sr.registerStartDateTime = '';
      sr.registerEndDateTime = '';
      sr.payStartDateTime = '';
      sr.payEndDateTime = '';
      sr.expiryStartDateTime = '';
      sr.expiryEndDateTime = '';
      sr.progress = '';
      sr.region = '';
      sr.role = '';
      sr.eir = '';
      sr.is_big_dipper = '';
      sr.introducer = '';
      sr.type = '';
      sr.level = '';
      sr.appoint_user_id = '';
      sr.address = '';
      sr.rise = '';
      sr.mainAccount = '';
      sr.diy_field1 = '';
      sr.diy_field2 = '';
      sr.diy_field3 = '';
      sr.box_id_in = '';
      sr.box_id_out = '';
      sr.beidou = '';
      sr.auth_group_id = '';
      this.lastVisitStartEndDateTimeTemp = [];
      this.registerStartEndDateTimeTemp = [];
      this.payStartEndDateTimeTemp = [];
      this.expiryStartEndDateTimeTemp = [];
    },
    columnDrop () {
        const wrapperTr = document.querySelector('.el-table__header-wrapper tr');
        this.sortable = Sortable.create(wrapperTr, {
            animation: 500,
            delay: 100,
            draggable: "th:not(.el-table-column--selection)", 
            onUpdate: evt=> {
            },
            onSort: evt=> {
            },
            onEnd: evt => {
              const oldItem = this.dropCol[evt.oldIndex-1];
              this.dropCol.splice(evt.oldIndex-1, 1);
              this.dropCol.splice(evt.newIndex-1, 0, oldItem);
              if(this.searchRequest.pagetype==1){
                localStorage.setItem('publicCustomerList',JSON.stringify(this.dropCol));
              }else if(this.searchRequest.pagetype==2){
                localStorage.setItem('privateCustomerList',JSON.stringify(this.dropCol));
              }
            }
        });
    },
    closedCustomerDrawer(){
      this.contactList = [];
      this.visitRecordList = [];
      this.operationLogList = [];
    },
    closeEditCustomerLoading(){
      this.editCustomerLoading = false;
    },
    getVisitTypeSelect(){
      var self = this;
      request({
        method: 'post',
        url: `${CRM_API}/crm/getVisitTypeSelect`,
        data: {}
      }).then(res=>{
        self.visitTypeSelect = res.data;
      }).catch(res=>{
      })
    },
    getLevelSelect(){
      var self = this;
      request({
        method: 'post',
        url: `${CRM_API}/crm/getLevelSelect`,
        data: {}
      }).then(res=>{
        self.levelSelect = res.data;
      }).catch(res=>{
      })
    },
    queryGroupNameSelect(){
      var self = this;
      request({
        method: 'post',
        url: `${CRM_API}/crm/queryGroupNameSelect`,
      })
      .then((res) => {
        self.groupNameSelect = res.data;
      })
      .catch((res) => {})
    },
    sortTableChange(columnObj){
      var order = columnObj.order;
      if(order==null){
        this.searchRequest.sortOrder = '';
        this.searchRequest.sortField = '';
      }else{
        var field = columnObj.prop;
        var reg = RegExp(/_str$/);
        this.searchRequest.sortField = field.replace(reg,"");
        if(order == 'descending'){
          this.searchRequest.sortOrder = 0;
        }else if(order == 'ascending'){
          this.searchRequest.sortOrder = 1;
        }
      }
      this.loadTable();
    },
    confirmBatchDeleteCustomer(){
      if(this.multipleSelection.length<=0){
         this.$message.warning("请至少选中一条客户数据再尝试")
         return;
      }
      if(this.group_name!='系统管理'&&this.group_name!='运营'&&this.group_name!='销售'&&this.group_name!='销售主管'){
        this.$message.warning("该账号角色无删除客户权限");
        return;
      }
      this.$confirm('此操作将永久删除选中的客户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.batchDeleteCustomer();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    batchDeleteCustomer(){
      if(this.multipleSelection.length<=0){
         this.$message.warning("请至少选中一条客户数据再尝试提交")
         return;
      }
      var requestData = {
        customerIds:this.multipleSelection,
        group_name:this.group_name
      }
      request({
        method: 'post',
        url: `${CRM_API}/crm/batchDeleteCustomer`,
        data:requestData
      })
      .then((res) => {
        this.loadTable();
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })
      .catch((res) => {})
    },
    confirmBatchAlterDiyField(){
      var self = this
      if(self.multipleSelection.length<=0){
        self.$message.warning("请至少选中一条客户数据再尝试提交");
        return;
      }
      if(!self.batchAlterDiyField.checkedBatchDiyField1&&!self.batchAlterDiyField.checkedBatchDiyField2&&!self.batchAlterDiyField.checkedBatchDiyField3){
        self.$message.warning("请至少选中一个自定义字段再尝试提交");
        return;
      }
      var requestData = self.batchAlterDiyField;
      requestData.customerIds = self.multipleSelection;
      request({
        method: 'post',
        url: `${CRM_API}/crm/batchAlterDiyFields`,
        data: requestData
      })
      .then((res) => {
        self.loadTable();
        self.batchAlterDiyFieldDialog = false;
        self.$message.success("批量修改成功！");
      })
      .catch((res) => {})
    },
    changeCheckedBatchDiyField1(val){
      this.inputBatchDiyField1 = '';
      if(val){
        this.inputBatchDiyFieldDisabled1 = false;
      }else{
        this.inputBatchDiyFieldDisabled1 = true;
      }
    },
    changeCheckedBatchDiyField2(val){
      this.inputBatchDiyField2 = '';
      if(val){
        this.inputBatchDiyFieldDisabled2 = false;
      }else{
        this.inputBatchDiyFieldDisabled2 = true;
      }
    },
    changeCheckedBatchDiyField3(val){
      this.inputBatchDiyField3 = '';
      if(val){
        this.inputBatchDiyFieldDisabled3 = false;
      }else{
        this.inputBatchDiyFieldDisabled3 = true;
      }
    },
    visibleInBoxCompanySelect(val){
      if(val){
        this.inBoxCompanySelect = this.boxCompanySelectTemp;
      }
    },
    visibleOutBoxCompanySelect(val){
      if(val){
        this.outBoxCompanySelect = this.boxCompanySelectTemp;
      }
    },
    handleFilterInBoxCompany(val){
      // 对绑定数据赋值
      if (val) {
        this.inBoxCompanySelect = this.boxCompanySelectTemp.filter((item) => {
          // 如果直接包含输入值直接返回true
          if (item.box_name) {
            if (item.box_name.toUpperCase().indexOf(val.toUpperCase()) != -1) {
              return true
            }
            // 输入值拼音d
            return PinyinMatch.match(item.box_name, val)
          }
        })
      } else {
        this.inBoxCompanySelect = this.boxCompanySelectTemp
      }
    },
    handleFilterOutBoxCompany(val){
      // 对绑定数据赋值
      if (val) {
        this.outBoxCompanySelect = this.boxCompanySelectTemp.filter((item) => {
          // 如果直接包含输入值直接返回true
          if (item.box_name) {
            if (item.box_name.toUpperCase().indexOf(val.toUpperCase()) != -1) {
              return true
            }
            // 输入值拼音d
            return PinyinMatch.match(item.box_name, val)
          }
        })
      } else {
        this.outBoxCompanySelect = this.boxCompanySelectTemp
      }
    },
    getBoxCompanySelect(){
      var self = this
      request({
        method: 'post',
        url: `${CRM_API}/crm/box/getBoxCompanySelect`,
        data: {}
      })
      .then((res) => {
        self.inBoxCompanySelect = res.data;
        self.outBoxCompanySelect = res.data;
        self.boxCompanySelectTemp = res.data;
      })
      .catch((res) => {})
    },
    tableRowStyle({ row, rowIndex }) {
      // 注意，这里返回的是一个对象
      let rowBackground = {};
      // if(row.car_id==null||row.car_id==''){
      //   return rowBackground;
      // }
      // if(row.expiry_time==null||row.expiry_time==''){
      //   rowBackground.background = "#dadce0";
      //   return rowBackground;
      // }
      if(row.expiry_time==null||row.expiry_time==''){
        return rowBackground;
      }
      var expiry_time= new Date(Date.parse(row.expiry_time.replace(/-/g,  "/")));
      var now = new Date();
      var time = expiry_time.getTime() - now.getTime();
      time = time/1000/60/60/24;
      if(time<=0){
        rowBackground.background = "#f7b8b8";
        return rowBackground;
      }else if(time>0&&time<=15){
        rowBackground.background = "#fadaab";
        return rowBackground;
      }else if(time>15&&time<=30){
        rowBackground.background = "#bfeba9";
        return rowBackground;
      }
    },
    exportCustomer(){
      var self = this
      if(self.group_name != '系统管理'&&self.group_name != '运营'){
        self.$message.warning("当前账号角色无导出客户权限");
        return;
      }
      self.diableExportCustomerButton = true;
      var requestData = self.searchRequest
      requestData.userRegion = self.userRegion
      axios({
        method: 'post',
        url: `${CRM_API}/crm/exportCustomerExcel`,
        data: requestData,
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          sk: this.$baseAccessToken()
        }
      })
        .then((res) => {
          var blob = new Blob([res.data], {
            type: 'application/octet-stream;charset=utf-8'
          })
          var downloadElement = document.createElement('a')
          var href = window.URL.createObjectURL(blob) // 创建下载的链接
          downloadElement.href = href
          downloadElement.download = '车队CRM客户导出表.xlsx' // 下载后文件名
          document.body.appendChild(downloadElement)
          downloadElement.click() // 点击下载
          document.body.removeChild(downloadElement) // 下载完成移除元素
          window.URL.revokeObjectURL(href) // 释放掉blob对象
        })
        .catch((res) => {})
    },
    cancelVif(id){
      if(this.group_name == "运营"){
        return true;
      }else if(this.my_push_admin.indexOf(String(id))>=0||this.admin_id == id){
        return true;
      }else{
        return false;
      }
    },
    getTypeSelect() {
      var self = this
      request({
        method: 'post',
        url: `${CRM_API}/crm/getTypeSelect`,
        data: {}
      })
        .then((res) => {
          self.typeSelect = res.data
        })
        .catch((res) => {})
    },
    clearImportMessage() {
      this.importPercentage = 0
      this.importReturnData = {}
      this.importFailMsg = ''
    },
    importCallback(res) {
      if (res.code == 200) {
        this.$message.success('上传导入完毕')
        this.importPercentage = 100
        this.loadTable()
        this.importReturnData = res.data
      } else {
        this.importFailMsg = res.msg
      }
    },
    downloadImportTemplate() {
      var self = this
      axios({
        method: 'post',
        url: `${CRM_API}/crm/getImportCustomerExcelTemplate`,
        data: {},
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          sk: this.$baseAccessToken()
        }
      })
        .then((res) => {
          var blob = new Blob([res.data], {
            type: 'application/octet-stream;charset=utf-8'
          })
          var downloadElement = document.createElement('a')
          var href = window.URL.createObjectURL(blob) // 创建下载的链接
          downloadElement.href = href
          downloadElement.download = '导入客户Excel模板.xlsx' // 下载后文件名
          document.body.appendChild(downloadElement)
          downloadElement.click() // 点击下载
          document.body.removeChild(downloadElement) // 下载完成移除元素
          window.URL.revokeObjectURL(href) // 释放掉blob对象
        })
        .catch((res) => {})
    },
    openImportCustomerDialog() {
      if(this.searchRequest.pagetype==2){
        if(this.group_name!='销售'&&this.group_name!='销售主管'){
          this.$message.warning("私海仅支持销售及销售主管导入客户数据");
          return;
        }
      }
      this.importCustomerDialog = true
      this.importPercentage = 0
      this.importReturnData = {}
      this.importFailMsg = ''
    },
    openBatchAlterDiyFieldDialog(){
      if(this.multipleSelection.length<=0){
        this.$message.warning("请至少选中一条客户数据再尝试");
        return;
      }
      this.batchAlterDiyFieldDialog = true;
      this.batchAlterDiyField.checkedBatchDiyField1 = false;
      this.batchAlterDiyField.checkedBatchDiyField2 = false;
      this.batchAlterDiyField.checkedBatchDiyField3 = false;
      this.batchAlterDiyField.inputBatchDiyField1 = '';
      this.batchAlterDiyField.inputBatchDiyField2 = '';
      this.batchAlterDiyField.inputBatchDiyField3 = '';
      this.inputBatchDiyFieldDisabled1 = true;
      this.inputBatchDiyFieldDisabled2 = true;
      this.inputBatchDiyFieldDisabled3 = true;
    },
    getOperationLogByCustomerId() {
      var self = this
      self.operationLogListLoading = true;
      request({
        method: 'post',
        url: `${CRM_API}/crm/getOperationLogByCustomerId`,
        data: {
          customer_id: this.editCustomerId
        }
      })
        .then((res) => {
          self.operationLogList = res.data  
          self.operationLogListLoading = false;
        })
        .catch((res) => {})
    },
    closeApplyOrCancelDialog() {
      this.applyOrCancelDialog = false
    },
    prohibitApplyOrCancelPreserveButton() {
      this.applyOrCancelPreserveButton = true
    },
    renewApplyOrCancelPreserveButton() {
      this.applyOrCancelPreserveButton = false
    },
    applyOrCancelClick() {
      if (this.applyOrCancelOperationType == 0) {
        // 申领
        this.$refs.applyOrCancel.apply()
      } else {
        // 取消申领
        this.$refs.applyOrCancel.cancelApply()
      }
    },
    publicOrPrivateControl() {
      if (this.searchRequest.pagetype == 1) {
        // 公海逻辑
        this.addCustomerButtonTitle = '新增公海客户'
        this.createUserColumn = true
      } else {
        // 私海逻辑
        this.addCustomerButtonTitle = '新增私海客户'
        this.createUserColumn = false
      }
    },
    handleSelectionChange(val){
      var self = this;
      self.multipleSelection = [];
      val.forEach(element => {
        self.multipleSelection.push(element.id);
      });
    },
    applyOrCancelConfirm(id, applier, operationType) {
      if (operationType == 0) {
        this.applyOrCancelDialogTitle = '申领'
      } else {
        this.applyOrCancelDialogTitle = '放弃'
      }
      this.applyOrCancelCustomerId = id
      this.applyOrCancelApplier = applier
      this.applyOrCancelOperationType = operationType
      this.applyOrCancelDialog = true
    },
    updateStatusToApplied(id) {
      var self = this
      request({
        method: 'post',
        url: `${CRM_API}/crm/updateStatusToApplied`,
        data: {
          id: id,
          applier: self.admin_id
        }
      })
        .then((res) => {
          this.$message({
            type: 'success',
            message: '申领成功!'
          })
          self.loadTable()
        })
        .catch((res) => {})
    },
    getSalemanIdsBySaleManagerId() {
      var self = this
      return new Promise(function(resolve, reject) {
        request({
          method: 'post',
          url: `${CRM_API}/crm/getSalemanIdsBySaleManagerId`,
          data: {
            admin_id: self.admin_id
          }
        })
          .then((res) => {
            self.searchRequest.salemanId.push(...res.data)
            resolve()
          })
          .catch((res) => {})
      })
    },
    closeVisitRecordList() {
      this.addOrEditVisitRecordDialog = false
    },
    preserveVisitRecord() {
      this.$refs.addOrEditVisitRecord.preserveVisitRecord()
    },
    closeContactDialog() {
      this.addOrEditContactDialog = false
    },
    preserveContact() {
      this.$refs.addOrEditContact.preserveContact()
    },
    openEditContactDialog(id) {
      this.addOrEditContactDialog = true
      this.contactDialogTitle = '编辑联系人'
      this.editContactId = id
    },
    openAddVisitRecordDialog() {
      if(this.visitTypeSelect.length==0){
        this.getVisitTypeSelect();
      }
      this.addOrEditVisitRecordDialog = true
      this.visitRecordDialogTitle = '新建跟进'
      this.editVisitRecordId = 0
    },
    openEditVisitRecordDialog(id) {
      if(this.visitTypeSelect.length==0){
        this.getVisitTypeSelect();
      }
      this.addOrEditVisitRecordDialog = true
      this.visitRecordDialogTitle = '编辑跟进'
      this.editVisitRecordId = id
    },
    openAddContactDialog() {
      this.addOrEditContactDialog = true
      this.contactDialogTitle = '新建联系人'
      this.editContactId = 0
    },
    getVisitRecordListByCustomerId() {
      var self = this
      self.visitRecordListLoading = true;
      request({
        method: 'post',
        url: `${CRM_API}/crm/getVisitRecordListByCustomerId`,
        data: {
          customer_id: this.editCustomerId
        }
      })
        .then((res) => {
          self.visitRecordList = res.data;
          self.visitRecordListLoading = false;
        })
        .catch((res) => {})
    },
    getContactList() {
      var self = this
      self.contactListLoading = true;
      request({
        method: 'post',
        url: `${CRM_API}/crm/getContactListByCustomerId`,
        data: {
          customer_id: this.editCustomerId
        }
      })
        .then((res) => {
          self.contactList = res.data
          self.contactListLoading = false;
        })
        .catch((res) => {})
    },
    closeEditCustomerDrawer() {
      this.editCustomerDrawer = false
    },
    closeAddCustomerDislog() {
      this.addInternationalCustomerDialog = false
    },
    preserveEditCustomer() {
      this.$refs.editCustomer.preserveEditCustomer()
    },
    preserveAddCustomer() {
      this.$refs.addCustomer.preserveAddCustomer()
    },
    openEditCustomerDrawer(id, car_name) {
      this.editCustomerDrawer = true
      this.drawTitle = car_name
      this.editCustomerId = id
      this.activeName = '1'
    },
    changeLastVisitStartEndTime(val) { 
      if (val != null) {
        this.searchRequest.lastVisitStartDateTime = val[0]
        this.searchRequest.lastVisitEndDateTime = val[1]
      } else {
        this.searchRequest.lastVisitStartDateTime = ''
        this.searchRequest.lastVisitEndDateTime = ''
      }
    },
    changeRegisterStartEndTime(val){
      if (val != null) {
        this.searchRequest.registerStartDateTime = val[0]
        this.searchRequest.registerEndDateTime = val[1]
      } else {
        this.searchRequest.registerStartDateTime = ''
        this.searchRequest.registerEndDateTime = ''
      }
    },
    changePayStartEndTime(val){
      if (val != null) {
        this.searchRequest.payStartDateTime = val[0]
        this.searchRequest.payEndDateTime = val[1]
      } else {
        this.searchRequest.payStartDateTime = ''
        this.searchRequest.payEndDateTime = ''
      }
    },
    changeExpiryStartEndTime(val){
      if (val != null) {
        this.searchRequest.expiryStartDateTime = val[0]
        this.searchRequest.expiryEndDateTime = val[1]
      } else {
        this.searchRequest.expiryStartDateTime = ''
        this.searchRequest.expiryEndDateTime = ''
      }
    },
    getRegionSelectByEnum() {
      var self = this
      request({
        method: 'post',
        url: `${CRM_API}/crm/getRegionSelectByEnum`,
        data: {userRegion:self.userRegion}
      })
        .then((res) => {
          self.regionSelect = res.data
        })
        .catch((res) => {})
    },
    getProgressSelect() {
      var self = this
      request({
        method: 'post',
        url: `${CRM_API}/crm/getProgressSelect`,
        data: {}
      })
        .then((res) => {
          self.progressSelect = res.data
        })
        .catch((res) => {})
    },
    getCreateUserSelect() {
      var self = this
      request({
        method: 'post',
        url: `${CRM_API}/crm/getCreateUserSelect`,
        data: {userRegion:self.userRegion}
      })
      .then((res) => {
        self.applierSelect = res.data
      })
      .catch((res) => {})
    },
    querySaleManagerMotionUserSelect(){
      var self = this;
      request({
        method: 'post',
        url: `${CRM_API}/crm/querySaleManagerMotionUserSelect`,
        data: {}
      })
      .then((res) => {
        self.appointUserSelect = res.data
      })
      .catch((res) => {})
    },
    loadTable() {
      var self = this
      self.customerTableLoading = true;
      var requestData = self.searchRequest
      requestData.userRegion = self.userRegion
      request({
        url: `${CRM_API}/crm/getCustomerList`,
        method: 'post',
        data: requestData
      }).then((res)=>{
        res.data.forEach(tableElement=>{
          if(tableElement.beidou!=undefined&&tableElement.beidou!=null&&tableElement.beidou!=''){
            self.Beidoucompany.forEach(beidouElement=>{
              if(beidouElement.value==tableElement.beidou){
                tableElement.beidou_str = beidouElement.label;
              }
            })
          }else{
            tableElement.beidou_str = '';
          }
        })
        self.tableData = res.data
        self.totalCount = res.count
        self.customerTableLoading = false;
        this.goEasy = false
      })
    },
    search() {
      this.activeNames = [];
      this.searchRequest.page = 1
      this.loadTable()
      this.goEasy = true
    },
    addInternationalCustomer() {
      this.addInternationalCustomerDialog = true
    },
    handleClick(tab) {
      var tabname = tab.name;
      switch(tabname) {
          case "1":
              this.$refs["editCustomer"].getCustomerById();
              break;
          case "2":
              this.contactListLoading = true;
              this.getContactList()
              break;
          case "3":
              this.visitRecordListLoading = true;
              this.getVisitRecordListByCustomerId()
              break;
          case "4":
              this.operationLogListLoading = true;
              this.getOperationLogByCustomerId()
              break;
      }
    },
    handleSizeChange(val) {
      this.searchRequest.limit = val
      this.loadTable()
    },
    handleCurrentChange(val) {
      this.searchRequest.page = val
      this.loadTable()
    },
    getQueryVariable(variable) {
      if (location.href.indexOf('?') > 0) {
        var query = location.href.split('?')[1]
        var vars = query.split('&')
        for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split('=')
          if (pair[0] == variable) {
            return pair[1]
          }
        }
        return false
      }
      return false
    },
    getPagetype(){
      var url = window.location.href;
      var i = url.lastIndexOf('/');
      var pagename = url.substring(i+1);
      var j = pagename.indexOf('?');
      if(j!=-1){
        pagename = pagename.substring(0,j);
      }
      if(pagename=='publicCustomerList'){
        return 1;
      }else if(pagename=='privateCustomerList'){
        return 2;
      }
    },
  }
}
</script>

<style type="text/css">
ul{margin:0;padding:0;list-style:none;}
.table{display:table;border-collapse:collapse;border:1px solid #ccc;}
.table-caption{display:table-caption;margin:0;padding:0;font-size:16px;}
.table-column-group{display:table-column-group;}
.table-column{display:table-column;width:150px;}
.table-row-group{display:table-row-group;text-align: center;}
.table-row{display:table-row;}
.table-row-group .table-row:hover,.table-footer-group .table-row:hover{background:#f6f6f6;}
.table-cell{display:table-cell;padding:0 5px;border:1px solid #ccc;}
.table-header-group{display:table-header-group;background:#ffffff;font-weight:bold;text-align: center;}
.table-footer-group{display:table-footer-group;}

.dot {
/*  position: absolute; */
  top: 50%;
  margin-left: -5px;
  margin-top: -5px;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background: #ffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .2);
}

.el-icon-info:hover{
  color:#409EFF;
}

.el-collapse-item__header{
  color: #409eff;
}

.overLengthLineFeed {
  width: 100%;
  word-wrap: break-word;
  word-break: all;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.outer {
  margin-left: 30px;
  margin-top: 20px;
}

.el-range-editor--small .el-range-separator {
  margin-top: 7px;
}

.el-range-editor--small .el-range__close-icon,
.el-range-editor--small .el-range__icon {
  margin-top: 4px;
}

.inputFrame {
  width: 165px;
}

.pagination {
  text-align: center;
  margin-top: 20px;
}

.inputForm {
  width: 275px;
}

.addCustomerButton {
  width: 100px;
}

.editCustomerDrawer .el-drawer__header {
  border: 0px;
  font-size: 35px;
}

.editCustomerTag {
  width: 800px;
  float: left;
  margin-left: 10px;
}

.editCustomerTagPage {
  max-width: 750px;
}

.addContactAndFollowUp {
  margin-top: 55px;
  width: 100;
  height: 100px;
  float: left;
}

.basicMessageButton {
  float: right;
  /* padding-right: 35px; */
  padding-top: 25px;
  padding-bottom: 30px;
}

 /* .cardContent {
    margin-top: 10px;
  } */

.box-card {
  background-color: #f5f5dd;
}

.box-cardMain{
  background-color: #d7f7f0;
}

.contact {
  min-height: 80px;
}

.visitRecord {
  min-height: 80px;
}

.boldItem .el-form-item__label {
  font-weight: 900;
}

.boldItem{
  font-weight: 900;
}

.el-upload-list {
  display: none;
}

.diyColumnSetting .el-loading-spinner{
  top: 20%;
}
</style>
