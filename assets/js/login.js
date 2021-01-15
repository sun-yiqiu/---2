//入口函数
$(function () {
    //1.点击注册账号，隐藏登录区域，显示注册区域
    $("#link_reg").on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })


    //2.点击去登陆 显示登录区域，隐藏注册区域
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    //3.自定义验证规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({

        //密码规则
        pwd: [
            /^[\S]{6,16}$/,
            '密码必须是6——16，且不能有空格'
        ],
        //密码规则确认
        repwd: function (value) {
            //选择器必须带空格，选择的是后代中的input ，name属性值为password的那个标签
            var pwd = $(".reg-box [name=password]").val()
            // 比较
            if (pwd !== value) {
                return "两次密码输入不一致！"
            }
        }
    });
    //4. 注册功能

    $("#form_reg").on("submit", function (e) {
        //阻止表单提交
        e.preventDefault();
        //发送ajax
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function (res) {
                //效验
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //提交成功后处理代码
                layer.msg('注册成功，请登录！');
                // 手动切换到登录表单
                $("#link_login").click();
                // 重置form
                $("#form_reg")[0].reset();


            }
        });
    });

    //5.登录功能(给lorm标签绑定事件，button按钮触发提交 事件)
    $("#form_login").on('submit', function (e) {
        console.log($(this).serialize());
        //阻止表单提交
        e.preventDefault();
        //发送ajax
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),

            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //提交信息 保存token。跳转页面
                layer.msg("恭喜您，登陆成功");
                localStorage.setItem('token', res.token);
                location.href = "/index.html"
            }
        });
    })
})