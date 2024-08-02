<template>
  <div class="MyPagination">
    <template>
      <span  @click="jumpFirstPage" class="my-btn">首页</span>
      <el-pagination
        class="ispagination"
        ref="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 50, 100, 500, 1000]"
        prev-text="上一页"
        next-text="下一页"
        :page-size="pageSize"
        :layout="layout"
        :total="total">
        <el-button @click="jumpLastPage" style="margin: 0px 5px">尾页</el-button>
        <el-button style="margin: 0px 5px;">{{ `当前页数为第${currentPage}页` }}</el-button>
        <span style="margin: 0px 5px;font-weight: 400;">共 {{ totalPage }} 页</span>
        <span class="el-pagination__total">/ 共 {{ total }} 条</span>
      </el-pagination>
    </template>
  </div>
</template>

<script>
import { handleAlert } from '@/utils/confirm'
export default {
  name: 'MyPagination',
  data () {
    return {
      layoutCustom: 'prev, next, slot, jumper',
      pageSizes: 10
    }
  },
  props: {
    total: {
      type: Number,
      default: () => {
        return 0
      }
    },
    page: {
      type: Number,
      default: () => {
        return 1
      }
    },
    pageSize: {
      type: Number,
      default: () => {
        return 10
      }
    },
    layout: {
      type: String,
      default: () => {
        return 'prev, next, slot, sizes, jumper'
      }
    }
  },
  computed: {
    currentPage: {
      get () {
        return this.page
      },
      set (val) {
        this.$emit('update:page', val)
      }
    },
    totalPage () {
      return this.pageSize ? Math.ceil(this.total / this.pageSize) : 0
    }
  },
  methods: {
    jumpFirstPage () {
      this.$refs.pagination.handleCurrentChange(1)
      this.$emit('handleCurrentChange', 1)
    },
    jumpLastPage () {
      const font = this.$refs.pagination
      const cpage = Math.ceil(font.total / font.pageSize)
      font.handleCurrentChange(cpage)
    },
    handleSizeChange (val) {
      this.$emit('size-change', val)
    },
    handleCurrentChange (val) {
      this.$emit('current-page', val)
    },
    // 自定义条数方法
    handleSizeChangeCustom () {
      if (!this.pageSizes) {
        this.pageSizes = 10
      }
      this.$emit('size-change', this.pageSizes)
    },
    handleChangeSize (val) {
      if (!val) return false
      if (Number(val) > 1000) {
        handleAlert('条数不能大于1000条', 'warning', 0, 5)
        this.pageSizes = 1000
      } else {
        this.pageSizes = Number(val)
      }
    }
  }
}
</script>
