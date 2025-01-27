function getURLParameter(name) {
    return decodeURI(
            (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]
            );
}

(function ($) {
    $.fn.flowtype = function (options) {

// Establish default settings/variables
// ====================================
        var settings = $.extend({
            maximum: 9999,
            minimum: 1,
            maxFont: 9999,
            minFont: 1,
            fontRatio: 35
        }, options),
// Do the magic math
// =================
                changes = function (el) {
                    var $el = $(el),
                            elw = $el.width(),
                            width = elw > settings.maximum ? settings.maximum : elw < settings.minimum ? settings.minimum : elw,
                            fontBase = width / settings.fontRatio,
                            fontSize = fontBase > settings.maxFont ? settings.maxFont : fontBase < settings.minFont ? settings.minFont : fontBase;
                    $el.css('font-size', fontSize + 'px');
                };

// Make the magic visible
// ======================
        return this.each(function () {
            // Context for resize callback
            var that = this;
            // Make changes upon resize
            $(window).resize(function () {
                changes(that);
            });
            // Set changes on load
            changes(this);
        });
    };
}(jQuery));

function ajax(form) {
    var this_form = $(form);
    var msg = this_form.serialize();
    var url = "";
    if (this_form.attr('id') == 'gen_1') {
        url = "./discount.php";
    }
    if (this_form.attr('id') == 'gen_2') {
        url = "./review.php";
    }
    if (this_form.attr('id') == 'gen_3') {
        url = "./free_consultation.php";
    }

    $.ajax({
        type: "POST",
        url: url,
        data: msg,
        success: function (data) {
            this_form.hide(50);
            this_form.next(".results").html(data);
            this_form.next(".results").show();
        },
        error: function (xhr, str) {
            alert("Возникла ошибка!");
        }
    });
}

// Плагин ДО и ПОСЛЕ
$(function () {
    $('#compare_container').beforeAfter();
    $(".benefits .right ol>li").each(function (i, o) {
        $(o).addClass("item" + (i + 1));
    });
    $(".services li").each(function (i, o) {
        $(o).addClass("item" + (i + 1));
    });

    /*
     $(".short .item").shorten({
     "showChars" : '350',
     "moreText"  : "Подробнее",
     "lessText"  : "Скрыть текст",
     });
     */

});



$(document).ready(function () {

    if ($('.reviews .line img').length) {
        $('.reviews .line img').removeAttr('height width');
    }

    if ($('div.head-wrapper').length) {
        $('div.head-wrapper').remove();
    }

    if($('#sys_captcha').length){
        $('#sys_captcha').addClass('form-control');
    }

    $(".reviews .line:even").addClass("even");
    $(".reviews .line.even li:first-child").addClass("first");

    $('body').flowtype({
        minFont: 30,
        maxFont: 42
    });

    var maxHeight = 0, i = 1, maxI;
    $('.row.services div[class^="col"] .item .inner').each(function () {
        if (maxHeight === 0 || parseInt($(this).height()) > maxHeight) {
            maxHeight = parseInt($(this).height());
            maxI = i;
        }
        i++;
    });

    $('.row.services div[class^="col"] .item .inner').attr('style', 'min-height:' + (maxHeight ) + 'px');

    $('body').on('click', '.fancy', function () {
        $('body').flowtype({
            minFont: 30,
            maxFont: 42
        });
    });
});


// Выравнивание блоков по высоте
jQuery.fn.equalHeights = function () {
    var currentTallest = 0;
    jQuery(this).each(function () {
        if (jQuery(this).height() > currentTallest) {
            currentTallest = jQuery(this).height();
        }
    });
    jQuery(this).css({'min-height': currentTallest});
    return this;
};

jQuery(document).ready(function () {
    jQuery(".services li").equalHeights();
});

// Countdown
$(function () {


    $('#countdown').countdown({
        timestamp: ts,
        callback: function (days, hours, minutes, seconds) {
        }
    });
    $('#countdown2').countdown({
        timestamp: ts,
        callback: function (days, hours, minutes, seconds) {
        }
    });

});
// !end countdown

