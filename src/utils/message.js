/** 重置message，防止重复点击重复弹出message弹框 */
import {ElMessage} from 'element-plus'

const showMessage = Symbol('showMessage')

class DoneMessage {
  [showMessage](type, options, single) {
    if (single) {
      if (document.getElementsByClassName('el-message').length === 0) {
        ElMessage[type](options)
      }
    } else {
      ElMessage[type](options)
    }

  }

  info(options, single = true) {
    this[showMessage]('info', options, single)
  }

  warning(options, single = true) {
    this[showMessage]('warning', options, single)
  }

  error(options, single = true) {
    this[showMessage]('error', options, single)
  }

  success(options, single = true) {
    this[showMessage]('success', options, single)
  }
}

export const message = new DoneMessage()
