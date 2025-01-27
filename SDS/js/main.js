$(document).ready(function(){
// GALLERY PHOTO DESCRIPTION
    $('.showcase_gallery a').hover(
        function(){
            $(this).find('span').stop().fadeTo(300,1);
        },
        function(){
            $(this).find('span').stop().fadeTo(300,0);
		});

// SUPERDROP CARLIST HOVER STUFF
	$('.superdropdown .cars_list .item .img, .superdropdown .cars_list .item .name, .superdropdown .cars_list .badge').mouseover(function(){
		$(this).parents('.item').addClass('hover');
	});
	$('body').on('mouseleave', '.superdropdown .cars_list .item.hover', function(){
		$('.superdropdown .cars_list .item.hover').removeClass('hover');
	});

// INPUT FOCUS
	$('body').on('focus', 'input[type=text], input[type=email], input[type=password], input[type=phone], input[type=search], textarea', function(){
		$(this).addClass('hasfocus');
	});
	$('body').on('blur', 'input[type=text], input[type=email], input[type=password], input[type=phone], input[type=search], textarea', function(){
		$(this).removeClass('hasfocus');
	});

// 404 content height - 100% height of "forever alone Ford in the desert" image
	if($('.p404').length){
		var content404Correction = /*

			well, here must be a header height: $('header.main').height()
			but it may be different when loading (before all fonts loaded there can be two lines in the very first menu block)
			so we'll use a default height for header - 63px

			*/ 63 + parseInt($('.main_content').css('padding-top')) + parseInt($('.main_content').css('padding-bottom'));
		var winHeight = $(window).height();
		var cont12Height = $('.main_content .container_12').innerHeight();
		var content404Height = winHeight - content404Correction;

		if(content404Height > cont12Height){$('.main_content').height(content404Height);}

		$(window).resize(function(){
			var winHeight = $(window).height();
			var content404Height = winHeight - content404Correction;
			if(content404Height > cont12Height){$('.main_content').height(content404Height);}
		});

	}

// header search field
	var searchSlideSpeed = 300;
	$('.searchfield input[type=text], .searchfield input[type=search]').focus(function(){
		var searchPlaceholder = $(this).attr('data-placeholder');
		var defFieldWidth = $(this).css('width');
		var defFieldParentWidth = $(this).parents('.searchfield').css('width');

		$(this).attr('data-width', defFieldWidth).stop().animate({'width':307},searchSlideSpeed);
		$(this).parents('.searchfield').attr('data-width', defFieldParentWidth).addClass('opened').stop().animate({'width':369},searchSlideSpeed, function(){$(this).find('input[type=text], input[type=search]').attr('placeholder', searchPlaceholder);});
	});
	$('.searchfield input[type=text], .searchfield input[type=search]').blur(function(){
		var defFieldWidth = $(this).attr('data-width');
		var defFieldParentWidth = $(this).parents('.searchfield').attr('data-width');

		$(this).stop().animate({'width':defFieldWidth},searchSlideSpeed);
		$(this).parents('.searchfield').stop().animate({'width':defFieldParentWidth},searchSlideSpeed, function(){$(this).removeClass('opened');}).find('input[type=text], input[type=search]').removeAttr('placeholder');
	});

// another_sub
function makeSubMargin(){
	$('.another_sub, .superseparator').each(function() {
		var winWidth = $('#main_wrapper').width(),
			subWidth = $(this).parents('.container_12').innerWidth(),
			subMargin = 0 - (winWidth - subWidth + 40)/2;
		$(this).css({'margin-left':subMargin, 'margin-right':subMargin});
    });
}

	makeSubMargin();
	$(window).resize(makeSubMargin);

// price table accordeon
	$('.price_accorderon .acc_content').hide();
	var priceSlideSpeed = 300;
	$('.price_accorderon .show_acc').click(function(){

		if(!$(this).hasClass('opened') && !$(this).hasClass('hold') ){
			$(this).addClass('opened hold').next('.acc_content').stop().slideDown(priceSlideSpeed, function(){$('.price_accorderon .hold').removeClass('hold'); headerParameters();});
		}
		else if (!$(this).hasClass('hold')){
			$(this).removeClass('opened').addClass('hold').next('.acc_content').stop().slideUp(priceSlideSpeed, function(){$('.price_accorderon .hold').removeClass('hold'); headerParameters();});
		}
		return false;
	});

	// some random accorderon

	$('.accorderon .acc_content ').hide();
	$('.accorderon .moar').click(function(){

		if(!$(this).hasClass('opened') && !$(this).hasClass('hold') ){
			$(this).addClass('opened hold').next('.acc_content').stop().slideDown(priceSlideSpeed, function(){$('.accorderon .hold').removeClass('hold')});
		}
		else if (!$(this).hasClass('hold')){
			$(this).removeClass('opened').addClass('hold').next('.acc_content').stop().slideUp(priceSlideSpeed, function(){$('.accorderon .hold').removeClass('hold')});
		}
		return false;
	});

	$('.accorderon .show_acc').click(function(){

		if(!$(this).hasClass('opened') && !$(this).hasClass('hold') && !$(this).hasClass('moar')){
			$(this).addClass('opened hold').parent().next('.acc_content').stop().slideDown(priceSlideSpeed, function(){$('.accorderon .hold').removeClass('hold')});
		}
		else if (!$(this).hasClass('hold') && !$(this).hasClass('moar')){
			$(this).removeClass('opened').addClass('hold').parent().next('.acc_content').stop().slideUp(priceSlideSpeed, function(){$('.accorderon .hold').removeClass('hold')});
		}
		return false;
	});

// callback
    $('.callback_form_wrap').hide().height('auto');
    var callbackSpeed = 300;
$(document).on('click','.callback',function(){

        var uppernavHeight = $('.uppernav').innerHeight();

        if(!$(this).hasClass('opened')){
            $('.callback_form_wrap').css({'top':uppernavHeight}).stop(true,true).slideDown(callbackSpeed);
            $(this).addClass('opened');
        }
        else {
            $('.callback_form_wrap').stop(true,true).slideUp(callbackSpeed);
            $(this).removeClass('opened');
        }
    });

// label link
	$('label a').click(function(){
		var href = $(this).attr('href');
		window.location = href;

		return false;

	});

// show_order_form
	$('.show_order_form').click(function(){
		if(!$('.show_order_form').hasClass('active')){
			$('.show_order_form').addClass('active');
			$('.order_this_car .order_form').show();
		}
		else {
			$('.show_order_form').removeClass('active');
			$('.order_this_car .order_form').hide();
		}

		return false;
	});

// SORT STUFF
	$('.sort_options a').click(function(){
		$('#sort_by').val($(this).attr('data-sort-target'));

		if($(this).hasClass('desc') && !$(this).hasClass('current')){
			$(this).parents('.sort_options').find('.current').removeClass('current');
			$(this).addClass('current');
			$('#sort_direction').val('desc');
		}
		else if($(this).hasClass('desc') && $(this).hasClass('current')){
			$(this).removeClass('desc').addClass('asc');
			$('#sort_direction').val('asc');
		}
		else if($(this).hasClass('asc') && !$(this).hasClass('current')){
			$(this).parents('.sort_options').find('.current').removeClass('current');
			$(this).addClass('current');
			$('#sort_direction').val('asc');
		}
		else if($(this).hasClass('asc') && $(this).hasClass('current')){
			$(this).removeClass('asc').addClass('desc');
			$('#sort_direction').val('desc');
		}

		return false;
	});

// ~~~~~~~~~~~~~~~~~~~~~~~~

// crossbrowser placeholder in forms
	if(!Modernizr.input.placeholder) {
		var phTarget = $('input.placeholder');

		phTarget.each(function(){
			if($(this).val() == '') {
				thisPlaceholder = $(this).attr('placeholder');
				$(this).val(thisPlaceholder);
			}
		});

		phTarget.focus(function(){
			if($(this).val() == $(this).attr('placeholder')) {
				$(this).val('');
			}
		});
		phTarget.blur(function(){
			if($(this).val() == '') {
				thisPlaceholder = $(this).attr('placeholder');
				$(this).val(thisPlaceholder);
			}
		});

		phTarget.parents('form').submit(function(){
			if($(this).val() == $(this).attr('placeholder')) {
				//return false;
			}
		});
	}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// TOOLTIPS AND INFO POSITION
	$(document).click(function(event) {
		if ($(event.target).closest('.terms_i.opened, .terms_wrap').length) return;
		$('.terms_i.opened').removeClass('opened').find('.terms_wrap').removeClass('right').hide();
		event.stopPropagation();
	});

// show price plate
	$('.noslide .info .dotted').click(function(){
		if(!$(this).hasClass('active')){
			$(this).addClass('active').parents('.info').find('.price_plate').show();
		}
		else $(this).removeClass('active').parents('.info').find('.price_plate').hide();
	});

	$(document).click(function(event) {
		if ($(event.target).closest('.info .dotted, .price_plate').length) return;
		$('.info .dotted.active').removeClass('active').parents('.info').find('.price_plate').hide();
		event.stopPropagation();
	});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// COLORPICKER
	if($('.colorpicker').length){
		var colpicSpeed = 420;
		$('.colpic_images .img_item').hide();
		$('.colpic_palette').addClass('hold');
		$('.colpic_images .img_item').eq(0).addClass('current').fadeIn(colpicSpeed, function(){$('.colpic_palette').removeClass('hold')});
		$('.colpic_palette .p_item').eq(0).addClass('current');
	}

	$('.colpic_palette .p_item').click(function(){
		if(!$(this).hasClass('current')){
			var targetColor = $(this).index();
			$('.colpic_palette').addClass('hold');
			$('.colpic_palette .p_item.current').removeClass('current');
			$(this).addClass('current');
			$('.colpic_images .img_item.current').removeClass('current').fadeOut(colpicSpeed);
			$('.colpic_images .img_item').eq(targetColor).addClass('current').fadeIn(colpicSpeed, function(){$('.colpic_palette').removeClass('hold')});
		}
	});

// SHOWCASE ODD ROWS AND OTHER STUFF
	$('.showcase .info_row:nth-child(odd)').addClass('odd');

// DEFAULT TABLES STYLES
	$('article .grid_8').find('table').each(function(){
		if(!$(this).attr('class')) {
			$(this).addClass('default zebra hasborders');
		}
	})

// TABLE ODD/EVEN
	$('.zebra, .tab_car_info, .tab_car_info').each(function(){
		$(this).find('tr:even').addClass('even');
		$(this).find('tr:odd').addClass('odd');
	})

// NAV TABS STUFF

	$('.show_tabs .tab_item').each(function(){$(this).addClass('hideme');});

	if($('.subnav_menu.tabs .tab_active').length){
		var targetTab = $('.subnav_menu.tabs .tab_active a').attr('href');
		$(targetTab).addClass('tab_active').removeClass('hideme');
	}
	else if($('.subnav_menu.tabs').length){
		var targetTab = $('.subnav_menu.tabs li:first-child a').attr('href');
		$(targetTab).addClass('tab_active').removeClass('hideme');
	}

	$('.subnav_menu.tabs a').click(function(){
		if(!$(this).parent('li').hasClass('tab_active')){
			var targetTab = $(this).attr('href');
			$('.subnav_menu.tabs .tab_active').removeClass('tab_active');
			$('.show_tabs .tab_active').addClass('hideme').removeClass('tab_active');
			$(this).parent('li').addClass('tab_active');
			$(targetTab).addClass('tab_active').removeClass('hideme');
		}

		return false;
	});

// COMPARE TABLES STUFF

	$('.compare .tab_car_compare tr').each(function(){
		if($(this).index() != 0){
			var targetTr = $(this).attr('data-target-tr');
			var targetTable = $(this).attr('data-target-table');

			var thisTrNewHeight = $(targetTable + ' tr').eq(targetTr).find('td:first').height();
			$(this).find('td').height(thisTrNewHeight);
		}

	});

// INSIDE TABS STUFF

function showCompare(compareTr){
	$('.compare .tab_car_compare tr').each(function(){
		if($(this).index() != 0 && $(this).attr('data-target-table') == compareTr) {
			$(this).show();
		}

		else if($(this).index() != 0) {
			$(this).hide();
		}

	});
}

	$('body').on('click', '.callback_fader', function(){
		if(!$(".callback_form_wrap").is(':hidden'))
			$("a.callback").trigger('click');

		$(this).fadeTo(100, 0, function(){
			$(this).remove();
		});
	});

	$('body').on('click', 'a[href="#_callback"]', function(){
        if($("a.callback").length > 0)
            $("a.callback").trigger('click');
        else
            $(".phones_drop_trigger").trigger("click");
		$("body").append("<div class='callback_fader'></div>");
		setTimeout(function(){ // Переносимся в начало страницы
			window.location.href = '#';
		}, 100);
	});

 $('.inside_tabs .i_tab').each(function(){$(this).addClass('hideme');});

	var tabHash = window.location.hash;

	if($('.no_tabs_handler').length == 0) {
		// hey, Hash, I'm watching you!

		if(tabHash !== '' && tabHash.length ){ // Fixed from $(tabHash).length
			try{
				var targetTab = $('a[href='+tabHash+']');
				$('html, body').stop().scrollTop(targetTab.offset().top - 70);

				targetTab.closest('.i_tabs_select').find('.current').removeClass('current');
				targetTab.parent().addClass('current');
			}
			catch(e){}
		}
 }

 /***/

	$('.inside_tabs').each(function(){
		if($(this).find('.i_tabs_select .current').length){
			var targetTab = $(this).find('.current a').attr('href');
			$(targetTab).addClass('current').removeClass('hideme');
			if($(this).parents('.compare').length){showCompare(targetTab);}
		}
		else {
			var targetTab = $(this).find('.i_tabs_select li:first-child a').attr('href');
			$(this).find('.i_tabs_select li:first-child').addClass('current');
			$(targetTab).addClass('current').removeClass('hideme');
			if($(this).parents('.compare').length){showCompare(targetTab);}
		}

	});

	$('.i_tabs_select a').click(function(){
		if(!$(this).parent('li').hasClass('current')){
			var targetTab = $(this).attr('href');

			var parent = ($(this).parents(".inside_tabs"))[0];

			$(parent).find(" > .i_tabs_select .current").removeClass('current');
			if($(parent).find(' > .i_tab.current').length != 0){ // Это фикс для главной страницы. Надо подумать как правильнее сделать.
				$(parent).find(' > .i_tab.current').addClass('hideme').removeClass('current');
			}
			else{
				$(parent).find('.i_tab.current').addClass('hideme').removeClass('current');
			}

			$(this).parent('li').addClass('current');
			$(targetTab).addClass('current').removeClass('hideme');
			if($(this).parents('.compare').length){showCompare(targetTab);}

			headerParameters(); // Запускает пересчёт header'ов в таблицах
		}

		return false;
	});

// CAR INFO TABLE TR SELECT
	$('.tab_tabs a').click(function(){
		var trTarget = $(this).attr('data-target');
		var trTabTarget = $(this).parents('.tab_tabs').next('.tab_car_info').find('tr');
		trTabTarget.each(function(){
			if(trTarget == 'tr_all'){
				$(this).show();
			}
			else {
				if(!$(this).hasClass(trTarget)){$(this).hide();}
				else $(this).show();
			}
		});

		$(this).parents('.tab_tabs').find('.current').removeClass('current');
		$(this).parent().addClass('current');

		return false;
	});

/* FORMS - HIDE LABEL ON FOCUS */

	var formLabels = $('.field input[type=text], .field input[type=email], .field input[type=password], .field input[type=phone], .field input[type=search], .field textarea');

	formLabels.each(function(i){
		$(this).blur();
		if($(this).val()!=''){
			$(this).next('label').css({'display':'none'});
		}
	});

	$('body').on('focus', '.field input[type=text], .field input[type=email], .field input[type=password], .field input[type=phone], .field input[type=search], .field textarea', function(){
		$(this).addClass('focus');
		$(this).next('label').css({'display':'none'});
	});

	$('body').on('blur', '.field input[type=text], .field input[type=email], .field input[type=password], .field input[type=phone], .field input[type=search], .field textarea', function(){
		$(this).removeClass('focus');
		if($(this).val()=='') $(this).next('label').css({'display':'block'});
	});

/* *************** */

// FORM LABELS AND INPUTS

	// Hide all styled checkboxes and radio
	$('label.styled').each(function(){
		$(this).prev('input').addClass('hideme');
		$(this).addClass('unchecked');
	});

	// In case of F5: mark all labels selected before
	$('input:checked').each(function(){
		$(this).next('label.styled').removeClass('unchecked').addClass('checked');
	});

// Foolproof
	$('input:checkbox, input:radio').click(function(){
		if(!$(this).parent().hasClass('disabled')){
			if($(this).is(':checked')){
				if($(this).is(':radio')){
					$(this).parents('.row').find('.styled.checked').removeClass('checked').addClass('unchecked');
				}
				$(this).next('.styled').addClass('checked').removeClass('unchecked');
				}
			else {
				$(this).next('.styled').removeClass('checked').addClass('unchecked');
			}
		}
	});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// info features stuff

$('.features .text').each(function() {
	if(($(this).height()+15) > $(this).find('.slidedown').innerHeight()){
		$(this).parents('.features').find('.moar_wrap').hide();
	}
});

$('.features .moar_wrap .moar').click(function(){
	var moarSlideSpeed = 250;

	if(!$(this).hasClass('opened')){
		var defaultHeight = $(this).parents('.features').find('.text').css('height');
		var targetHeight = $(this).parents('.features').find('.slidedown').innerHeight();
		$(this).addClass('opened').parents('.features').find('.text').stop().animate({'height':targetHeight},moarSlideSpeed);
		$(this).attr('data-default-height',defaultHeight);
	}

	else {
		var targetHeight = $(this).attr('data-default-height');
		$(this).removeClass('opened').parents('.features').find('.text').stop().animate({'height':targetHeight},moarSlideSpeed);
	}

	return false;
});

/* InnerSlidedown */
$(".slidedown_wrap .special").click(function(){
	var moarSlideSpeed = 250;

	if(!$(this).hasClass('opened') && !$(this).hasClass('hold')){
		$(this).addClass('opened hold').parent().next(".slidedown_wrap").stop().slideDown(moarSlideSpeed,function(){$('.full_slidedown .hold').removeClass('hold');});
	}

	else if(!$(this).hasClass('hold')){
		$(this).addClass('hold').parent().next(".slidedown_wrap").stop().slideUp(moarSlideSpeed,function(){$('.full_slidedown .hold').removeClass('hold opened');});
	}
});

	/*** NEWS ITEMS HEIGHT ***/

	function sortDecrease(i, ii) { // По убыванию
	    if (i > ii) return -1;
	    else if (i < ii) return 1;
	    else return 0;
	}
	$('.container_12.newsblock').each(function() {
	        var thisNewsItem = $(this).find('.news_item'),
	            numberOfNews = thisNewsItem.length,
	            newsHeights = [];

	        thisNewsItem.each(function(){
	            var currentItemHeight = $(this).height();
	            newsHeights.push(currentItemHeight);
	        });

	        newsHeights.sort(sortDecrease);
	        thisNewsItem.height(newsHeights[0]);
	});

	$("a[href*='#']").click(function(e){
		var link = $(this).attr("href");
		var split = link.split("#");

		var hash = split[1];
		var url  = split[0];

		if(window.location.pathname === url){
			$("li.nohash a[href=#" + hash + "]")
				.click();
		}
	});

	$(document).on('click','.field label',function(){
	    $(this).prev('input').focus();
	});

	// MULTILEVEL ROWSPAN STUFF
$('table.zebra').each(function(){

	if($(this).find('td[rowspan]').length){

		$(this).addClass('purum');

		var trCount = $(this).find('tr').length,
		temp=0,
		zebraTarget = $(this).find('tr'),
		firstTd = 'td_white',
		secondTd = 'td_coffee'

		for (var i = 0; i <= trCount-1; i++){
			if(zebraTarget.eq(i).find('td[rowspan]').length){

				var tdSpan =
				parseInt(zebraTarget.eq(i).find('td[rowspan]').attr('rowspan'));

				if ( temp == 0 ){
				zebraTarget.eq(i).addClass(firstTd);


				for (var q = 1; q <= tdSpan; q++){
				x = i+q-1;
				zebraTarget.eq(x).addClass(firstTd+' row'+q);
				}
				temp = 1;
				i = i + tdSpan-1;
				}
				else {
				zebraTarget.eq(i).addClass(secondTd);
				for (var q = 1; q <= tdSpan; q++){
				x = i+q-1;
				zebraTarget.eq(x).addClass(secondTd+' row'+q);
				}
				temp = 0;
				i = i + tdSpan-1;
				}
			}
				else{
				if ( temp == 0 ){
				zebraTarget.eq(i).addClass(firstTd);
				temp = 1;
				}
				else {
				zebraTarget.eq(i).addClass(secondTd);
				temp = 0;
				}
			}
		}
	}
});
});

