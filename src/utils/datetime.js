import moment from 'moment'

//element ui 日期通用格式化
export function formatDate(row, column, cellValue, index) {
  if (!row[column.property]) return "";
  return moment(row[column.property]).format('YYYY-MM-DD');
}

export function formatDateTime(row, column, cellValue, index) {
  if (!row[column.property]) return "";
  return moment(row[column.property]).format('YYYY-MM-DD HH:mm:ss');
}

export function expandFormatDate(date, row) {
  if(!date) return "";
  return moment(date).format('YYYY-MM-DD');
}

export function expandFormatDateTime(date, row) {
  if(!date) return "";
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
}