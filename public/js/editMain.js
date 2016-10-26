/**
 * 编辑新的express
 */
var sizeRate = document.documentElement.clientWidth / 375.0 * 100;
function indexInit(){
    $('html').css('font-size',sizeRate);
}

$(document).ready(function(){
    indexInit();
});