// Кнопка goTop
jQuery(function () {
    jQuery(window).scroll(function () {
        if (jQuery(this).scrollTop() != 0) {
            jQuery('#toTop').fadeIn();
        } else {
            jQuery('#toTop').fadeOut();
        }
    });
    jQuery('#toTop').click(function () {
        jQuery('body,html').animate({scrollTop: 0}, 800);
    });
    jQuery('.logo').click(function () {
        jQuery('body,html').animate({scrollTop: 0}, 800);
    });


    jQuery('.top-menu a.goTo1').click(function () {
        jQuery.scrollTo('#goTo1', 800, {over: -2.4});
    });
    jQuery('.top-menu a.goTo2').click(function () {
        jQuery.scrollTo('#goTo2', 800, {over: -2});
    });
    jQuery('.top-menu a.goTo3').click(function () {
        jQuery.scrollTo('#goTo3', 800, {over: -2});
    });
    jQuery('.top-menu a.goTo4').click(function () {
        jQuery.scrollTo('#goTo4', 800, {over: 1});
    });
    jQuery('.free-osmotr').click(function () {
        jQuery.scrollTo('#goTo2', 800, {over: -2});
    });



});

jQuery(document).ready(function ($) {
    var select = $('a[href$=".bmp"],a[href$=".gif"],a[href$=".jpg"],a[href$=".jpeg"],a[href$=".png"],a[href$=".BMP"],a[href$=".GIF"],a[href$=".JPG"],a[href$=".JPEG"],a[href$=".PNG"]');
    select.attr('rel', 'fancybox');
    select.fancybox();
});

jQuery(document).ready(function ($) {
    $(".fancy").fancybox({
        'padding': 0,
        'overlayOpacity': 0.9,
        'width': 900,
        'hideOnOverlayClick': true,
        'overlayColor': '#000',
        'hideOnContentClick': false
    });
});

jQuery.fn.notExists = function () { //Проверка на существование элемента
    return $(this).length == 0;
}



