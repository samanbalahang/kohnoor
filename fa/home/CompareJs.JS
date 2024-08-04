
    var productSpecsCoockieName = 'hh487rsas_ProductSpecsIds';
    SetCookieForDeletedProduct();
    
    function deleteFromCompareList(id) {
    var currentCoockieValue = decodeURIComponent($.cookie(productSpecsCoockieName));
    if (currentCoockieValue != null || currentCoockieValue != undefined) {
    var jsonObj = $.parseJSON(currentCoockieValue);
    $.each(jsonObj, function (i, item) {
    if (item.id == id) {
    jsonObj.splice(i, 1);
    if (jsonObj.length == 0) {
    $.removeCookie(productSpecsCoockieName, { path: '/' });
    $.get('/fa/ProductsSpecsLocalized/GetCompareList', function (data) {
    $('.compareList').html(data);
    $('.compareList-Box').slideToggle('down');
    });
    }
    else {
    var jsonString = JSON.stringify(jsonObj);
    $.cookie(productSpecsCoockieName, jsonString, { expires: 60, path: '/' });
    $.get('/fa/ProductsSpecsLocalized/GetCompareList', function (data) {
    $('.compareList').html(data);
    $('.compareList-Box').slideToggle('down');
    });
    }
    return false;
    }
    });
    }
    }
    function getCatSpec(productsId, catId,urlKeyword) {
    $.ajax({
    url: '/fa/ProductsSpecsLocalized/GetProductCatSpecs',
    type: 'Post',
    data: { categoryId: catId },
    success: function (data) {
    if (data == 0) {
    msgBox('خطا', 'مورد انتخابی قابل مقایسه نمی باشد', "info");
    } else {
    AddToSpecsCookie(productsId, data,urlKeyword);
    }
    }
    });
    }
    
function AddToSpecsCookie(productId, catId, urlKeyword,doesNotDispalyMessageAndShowPanel) {
    var currentSpecsCoockieValue = $.cookie(productSpecsCoockieName);
    var jsonResult = [];
    var item = {};
    item["id"] = productId;
    item["catId"] = catId;
    item["urlKeyword"] = urlKeyword;
    if (currentSpecsCoockieValue != null || currentSpecsCoockieValue != undefined) {
    var jsonObj = $.parseJSON(currentSpecsCoockieValue);
    var compareable = Comparable(jsonObj, catId);
    if (compareable) {
    var existResult = ExistItem(jsonObj, productId);
    if (existResult == 0) {
    jsonObj.push(item);
    jsonResult = jsonObj;
    var jsonString = JSON.stringify(jsonResult);
    $.cookie(productSpecsCoockieName, jsonString, { expires: 60, path: '/' });
    $.get('/fa/ProductsSpecsLocalized/GetCompareList', function (data) {
$('.compareList').html(data);

if(doesNotDispalyMessageAndShowPanel == null || doesNotDispalyMessageAndShowPanel == false) {
msgBox('لیست مقایسه', 'مورد انتخابی به لیست مقایسه اضافه شد', "info");
$('.compareList-Box').slideToggle('down');
}
    });
    } else if (existResult == -1 && (doesNotDispalyMessageAndShowPanel == null || doesNotDispalyMessageAndShowPanel == false)) {
    msgBox('خطا', 'این مورد در لیست مقایسه وجود دارد', "info");
    return false;
    }
    } else if(doesNotDispalyMessageAndShowPanel == null || doesNotDispalyMessageAndShowPanel == false) {
    msgBox('خطا', 'مورد انتخابی قابل مقایسه نمی باشد', "info");
    }
    }
    else {
    jsonResult.push(item);
    var jsonString = JSON.stringify(jsonResult);
    $.cookie(productSpecsCoockieName, jsonString, { expires: 60, path: '/' });
    $.get('/fa/ProductsSpecsLocalized/GetCompareList', function (data) {
$('.compareList').html(data);

if(doesNotDispalyMessageAndShowPanel == null || doesNotDispalyMessageAndShowPanel == false) {
msgBox('لیست مقایسه', 'مورد انتخابی به لیست مقایسه اضافه شد', "info");
$('.compareList-Box').slideToggle('down');
}
    });
    }
    return false;
    }
    function SetCookieForDeletedProduct() {
    var currentSpecsCoockieValue = $.cookie(productSpecsCoockieName);
    if (currentSpecsCoockieValue != null || currentSpecsCoockieValue != undefined) {
    var jsonObj = $.parseJSON(currentSpecsCoockieValue);
    var items = [];
    $.each(jsonObj, function (i, item) {
    items[i] = parseInt(item.id);
    });
    if (items.length > 0) {
    $.ajax({
    url: '/fa/ProductsLocalized/GetProductsDeleted',
    type: "POST",
    data: JSON.stringify(items),
    dataType: "json",
    contentType: 'application/json; charset=utf-8',
    success: function (data) {
    if (data.products.length > 0) {
    $.each(data.products, function (j, productId) {
    var finded = false;
    $.each(jsonObj, function (i, item) {
    if (!finded && item.id == productId) {
    jsonObj.splice(i, 1);
    finded = true;
    }
    });
    });
    var jsonString = JSON.stringify(jsonObj);
    $.cookie(productSpecsCoockieName, jsonString, { expires: 60, path: '/' });
    }
    }
    });
    }
    }
    }
    function Comparable(jsonResult, catId) {
    var currentSpecsCoockieValue = $.cookie(productSpecsCoockieName);
    var jsonObj = $.parseJSON(currentSpecsCoockieValue);
    if (jsonObj[0].catId == catId) {
    return true;
    }
    return false;
    }
    function ExistItem(jsonResult, productId) {
    var exist = false;
    var currentSpecsCoockieValue = $.cookie(productSpecsCoockieName);
    var jsonObj = $.parseJSON(currentSpecsCoockieValue);
    $.each(jsonObj, function (i, item) {
    if (item.id == productId) {
    exist = true;
    }
    });
    if (exist) {
    return -1;
    }
    return 0;
    }
    function msgBox(title, content, type) {
    $.msgBox({
    title: title,
    content: content,
    type: type,
    opacity: 0,
    buttons: [{ value: "Ok" }],
    success: function (result) {

    return true;
    }
    });
    }
    
    function deleteFromCompareListView(id) {
    var currentCoockieValue = decodeURIComponent($.cookie(productSpecsCoockieName));
    if (currentCoockieValue != null || currentCoockieValue != undefined) {
    var jsonObj = $.parseJSON(currentCoockieValue);
    $.each(jsonObj, function (i, item) {
    if (item.id == id) {
    jsonObj.splice(i, 1);
    if (jsonObj.length == 0) {
    $.removeCookie(productSpecsCoockieName, { path: '/' });
    $.get('/fa/ProductsSpecsLocalized/CompareListPartial', function (data) {
    $('.CompareListItems').html(data);
    });
    }
    else {
    var jsonString = JSON.stringify(jsonObj);
    $.cookie(productSpecsCoockieName, jsonString, { expires: 60, path: '/' });
    $.get('/fa/ProductsSpecsLocalized/CompareListPartial', function (data) {
    $('.CompareListItems').html(data);
    });
    }
    return false;
    }
    });
    }
    }
    
    $('.compareList label').on('click', function (event) {
    event.preventDefault();
    $('.compareList-Box').slideToggle('down');
    });




    

