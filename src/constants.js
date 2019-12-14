const Utils = require('./utils');

const values = {
  'week': [...Utils.range(1, 7)],
  'month': [...Utils.range(1, 12)],
  'hour': [...Utils.range(0, 23)],
  'day': [...Utils.range(1, 31)],
  'minute': [...Utils.range(0, 59)]
};

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

module.exports = {
  values: values,
  months: months,
  days: days
}