$(document).ready(function () {

    // Форма заказа скидки
    $('body').on('click', '.repeat_form', function (event) {
        event.preventDefault();
        $(this).parents('.results').prev("form").show();
        $(this).parents('.results').hide();
    });


    //Ajax отправка формы
    $(".send1").validation(//Валидация формы
            $(".name1").validate({
        test: "blank letters",
        placeholder: 'Имя',
        invalid: function () {
            if ($(this).nextAll(".error").notExists()) {
                $(this).after('<div class="error">Введите корректное имя</div>');
                $(this).nextAll(".error").delay(2000).fadeOut("slow");
                setTimeout(function () {
                    $(".name1").next(".error").remove();
                }, 2600);
            }
        },
        valid: function () {
            $(this).nextAll(".error").remove();
        }
    }),
            $(".phone1").validate({
        test: "blank digits minlength6 maxlength15 /^\+?([87](?!95[4-79]|99[^2457]|907|94[^0]|336|986)([348]\d|9[0-689]|7[0247])\d{8}|[1246]\d{9,13}|68\d{7}|5[1-46-9]\d{8,12}|55[1-9]\d{9}|55119\d{8}|500[56]\d{4}|5016\d{6}|5068\d{7}|502[45]\d{7}|5037\d{7}|50[457]\d{8}|50855\d{4}|509[34]\d{7}|376\d{6}|855\d{8}|856\d{10}|85[0-4789]\d{8,10}|8[68]\d{10,11}|8[14]\d{10}|82\d{9,10}|852\d{8}|90\d{10}|96(0[79]|17[01]|13)\d{6}|96[23]\d{9}|964\d{10}|96(5[69]|89)\d{7}|96(65|77)\d{8}|92[023]\d{9}|91[1879]\d{9}|9[34]7\d{8}|959\d{7}|989\d{9}|97\d{8,12}|99[^4568]\d{7,11}|994\d{9}|9955\d{8}|996[57]\d{8}|9989\d{8}|380[34569]\d{8}|381\d{9}|385\d{8,9}|375[234]\d{8}|372\d{7,8}|37[0-4]\d{8}|37[6-9]\d{7,11}|30[69]\d{9}|34[67]\d{8}|3[12359]\d{8,12}|36\d{9}|38[1679]\d{8}|382\d{8,9})$/",
        placeholder: 'Пример: 89317654321',
        invalid: function () {
            if ($(this).nextAll(".error").notExists()) {
                $(this).after('<div class="error">Только мобильный</div>');
                $(this).nextAll(".error").delay(2000).fadeOut("slow");
                setTimeout(function () {
                    $(".phone1").next(".error").remove();
                }, 2600);
            }
        },
        valid: function () {
            $(this).nextAll(".error").remove();
        }
    })
            );

    $(".send2").validation(//Валидация формы
            $(".name2").validate({
        test: "blank letters",
        placeholder: 'Имя',
        invalid: function () {
            if ($(this).nextAll(".error").notExists()) {
                $(this).after('<div class="error">Введите корректное имя</div>');
                $(this).nextAll(".error").delay(2000).fadeOut("slow");
                setTimeout(function () {
                    $(".name2").next(".error").remove();
                }, 2600);
            }
        },
        valid: function () {
            $(this).nextAll(".error").remove();
        }
    }),
            $(".phone2").validate({
        test: "blank digits minlength6 maxlength15 /^\+?([87](?!95[4-79]|99[^2457]|907|94[^0]|336|986)([348]\d|9[0-689]|7[0247])\d{8}|[1246]\d{9,13}|68\d{7}|5[1-46-9]\d{8,12}|55[1-9]\d{9}|55119\d{8}|500[56]\d{4}|5016\d{6}|5068\d{7}|502[45]\d{7}|5037\d{7}|50[457]\d{8}|50855\d{4}|509[34]\d{7}|376\d{6}|855\d{8}|856\d{10}|85[0-4789]\d{8,10}|8[68]\d{10,11}|8[14]\d{10}|82\d{9,10}|852\d{8}|90\d{10}|96(0[79]|17[01]|13)\d{6}|96[23]\d{9}|964\d{10}|96(5[69]|89)\d{7}|96(65|77)\d{8}|92[023]\d{9}|91[1879]\d{9}|9[34]7\d{8}|959\d{7}|989\d{9}|97\d{8,12}|99[^4568]\d{7,11}|994\d{9}|9955\d{8}|996[57]\d{8}|9989\d{8}|380[34569]\d{8}|381\d{9}|385\d{8,9}|375[234]\d{8}|372\d{7,8}|37[0-4]\d{8}|37[6-9]\d{7,11}|30[69]\d{9}|34[67]\d{8}|3[12359]\d{8,12}|36\d{9}|38[1679]\d{8}|382\d{8,9})$/",
        placeholder: 'Пример: 89317654321',
        invalid: function () {
            if ($(this).nextAll(".error").notExists()) {
                $(this).after('<div class="error">Только мобильный</div>');
                $(this).nextAll(".error").delay(2000).fadeOut("slow");
                setTimeout(function () {
                    $(".phone2").next(".error").remove();
                }, 2600);
            }
        },
        valid: function () {
            $(this).nextAll(".error").remove();
        }
    })
            );

    $(".send3").validation(//Валидация формы
            $(".name3").validate({
        test: "blank letters",
        placeholder: 'Имя',
        invalid: function () {
            if ($(this).nextAll(".error").notExists()) {
                $(this).after('<div class="error" style="top:105px">Введите корректное имя</div>');
                $(this).nextAll(".error").delay(2000).fadeOut("slow");
                setTimeout(function () {
                    $(".name3").next(".error").remove();
                }, 2600);
            }
        },
        valid: function () {
            $(this).nextAll(".error").remove();
        }
    }),
            $(".phone3").validate({
        test: "blank digits minlength6 maxlength15 /^\+?([87](?!95[4-79]|99[^2457]|907|94[^0]|336|986)([348]\d|9[0-689]|7[0247])\d{8}|[1246]\d{9,13}|68\d{7}|5[1-46-9]\d{8,12}|55[1-9]\d{9}|55119\d{8}|500[56]\d{4}|5016\d{6}|5068\d{7}|502[45]\d{7}|5037\d{7}|50[457]\d{8}|50855\d{4}|509[34]\d{7}|376\d{6}|855\d{8}|856\d{10}|85[0-4789]\d{8,10}|8[68]\d{10,11}|8[14]\d{10}|82\d{9,10}|852\d{8}|90\d{10}|96(0[79]|17[01]|13)\d{6}|96[23]\d{9}|964\d{10}|96(5[69]|89)\d{7}|96(65|77)\d{8}|92[023]\d{9}|91[1879]\d{9}|9[34]7\d{8}|959\d{7}|989\d{9}|97\d{8,12}|99[^4568]\d{7,11}|994\d{9}|9955\d{8}|996[57]\d{8}|9989\d{8}|380[34569]\d{8}|381\d{9}|385\d{8,9}|375[234]\d{8}|372\d{7,8}|37[0-4]\d{8}|37[6-9]\d{7,11}|30[69]\d{9}|34[67]\d{8}|3[12359]\d{8,12}|36\d{9}|38[1679]\d{8}|382\d{8,9})$/",
        placeholder: 'Пример: 89317654321',
        invalid: function () {
            if ($(this).nextAll(".error").notExists()) {
                $(this).after('<div class="error" style="top:165px">Только мобильный</div>');
                $(this).nextAll(".error").delay(2000).fadeOut("slow");
                setTimeout(function () {
                    $(".phone3").next(".error").remove();
                }, 2600);
            }
        },
        valid: function () {
            $(this).nextAll(".error").remove();
        }
    })
            );

    $(".send4").validation(//Валидация формы
            $(".name4").validate({
        test: "blank letters",
        placeholder: 'Имя',
        invalid: function () {
            if ($(this).nextAll(".error").notExists()) {
                $(this).after('<div class="error" style="top:105px">Введите корректное имя</div>');
                $(this).nextAll(".error").delay(2000).fadeOut("slow");
                setTimeout(function () {
                    $(".name4").next(".error").remove();
                }, 2600);
            }
        },
        valid: function () {
            $(this).nextAll(".error").remove();
        }
    }),
            $(".phone4").validate({
        test: "blank digits minlength6 maxlength15 /^\+?([87](?!95[4-79]|99[^2457]|907|94[^0]|336|986)([348]\d|9[0-689]|7[0247])\d{8}|[1246]\d{9,13}|68\d{7}|5[1-46-9]\d{8,12}|55[1-9]\d{9}|55119\d{8}|500[56]\d{4}|5016\d{6}|5068\d{7}|502[45]\d{7}|5037\d{7}|50[457]\d{8}|50855\d{4}|509[34]\d{7}|376\d{6}|855\d{8}|856\d{10}|85[0-4789]\d{8,10}|8[68]\d{10,11}|8[14]\d{10}|82\d{9,10}|852\d{8}|90\d{10}|96(0[79]|17[01]|13)\d{6}|96[23]\d{9}|964\d{10}|96(5[69]|89)\d{7}|96(65|77)\d{8}|92[023]\d{9}|91[1879]\d{9}|9[34]7\d{8}|959\d{7}|989\d{9}|97\d{8,12}|99[^4568]\d{7,11}|994\d{9}|9955\d{8}|996[57]\d{8}|9989\d{8}|380[34569]\d{8}|381\d{9}|385\d{8,9}|375[234]\d{8}|372\d{7,8}|37[0-4]\d{8}|37[6-9]\d{7,11}|30[69]\d{9}|34[67]\d{8}|3[12359]\d{8,12}|36\d{9}|38[1679]\d{8}|382\d{8,9})$/",
        placeholder: 'Телефон',
        invalid: function () {
            if ($(this).nextAll(".error").notExists()) {
                $(this).after('<div class="error" style="top:165px">Введите корректный телефон</div>');
                $(this).nextAll(".error").delay(2000).fadeOut("slow");
                setTimeout(function () {
                    $(".phone4").next(".error").remove();
                }, 2600);
            }
        },
        valid: function () {
            $(this).nextAll(".error").remove();
        }
    })
            );
});




