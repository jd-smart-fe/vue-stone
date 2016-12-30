// 输入年月日周，返回值为定时接口日期表达式
function taskTimeExpress(min = '*', hour = '*', date = '*', month = '*', week = '*', year = '*') {
  const weekStr = Array.isArray(week) ? week.join(',') : week;
  const express = `${min}_${hour}_${date}_${month}_${weekStr}_${year}`;
  return express;
}

// 输入定时api的日期表达式，返回值为汉字星期字符串 '每天'  '工作日' '周一, 周二'
function textTaskTimeExpress(express) {
  const arr = express.split('_');

  // 执行一次
  if (arr[5] !== '*') {
    return '执行一次';
  }

  if (arr[4] === '*' && arr[3] === '*' && arr[2] === '*') {
    return '每天';
  }
  const week = arr[4].split(',');

  return weekArrToStr(week);
}

// 输入定时api的日期表达式，返回值为星期数组 [1, 2, 4]
function arrayTaskTimeExpress(express) {
  const week = express.split('_')[4];
  if (week === '*') {
    return [];
  }
  const arr = week.split(',').map(val => val * 1);
  return arr;
}

// 输入星期数组， 返回值为汉字星期字符串
function weekArrToStr(week) {
  const text = [];

  week.forEach(val => {
    const num = val * 1;
    switch (true) {
      case (num === 1):
        text.push('周一');
        break;
      case (num === 2):
        text.push('周二');
        break;
      case (num === 3):
        text.push('周三');
        break;
      case (num === 4):
        text.push('周四');
        break;
      case (num === 5):
        text.push('周五');
        break;
      case (num === 6):
        text.push('周六');
        break;
      case (num === 7):
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

// 传入固定格式的时间(2016-11-12 12:30)，返回小时分钟(12:30)。
function resolveTimeInTasklist(date) {
  return date.split(' ')[1];
}

// 传入对象，返回固定格式字符串 (执行一次 2天后执行)
function toTasklistStr(obj) {
  const express = obj.task_time_express;
  const minutes = obj.next_left_minutes;
  const str1 = textTaskTimeExpress(express);

  const hour = Math.floor(minutes / 60);
  const min = minutes - (hour * 60);
  const day = Math.floor(hour / 24);

  if (day >= 1) {
    return `${str1} ${day}天后执行`;
  }

  return `${str1} ${hour}小时${min}分钟后执行`;
}

export default {
  // 输入定时api的日期表达式，返回值为星期数组
  arrayTaskTimeExpress,
  // 输入定时api的日期表达式，返回值为汉字星期字符串
  textTaskTimeExpress,
  // 输入星期数组，返回值为汉字星期字符串
  weekArrToStr,
  // 输入多个时间参数，返回值为定时接口日期表达式字符串
  taskTimeExpress,
  // 传入固定格式的时间(2016-11-12 12:30)，返回小时分钟(12:30)。
  resolveTimeInTasklist,
  // 传入对象，返回固定格式字符串 (执行一次 2天后执行)
  toTasklistStr,
};
