const date = {
  min: (new Date()).getMinutes(),
  hour: (new Date()).getHours(),
  day: (new Date()).getDate(),
  month: (new Date()).getMonth() + 1,
  year: (new Date()).getFullYear(),
};

function timeTaskExpress(min = '*', hour = '*', day = '*', month = '*', week = '*', year = '*') {
  const weekStr = Array.isArray(week) ? week.join(',') : week;
  const express = `${min}_${hour}_${day}_${month}_${weekStr}_${year}`;
  return express;
}

export default {
  timeTaskExpress,
  date,
};