function ajax2() { //Ajax отправка формы
    var msg = $("#form_banner").serialize();
    $.ajax({
        type: "POST",
        url: "./discount_banner2.php",
        data: msg,
        success: function (data) {
            $(".results5").html(data);
        },
        error: function (xhr, str) {
            alert("Возникла ошибка!");
        }
    });
}



jQuery.fn.notExists = function () { //Проверка на существование элемента
    return $(this).length == 0;
}



$(document).ready(function () { //Валидация формы
    $(".send5").validation(
            $(".InpName5").validate({
        test: "blank letters minlength2",
        placeholder: 'Имя',
        invalid: function () {
            if ($(this).nextAll(".error").notExists()) {
                $(this).after('<div class="error">Введите корректное имя</div>');
                $(this).nextAll(".error").delay(2000).fadeOut("slow");
                setTimeout(function () {
                    $(".InpName5").next(".error").remove();
                }, 4600);
            }
        },
        valid: function () {
            $(this).nextAll(".error").remove();
        }
    }),
            $(".InpPhone5").validate({
        test: "blank digits minlength6 maxlength15 /^\+?([87](?!95[4-79]|99[^2457]|907|94[^0]|336|986)([348]\d|9[0-689]|7[0247])\d{8}|[1246]\d{9,13}|68\d{7}|5[1-46-9]\d{8,12}|55[1-9]\d{9}|55119\d{8}|500[56]\d{4}|5016\d{6}|5068\d{7}|502[45]\d{7}|5037\d{7}|50[457]\d{8}|50855\d{4}|509[34]\d{7}|376\d{6}|855\d{8}|856\d{10}|85[0-4789]\d{8,10}|8[68]\d{10,11}|8[14]\d{10}|82\d{9,10}|852\d{8}|90\d{10}|96(0[79]|17[01]|13)\d{6}|96[23]\d{9}|964\d{10}|96(5[69]|89)\d{7}|96(65|77)\d{8}|92[023]\d{9}|91[1879]\d{9}|9[34]7\d{8}|959\d{7}|989\d{9}|97\d{8,12}|99[^4568]\d{7,11}|994\d{9}|9955\d{8}|996[57]\d{8}|9989\d{8}|380[34569]\d{8}|381\d{9}|385\d{8,9}|375[234]\d{8}|372\d{7,8}|37[0-4]\d{8}|37[6-9]\d{7,11}|30[69]\d{9}|34[67]\d{8}|3[12359]\d{8,12}|36\d{9}|38[1679]\d{8}|382\d{8,9})$/",
        placeholder: 'Телефон',
        invalid: function () {
            if ($(this).nextAll(".error").notExists()) {
                $(this).after('<div class="error">Введите корректный телефон</div>');
                $(this).nextAll(".error").delay(2000).fadeOut("slow");
                setTimeout(function () {
                    $(".InpPhone5").next(".error").remove();
                }, 4600);
            }
        },
        valid: function () {
            $(this).nextAll(".error").remove();
        }
    })
            );
});



