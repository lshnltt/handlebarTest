var moment = require('moment');
var startDate = moment().subtract(1,'days');
console.log(startDate.format('YYYYMMDD'));
//console.log(moment(startDate).format('YYYYMMdd'));
