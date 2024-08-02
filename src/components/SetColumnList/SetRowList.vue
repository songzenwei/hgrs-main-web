<!-- 列表排序 -->
<template>
  <el-dialog :modal="false" title="列表排序" :visible.sync="codeSortVisible" row-key="id" :close-on-click-modal="false" width="1000px" :before-close="handleClose" class="setRowList-dialog">
    <el-row class="flex-center">
      <el-button type="primary" plain size="small" @click="handlerChangeSort('top')">置顶</el-button>
      <el-button type="primary" plain size="small" @click="handlerChangeSort('bottom')">置底</el-button>
      <el-button type="primary" plain size="small" @click="handlerChangeSort('up')">上移</el-button>
      <el-button type="primary" plain size="small" @click="handlerChangeSort('down')">下移</el-button>
      <el-input v-model="input" type='number' placeholder="请输入跳转到" size="small" class="input">
        <el-button slot="append" @click="handlerChangeSort('jump')">前往</el-button>
      </el-input>
    </el-row>
    <div class="sortTableList" id="sortTableList">
      <div style="display: none"> {{copyTable}}</div>
      <el-table :data="tableList" v-loading="loading" border id="mytable" height="600" :row-class-name="tableRowClassName" stripe>
        <!-- <el-table-column type="selection" fixed="left" align="center"></el-table-column> -->
        <el-table-column align="center" width="60">
          <template slot-scope="scope">
            <el-radio :label="scope.row.id" v-model="templateRadio" class="setRowList-radio" @change.native="handleGetTemplateRow(scope)">{{''}}</el-radio>
          </template>
        </el-table-column>
        <el-table-column type="index" prop="" align="center"  width="100" label="序号"></el-table-column>
        <el-table-column
          v-for="item in columnLists"
          :key="`col_${item.prop}`"
          class-name="allow"
          show-overflow-tooltip
          :type="item.type"
          :prop="item.prop"
          align="center"
          :label="item.label"
          :width="item.width">
          <template slot-scope="{row}">
            {{ item.tranSlate ? handleTranslateData(item, row) : row[item.prop]}}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
import Sortable from 'sortablejs'
import tableTranslation from '@/mixins/tableTranslation' // 表格翻译

