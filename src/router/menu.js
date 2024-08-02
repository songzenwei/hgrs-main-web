const { SERVICEID } = require('@/config.js')

const menuData = [
  {
    id: '9900',
    parentId: '99',
    name: '我的<br/>工作台',
    path: '/home/workplace',
    icon: 'el-icon-video-camera',
    isParent: false,
    imgIcon: '',
    selectIcon: ''
  },
  {
    id: '9910',
    parentId: '99',
    name: '动态表单',
    path: '/dynamicform/dynamic',
    icon: 'el-icon-video-camera',
    isParent: false,
    imgIcon: '',
    selectIcon: ''
  },
  {
    id: '9901',
    parentId: '99',
    name: '数据中台',
    path: '/level/menu2',
    icon: 'el-icon-video-camera',
    isParent: true,
    imgIcon: '',
    selectIcon: '',
    children: [
      {
        id: '990101',
        parentId: '9901',
        name: '数据中台运行监测管理',
        path: '/datacenter/monitormanage',
        icon: '/f',
        isParent: false,
        children: []
      },
      {
        id: '990102',
        parentId: '9901',
        name: '数据交换服务平台',
        path: '/datacenter/dataexchange',
        icon: '/f',
        isParent: false,
        children: []
      }
    ]
  },
  {
    id: '9902',
    parentId: '99',
    name: '智能应用',
    path: '/management',
    icon: 'el-icon-s-platform',
    isParent: true,
    imgIcon: '',
    selectIcon: '',
    children: [
      {
        id: '990201',
        parentId: '9902',
        name: '队伍概貌',
        path: '/homeSeach',
        icon: '/f',
        isParent: false,
        children: [
          {
            id: '99020101',
            parentId: '990201',
            name: '机构编制图谱',
            path: '/develop',
            icon: '/f',
            isParent: false,
            children: []
          },
          {
            id: '99020102',
            parentId: '990201',
            name: '干部成长地图',
            path: '/develop',
            icon: '/f',
            isParent: false,
            children: []
          }
        ]
      },
      {
        id: '990202',
        parentId: '9902',
        name: '素质能力培养',
        path: '/functionalModule/operationLog',
        icon: '/f',
        isParent: false,
        children: [
          {
            id: '99020201',
            parentId: '990202',
            name: '知识地图',
            path: '/develop',
            icon: '/f',
            isParent: false,
            children: []
          },
          {
            id: '99020202',
            parentId: '990202',
            name: '胜任力地图',
            path: '/develop',
            icon: '/f',
            isParent: false,
            children: []
          }
        ]
      },
      {
        id: '990203',
        parentId: '9902',
        name: '智慧机构编制',
        path: '/functionalModule/dataLog',
        icon: '/f',
        isParent: false,
        children: [
          {
            id: '99020301',
            parentId: '990203',
            name: '机构编制评估模型管理',
            path: '/develop',
            icon: '/f',
            isParent: false,
            children: []
          },
          {
            id: '99020302',
            parentId: '990203',
            name: '人力资源分析调配',
            path: '/develop',
            icon: '/f',
            isParent: false,
            children: []
          }
        ]
      }
    ]
  },
  {
    id: '9903',
    parentId: '99',
    name: '“一站式”<br/>集成管理',
    path: '/chatManage',
    icon: 'el-icon-s-cooperation',
    isParent: true,
    imgIcon: '',
    selectIcon: '',
    children: [
      {
        id: '990301',
        parentId: '9903',
        name: '基础信息管理',
        path: '/sessionManagement/SessionList',
        icon: '/s',
        isParent: false,
        children: [
          {
            id: '99030101',
            parentId: '990301',
            name: '人员信息管理',
            path: '/Tree',
            icon: '/s',
            isParent: false,
            children: []
          }
        ]
      },
      {
        id: '990302',
        parentId: '9903',
        name: '考核管理',
        path: '/sessionManagement/SessionLog44',
        icon: '/s',
        isParent: false,
        children: [
          {
            id: '99030201',
            parentId: '990302',
            name: '“三位一体”考核',
            path: '/develop',
            icon: '/s',
            isParent: true,
            children: [
              {
                id: '9903020101',
                parentId: '99030201',
                name: '平时考核',
                path: '/develop',
                icon: '/s',
                isParent: false,
                children: []
              },
              {
                id: '9903020102',
                parentId: '99030201',
                name: '专项考核',
                path: '/develop',
                icon: '/s',
                isParent: false,
                children: []
              },
              {
                id: '9903020103',
                parentId: '99030201',
                name: '年度考核',
                path: '/develop',
                icon: '/s',
                isParent: false,
                children: []
              }
            ]
          },
          {
            id: '99030202',
            parentId: '990302',
            name: '单位考核',
            path: '/develop',
            icon: '/s',
            isParent: false,
            children: []
          },
          {
            id: '99030203',
            parentId: '990302',
            name: '中心任务作战图',
            path: '/cuhome',
            icon: '/s',
            isParent: false,
            children: []
          }
        ]
      },
      {
        id: '990303',
        parentId: '9903',
        name: '日常管理',
        path: '/sessionManagement/SessionLog55',
        icon: '/s',
        isParent: false,
        children: [
          {
            id: '99030301',
            parentId: '990303',
            name: '专家型人才库',
            path: '/develop',
            icon: '/s',
            isParent: false,
            children: []
          }
        ]
      },
      {
        id: '990304',
        parentId: '9903',
        name: '奖励管理',
        path: '/sessionManagement/SessionLog22',
        icon: '/s',
        isParent: false,
        children: [
          {
            id: '990304',
            parentId: '990301',
            name: '全国海关荣誉榜',
            path: '/develop',
            icon: '/s',
            isParent: false,
            children: []
          }
        ]
      },
      {
        id: '990305',
        parentId: '9903',
        name: '通用工具',
        path: '/sessionManagement/SessionLog33',
        icon: '/s',
        isParent: false,
        children: [
          {
            id: '99030501',
            parentId: '990305',
            name: '测评管理',
            path: '/develop',
            icon: '/s',
            isParent: false,
            children: []
          },
          {
            id: '99030502',
            parentId: '990305',
            name: '统计分析管理',
            path: '/develop',
            icon: '/s',
            isParent: false,
            children: []
          }
        ]
      }
    ]
  },
  {
    id: '9904',
    parentId: '99',
    name: '系统管理',
    path: '/dataDicManage',
    icon: 'el-icon-s-check',
    isParent: true,
    imgIcon: '',
    selectIcon: '',
    children: [
      {
        id: '990401',
        parentId: '9904',
        name: '个性化定制',
        path: '/functionalModule/InforSetManagement',
        icon: '/f',
        isParent: false,
        children: []
      }
    ]
  }
]
// 设置所有一级、二级、三级菜单
const menuData1 = [
  {
    path: `/${SERVICEID}/home/index`,
    name: '首页',
    meta: { title: '首页', icon: 'fa fa-home' } // icon 支持 font-awesome 和 element
  },
  {
    path: `/${SERVICEID}/home/element/message`,
    name: '示例',
    meta: { title: '示例', icon: 'fa fa-inbox' },
    children: [
      {
        path: `/${SERVICEID}/home/element/message`,
        name: 'element',
        meta: { title: 'element', icon: 'el-icon-star-on' },
        children: [
          {
            path: `/${SERVICEID}/home/element/message`,
            name: '消息提示',
            meta: { title: '消息提示', icon: 'fa fa-comment' }
          },
          {
            path: `/${SERVICEID}/home/element/notice`,
            name: '通知',
            meta: { title: '通知', icon: 'fa fa-bell' }
          },
          {
            path: `/${SERVICEID}/home/element/form`,
            name: '表单',
            meta: { title: '表单验证', icon: 'fa fa-list-alt' }
          }
        ]
      }
    ]
  }
]
export default menuData
