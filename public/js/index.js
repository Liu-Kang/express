/**
 * 首页
 */
$(document).ready(function(){
	indexInit();
});

function indexInit(){
	var oData = {
		name:'lk',
		type:4
	}
	$.ajax({
        url:'/getFriends',
        type:'post',
        data:oData,
        dataType:'json',
        success:function(result){
            if(result.errorCode === 0){
            	for(var i = 0;i < result.record.length; i++){
            		$('.record-list').append('<li>'+result.record[i]+'</li>');
            	}
            }
        },
        error:function(){
        	alert('请求错误');
        }
    });
}