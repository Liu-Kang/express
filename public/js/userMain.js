/**
 * 用户主页
 */
var sizeRate = document.documentElement.clientWidth / 375.0 * 100;
function indexInit(){
    $('html').css('font-size',sizeRate);
    goRecordDetail();
    deleteRecord();
}

function goRecordDetail(){
	$('.record-sg').click(function(){
		var recordid = $(this).attr('data-rid');
		window.location.href = window.location.origin + '/record/' + recordid;
	});
}

/**
 * 删除record
 * @return {[type]} [description]
 */
function deleteRecord(){
	$('.record-delete').click(function(event){
		event.stopPropagation();
		event.preventDefault();
		var $this = $(this);
		var $li = $this.parents('li');

		if( $this.attr('data-ajax') == '1' ){
			return false;
		}

		var oData = {
			rid:$li.attr('data-rid')
		};

		$this.attr('data-ajax','1');
		$.ajax({
			url:'/user/deleteRecord/',
			type:'POST',
			data:oData,
			dataType:'json',
			success:function(result){
				if(result.errorCode === 0){
					$li.css({
						'-webkit-transition':'-webkit-transform 0.3s linear,opacity 0.3s linear',
						'-webkit-transform':'translate(' + $(window).width() + 'px,0)',
						'opacity':'0'
					});
					window.setTimeout(function(){
						$li.remove();
					},300);
				}else{
					alertBox(result.errorMsg);
				}
			},
			error:function(){
				alertBox('操作失败');
			},
			complete:function(){
				$this.attr('data-ajax','0');
			}
		})
	});
}

$(document).ready(function(){
    indexInit();
});