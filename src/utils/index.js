export const formatDate = (date) => {
    let dt = new Date(date)
    var y = dt.getFullYear();
    var m = dt.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = dt.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = dt.getHours();
    h=h < 10 ? ('0' + h) : h;
    var minute = dt.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second=dt.getSeconds();
    second=second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
}