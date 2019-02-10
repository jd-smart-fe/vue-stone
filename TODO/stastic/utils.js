function getMonth(params) {
  return params.substr(5, 2);
}
function getDate(params) {
  return params.substr(8, 2);
}
const convertToCoordinate = params => {
  const unit = params.sum_unit;
  const sum = parseFloat(params.sum);
  const arg = parseFloat(params.arg);
  const axis = [];
  const details = [];
  let axisTimeUnit = '';
  let unitType = '';
  const originArr = params.detail;
  const originArrType = originArr.length ? originArr[0].desc : '';
  if (originArrType === '小时') {
    // 天
    axisTimeUnit = unitType = '点';
  } else if (originArrType.indexOf('星期') !== -1) {
    // 周
    axisTimeUnit = '';
    unitType = '日';
  } else if (originArrType.indexOf('-') !== -1) {
    // 月
    axisTimeUnit = unitType = '日';
  } else if (originArrType.indexOf('月') !== -1) {
    // 年
    axisTimeUnit = unitType = '月';
  }
  originArr.forEach((item, index) => {
    const axisItme = { time: '', value: 0 };
    const detailsItem = { time: '', desc: '' };
    // 用电量转为数值型，‘NaN’转为0
    if (item.value === 'NaN') {
      axisItme.value = 0;
      detailsItem.desc = '没有数据';
    } else {
      axisItme.value = parseFloat(item.value);
      detailsItem.desc = item.value;
    }
    // 坐标轴的时间变量
    if (axisTimeUnit === '点') {
      // 天
      // axisItme.time = parseInt(item.datetime, 10) + '';
      axisItme.time = parseInt(item.datetime, 10).toString();
      // detailsItem.time = item.datetime + ':00';
      detailsItem.time = `${item.datetime} :00`;
    } else if (axisTimeUnit === '') {
      // 周
      axisItme.time = getDate(item.datetime);
      detailsItem.time =
        // getMonth(item.datetime) + '月' + getDate(item.datetime) + '日';
        `${getMonth(item.datetime)}月${getDate(item.datetime)}日`;
    } else if (axisTimeUnit === '日') {
      // 月
      // axisItme.time = parseInt(getDate(item.datetime), 10) + '';
      axisItme.time = parseInt(getDate(item.datetime), 10).toString();
      detailsItem.time = item.datetime;
    } else if (axisTimeUnit === '月') {
      // 年
      // axisItme.time = parseInt(getMonth(item.datetime), 10) + '';
      axisItme.time = parseInt(getMonth(item.datetime), 10).toString();
      detailsItem.time = item.desc;
    }
    axis.push(axisItme);
    details.push(detailsItem);
  });
  return {
    axis,
    details,
    unit,
    sum,
    arg,
    unitType,
  };
};
export default convertToCoordinate;
