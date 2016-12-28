'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function timeTaskExpress() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';
  var hour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '*';
  var day = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '*';
  var month = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '*';
  var week = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '*';
  var year = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '*';

  var weekStr = Array.isArray(week) ? week.join(',') : week;
  var express = min + '_' + hour + '_' + day + '_' + month + '_' + weekStr + '_' + year;
  return express;
}

function textTimeTaskExpress(express) {
  var arr = express.split('_');

  if (arr[5] !== '*') {
    return '执行一次';
  }

  if (arr[4] === '*' && arr[3] === '*' && arr[2] === '*') {
    return '每天';
  }

  var week = arr[4].split(',');

  return weekArrToStr(week);
}

function arrayTimeTaskExpress(express) {
  var week = express.split('_')[4];
  if (week === '*') {
    return new Date().getDay() === 0 ? [7] : [new Date().getDay()];
  }
  var arr = week.split(',').map(function (val) {
    return val * 1;
  });
  return arr;
}

function weekArrToStr(week) {
  var text = [];
  week.forEach(function (val) {
    switch (val) {
      case val === '1' || 1:
        text.push('周一');
        break;
      case val === '2' || 2:
        text.push('周二');
        break;
      case val === '3' || 3:
        text.push('周三');
        break;
      case val === '4' || 4:
        text.push('周四');
        break;
      case val === '5' || 5:
        text.push('周五');
        break;
      case val === '6' || 6:
        text.push('周六');
        break;
      case val === '7' || 7:
        text.push('周日');
        break;
      default:
    }
  });
  if (text.join(',') === '周六,周日') {
    return '周末';
  }

  if (text.join(',') === '周一,周二,周三,周四,周五') {
    return '工作日';
  }

  if (text.join(',') === '周一,周二,周三,周四,周五,周六,周日') {
    return '每天';
  }

  return text.join('、');
}

exports.default = {
  arrayTimeTaskExpress: arrayTimeTaskExpress,

  textTimeTaskExpress: textTimeTaskExpress,

  weekArrToStr: weekArrToStr,

  timeTaskExpress: timeTaskExpress
};
