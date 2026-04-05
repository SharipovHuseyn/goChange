/*
 * Шаблонизатор
 *
 * (переводит 'x-${id}-${status.name}' на объекте {id:123, status:{name:'sample'}}
 * в 'x-123-sample')
 *
 * Умеет .toUpperCase() и .formatTS()
 */
function tengine(str, obj) {
    let fields = (('' + str).match(/\${[^}]*}/g) || []).map((s) => s.replace(/^\${/g, '').replace(/}$/g, '').split('.')); // 'item-${id}-${status.name}' -> [['id'],['status','name']]
    let parsed = str;
    fields.forEach((f) => {
      let pattern = new RegExp(('\\${' + f.join('.') + '}').replace(/\(/g, '\\(').replace(/\)/g, '\\)'), 'g');
      let value = f.reduce((acc, value) => {
        return acc 
               ? (value === 'toUpperCase()' 
                  ? ('' + acc).toUpperCase() 
                  : (value === 'formatTS()' 
                     ? formatWith("yyyy-MM-dd HH:mm:ssXXX", new Date(acc))
                     : acc[value]
                    )
                 ) 
                : undefined;
      }, obj);
      parsed = parsed.replace(pattern, value);
    });
  
    return parsed;
}
  


/**
 *
 * Get client IP (from https://stackoverflow.com/a/68882069/4486609)
 *
 */
function getIP(req) {
    // req.connection is deprecated
    const conRemoteAddress = (req.connection || {}).remoteAddress
    // req.socket is said to replace req.connection
    const sockRemoteAddress = (req.socket || {}).remoteAddress;
    // some platforms use x-real-ip
    const xRealIP = req.headers['x-real-ip']
    // most proxies use x-forwarded-for
    const xForwardedForIP = (() => {
      const xForwardedFor = req.headers['x-forwarded-for']
      if (xForwardedFor) {
        // The x-forwarded-for header can contain a comma-separated list of
        // IP's. Further, some are comma separated with spaces, so whitespace is trimmed.
        const ips = xForwardedFor.split(',').map(ip => ip.trim())
        return ips[0]
      }
    })()
    // prefer x-forwarded-for and fallback to the others
    var s = xForwardedForIP || xRealIP || sockRemoteAddress || conRemoteAddress;
    return (s || '').replace(/\:\:ffff\:/, '');
}


/**
 *
 * Date formatter (from https://stackoverflow.com/a/60265548/4486609)
 *
 * Example:
 *    formatWith("yyyy-MM-dd'T'HH:mm:ssXXX", new Date())
 */
function formatWith(formatStr, date, opts) {
    if (!date) {
        date = new Date();
    }

    opts = opts || {};

    let _days = opts.days;

    if (!_days) {
        _days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    }

    let _months = opts.months;

    if (!_months) {
        _months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    }

    const pad = (number, strDigits, isUnpad) => {
        const strNum = number.toString();
        if (!isUnpad && strNum.length > strDigits.length) {
            return strNum;
        } else {
            return ('0000' + strNum).slice(-strDigits.length);
        }
    };

    const timezone = (date, letter) => {
        const chunk = [];
        const offset = -date.getTimezoneOffset();
        chunk.push(offset === 0 ? 'Z' : offset > 0 ? '+' : '-');//add Z or +,-
        if (offset === 0) return chunk;
        chunk.push(pad(Math.floor(offset / 60), '00'));//hour
        if (letter === 'X') return chunk.join('');
        if (letter === 'XXX') chunk.push(':');
        chunk.push(pad((offset % 60), '00'));//min
        return chunk.join('');
    };

    const ESCAPE_DELIM = '\0';
    const escapeStack = [];

    const escapedFmtStr = formatStr.replace(/'.*?'/g, m => {
        escapeStack.push(m.replace(/'/g, ''));
        return ESCAPE_DELIM + (escapeStack.length - 1) + ESCAPE_DELIM;
    });

    const formattedStr = escapedFmtStr
        .replace(/y{4}|y{2}/g, m => pad(date.getFullYear(), m, true))
        .replace(/M{3}/g, m => _months[date.getMonth()])
        .replace(/M{1,2}/g, m => pad(date.getMonth() + 1, m))
        .replace(/M{1,2}/g, m => pad(date.getMonth() + 1, m))
        .replace(/d{1,2}/g, m => pad(date.getDate(), m))
        .replace(/H{1,2}/g, m => pad(date.getHours(), m))
        .replace(/h{1,2}/g, m => {
            const hours = date.getHours();
            return pad(hours === 0 ? 12 : hours > 12 ? hours - 12 : hours, m);
        })
        .replace(/a{1,2}/g, m => date.getHours() >= 12 ? 'PM' : 'AM')
        .replace(/m{1,2}/g, m => pad(date.getMinutes(), m))
        .replace(/s{1,2}/g, m => pad(date.getSeconds(), m))
        .replace(/S{3}/g, m => pad(date.getMilliseconds(), m))
        .replace(/[E]+/g, m => _days[date.getDay()])
        .replace(/[Z]+/g, m => timezone(date, m))
        .replace(/X{1,3}/g, m => timezone(date, m))
    ;

    const unescapedStr = formattedStr.replace(/\0\d+\0/g, m => {
        const unescaped = escapeStack.shift();
        return unescaped.length > 0 ? unescaped : '\'';
    });

    return unescapedStr;
}

  

module.exports = {
    tengine,
    getIP, 
    formatWith,
}