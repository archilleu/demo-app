import moment from 'moment'

// element ui 日期通用格式化
export function formatDate (row, column) {
  return moment(row[column.property]).format('YYYY-MM-DD')
}

export function formatDateTime (row, column) {
  return moment(row[column.property]).format('YYYY-MM-DD hh:mm:ss')
}
