/* 公共提示 */

import { MessageBox, Message } from 'element-ui'

/**
* @author 弹框提示
 * @param text
 * @param type
 * @returns {Promise}
 */
export function handleConfirm (text = '确定执行此操作吗？', type = 'warning') {
  return MessageBox.confirm(text, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: type
  })
}

/**
 * @author 消息提示
 * @param text
 * @param type
 * @returns {Promise}
 */
export function handleAlert (text = '操作成功', type = 'success', count = 0, time = 1) {
  return Message({
    showClose: true,
    message: text,
    type: type,
    offset: count * 40,
    duration: time * 1000
  })
}
