// 入口函数
$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    var options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 2.选择文件
    $("#btnChooseImage").on("click", function () {
        $("#file").click();
    })

    //3.修改裁剪区域
    $("#file").on("change", function (e) {
        //获取选择的图片文件 this也可以
        var file = e.target.files[0]
        // 非空效验
        if (file === undefined) {
            return layui.msg("请选择图片！")
        }
        //把 file在内存中生成一个地址
        var newImgURL = URL.createObjectURL(file)
        //重新渲染图片区域
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    });

    //4.上传头像
    $("#btnUpload").on('click', function () {
        //获取base64 类型文件的头像(字符串)
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        console.log(dataURL)
        console.log(typeof dataURL)
        //发送ajax
        $.ajax({
            method: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },

            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("恭喜您，更换头像成功");
            }
        })
    })


})