$(document).ready(function(){ // Необходимо для переходов по табам которые в блоке .subnav_menu.sub.tabs
	try{
		var tabHash = window.location.hash;
		if($(".subnav_menu.sub.tabs").length != 0){
			if(tabHash.length != 0){
				$(".subnav_menu.sub.tabs .current") // Фикс, т.к. там в начале устанавливается другой стиль
					.removeClass("current");

				$("a[href=" + tabHash + "]")
					.click();
			}
		}
	}
	catch(e){
	}
});

$(document).ready(function(){
// city count

// choose city
if($('.nfl_city_list_wrapper').length){

	//$('.nfl_city_list').hide();

//	in case of F5
	nflCityChoose('.nfl_city_list_wrapper');

	$('.select_click_trigger').on('click',function(){
		var cityParent = $(this).parents('.nfl_city_list_wrapper');

		if(cityParent.hasClass('city_opened')){
			//$('.city_opened .nfl_city_list').hide();
			$('.city_opened').removeClass('city_opened');
		}
		else {
			//$('.city_opened .nfl_city_list').hide();
			$('.city_opened').removeClass('city_opened');
			cityParent.addClass('city_opened');
			//cityParent.find('.nfl_city_list').show();
			//$('.nfl_city_list').mCustomScrollbar("update");
		}
	});

//  not so good imitation of hover
	$('.select_click_trigger').hover(function(){
		$(this).parents('.nfl_city_list_wrapper').find('.arrow').addClass('hovered');
	},function(){
		$(this).parents('.nfl_city_list_wrapper').find('.arrow').removeClass('hovered');
	});

	$('body').on('click', '.nfl_city_list label', function(){
	//$('.nfl_city_list label').on('click',function(){
		nflCityChoose('.city_opened');
	});


// - stop propagation
	$(document).click(function(event) {
		if ($(event.target).closest('.nfl_city_list_wrapper.city_opened').length ) return;
		// hide sub
		//$('.city_opened .nfl_city_list').hide();
		$('.city_opened').removeClass('city_opened');
		event.stopPropagation();
	});
}

// START SCROLL - VERTICAL
	$(".nfl_city_list").mCustomScrollbar({
		theme:"dark-thick",
		mouseWheel:true,
		scrollInertia: 400,
		mouseWheelPixels: 162,
		advanced:{
//					autoExpandHorizontalScroll:true,
					updateOnContentResize:true
		},
		scrollButtons:{
			enable:false,
			scrollSpeed: 150
		},
		callbacks:{
			onScroll:function(){}
		}
	});

});

