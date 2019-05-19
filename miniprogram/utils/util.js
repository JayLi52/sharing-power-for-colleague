const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 防抖动函数
const debounce = function(fn, delay = 1000) {
  let timer;

  // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 func 函数
  return function() {

    // 保存函数调用时的上下文和参数，传递给func
    var args = arguments

    // 函数被调用，清除定时器
    clearTimeout(timer)

    // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
    // 再过 delay 毫秒就执行 func
    timer = setTimeout(function() {
      fn.apply(null, args);
    }, delay);
  }
}

const urlParse = function(url) {
  const origin = url.split("?")[0];
  const queryObj = {}
  const query = url.split("?")[1];
  const queryArr = query.split("&");
  queryArr.forEach(function(item) {
    const value = item.split("=")[1];
    const key = item.split("=")[0];
    queryObj[key] = value;
  });
  return {
    origin,
    queryObj,
    query
  };
}

const objToParam = function(obj) {
  let params = ''
  Object.keys(obj).forEach(key => {
    let res = ''
    res += `${key}=${obj[key]}&`
    params += res
  })
  return params
}

const formatDistance = function(distance) {
  if (distance instanceof String && distance.slice(-1) === 'm') {
    distance = parseInt(distance.slice(0, -1), 10)
  }
  if (distance >= 1000) return (distance / 1000) + 'km'
  else return distance + 'm'
}
module.exports = {
  formatTime: formatTime,
  debounce,
  urlParse,
  objToParam,
  formatDistance
}