/* eslint-disable */

const cookieUtil = {

    /**
     设置Cookie
     -p string name cookie名
     -p string|number value cookie值
     -p object [opt] opt里应该提供：
     domain cookie种到什么域，默认值为当前域名
     path cookie种到什么路径，默认值/
     exp cookie过期时间，以小时为单位，默认是会话cookie。
     如果是一个数字，表示多少小时后cookie失效；
     如果是一个时间对象，表示在那个时间后失效；
     如果要存一个长期有效的cookie，该值写为'forever'，50年后过期。
     -tips 删除cookie：Cookie.set(name, null);
     -eg
     //最简单的种cookie
     Cookie.set('ts_env11', 'x-x_x,x.x=x%x;x$x\\x'); //只有-_.这3个字符不会被转义
     Cookie.set('ts_env12', 2);
     //5小时后过期的cookie
     Cookie.set('ts112', 'ffd892', {exp:5});
     //永远有效的cookie
     Cookie.set('ts2', 'some value', {exp:'forever'});
     trace(Cookie.get('ts_env11'));
     trace(Cookie.get('ts_env12'));
     //删除cookie
     Cookie.set('ts_env12', null);
     trace(Cookie.get('ts11'));
     */
    set(name, value, opt) {
        opt || (opt = {});
        var t = new Date();
        var domain = window.location.hostname.split('.').slice(-2).join('.');
        var exp = opt.expired;

        // 60m * 60s * 1000ms
        if (typeof exp === 'number') {
            t.setTime(t.getTime() + exp * 3600000);
        } else if (exp === 'forever') {
            // 专业种植cookie 50年
            t.setFullYear(t.getFullYear() + 50);
        } else if (value === null) {
            // 删除cookie
            value = '';
            t.setTime(t.getTime() - 3600000);
        } else if (exp instanceof Date) {
            // 传的是一个时间对象
            t = exp;
        } else {
            t = '';
        }
        document.cookie = name + '=' + encodeURIComponent(value) + (t && '; expires=' + t.toUTCString()) + '; domain=' + (opt.domain || domain) + '; path=' + (opt.path || '/') + (opt.secure ? '; secure' : '');
    },

    get(name) {
        name += '=';
        var cookies = (document.cookie || '').split(';');
        var cookie;
        var nameLength = name.length;
        var i = cookies.length;

        while (i--) {
            cookie = cookies[i].replace(/^\s+/, '');
            if (cookie.slice(0, nameLength) === name) {
                return decodeURIComponent(cookie.slice(nameLength)).replace(/\s+$/, '');
            }
        }

        return '';
    }
};

export default cookieUtil;
