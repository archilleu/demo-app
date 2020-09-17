import moment from 'moment'

// element ui 日期通用格式化
export function formatDate (row, column) {
  try {
    return moment(row[column.property]).format('YYYY-MM-DD')
  } catch (e) {
    console.error(e)
  }
  return null
}

export function formatDateTime (row, column) {
  try {
    return moment(row[column.property]).format('YYYY-MM-DD hh:mm:ss')
  } catch (e) {
    console.error(e)
  }
  return null
}
