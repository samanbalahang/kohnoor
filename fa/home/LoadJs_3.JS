

    $(document).ready(function() {
        if ($(".wish-del").length == 0) {
            $(".wishDelResult").html('آیتمی جهت نمایش وجود ندارد');
        }
    });
    function DeleteWishListItem(id,elem) {
        $.ajax({
            url: "/fa/wishlistitems/Delete",
            type: "post",
            data: {id:id},
            success: function (data) {
                if (data == "1") {
                    parent.location.reload();
                    //$(elem).parents().find("div.wish-item").remove();  برای حذف به صورت اجکس
                } else {
                    ShowMsg('', 'مشکلی در سیستم ایجاد شده است', "error");
                }
            }
        });
    }
