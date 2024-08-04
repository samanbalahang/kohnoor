

    $(document).ready(function () {

        if ($(".wishList-Box .viewListIn").length == 0) {
            $(".V-content .more-wish").css("display", "none");
            $(".V-content").append('<span class="more-wish">' + 'آیتمی جهت نمایش وجود ندارد' + '</span>');
            }
            });
            function AddToWishList(id, idetnity, customerId, imageP, link, name) {
            if (idetnity) {
            $.ajax({
            url: "/fa/wishlistitems/Add",
            type: "post",
            data: { itemId: parseInt(id), customerId: customerId, pId: ' ' },
            success: function (data) {
            if (data == "0") {
            ShowMsg(' ', 'آیتم در لیست وجود دارد', "error");
            } else if (data == "1") {

            if ($("span.more-wish").length != 0) {
            $("span.more-wish").remove();
            $(".V-content .more-wish").css("display", "block");
            }
            var countWish = $("a.more-wish[data-count]");
            if ($(".wishlist > div").length > parseInt(countWish[0].attributes['data-count'].value)) {


            }
            $(".wishlist").append('<div class="viewListIn"><img style="width:65px;height:91px;" src="' + imageP + '" alt="' + name + '" /><a href="' + link + '"><span>' + name + '</span></a><div class="clearfix"></div></div>');
            ShowMsg(' ', 'آیتم به لیست اضافه شد', "info");
            location.reload();
            } else if (data == "-1") {
            ShowMsg(' ', 'مشکلی در سیستم ایجاد شده است', "error");
            }
            }
            });
            } else {
            $('a[href="/fa/Account/LoginOrRegister?viewResult=Login"]').trigger('click');
            }
            }