var isIE9 = document.all && document.addEventListener && !window.atob;
// IE10
var isIE10 = document.all && window.atob;
// IE11
var isIE11 = '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style;

if(isIE9 || isIE10){var ieCorrection = 23;}
else if(isIE11){var ieCorrection = 0 - 5;}
else {var ieCorrection = 0;}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function headerParameters(){
$('.float_header_wrapper').remove();

$('.float_header').each(function(){

if(!$(this).parents('.i_tab.hideme').length){

 // how many TR?
 if($(this).find('tr').length > 10){
  // get table offset
  var floatHeaderPos = $(this).offset().top,
  // get table's end offset minus the gap
   floatHeaderStop = floatHeaderPos + $(this).height() - 300;

  // set cells width
  $(this).find('tr:first-child th,.float_header tr:first-child td').each(function(){$(this).width($(this).width())});
  // get content
  var floatHeadContent = $(this).find('tr:first-child').html(),
  // get content height
   floatHeadHeight = $(this).find('tr:first-child').innerHeight();
  // get table classes
   floatHeadClasses = $(this).attr('class'),
  // get table width
   floatHeadWidth = $(this).parent().width();


  // clone first row (header). display:none by default.
  $('body').append('<div class="float_header_wrapper" data-top="'+floatHeaderPos+'" data-bottom="'+floatHeaderStop+'" data-height="'+floatHeadHeight+'"><table style="width:'+floatHeadWidth+'px;" class="'+floatHeadClasses+' float_header_itself"><tr>'+floatHeadContent+'</tr></table></div>');
 }
 }
});

}

