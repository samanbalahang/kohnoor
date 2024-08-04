$(document).ready(function () {
    var h1 = $('.filterMobile').height();
    var h2 = $('.filterMobile .foot').height();
    var h3 = $('.filterMobile .head').height();
    var h4 = h2 + h3;
    var h5 = h1 - h4;
    $('.filterMobile .tabIn').css('height', h5);

    var h6 = $('.filterMobile .tabIn').height() / 2;
    var h7 = $('#price .select-wrapper input.select-dropdown').height();
    h6 = h6 - h7 - 16;
    $('#price .select-wrapper .dropdown-content').css('height', h6);


    var w1 = $('.tabIn').width() - 30;
    $('.filterMobile .tabIn .search2').css('width', w1);

    var myTab = $('.filterMobile .myTab li.active').find('>a').attr('data-tab');
    $('#' + myTab + '').addClass('open');
});
$(window).resize(function () {
    var h1 = $('.filterMobile').height();
    var h2 = $('.filterMobile .foot').height();
    var h3 = $('.filterMobile .head').height();
    var h4 = h2 + h3;
    var h5 = h1 - h4;
    $('.filterMobile .tabIn').css('height', h5);

    var h6 = $('.filterMobile .tabIn').height() / 2;
    var h7 = $('#price .select-wrapper input.select-dropdown').height();
    h6 = h6 - h7 - 16;
    $('#price .select-wrapper .dropdown-content').css('height', h6);


    var w1 = $('.tabIn').width() - 30;
    $('.filterMobile .tabIn .search2').css('width', w1);

    var myTab = $('.filterMobile .myTab li.active').find('>a').attr('data-tab');
    $('#' + myTab + '').addClass('open');
});
$('.filterMobile .myTab li>a').click(function (e) {
    e.preventDefault();
    $(this).parent('li').siblings('li').removeClass('active');
    $(this).parent('li').addClass('active');
    var myTab = $(this).attr('data-tab');
    $('#' + myTab + '').siblings('.tabItem ').removeClass('open');
    $('#' + myTab + '').addClass('open');
});
/*color*/
$('.filterMobile .tabIn .color li').click(function () {
    $(this).toggleClass('checked');
});
/*search*/
var a, i;
$('.tabItem .search2 input').on('keyup', function () {
    var searchVal = $(this).val().toUpperCase();
    var ul = $(this).parents('.tabItem').find('ul.checkList li');

    for (i = 0; i < ul.length; i++) {
        a = ul[i].getElementsByTagName("label")[0];
        if (a.innerHTML.toUpperCase().indexOf(searchVal) > -1) {
            ul[i].style.display = "";
        }
        else {
            ul[i].style.display = "none";

        }
    }
});
$('.filterMobile .head i').click(function () {
    $('.filterMobile').removeClass('open');
});