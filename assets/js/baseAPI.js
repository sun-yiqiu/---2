$.ajaxPrefilter(function (options) {
    // alert(options.url)
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    // alert(options.url)
})