// fix header on scroll
    function headerFix(){  // Так же запускает в табах
  $('.float_header_wrapper').each(function(){
   var windowScroll = $(window).scrollTop(),
    floatHeaderPosCurrent = parseInt($(this).attr('data-top')),
    floatHeaderStopCurrent = parseInt($(this).attr('data-bottom')),
    floatHeadHeightCurrent = parseInt($(this).attr('data-height'));

   if(windowScroll > (floatHeaderPosCurrent+ieCorrection) && windowScroll < (floatHeaderStopCurrent-floatHeadHeightCurrent+ieCorrection)){
    $(this).css({'top':0}).show();
   }
   else if(windowScroll >= (floatHeaderStopCurrent-floatHeadHeightCurrent+ieCorrection)){
    $(this).css({'top':(floatHeaderStopCurrent-floatHeadHeightCurrent+ieCorrection)-windowScroll}).show();
   }
   else {
    $(this).css({'left':'auto','top':0}).hide();
   }
  });
    }

$(document).ready(function(){
	headerParameters();
    headerFix();
    $(window).scroll(headerFix);

// header position on horisontal scroll
    var headCorrection = $(this).scrollLeft();
    $('.float_header_wrapper').css({left:'-'+headCorrection+'px'});

    $(window).scroll(function(){
        var headCorrection = $(this).scrollLeft();
        $('.float_header_wrapper').css({left:'-'+headCorrection+'px'});
    });
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

$(document).ready(function(){
	$('nav.main .hasdrop .dropdown').show().slideUp(0);
	$('nav.main .hasdrop').hover(function(){
		$(this).find('.dropdown').stop().slideDown(300);
	}, function(){
		$(this).find('.dropdown').stop().slideUp(100);
	});
});

/* Телефоны */

$(document).ready(function(){
    $('.phones_dropdown_wrapper.simple_slidedown').each(function() {
        var simpleHeight = $(this).find('.sl_content').innerHeight();
		$(this).attr('data-height',simpleHeight);

        if(!$(this).hasClass('opened'))
            $(this).find('.sl_content').css({'height':0});
    });

    $('.phones_dropdown_wrapper.simple_slidedown .trigger').click(function(){
        var simpleSlideSpeed = 250;
		if(!$(this).parents('.simple_slidedown').hasClass('opened')){
			var targetHeight = $(this).parents('.simple_slidedown').attr('data-height');
			$(this).parents('.simple_slidedown').parent().find('.simple_slidedown.opened').removeClass('opened').find('.sl_content').stop().animate({'height':0},simpleSlideSpeed,function(){
				$(this).find('.opened').removeClass('opened');
			});

			$(this).parents('.simple_slidedown').addClass('opened')
				.find('.sl_content').stop().animate({'height':targetHeight},simpleSlideSpeed, function(){
					$(this).height('auto');
				});
		}

		else {
			$(this).parents('.simple_slidedown').removeClass('opened').find('.sl_content').stop().animate({'height':0},simpleSlideSpeed,function(){
				$(this).find('.opened').removeClass('opened');
			});
		}

		if($(this).is('a')) {return false;}
    });
});

$(document).ready(function(){
// equal heights
    function equalHeight(group) {
        var tallest = 0;
        group.css({'height':'auto','min-height':'0'});
        group.each(function() {
            var thisHeight = $(this).height();
            if($(this).hasClass('calls_shown')){thisHeight = thisHeight-30;}
            if(thisHeight > tallest) {
                tallest = thisHeight;
            }
        });
        group.css('min-height',tallest);
    }
    equalHeight($('.phones_col'));
//~~~~~~~~~~~~~~~~~~~~~~~~~
$(window).load(function(){
    $('.phones_dropdown_wrapper').addClass('loaded');
});
$(document).on('click','.js_calls_show',function(){
        if(!$(this).parents('.calls_shown').length){
            $('.calls_shown').toggleClass('calls_shown').find('.js_calls_show_wrapper').toggleClass('hideme');
        }
        $(this).parents('.phones_col').toggleClass('calls_shown').find('.js_calls_show_wrapper').toggleClass('hideme');

        equalHeight($('.phones_col'));
    });

	$(document).click(function(event) {
		if ($(event.target).parents('.phones_dropdown_wrapper').length ) return;
		$(".phones_dropdown_wrapper.opened .phones_drop_trigger").trigger("click");
	});
});

// Работа с хешем для _callback
$(window).load(function(){
    var tabHash = window.location.hash;

    if(tabHash === '#_callback'){ // Open Callback Form
        if($("a.callback").length > 0)
            $("a.callback").trigger('click');
        else
            $(".phones_drop_trigger").trigger("click");
        $("body").append("<div class='callback_fader'></div>");

        setTimeout(function(){ // Переносимся в начало страницы
            window.location.href = '#';
        }, 100);
    }
});

// Пляшущие цены
$(document).ready(function(){
    var list = $(".main_cars_list");

    if(list.length == 1){
        var isStrike = $(list).find('strike');

        if(isStrike.length > 0){
            $.each($(list).find(".price"), function(key, price){
                var isStrike = ($(price).find('strike').length == 1);

                if(!isStrike)
                    $(price).prepend("<div class='strike_price'>&nbsp;</div>");
            });
        }
        else{
            if($(list).find(".spec_price").length > 0)
                $(list).find("strong").css("position", "absolute").css("bottom", 36 + "px");

            $(list).find('.item').css('height', 213 + "px");
        }
    }
});

//fancybox для текстовых ссылок
$(document).ready(function(){
    $('.fancybox_txt').fancybox();
});