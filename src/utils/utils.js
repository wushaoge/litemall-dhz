import moment from 'moment/moment'

export default {
  install(Vue, options) {
    Vue.prototype.getTest = function() {
      console.log('我是插件中的方法')
    }

    Vue.prototype.getCurrentTime = function() {
      return new Date().getTime()
    }

    Vue.prototype.getDateTime = function(date) {
      if (date == null || date == '') {
        return '/'
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss")
    }

    Vue.prototype.formartDate = function(date, fmt) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (let k in o) {
        let str = o[k] + '';
        if (new RegExp(`(${k})`).test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
      }
      return fmt;
    }

    Vue.prototype.formartTime = function(inputTime) {
        var date = new Date(inputTime);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    }

  }
}
