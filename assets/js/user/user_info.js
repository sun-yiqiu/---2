// 入口函数
$(function () {
    //昵称效验规则
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度为1~6位之间！";
            }
        }
    });
    //2.获取和渲染用户信息
    initUserInfo();
    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return localStorage.msg('获取用户信息失败');
                }
                //成功后渲染
                //调用 form.val() 快速为表单赋值
                form.val('formUserInfo', res.data);
            }
        })
    }


    //3. 重置表单数据
    $('#btnReset').on('click', function (e) {

        //阻止表单的默认重置行为
        e.preventDefault()
        //从新用户渲染
        initUserInfo()
    });

    //用户信息提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        //发送ajax
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.msg("用户信息修改失败！")
                }
                layer.msg("恭喜您，用户信息修改成功！")
                // 调用父页面中的更新用户信息和头像方法
                window.parent.getUserInfo();
            }
        });
    })
})