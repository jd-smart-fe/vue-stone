// 输入年月日周，返回值为定时接口日期表达式
function timeTaskExpress(min = '*', hour = '*', day = '*', month = '*', week = '*', year = '*') {
  const weekStr = Array.isArray(week) ? week.join(',') : week;
  const express = `${min}_${hour}_${day}_${month}_${weekStr}_${year}`;
  return express;
}

// 输入定时api的日期表达式，返回值为汉字星期字符串
function textTimeTaskExpress(express) {
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

// 输入定时api的日期表达式，返回值为星期数组
function arrayTimeTaskExpress(express) {
  const week = express.split('_')[4];
  if (week === '*') {
    return (new Date()).getDay() === 0
    ? [7]
    : [(new Date()).getDay()];
  }
  const arr = week.split(',').map(val => val * 1);
  return arr;
}

// 输入星期数组， 返回值为汉字星期字符串
function weekArrToStr(week) {
  const text = [];
  week.forEach((val) => {
    switch (val) {
      case (val === '1' || 1):
        text.push('周一');
        break;
      case (val === '2' || 2):
        text.push('周二');
        break;
      case (val === '3' || 3):
        text.push('周三');
        break;
      case (val === '4' || 4):
        text.push('周四');
        break;
      case (val === '5' || 5):
        text.push('周五');
        break;
      case (val === '6' || 6):
        text.push('周六');
        break;
      case (val === '7' || 7):
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


export default {
  // 输入定时api的日期表达式，返回值为星期数组
  arrayTimeTaskExpress,
  // 输入定时api的日期表达式，返回值为汉字星期字符串
  textTimeTaskExpress,
  // 输入星期数组，返回值为汉字星期字符串
  weekArrToStr,
  // 输入多个时间参数，返回值为定时接口日期表达式字符串
  timeTaskExpress,
};
