<template>
  <div class="public" id="public">
    <div class="public-left" id="public-left">
      左侧机构树
      <!-- <MyTreeList :nodeList="nodeList" /> -->
    </div>
    <div title="收缩侧边栏" class="bk_resize" id="bk_resize" ><span>⋮</span></div>
    <div class="public-right" id="public-right">
      <div class="public-tab">
        <MyTabs :tabList="tabList" />
      </div>
      <div class="public-search">
        <el-form :model="formData" status-icon :rules="rules" ref="form" :inline="true" label-width="100px" class="demo-ruleForm">
          <el-form-item size="small" label="年份" prop="year">
            <el-select filterable v-model="formData.year" placeholder="请选择年份">
              <el-option v-for="(item) in params.yearList" :key="item.value" :label="`${item.label}`" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="small" label="关区代码" prop="customsCode">
              <el-select filterable v-model="formData.customsCode" placeholder="请选择关区代码" @change="handleChgCustomsCode">
                <el-option v-for="(item,index) in params.customsCodeList" :key="index" :label="`(${item.customsCode})${item.customsName}`" :value="item.customsCode"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item size="small" label="查验场地代码" prop="chkPlaceCode">
            <el-select filterable clearable v-model="formData.chkPlaceCode" placeholder="请选择查验场地代码" @change="handleChgChkPlaceCode">
              <el-option v-for="(item,index) in params.chkPlaceCodeList" :key="index" :label="`(${item.chkPlaceCode})${item.chkPlaceName}`" :value="item.chkPlaceCode"></el-option>
            </el-select>
          </el-form-item>
            <el-button type="primary" size="small" @click="handleSearch" style="margin-left: 20px;">查询</el-button>
            <el-button type="primary" size="small" @click="handleReset">重置</el-button>
        </el-form>
      </div>
      <div class="public-btn">
        <el-button>新增</el-button>
        <el-button>修改</el-button>
        <el-button>显示设置</el-button>
      </div>
      <div class="public-table">
        <el-table :data="tableList" empty-text="没有符合条件的数据" border stripe height="480" @row-click="tableClick" @selection-change="handleSelectionChange">
          <el-table-column type="selection" align="center" width="50"></el-table-column>
          <el-table-column type="index" align="center"  width="60" label="序号"></el-table-column>
          <el-table-column prop="itemName" width="300px" show-overflow-tooltip align="center" label="字段名称"></el-table-column>
          <el-table-column prop="remark" show-overflow-tooltip  align="center" label="描述"></el-table-column>
        </el-table>
      </div>
      <div class="public-page">
        <MyPagination />
      </div>
    </div>
  </div>
</template>
<script>
// import MyTreeList from '@/components/MyTreeList/MyTreeList'
import MyTabs from '@/components/MyTabs/index'
import MyPagination from '@/components/MyPagination/index'
import changeLeftMenuSize from '@/mixins/changeLeftMenuSize'
export default {
  name: 'treeListTable',
  mixins: [changeLeftMenuSize],
  components: { MyTabs, MyPagination },
  data () {
    return {
      nodeList: [],
      tabList: [{active: 1, name: '部门概括'}, {active: 2, name: '机构管理'}],
      rules: {
        customsCode: [
          { required: true, message: '请选择关区代码', trigger: 'change' }
        ],
        year: [{ required: true, message: '请选择年份', trigger: 'change' }]
      },
      formData: {
        customsCode: '',
        chkPlaceCode: '',
        year: ''
      },
      params: {
        yearList: [],
        customsCodeList: [],
        chkPlaceCodeList: []
      },
      dataList: [],
      tableLoading: false
    }
  },
  methods: {
    handleSearch () {

    },
    handleReset() {

    },
    tableClick (val) {

    }
  }
}
</script>
<style lang="less" scoped>
</style>
