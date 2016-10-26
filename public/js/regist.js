/**
 * @func 用户注册
 * @author liukang
 * @date 2016/10/23
 */
var sizeRate = document.documentElement.clientWidth / 375.0 * 100;
function registInit(){
    $('html').css('font-size',sizeRate);
    registSubmit();
}

/**
 * 注册提交
 */
function registSubmit(){
    $('#regSubmit').click(function(){
        if($(this).attr('data-ajax') === 1){
            return;
        }

        var oData = {
            username:$.trim($('#username').val()),
            cellphone:$.trim($('#cellphone').val()),
            password:$.trim($('#password').val()),
            rePassword:$.trim($('#rePassword').val()),
            sex:$('[name="sex"]:checked').val()
        }

        if( !usernameCheck(oData.username) ){
            return false;
        }
        if( !phoneCheck(oData.cellphone) ){
            return false;
        }
        if( !passwordCheck(oData.password) ){
            return false;
        }
        if( !rePasswordCheck(oData.rePassword) ){
            return false;
        }

        $(this).attr('data-ajax',1);
        $.ajax({
            url:'/regist/submit/',
            data:oData,
            type:'get',
            dataType:'json',
            success:function(result){
                if(result.errorCode === 0){
                    alertBox('注册成功');
                    window.setTimeout(function(){
                        window.location.href = result.url;
                    },2000);
                }else{
                    $('#error').text(result.errorMsg).show();
                }
            },
            error:function(){
                alertBox('服务器出问题了');
            },
            complete:function(){
                $(this).attr('data-ajax',0);
            }
        })
    });
}

/**
 * 用户名校验
 */
function usernameCheck(name){
    if(name == ''){
        $('#error').text('请输入用户名').show();
        return false;
    }
    if(name.length > 10){
        $('#error').text('用户名不能超过10个字').show();
        return false;
    }
    return true;
}

/**
 * 手机号码校验
 */
function phoneCheck(phone){
    var reg = /^1[34578]\d{9}$/;
    if(phone == ''){
        $('#error').text('请输入手机号码').show();
        return false;
    }
    if(!reg.test(phone)){
        $('#error').text('请输入正确的手机号码').show();
        return false;
    }
    return true;
}

/**
 * 密码校验
 */
function passwordCheck(psw){
    if(psw == ''){
        $('#error').text('请设置密码').show();
        return false;
    }

    if(psw.length < 6 && psw.length > 12){
        $('#error').text('密码长度为6-12位字符').show();
        return false;
    }
    return true;
}

/**
 * 重复密码校验
 */
function rePasswordCheck(repsw){
    var psw = $.trim($('#password').val());
    if(repsw == ''){
        $('#error').text('请确认密码').show();
        return false;
    }
    if(repsw !== psw){
        $('#error').text('确认密码输入错误').show();
        return false;
    }
    return true;
}

$(document).ready(function(){
    registInit();
});