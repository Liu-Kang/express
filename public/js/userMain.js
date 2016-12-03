/**
 * 用户主页
 */
var sizeRate = document.documentElement.clientWidth / 375.0 * 100;
function indexInit(){
    $('html').css('font-size',sizeRate);
    goRecordDetail();
    recordOperate();
    deleteRecord();
    updateRecord();
}

function goRecordDetail(){
	$('.record-title').click(function(){
		var recordid = $(this).parents('li').attr('data-rid');
		window.location.href = window.location.origin + '/record/' + recordid;
	});
}

/**
 * record操作
 */
function recordOperate(){
	$('.record-op').click(function(event){
		var $this = $(this);
		var $op = $this.parents('li').find('.record-op-list');
		if($op.css('display') == 'none'){
			$('.record-op-list').hide();
			$op.show();
		}else{
			$op.hide();
		}
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
			url:'/userdeal/deleteRecord/',
			type:'GET',
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

/**
 * 修改record
 */
function updateRecord(){
	$('.record-update').click(function(event){
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
			url:'/userdeal/updateRecord/',
			type:'GET',
			data:oData,
			dataType:'json',
			success:function(result){
				if(result.errorCode === 0){
					window.location.href = window.location.origin + '/edit/dynamic/?update=' + result.rid;
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