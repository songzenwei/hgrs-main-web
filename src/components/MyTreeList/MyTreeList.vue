<!-- 树形结构 -->
<template>
  <div class="Mytree">
    <tree
      ref="ztree"
      :setting="setting"
      :nodes="nodeList"
      @onExpand="handleOnExpand"
      @onCollapse="handleOnCollapse"
      @onCheck="ztreeOnCheck"
      @onClick="onClickMethod"
      @onDblClick="handleDbClickMethod"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script>
import tree from 'vue-giant-tree'
export default {
  data () {
    return {
      // 配置
      setting: {
        check: {
          enable: this.isCheck,
          chkboxType: { Y: this.islinkage ? 'ps' : '', N: this.islinkage ? 'ps' : '' }
        },
        // callback: {
        //   onClick: this.handlezTreeOnClick
        // },
        data: {
          simpleData: {
            enable: true,
            idKey: this.idKey,
            pIdKey: this.pIdKey,
            rootPId: this.rootPId,
            checked: this.isChecked
          },
          key: {
            name: this.keyName
          }
        },
        view: {
          showIcon: true,
          showLine: true,
          nameIsHTML: true,
          dblClickExpand: this.isNeedDbClick
        }
      },
      // ztree对象
      ztreeObj: null
    }
  },
  props: {
    keyName: {
      type: String,
      default: () => {
        return 'orgName'
      }
    },
    rootPId: {
      type: String,
      default: () => {
        return '0'
      }
    },
    pIdKey: {
      type: String,
      default: () => {
        return 'parentId'
      }
    },
    idKey: {
      type: String,
      default: () => {
        return 'id'
      }
    },
    nodeList: {
      type: Array,
      default: () => {
        return []
      }
    },
    isCheck: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    isCount: {
      type: Number,
      default: () => {
        return 0
      }
    },
    isNeedDbClick: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    islinkage: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    isChecked: {
      type: String,
      default: () => {
        return 'isChecked'
      }
    }
  },
  components: {
    tree
  },
  watch: {
    isCount (val) {
      if (val > 0) {
        setTimeout(() => {
          const nodeList = this.ztreeObj.getNodes()
          nodeList.forEach((element, index) => {
            console.log(index)
            this.$emit('isFristLoad', {
              treeNode: element,
              ztreeObj: this.ztreeObj
            })
          })
        }, 1000)
      }
    }
  },
  mounted () {
  },
  methods: {
    handleSearchTree () {},
    onClickMethod (evt, treeId, treeNode) {
      this.$emit('onClick', {
        evt: evt,
        treeId: treeId,
        treeNode: treeNode,
        ztreeObj: this.ztreeObj
      })
    },
    handleDbClickMethod (evt, treeId, treeNode) {
      this.$emit('onDblClick', {
        evt: evt,
        treeId: treeId,
        treeNode: treeNode,
        ztreeObj: this.ztreeObj
      })
    },
    handleCreated (ztreeObj) {
      this.ztreeObj = ztreeObj
    },
    checkAll (...args) {
      this.ztreeObj.checkAllNodes(...args)
    },
    ztreeOnCheck (evt, treeId, treeNode) {
      this.$emit('onCheck', {
        treeNode: treeNode,
        ztreeObj: this.ztreeObj
      })
    },
    handleOnExpand (event, treeId, treeNode) {
      this.$emit('onExpand', {
        treeNode: treeNode,
        ztreeObj: this.ztreeObj
      })
    },
    handleOnCollapse (event, treeId, treeNode) {
    },
    hanleClear () {
      var nodes = this.ztreeObj.getSelectedNodes()
      if (nodes.length > 0) {
        this.ztreeObj.cancelSelectedNode(nodes[0])
      }
    }
  }
}
</script>