export default {
  name: 'CodeSortListDialog',
  mixins: [tableTranslation],
  data () {
    return {
      copyTable: [],
      tableList: [],
      radioData: {},
      input: '',
      templateRadio: '',
      currentSelectIndex: '',
      toFixed: '',
      indexList: [],
      paramsList: ['GB_T_3304_1991', 'GB_T_2261.2_2003', 'XX', 'ZJLB', 'ZJCC', 'DL', 'DW', 'DX', 'XZQH', 'C3', 'DK', 'C1', 'S1', 'CJ', 'DJ2', 'ZNLX', 'Z2', 'Z3', 'YY', 'F2', 'F1', 'LL',
        'CP', 'S3', 'CW', 'H1', 'H2', 'XB', 'JW', 'RYDJ', 'XT', 'GZBDYY', 'WO', 'TF', 'CF', 'AA', 'AI', 'ZJ', 'L8', 'HI', 'BD', 'a09FromType', 'a09State', 'a09Status',
        'SYDWZYJSGWDJ', 'YJ', 'NW', 'G1', 'ZB122', 'IQ', 'MY', 'BF', 'GB_T_2659_2000', 'GB_T_4658_2006', 'CX', 'ZX', 'XW', 'YX',
        'W2', 'WY', 'MD', 'XI', 'CB', 'Y4', 'Y2', 'GB_T_6864_2003', 'EI', 'BZJLLB', 'GRJL', 'AQ', 'CY', 'DC', 'R1', 'LS', 'CG', 'GU',
        'GJ', 'FR', 'W6', 'DB', 'DQ', 'XY', 'NY', 'GB_T_4761_2008', 'GB_T_4762_1984', 'YB', 'YR', 'KNZL', 'JKZK', 'WV', 'ZWBDLB', 'MZYY',
        'JB', 'AR', 'CL', 'YC', 'BJ', 'NWPZT', 'SSDZ', 'NWPDW', 'NWPDM', 'FC', 'CZ', 'DP', 'YS', 'sb_hdzgtj', 'TCXGYY', 'GRJSDJ', 'DG', 'ZJRCFJLB',
        'JWJSRZZGQDFS', 'YDXM', 'CPYWYCD', 'UX', 'GJRCLB', 'JXJD', 'JDNJ', 'SXXQ', 'YDCS', 'GAYXMC', 'RG', 'PXXS', 'BE', 'RWLX', 'DDLX', 'CQJC', 'SYDWGWDJ', 'HI', 'ZU', 'YXQ', 'YJQK']
    }
  },
  props: {
    codeSortVisible: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    },
    columnLists: {
      type: Array,
      default: () => {
        return []
      }
    },
    rowLoading: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  computed: {
    loading () {
      return this.rowLoading
    }
  },
  watch: {
    dataList: {
      handler (current, prev) {
        this.tableList = JSON.parse(JSON.stringify(this.dataList))
        this.copyTable = JSON.parse(JSON.stringify(this.dataList))
        if (typeof this.toFixed === 'number' && this.toFixed >= 0) {
          this.tableList = this.tableList.map((item, index) => {
            const moved = index === this.toFixed
            return {
              ...item,
              moved
            }
          })
          this.templateRadio = ''
          this.radioData = {}
          this.input = ''
          this.currentSelectIndex = ''
        }
      },
      deep: true,
      immediate: true
    }
  },
  created () {
  },
  mounted () {
    this.rowDrop()
    this.tableList = JSON.parse(JSON.stringify(this.dataList))
    this.copyTable = JSON.parse(JSON.stringify(this.dataList))
  },
  methods: {
    handlerChangeSort (val) {
      const currentSort = this.radioData.sort
      if (!currentSort) {
        this.$message.error('请选择要排序的数据！')
        return false
      }
      // this.loading = true
      const newIndex = {
        sort: ''
      }
      const oldIndex = {
        sort: currentSort,
        id: this.radioData.id
      }
      let sortType = ''
      if (val === 'up') {
        // 上移
        if (currentSort === this.tableList[0].sort) {
          return this.noPostSuccess()
        }
        newIndex.sort = this.byIndexFindSort(this.currentSelectIndex - 1)
        this.toFixed = this.currentSelectIndex - 1
      } else if (val === 'down') {
        // 下移
        if (currentSort === this.tableList[this.tableList.length - 1].sort) {
          return this.noPostSuccess()
        }
        newIndex.sort = this.byIndexFindSort(this.currentSelectIndex + 1)
        this.toFixed = this.currentSelectIndex + 1
      } else if (val === 'top') {
        // 置顶
        if (currentSort === this.tableList[0].sort) {
          return this.noPostSuccess()
        }
        sortType = 'top'
        this.toFixed = 0
      } else if (val === 'bottom') {
        // 置底
        sortType = 'bottom'
        if (currentSort === this.tableList[this.tableList.length - 1].sort) {
          return this.noPostSuccess()
        }
        this.toFixed = this.tableList.length - 1
      } else if (val === 'jump') {
        // 跳转
        if (Number(this.input) <= 0 || Number(this.input) > this.tableList.length) {
          this.$message.error('请输入正确的跳转行数！')
          return false
        }
        const index = this.byIndexFindSort(Number(this.input) - 1)
        if (currentSort === index) {
          return this.noPostSuccess()
        }
        newIndex.sort = index
        this.toFixed = Number(this.input) - 1
      }
      this.$emit('indexs', {
        newIndex,
        oldIndex,
        sortType
      })
    },
    // 选中的数据和要跳转的数据一致，不需要请求接口直接提示排序成功
    noPostSuccess () {
      this.templateRadio = ''
      this.radioData = {}
      this.input = ''
      this.currentSelectIndex = ''
      this.loading = false
      this.$message.warning('跳转位置与当前相同，请重新选择！')
      return false
    },
    // 通过index寻找当前数据的sort
    byIndexFindSort (index) {
      return this.tableList[index].sort
    },
    handleGetTemplateRow (val) {
      // 当前选中的行
      this.currentSelectIndex = val.$index
      this.radioData = val.row
    },
    rowDrop () {
      this.$nextTick(() => {
        const tbody = document.querySelector('.sortTableList .el-table__body-wrapper tbody')
        const _this = this
        Sortable.create(tbody, {
          animation: 150,
          ghostClass: 'blue-background-class',
          onEnd ({ newIndex, oldIndex }) {
            _this.templateRadio = ''
            _this.radioData = {}
            _this.input = ''
            _this.currentSelectIndex = ''
            const $li = tbody.children[newIndex]
            const $oldLi = tbody.children[oldIndex]
            tbody.removeChild($li)
            if (newIndex > oldIndex) {
              tbody.insertBefore($li, $oldLi)
            } else {
              tbody.insertBefore($li, $oldLi.nextSibling)
            }
            console.log(newIndex, oldIndex)
            const currRow = _this.tableList.splice(oldIndex, 1)[0]
            console.log('old:', currRow)
            console.log('new:', _this.copyTable[newIndex])
            _this.tableList.splice(newIndex, 0, currRow)
            for (var i = 0; i < _this.tableList.length; i++) {
              console.log(_this.indexList[i])
              _this.tableList[i].index = _this.indexList[i]
            }
            _this.toFixed = newIndex
            _this.$emit('indexs', {
              newIndex: _this.copyTable[newIndex],
              oldIndex: currRow,
              sortType: ''
            })
          }
        })
      })
    },
    handleClose () {
      this.$emit('closeCodeSort')
    },
    tableRowClassName ({ row, rowIndex }) {
      this.indexList[rowIndex] = rowIndex
      return row.moved ? 'moved' : ''
    }
  }
}
</script>

<style lang="less" scoped>
.setRowList-dialog{
  /deep/.el-dialog__body{
    padding-top: 20px;
  }
  .sortTableList {
    height: 600px;
    overflow-y: auto;
  }
  .flex-center{
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
  }
  .input{
    width: 200px;
    margin-left: 10px;
  }
  .setRowList-radio {
    /deep/.el-radio__label{
      padding-left: 0;
    }
  }
  /deep/ .el-table__row.moved td {
    background: #145BED !important;
    color: #fff !important;
  }
}
</style>