// banner
$(".franchise").click(function () {
    $("#banner").toggle("600", function () {
    });
});


function ajax10() { //Ajax отправка формы
    var msg = $("#gen10").serialize();
    var userfile = $('#file').val();
    $.ajax({
        type: "POST",
        url: "/calculator.php",
        data: msg,
        success: function (data) {
            $("#log").html(data);
        },
        error: function (xhr, str) {
            alert("Возникла ошибка!");
        }
    });
}




/* -- copy protection -

 var message="";
 function clickIE() {if (document.all) {(message);return false;}}
 function clickNS(e) {if
 (document.layers||(document.getElementById&&!document.all)) {
 if (e.which==2) {
 (message);
 return false;}}}
 if (document.layers) {
 document.captureEvents(Event.MOUSEDOWN);
 document.onmousedown=clickNS;
 }else{
 document.onmouseup=clickNS;
 document.oncontextmenu=clickIE;
 }
 document.oncontextmenu=new Function("return false")

 /* -- /copy protection --*/



/*#################################################*/

/*--- Content ---*/
/*
 $(document).ready(function(){

 jQuery.fn.liTextLength = function(){

 return this.each(function(){
 $(this).parent().append("<span class='all' style='display:none'></span>");
 $(this).parent().find('span.all').html($(this).html());

 var elem, size = 500, text;
 text = $(this).html();
 if (text.length > size) {
 text = text.slice(0, size);
 $(this).html(text + '...');
 $(this).parent().append("<a href='#' class='more' >Подробнее</a>");
 }
 });
 };


 $('span.short').liTextLength({
 });

 $( ".more" ).click(function(){
 openbox(this);
 return false;
 });
 })


 function openbox(toggler) {
 var div = $(toggler).parent().find('span.all');
 var mini = $(toggler).parent().find('span.short');
 if(div.css('display') == 'block') {
 div.css('display','none');
 mini.css('display','block');
 toggler.innerHTML = 'Подробнее';
 }
 else {
 div.css('display','block');
 mini.css('display','none');
 toggler.innerHTML = 'Скрыть текст';
 }
 }


 $(document).ready(function(){

 jQuery.fn.liTextLength = function(){

 return this.each(function(){
 $(this).parent().append("<span class='all' style='display:none'></span>");
 $(this).parent().find('span.all').html($(this).html());

 var elem, size = 140, text;
 text = $(this).html();
 if (text.length > size) {
 text = text.slice(0, size);
 $(this).html(text + '...');
 $(this).parent().append("<a href='#' class='reviews_more' >Подробнее</a>");
 }
 });
 };


 $('span.short2').liTextLength({
 });

 $( ".reviews_more" ).click(function(){
 openbox2(this);
 return false;
 });
 })


 function openbox2(toggler) {
 var div = $(toggler).parent().find('span.all');
 var mini = $(toggler).parent().find('span.short2');
 if(div.css('display') == 'block') {
 div.css('display','none');
 mini.css('display','block');
 toggler.innerHTML = 'Подробнее';
 }
 else {
 div.css('display','block');
 mini.css('display','none');
 toggler.innerHTML = 'Скрыть текст';
 }
 }

 */
/*--- ./End Reviews ---*/