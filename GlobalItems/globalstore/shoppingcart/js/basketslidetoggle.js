$(document).ready(function () {

    $('.basket_top').on('click', function () {
        $('.cart-wrapper').slideToggle('down');
    });

    $('.cart-wrapper.top_block.basket i.fa-close').on('click', function () {
        $('.cart-wrapper').slideToggle('down');
    });
    $('a.shopping-cart:before').on('click', function () {
        $('.cart-wrapper').slideToggle('down');
    });
    /************* fix *****************/
    $('.basket_top_fixed').click(function (e) {
        e.preventDefault();
        $('.cart-wrapper-fix').slideToggle('down');
    });

    $('.top_block-fix.basket-fix i.fa-close').on('click', function () {
        $('.cart-wrapper-fix').slideToggle('down');
    });
    //$('a.shopping-cart:before').on('click', function () {
    //    $('.cart-wrapper-fix').slideToggle('down');
    //});
});