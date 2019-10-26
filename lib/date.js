/**
 * 时间对象
 * @type {{getCurrentUnix: Time.getCurrentUnix, getTodayUnix: Time.getTodayUnix, getThisYearUnix: Time.getThisYearUnix, format: Time.format, compensateZero: Time.compensateZero, transform: Time.transform}}
 */
class DateFat {
    //获取当前 Unix 时间戳
    getCurrentUnix() {
        return new Date().getTime();
    }
    //获取今日 0 点 0 分 0 秒的 Unix 时间戳
    getTodayUnix() {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    }
    //获取今年 1 月 1 日 0 点 0 分 0 秒的 Unix 时间戳
    getThisYearUnix() {
        var date = new Date();
        date.setMonth(0);
        date.setDate(1);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date.getTime();
    }
    //格式化日期；输出格式为 xxxx-xx-xx
    format(val) {
        var dateObj = new Date(val);
        //month 代表月份的整数值从0（1月）到11（12月），所以需要转换
        var month = this.compensateZero(dateObj.getMonth() + 1);
        var day = this.compensateZero(dateObj.getDate());
        return dateObj.getFullYear() + '-' + month + '-' + day;
    }
    dateNormalize(date) {
        if (!date) {
            date = new Date();
        }
        let final;
        const dateType = Object.prototype.toString.call(date);
        switch (dateType) {
            case '[object Date]':
                final = date;
                break;
            case '[object String]':
                // IOS format fix. '2016-11-11' 需要转换成2016/11/11
                final = new Date(date.replace(/-/ig, '/'));
                break;
            default:
                final = new Date(date);
        }
        return final;
    }
    /**
     * 如果值小于 10，那么在前面补一个零
     * @param val
     * @returns {*}
     */
    compensateZero(val) {
        if (typeof val == 'number') {
            return val < 10 ? '0' + val : val;
        } else {
            return val;
        }
    }
    /**
     * 转换为相对时间
     *
     * 1 分钟之前，返回“刚刚”
     * 1 分钟到 1 小时之间，返回“xx 分钟前”
     * 1 小时到 1 天之间，返回“xx 小时前”
     * 1 天到 1 个月（假设固定为 31 天）之间，返回“xx 天前”
     * 大于 1 个月，返回“xx 年 xx 月 xx 日”
     * @param val unix 时间戳
     */
    transform(val) {
        //计算时间间隔（单位：s）
        const week = ['日', '一', '二', '三', '四', '五', '六'];
        var interval = (this.getCurrentUnix() - val) / 1000;
        let date = this.dateNormalize(val);
        if (Math.floor(interval / 60) <= 0) {//1 分钟之前
            return '刚刚';
        } else if (interval < 3600) {//1 分钟到 1 小时之间
            return Math.floor(interval / 60) + '分钟前';
        } else if (interval >= 3600 && (val - this.getTodayUnix() >= 0)) {//1 小时到 1 天之间
            return Math.floor(interval / 3600) + '小时前';
        }
        else if (interval / (3600 * 24) <= 7) {//1 天到 1 个月（假设固定为 31 天）之间
            return '周'.concat(week[date.getDay()]);
        }
        else if (interval / (3600 * 24) <= 31) {//1 天到 1 个月（假设固定为 31 天）之间
            return Math.ceil(interval / (3600 * 24)) + '天前';
        }
        else {
            return this.format(val);
        }
    }

    conver(limit) {
        limit = isNaN(limit) ? 0 : parseInt(limit)
        let size = "";
        if (limit < 0.1 * 1024) {
            //如果小于0.1KB转化成B
            size = limit.toFixed(2) + "B";
        } else if (limit < 0.1 * 1024 * 1024) {
            //如果小于0.1MB转化成KB
            size = (limit / 1024).toFixed(2) + "KB";
        } else if (limit < 0.1 * 1024 * 1024 * 1024) {
            //如果小于0.1GB转化成MB
            size = (limit / (1024 * 1024)).toFixed(2) + "MB";
        } else {
            //其他转化成GB
            size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
        }
        let sizestr = size + "";
        let len = sizestr.indexOf("\.");
        let dec = sizestr.substr(len + 1, 2);
        if (dec == "00") {
            //当小数点后为00时 去掉小数部分
            return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
        }
        return sizestr;
    }

};

export default new DateFat();