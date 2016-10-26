/**
 * @func 用户注册
 * @author liukang
 * @date 2016/10/24
 */
var sizeRate = document.documentElement.clientWidth / 375.0 * 100;
function registInit(){
    $('html').css('font-size',sizeRate);
    loginSubmit();
}

/**
 * 注册提交
 */
function loginSubmit(){
    $('#loginSubmit').click(function(){
        if($(this).attr('data-ajax') === 1){
            return;
        }

        var oData = {
            username:$.trim($('#username').val()),
            password:$.trim($('#password').val())
        }

        if( !usernameCheck(oData.username) ){
            return false;
        }
        if( !passwordCheck(oData.password) ){
            return false;
        }

        $(this).attr('data-ajax',1);
        $.ajax({
            url:'/login/checkLoginInfo/',
            data:oData,
            type:'get',
            dataType:'json',
            success:function(result){
                if(result.errorCode === 0){
                    alertBox('登录成功');
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

$(document).ready(function(){
    registInit();
});