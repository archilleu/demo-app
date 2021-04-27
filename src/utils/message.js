/**
 * 消息提示插件
 */

import { Message } from 'element-ui'

export default {
	install (Vue, options) {
		Object.defineProperties(Vue.prototype, {
			$msg: {
				get () {
					return {
						success: (msg) => Message({ message: msg, type: 'success', center: true }),
						warning: (msg) => Message({ message: msg, type: 'warning', center: true }),
						info: (msg) => Message({ message: msg, type: 'info', center: true }),
						error: (msg) => Message({ message: msg, type: 'error', center: true })
					}
				}
			}
		})
	}
}
