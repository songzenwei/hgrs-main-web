<!-- 列表项个性设置 -->
<template>
  <el-dialog title="列表项设置" :visible.sync="setColumnVisible" :close-on-click-modal="false" width="800px" :before-close="handleClose" append-to-body>
    <div class="setColum">
      <el-row style="text-align: right;">
        <el-button type="text" size="mini" @click="handleRestoreDefault">恢复默认</el-button>
      </el-row>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <el-checkbox-group v-model="checkList">
      <el-checkbox :label="item" v-for="item in tableList" :disabled="item.type !== '' || item.prop === 'a0101' || item.prop === 'a0107' || item.prop === 'a0104' || item.prop === 'a01f22'" :key="item.prop" :title="item.label">{{ item.label }}</el-checkbox>
    </el-checkbox-group>
    </div>
    <div class="public_btn">
      <el-button type="primary" size="mini" @click="handleSava">确 定</el-button>
      <el-button  size="mini" @click="handleClose">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { handleConfirm } from '@/utils/confirm'
export default {
  name: 'SetColumnList',
  data () {
    return {
      checkAll: false,
      checkList: [],
      loading: false,
      isIndeterminate: true

    }
  },
  props: {
    setColumnVisible: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    tableList: {
      type: Array,
      default: () => {
        return []
      }
    },
    isShowItem: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  created () {
    this.isShowItem.forEach(element => {
      this.tableList.forEach(item => {
        if (element.prop === item.prop) {
          this.checkList.push(item)
        }
      })
    })
  },
  mounted () {
  },
  methods: {
    handleClose () {
      this.$emit('closeSetColumn')
    },
    handleSava () {
      this.$emit('sendMsg', this.checkList)
    },
    handleCancel () {},
    handleCheckAllChange (val) {
      this.checkList = val ? this.tableList : [...this.tableList.slice(0, 4)]
      this.isIndeterminate = false
    },
    handleCheckedChange (value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.tableList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.tableList.length
    },
    handleRestoreDefault () {
      handleConfirm('您确定恢复默认表头数据吗?').then(() => {
        this.$emit('restore')
      })
    }
  }
}
</script>

<style lang="less">
.setColum  {
  padding: 0 10px;
  .el-checkbox__label {
    width: 200px;
    overflow: hidden;
    line-height: 13px;
  }
  .el-checkbox {
    margin-bottom: 15px;
  }
}
</style>
