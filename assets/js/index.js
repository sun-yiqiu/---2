$(function () {
    //调用getUserInfo获取用户基本信息，并渲染用户名和头像
    getUserInfo();


    //2.退出
    var layer = layui.layer;
    $('#btnLogout').on('click', function () {
        layer.confirm('是否确认退出', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem("token");
            location.href = '/login.html';

            layer.close(index);
        });
    })
});

//封装一个 获取用户信息，并渲染用户名和头像 方法
// 注意 必须是全局函数 后面其他页面要用！！！！
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // // headers 就是请求头配置
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },

        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            }
            //请求成功，渲染头像
            renderAvatar(res.data);
        }
    });
}

function renderAvatar(user) {
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    //渲染头像
    if (user.user_pic !== null) {
        //有头像
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $(".text-avatar").hide();
    } else {
        //没有头像
        $(".layui-nav-img").hide();
        var text = name[0].toUpperCase();
        $(".text-avatar").show().html(text);
    }
}