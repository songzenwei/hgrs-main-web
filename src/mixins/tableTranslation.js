/* 翻译表格 */
import { getCachedDicsBySetCode } from '@/api'
import { getSesData } from '@/utils/auth'
import { calculationAges } from '@/utils/methods'

export default {
  data () {
    return {
      dataTranlates: {}
    }
  },
  mounted () {
    this.handleGetCachedDicsBySetCode()
  },
  methods: {
    handleCalculationAges (val) {
      return calculationAges(val)
    },
    async handleGetCachedDicsBySetCode () {
      try {
        const res = await getCachedDicsBySetCode(this.paramsList)
        if (res.success) {
          this.dataTranlates = res.detail
        }
      } catch (e) {
        throw new Error(e)
      }
    },
    handleTranslateData (item, row, rowName) {
      try {
        console.log(row[item.prop])
        if (row[item.prop] === 'E') {
          return ''
        }
        if ((row[item.prop] || row[item.prop] === 0) && item.tranSlate) {
          console.log(item.tranSlate)
          if (getSesData(item.tranSlate)) {
            const obj = JSON.parse(getSesData(item.tranSlate))
            return obj[row[item.prop]] ? obj[row[item.prop]] : row[item.prop]
          }
          const obj = this.dataTranlates[item.tranSlate] || {}
          return obj[row[item.prop]] ? obj[row[item.prop]] : row[item.prop]
        }
      } catch (e) {
        // 看到我以后记得先清除数据库里的数据在确认问题   ZRO - -！ OMG 不要在一个地方吃多次亏
        console.log('报错参数', item, row)
        console.log('报错字段', item.tranSlate, row[item.prop])
        throw new Error(e)
      }
    }
  }
}