function GenerateCompareUrl() {
var currentCookie=$.cookie(productSpecsCoockieName);
if(currentCookie == null || currentCookie.length < 1)
return false;
            var currentCoockieValue = decodeURIComponent(currentCookie);
            if (currentCoockieValue != null) {
                
                var jsonObj = $.parseJSON(currentCoockieValue);
                var counter = 1;
                var itemName1 = '';
                var itemName2 = '';
                var itemName3 = '';
                var itemName4 = '';
                var itemName5 = '';
                $.each(jsonObj, function (i, item) {
                    if (i == 0)
                        itemName1 = '/'+item.urlKeyword;
                    if (i == 1)
                        itemName2 = '/'+item.urlKeyword;
                    if (i == 2)
                        itemName3 = '/'+item.urlKeyword;
                    if (i == 3)
                        itemName4 = '/'+item.urlKeyword;
                    if (i == 4)
                        itemName5 = '/'+item.urlKeyword;
                });


            $.get('/fa/ProductsSpecsLocalized/GetCompareUrl?culture=fa-IR&itemName1=_itemName1&itemName2=_itemName2&itemName3=_itemName3&itemName4=_itemName4&itemName5=_itemName5', function (data) {
                    var url=data;
                    url= url.replace("/_itemname1", itemName1);
                    url =url.replace("/_itemname2", itemName2);
                    url =url.replace("/_itemname3", itemName3);
                    url =url.replace("/_itemname4", itemName4);
                    url =url.replace("/_itemname5", itemName5);
                    window.location.href = url;
                });
            }
}

    //reload page
    function deleteFromCompareListViewReloadPage(id) {
        var currentCoockieValue = decodeURIComponent($.cookie(productSpecsCoockieName));
        if (currentCoockieValue != null) {
            var jsonObj = $.parseJSON(currentCoockieValue);
            $.each(jsonObj, function (i, item) {
                if (item.id == id) {
                    jsonObj.splice(i, 1);
                    if (jsonObj.length == 0) {
                        $.removeCookie(productSpecsCoockieName, { path: '/' });
                        GenerateCompareUrl();
                    }
                    else {
                        var jsonString = JSON.stringify(jsonObj);
                        $.cookie(productSpecsCoockieName, jsonString, { expires: 60, path: '/' });
                        GenerateCompareUrl();
                    }
                    return false;
                }
            });
        }
    }