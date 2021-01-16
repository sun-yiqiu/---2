$.ajaxPrefilter(function (options) {
    // alert(options.url)
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    // alert(options.url)

    // 2.身份验证
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }
    //3.拦截所有响应，判断身份认证信息
    options.complete = function (res) {
        console.log(res.responseJSON)
        var obj = res.responseJSON;
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            localStorage.removeItem("token");
            location.href = "/login.html";
        }
    }
})