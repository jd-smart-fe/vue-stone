function taskTimeExpress() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';
  var hour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '*';
  var date = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '*';
  var month = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '*';
  var week = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '*';
  var year = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '*';

  var weekStr = Array.isArray(week) ? week.join(',') : week;
  var express = min + '_' + hour + '_' + date + '_' + month + '_' + weekStr + '_' + year;
  return express;
}

function textTaskTimeExpress(express) {
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

function arrayTaskTimeExpress(express) {
  var week = express.split('_')[4];
  if (week === '*') {
    return [];
  }
  var arr = week.split(',').map(function (val) {
    return val * 1;
  });
  return arr;
}

function weekArrToStr(week) {
  var text = [];

  week.forEach(function (val) {
    var num = val * 1;
    switch (true) {
      case num === 1:
        text.push('周一');
        break;
      case num === 2:
        text.push('周二');
        break;
      case num === 3:
        text.push('周三');
        break;
      case num === 4:
        text.push('周四');
        break;
      case num === 5:
        text.push('周五');
        break;
      case num === 6:
        text.push('周六');
        break;
      case num === 7:
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

function resolveTimeInTasklist(date) {
  return date.split(' ')[1];
}

function toTasklistStr(obj) {
  var express = obj.task_time_express;
  var minutes = obj.next_left_minutes;
  var str1 = textTaskTimeExpress(express);

  var hour = Math.floor(minutes / 60);
  var min = minutes - hour * 60;
  var day = Math.floor(hour / 24);

  if (day >= 1) {
    return str1 + ' ' + day + '\u5929\u540E\u6267\u884C';
  }

  return str1 + ' ' + hour + '\u5C0F\u65F6' + min + '\u5206\u949F\u540E\u6267\u884C';
}
