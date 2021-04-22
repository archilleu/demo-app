/**
 * 全局常量、方法封装模块
 * 通过原型挂载到Vue属性
 * 通过 this.Global 调用
 */

export const baseURL = process.env.VUE_APP_BASE_URL
export const backupBaseURL = process.env.VUE_APP_BACKUP_BASE_URL

export default {
  baseURL,
  backupBaseURL
}
