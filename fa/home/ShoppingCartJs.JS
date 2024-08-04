



    //$.include('/GlobalItems/js/jquery.cookie.js');

    var coockieName = 'hh487r232erShopping2019N5';

    var shoppingCartInfo = function (id, type, quantity,optionalItems,countUnitRate,countUnitSymbol,orderItemDesc) {
    this.id = id;
    this.type = type;
    this.Desc = orderItemDesc;
    this.quantity =quantity;
    if(optionalItems !=null && optionalItems.length >0)
    this.optionalItems = optionalItems

    if(countUnitRate !=null && countUnitRate.length >0)
    this.countUnitRate = countUnitRate

    if(countUnitSymbol !=null && countUnitSymbol.length >0)
    this.countUnitSymbol = countUnitSymbol
    };

    function deleteFromShoppingCart(id, itemType,isReviewPage,optionaItems) {

    var b;
    var a;
    b = "تأیید جهت حذف";
    a = "آیا مایل به حذف هستید؟";
    $.msgBox({
    title: b,
    content: a,
    type: "confirm",
    opacity: 0,
    buttons: [
    {
    value: "تایید"
    }, {
    value: "انصراف"
    }
    ],
    success: function (c) {

    if (c == "تایید") {
    var trContainer=	$("tr."+id);
    trContainer.hide();
    var shoppingCartObject = new shoppingCartInfo(id, itemType, 1, optionaItems);
    DeleteFromCustomerShoppingCart(shoppingCartObject, isReviewPage);
    }
    }
    });
    }
    function DeleteFromCookie(id, isReviewPage) {
    var jsonObj = GetShoppingCartCookiesValues();
    if (jsonObj != null && jsonObj.length > 0) {
    $.each(jsonObj, function (i, item) {
    if (item == id) {
    jsonObj.splice(i, 1);
    if (jsonObj.length == 0) {
    RemoveShoppingCartCookies();
    } else {
    SetShoppingCartCookiesValues(jsonObj);
    }
    return false;
    }
    });
    if (isReviewPage) {
    GetShoppingCartReviewItems();
    } else {
    GetShoppingCartPanelItems();
    }
    }
    }
    function GetShoppingCartReviewItems(callBack) {
    var s = GetShoppingCartCookiesValues();
    if (s != null && s.length > 0) {
    var request = {
    discountCode: $("#LoggedDiscountCode").val(),
    id : $("#AddressId").length ? $("#AddressId").val() : null
    }
    $.get('/fa/ShoppingCartItem/GetShoppingCartItemsForReview' + '?_=' + new Date().getTime(), request, function (data) {
    if (callBack) { callBack(data); }
    else {
    $('#cartItems').hide().html(data).fadeIn("slow");
    }
    });
    }
    return true;
    }

    function AddToCustomerShoppingCartItem(shoppingCartObject) {
    var jsonResult = GetShoppingCartCookiesValues();
    $.ajax({
    url: '/fa/ShoppingCartItem/AddToCustomerShopingCart',
    type: 'Post',
    data: JSON.stringify(shoppingCartObject),
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function (result) {
    if (result.status == 1) {
    jsonResult.push(result.Id);
    SetShoppingCartCookiesValues(jsonResult);
    GetShoppingCartPanelItems();
    }
    else if (result.status == 0) {
    ShowMsg('خطا', 'این محصول هم اکنون در سبد خرید شما وجود دارد', 'warning');
    }
    else if (result.status == -2) {
    ShowMsg('خطا', 'این محصول قابلیت اضافه شدن به سبد خرید را ندارد', 'warning');
    }
    else if (result.status == -3) {
    ShowMsg('خطا', 'شما مجاز به خرید محصولات یک فروشنده می باشید', 'warning');
    }
    else if (result.status == -4) {
    if(result.message.includes('لطفا برای افزودن محصول به سبد خرید وارد حساب کاربری خود شوید')){
    $('a[href="/fa/Account/LoginOrRegister?viewResult=Login"]').trigger('click');
    }else{
    ShowMsg('خطا',result.message, 'warning');
    }
    }
    else {
    ShowMsg('خطا', 'خطایی رخ داده', 'warning');
    }
    },
    error: function (result) {
    }
    });
    }

    function DeleteFromCustomerShoppingCart(shoppingCartObject, isReviewPage) {
    $.ajax({
    url: '/fa/ShoppingCartItem/DeleteFromCustomerShoppingCart',
    type: 'Post',
    data: JSON.stringify(shoppingCartObject),
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function (result) {
    if (result.status == 1) {
    DeleteFromCookie(result.Id, isReviewPage);
    }
    else {
    ShowMsg('خطا', 'خطایی رخ داده', 'warning');
    }
    },
    error: function(result) {
    }
    });
    }

    function UpdateCustomerShoppingCart(shoppingCartObject,callback) {
    $.ajax({
    url: '/fa/ShoppingCartItem/UpdateCustomerShoppingCart',
    type: 'Post',
    data: JSON.stringify(shoppingCartObject),
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function (result) {
    if (result.status == 1) {
    if (callback) { callback();}
    }
    else if (result.status == 0) {
    ShowMsg('خطا', 'این محصول هم اکنون در سبد خرید شما وجود دارد', 'warning');
    }
    else if (result.status == -4) {
    if(result.message.includes('لطفا برای افزودن محصول به سبد خرید وارد حساب کاربری خود شوید')){
    $('a[href="/fa/Account/LoginOrRegister?viewResult=Login"]').trigger('click');
    }else{
    ShowMsg('خطا',result.message, 'warning');
    $("#" + result.productId).val('1');
    }
    }
    else {
    ShowMsg('خطا', 'خطایی رخ داده', 'warning');
    }
    },
    error: function(result) {
    }
    });
    }


    function updateShoppingCartForCustomer(lang, applicationType, hasSideBar) {

    $.ajax({
    url: '/' + lang + '/ShoppingCartItem/GetShopppingCartItems?webSiteType=' + applicationType,
    type: 'Get',
    success: function(result) {
    if (result != "-1") {
    RemoveShoppingCartCookies();
    SetShoppingCartCookiesValues($.parseJSON(result));
    }
    updateShoppingCart(lang, applicationType, false, hasSideBar);
    },
    error: function(result) {
    }
    });
    }

    function msgBox(title, content, type) {
    $.msgBox({
    title: title,
    content: content,
    type: type,
    opacity: 0,
    buttons: [{ value: "Ok" }],
    success: function(result) {

    return true;
    }
    });

    }




    function AddToCustomShoppingCart(productId, quantity, itemType, item) {
    //در صورتی که مقدار این خصویت True باشد تعداد به نوع decimal تبدیل میشود
    var allowdecimalvalue=$(item).attr('data-allowdecimalvalue')
    var parseQuntity=0;
    if(allowdecimalvalue == 'True')
    {
    quantity=parseFloat(quantity);
    parseQuntity=parseFloat(quantity,10)
    }else{
    quantity=parseInt(quantity);
    parseQuntity=parseInt(quantity,10)
    }
    //در صورتی که مقدار این خصویت True باشد تعداد به نوع decimal تبدیل میشود


    var optionalItemsJson = [];
    var visited = false;
    var unSelectSpecTitle='';
    var hasOptinalItem = false;
    if (quantity <= 0 || quantity != parseQuntity) {
    msgBox('هشدار', 'لطفا تعداد را وارد کنید', 'information');
    return false;
    }

    var stockQuantity = $(item).attr('stockquantity');
    if(stockQuantity != null && stockQuantity.length > 0)
    {
    if(quantity <= 0  || parseFloat(stockQuantity) < quantity)
    {
    msgBox(' خطا', 'مقدار تعداد  کمتر یا بیشتر از حد مجاز می باشد', 'warning');
    return false;
    }}

    $(".sizepart").each(function() {
    hasOptinalItem = true;
    var ProductSpecsShoppingCartItems = function (key, value, type,mappingQuantity,pluginId,featureprice) {
    this.key = key;
    this.value = value;
    this.type =type;
    if(featureprice != null && featureprice.length >0)
    this.featureprice=featureprice;
    if(mappingQuantity != null && mappingQuantity.length >0)
    this.mappingQuantity = mappingQuantity;

    if(pluginId != null && pluginId.length >0)
    this.pluginId = pluginId;
    };


    var radioSelected = $(this).find(".selected");
    if (radioSelected.length > 0) {
    var ProductSpecsShoppingCartItems=new ProductSpecsShoppingCartItems( radioSelected.attr('value'),radioSelected.attr('id'),radioSelected.attr('spectype') , radioSelected.attr('mappingquantity'), radioSelected.attr('pluginid'),radioSelected.attr('specsprice') )
    optionalItemsJson.push(ProductSpecsShoppingCartItems);
    } else {
    unSelectSpecTitle=$(this).find(".specs").attr('value');
    visited = true;
    return false;
    }
    });
    if (hasOptinalItem && !visited) {
    var jsonString = JSON.stringify(optionalItemsJson);
    AddToShoppingCart(productId, quantity, itemType, item, jsonString);
    } else if (!hasOptinalItem) {
    AddToShoppingCart(productId, quantity, itemType, item);
    }else
    {
    msgBox('هشدار', 'لطفا '+unSelectSpecTitle+'  یا مشخصه مربوط به سفارش خود را انتخاب کنید', 'information');
    }
    }
    function AddToShoppingCart(id, quy, itemType,item1,optionalItems) {
    var countUnitRate=$(".countUnit").find(":selected").attr('rate');
    var countUnitSymbol=$(".countUnit").find(":selected").attr('symbol');
    var orderItemDesc=$(item1).attr('data-orderItemDesc');
    var shoppingCartObject = new shoppingCartInfo(id, itemType, quy, optionalItems, countUnitRate, countUnitSymbol, orderItemDesc)
    AddToCustomerShoppingCartItem(shoppingCartObject);
    return false;
    }




    function Fly(item)
    {

    flyer = $(item).parent().find(".flyerElement");

    var img=$(item).parents("div").find("img.productImg");

    var itemImage=$(item).attr('id');

    var width = $(img).css('width').replace("px","");
    var height = $(img).css('height').replace("px","");

    var s = '/fa/Gallery/Thumbnail?filePath=' + itemImage + '&width='+width+'&height='+height;

    flyToElement($(flyer), $('.flyingToElement'),s,width,height);

    }

    function ChangeQunatity(item, itemId, quantity, itemType, maxCount) {

    if ( parseFloat(quantity) != 0 && parseFloat(maxCount) >= parseFloat(quantity)) {

    updateShoppingCartCookie(itemId, quantity, itemType);
    var currentItem = $(item).parent();

    currentItem.find('.quntity').val(quantity);

    currentItem.find('.decQuantity').attr("onclick", "ChangeQunatity(this,'" + itemId + "','" + (parseFloat(quantity) - 1) + "','" + itemType + "' ,'" + maxCount + "')");

    currentItem.find('.incQuantity').attr("onclick", "ChangeQunatity(this,'" + itemId + "','" + (parseFloat(quantity) + 1) + "','" + itemType + "' ,'" + maxCount + "')");

    var productPrice = parseInt($(item).parents("li").find('.shoppingCartPanelUnitPrice').val()) * quantity;

    $(item).parents("li").find('.price').html(currencyFormat(productPrice));

    var totalAmount = 0;

    $(".shoppingCartPanelUnitPrice").each(function() {
    totalAmount += parseInt($(this).val()) * parseFloat($(this).parent().find('.quntity').val());
    });
    var discountId = $('#discountId').val();
    var tax = $("#tax").val();
    if (discountId != 0) {

    $.ajax({
    url: '/fa/Discounts/CalculateDiscount',
    type: 'Post',
    data: {
    id: discountId,
    price: totalAmount
    },
    success: function(discountResult) {
    var priceResult = discountResult.substring(0, discountResult.indexOf("&"));
    var totalPrice = parseInt(priceResult);
    var taxAmount = totalPrice * tax;
    totalPrice = totalPrice + taxAmount;
    $(".totalPrice").html(currencyFormat(totalPrice));
    }
    });
    } else {
    var taxAmount = totalAmount * tax;
    totalAmount = totalAmount + taxAmount;

    $(".totalPrice").html(currencyFormat(totalAmount));
    }
    }
    }


    function GetShoppingCartPanelItems() {

    var s = GetShoppingCartCookiesValues();
    if (s != null) {
    $.get('/fa/ShoppingCartItem/_GetShoppingCartPanelItemsPartial'+'?_='+ new Date().getTime() , function(data) {
    //da mavaghei ke sabade kharid dar iframe bashad jahat update kardan sabade kharid dar birun az iframe shart zir bargharar mibashad
    var shoppingCartPanelIframe=$(".shoppingCartPanelIframe");
    if(shoppingCartPanelIframe != null || shoppingCartPanelIframe.length > 0 )
    {
    $(shoppingCartPanelIframe).contents().find(".shoppingCartPanel").hide().html(data).fadeIn("slow");
    $(shoppingCartPanelIframe).contents().find(".basket").slideDown("slow");
    }
    //da mavaghei ke sabade kharid dar iframe bashad jahat update kardan sabade kharid dar birun az iframe shart zir bargharar mibashad

    $('.shoppingCartPanel').hide().html(data).fadeIn("slow");
    $(".basket").slideDown("slow");

    if ($(".ShoppingCartSumItems").length > 0) {
    $(".ShoppingCartSumItems").html($(".ShoppingCartItemsCount").val());
    }

    if($(".basket-fix") != null && $(".basket-fix").length > 0)
    {
    $(".basket-fix").slideDown("slow");
    }
    });
    }
    return true;
    }


    function updateShoppingCartReviewCookie(item, itemType,optionalItems) {
    shippingCostSelectedAmount=0;
    var id = $(item).attr('id');
    var stockQuantity = $(item).attr('stockquantity');
    var allowdecimalvalue=$(item).attr('allowdecimalvalue')
    var parseQuntity=0;
    var quy =0;
    if(allowdecimalvalue == 'True')
    {
    quy = parseFloat($(item).val());
    parseQuntity=parseFloat($(item).val(),10)
    }else{
    quy =parseInt($(item).val());
    parseQuntity=parseInt($(item).val(),10)
    }

    if (quy <= 0 || quy != parseQuntity) {
    msgBox('هشدار', 'لطفا تعداد را وارد کنید', 'information');
    return false;
    }

    if(stockQuantity != null && stockQuantity.length >0)
    {
    if(quy <= 0 || parseFloat(stockQuantity) < quy)
    {
    msgBox(' خطا', 'مقدار تعداد  کمتر یا بیشتر از حد مجاز می باشد', 'warning');
    $(item).val(stockQuantity);
    quy=stockQuantity;
    }
    }else{
    $(item).val(1);
    quy=1;}
    var currentCoockieValue = GetShoppingCartCookiesValues();
    if (currentCoockieValue != null && currentCoockieValue.length > 0) {
    var callback = function () {
    var updateCallBack = function (data) {
    $("#cartItems").hide().html(data).fadeIn("slow");
    try{$('[data-role="table"]').responsiveTables();}
    catch(ex){}
    if($("#CustomerId").length){
    $.get('/fa/Addresses/GetCustomerAddresses?customerId=' + $("#CustomerId").val()+'&_='+ new Date().getTime() , function(result) {
    $("#customerAddress").hide().html(result).fadeIn("slow");
    });
    }
    }
    GetShoppingCartReviewItems(updateCallBack);
    };
    var shoppingCartObject = new shoppingCartInfo(id, itemType, quy, optionalItems);
    UpdateCustomerShoppingCart(shoppingCartObject, callback);
    }
    }


    function inputUpdateShoppingCartPanelCookie(item, itemType,optionalItems) {


    var allowdecimalvalue=$(item).attr('allowdecimalvalue')
    var parseQuntity=0;
    var quy =0;
    if(allowdecimalvalue == 'True')
    {
    quy =parseFloat($(item).val());
    parseQuntity=parseFloat($(item).val(),10)
    }else{
    quy =parseInt($(item).val());
    parseQuntity=parseInt($(item).val(),10)
    }


    if (quy <= 0 || quy != parseQuntity) {
    msgBox('هشدار', 'لطفا تعداد را وارد کنید', 'information');
    return false;
    }

    var id = $(item).attr('id');
    var stockQuantity = $(item).attr('stockquantity');
    if(stockQuantity != null && stockQuantity.length >0)
    {
    if(quy <= 0 || parseFloat(stockQuantity) < quy)
    {
    msgBox(' خطا', 'مقدار تعداد  کمتر یا بیشتر از حد مجاز می باشد', 'warning');
    $(item).val(stockQuantity);
    quy=stockQuantity;
    }
    }else{
    $(item).val(1);
    quy=1;}
    var currentCoockieValue = GetShoppingCartCookiesValues();
    if (currentCoockieValue != null && currentCoockieValue.length > 0) {
    updateShoppingCartCookie(id,quy, itemType,optionalItems);
    $.get('/fa/ShoppingCartItem/_GetShoppingCartPanelItemsPartial'+'?_='+ new Date().getTime() , function (data) {
    $(".shoppingCartPanel").hide().html(data).fadeIn("slow");
    });
    }
    }



    function updateShoppingCartPanelCookie(item, itemType,quy,optionalItems) {
    var id =$(item).attr('id');
    var currentCoockieValue = GetShoppingCartCookiesValues();
    if (currentCoockieValue != null && currentCoockieValue.length > 0) {
    var shoppingCartObject = new shoppingCartInfo(id, itemType, quy, optionalItems);
    var callback = function () {
    $.get('/fa/ShoppingCartItem/_GetShoppingCartPanelItemsPartial'+'?_='+ new Date().getTime() , function (data) {
    $(".shoppingCartPanel").hide().html(data).fadeIn("slow");
    if ($(".ShoppingCartSumItems").length > 0) {
    $(".ShoppingCartSumItems").html($(".ShoppingCartItemsCount").val());
    }
    });
    }
    UpdateCustomerShoppingCart(shoppingCartObject, callback);
    }
    }

    function updateShoppingCartCookie(id, quy, itemType, optionalItems,countUnitRate,countUnitSymbol) {
    //var jsonObj = GetShoppingCartCookiesValues();
    //var isExsit = false;
    //var visited= false;
    //if (jsonObj != null && jsonObj.length > 0) {
    //$.each(jsonObj, function(i, item) {
    //if (item.id == id && item.type == itemType) {
    //if (isExsit && !visited) {
    //visited = true;
    //item["quantity"] = quy;
    //if(countUnitRate != null && countUnitRate.length >0)
    //{
    //item["countUnitRate"] = countUnitRate;
    //}if(countUnitSymbol != null && countUnitSymbol.length >0)
    //{
    //item["countUnitSymbol"] = countUnitSymbol;
    //}
    //SetShoppingCartCookiesValues(jsonObj);
    //}
    //}
    //});
    //}
    }

    function setShippingCost(item, productId) {
    var currentTr = $("." + productId);

    var count=currentTr.find('.productQuantity :selected').val()

    if(count == null || count.length < 1)
    {
    count=currentTr.find('.productQuantity').val()
    }

    $.ajax({
    url: '/fa/ShippingCosts/GetShippingCostById',
    type: 'Post',
    data: {
    id: $(item).val(),
    productQuantity: count
    },
    success: function (result) {
    CalculateShippingCostAndRelatedCost(result, productId);
    },
    error: function (result) {
    CalculateShippingCostAndRelatedCost(0, productId);
    }
    });
    }
    var applyedDiscount=false;
    var applyedDiscountAmount=0;
    function applayTheDiscountCode() {
    var discountCode = $("#discountCode").val();
    if ($("#LoggedDiscountCode").val().length > 0) {
    ShowMsg('خطا', 'کد تخفیف مورد استفاده قرار گرفته است', 'warning');
    return false;
    }

    if (discountCode == null || discountCode == "") {
    ShowMsg('خطا', 'لطفا کد تخفیف را وارد نمایید', 'warning');
    return false;
    }
    totalPrice=parseInt($("#TotalPrice").val());
    var request = {
    discountCode: discountCode
    }
    var addressId=$("#AddressId").val();
    $.get('/fa/ShoppingCartItem/GetShoppingCartItemsForReview', request, function (data) {
    $("#cartItems").hide().html(data).fadeIn("slow");
    if(parseInt($("#TotalPrice").val()) < totalPrice){
    $("#LoggedDiscountCode").val(discountCode);
    shippingCostSelectedAmount=0;
    }
    else{
    msgBox('خطا', 'کد تخفیف وارد شده برای سفارش فوق قابل اعمال نمی باشد', 'warning');
    }
    $.get('/fa/Addresses/GetCustomerAddresses?customerId=' + $("#CustomerId").val() + "&selectedAddId=" + addressId + '&_=' + new Date().getTime(), function (data) {
    $("#customerAddress").hide().html(data).fadeIn("slow");
    });
    });

    }

    function currencyFormat(value) {
    return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }

    function setProductsShippingMethods(item) {
    shippingCostSelectedAmount=0;
    var addressId=0;
    if($(item).val() != null && $(item).val().length > 0 )
    {
    addressId=$(item).val();
    }
    var callBack = function (data) {
    $("#cartItems").hide().html(data).fadeIn("slow");
    var visited = false;
    $(".shippingMeyhodDropdown").each(function () {
    if ($(this).children('option').length < 2) {
    visited = true;
    }
    });
    if (visited) {
    $("#NotBeSentToYourAddressAlert").show();
    } else {
    $("#NotBeSentToYourAddressAlert").hide();
    }
    }
    GetShoppingCartReviewItems(callBack);
    }

    function addressFieldsShow() {
    $("#addressFields").show(function () {
    });
    $("#Address_Address1Fa").val('');
    }

    function GotoNextStep() {
    window.location.href = '/fa/Account/Login';
    }

    function submitAddressForm(callbackFunction) {
    
    var countryItem=$("#CountriesId");
    if($(countryItem) != null && $(countryItem).length >0 )
    {
    var required=$(countryItem).attr('data-val');
    if(required && ($(countryItem).val() == null || $(countryItem).val().length < 1 ))
    {
    msgBox('خطا', 'لطفا کشور را انتخاب کنید', 'warning');
    return false;
    }
    }
    
    
    var provinceItem=$("#ProvinceId");
    if($(provinceItem) != null && $(provinceItem).length >0 )
    {
    var required=$(provinceItem).attr('data-val');
    if(required && ($(provinceItem).val() == null || $(provinceItem).val().length < 1 ))
    {
    msgBox('خطا', 'لطفا استان را انتخاب کنید', 'warning');
    return false;
    }
    }
    
    
    var cityId=null;
    
    var city1Item=$("#CitiesId1");
    if($(city1Item) != null && $(city1Item).length >0 )
    {
    cityId=$(city1Item).val();
    var required=$(city1Item).attr('data-val');
    if(required && ($(city1Item).val() == null || $(city1Item).val().length < 1 ))
    {
    msgBox('خطا', 'لطفا شهر را انتخاب کنید', 'warning');
    return false;
    }
    }

    var cityItem=$("#CitiesId");
    if($(cityItem) != null && $(cityItem).length >0 )
    {
    cityId=$(cityItem).val();
    var required=$(cityItem).attr('data-val');
    if(required && ($(cityItem).val() == null || $(cityItem).val().length < 1 ))
    {
    msgBox('خطا', 'لطفا شهر را انتخاب کنید', 'warning');
    return false;
    }
    }
    

    
    var regionItem=$("#RegionsId");
    if($(regionItem) != null && $(regionItem).length >0 )
    {
    if($(regionItem).is(":visible"))
    {
    var required=$(regionItem).attr('data-val');
    if(required && ($(regionItem).val() == null || $(regionItem).val().length < 1 ))
    {
    msgBox('خطا', 'لطفا منطقه خود را انتخاب کنید', 'warning');
    return false;
    }
    }
    }
    

    
    var neighborhoodsItem=$("#NeighborhoodsId");
    if($(neighborhoodsItem) != null && $(neighborhoodsItem).length >0 )
    {
    var required=$(neighborhoodsItem).attr('data-val');
    if(required && ($(neighborhoodsItem).val() == null || $(neighborhoodsItem).val().length < 1 ))
    {
    msgBox('خطا', 'لطفا محله خود را انتخاب کنید', 'warning');
    return false;
    }
    }
    

    
    var postalCodeItem=$("#Address_PostalCode");
    if($(postalCodeItem) != null && $(postalCodeItem).length >0 )
    {
    var required=$(postalCodeItem).attr('data-val');
    if(required && ($(postalCodeItem).val() == null || $(postalCodeItem).val().length < 1 ))
    {
    msgBox('خطا', 'لطفا کد پستی خود را وارد کنید', 'warning');
    return false;
    }
    }
    

    
    var mobileNumberItem=$("#Address_MobileNumber");
    if($(mobileNumberItem) != null && $(mobileNumberItem).length >0 )
    {
    var required=$(mobileNumberItem).attr('data-val');
    if(required && ($(mobileNumberItem).val() == null || $(mobileNumberItem).val().length < 1 ))
    {
    msgBox('خطا', 'لطفا شماره موبایل را وارد نمایید', 'warning');
    return false;
    }
    }
    

    if ($("#Address_Address1Fa").val() == "" || $("#Address_Address1Fa").val() == null) {
    msgBox('خطا', 'لطفا جزئیات آدرس را وارد نمایید', 'warning');
    return false;
    }

    $.ajax({
    url: '/fa/Addresses/create',
    type: 'Post',
    data: {
    customerId: $("#CustomerId").val(), firstName: $("#Address_FirstName").val(),lastName: $("#Address_LastName").val(), mobileNumber: $("#Address_MobileNumber").val(), email: $("#Address_Email").val(), companyName: $("#Address_Company").val(),
    phoneNumber: $("#Address_PhoneNumber").val(), faxNumber: $("#Address_FaxNumber").val(), detailAdd: $("#Address_Address1Fa").val(), provinceId: $("#ProvinceId").val(),
    cityId: cityId, regionId: $("#RegionsId").val(), neighborhoodId: $("#NeighborhoodsId").val(), postalCode: $("#Address_PostalCode").val()
    , countriesId : $("#CountriesId").val()},

    success: function (result) {
    if (result == "-1") {
    msgBox("خطا", 'خطا در درج لطفا دوباره سعی کنید', "warning");
    } else {
    $.get('/fa/Addresses/GetCustomerAddresses?customerId=' + $("#CustomerId").val()+'&_='+ new Date().getTime() , function(data) {
    $("#customerAddress").hide().html(data).fadeIn("slow");
    GetShoppingCartReviewItems();
    
    });
    if (callbackFunction != null && callbackFunction.length > 0)
    {
    callbackFunction(result);
    }
    }
    },
    error: function(result) {
    if (callbackFunction != null && callbackFunction.length > 0)
    {
    callbackFunction(result);
    }
    }
    });
    return false;
    }
    
    function SubmitForm(sender) {
    if($("[data-IsRangeShippment]").length > 0 && $("[data-IsRangeShippment]").length != $(".td-transport").length){
    msgBox('خطا', 'لطفا روش های حمل را انتخاب نمایید', 'warning');
    return false;
    }
    var FloorAmount=$("#FloorAmount").val();
    if(FloorAmount != null && FloorAmount.length >0 )
    {
    FloorAmount=parseInt(FloorAmount);
    var cartTotalPrice=parseInt($("#TotalPrice").val());
    if(FloorAmount > 0 && cartTotalPrice < FloorAmount)
    {
    var messageContent='هزینه سفارش شما کمتر از مبلغ مجاز می باشد.'+"<br></br>"+
    'حداقل مبلغ : '+currencyFormat(FloorAmount) +' '+$("#CurrencyTitle").val();
    msgBox("خطا", messageContent, "warning");
    return false;
    }
    }
    var selectedShippingCosts = "";
    var selectedShippingCost  = "";
    var selectedShipping = true;
    var shippableInput=$('#OrderShippable');
    var orderShippable='True';
    if(shippableInput != null && shippableInput.length > 0 )
    {
    var orderShippable = $('#OrderShippable').val();//order shippable
    if(orderShippable == null || orderShippable.length < 1 )
    {
    orderShippable ='True';
    }
    }
    orderShippable = orderShippable == "True" ? true : false;
    var shippingForItems = $(".shippingMeyhodDropdown");
    var shippingForOrder = $(".orderShipping");
    if (shippingForItems != null && shippingForItems.length > 0) {
    $(".shippingMeyhodDropdown").each(function() {
    if ($(this).val() == 0)
    selectedShipping = false;
    selectedShippingCosts += $(this).val() + ":" + $(this).attr('id') + ";";
    $("#SelectedShippingCosts").val(selectedShippingCosts);
    });
    }else if (shippingForOrder != null && shippingForOrder.length > 0) {
    if($("input[name=SelectShippingMethodId]").length > 0)
    {
    selectedShippingCost =$("input[name=SelectShippingMethodId]:checked").val();
    if (selectedShippingCost != null && selectedShippingCost.length > 0) {
    $("#ShippingMethodId").val(selectedShippingCost);
    } else {
    selectedShipping = false;
    }
    }
    else
    {
    selectedShippingCost =$("input[name=orderShippingMethod]:checked").val();
    if (selectedShippingCost != null && selectedShippingCost.length > 0) {
    $("#SelectedShippingCost").val(selectedShippingCost);
    } else {
    selectedShipping = false;
    }
    }
    } else {
    selectedShipping = false;
    }
    if (selectedShipping == false && orderShippable) {
    msgBox('خطا', 'لطفا روش های حمل را انتخاب نمایید', 'warning');
    return false;
    }
    if (' != null') {
    if(orderShippable)
    {
    if (('' == 'PaymentAndShipping' || '' == 'OnlyShipping') && $("#AddressId").val() == null) {
    msgBox('خطا', 'لطفا آدرس را انتخاب نمایید', 'warning');
    return false;
    } else {
    if ($("#AddressId").val() != undefined || $("#AddressId").val() != "" || $("#AddressId").val() != null) {
    $("#SelectedAddressId").val($("#AddressId").val());
    }
    }
    }

    if ($("input[name='PaymentId'][type='radio']:checked").val() == null) {

    msgBox('خطا', 'لطفا نحوه ی پرداخت را انتخاب نمایید', 'warning');
    return false;
    } else if ('' == 'OnlyPayment') {
    if ($("input[name=PaymentId]:checked").val() == 'CashOnDelivery') {
    msgBox('خطا', 'انتخاب این روش پرداخت برای شما امکان پذیر نمی باشد،لطفا روش دیگری را انتخاب نمایید', 'warning');
    return false;
    }

    if($("input[name=PaymentId]:checked").val()  == 'ReceiptRegistration')
    {
    msgBox('خطا', 'لطفا روش پرداخت دیگری را انتخاب نمایید', 'warning');
    return false;
    }else{
    $("#SelectedPaymentType").val($("input[name=PaymentId]:checked").val());
    $("#PaymentTypeId").val($("input[name=PaymentId]:checked").attr('id'));
    }
    } else {
    $("#SelectedPaymentType").val($("input[name=PaymentId]:checked").val());
    $("#PaymentTypeId").val($("input[name=PaymentId]:checked").attr('id'));
    }
    }


    var specsValue = "";
    $(".specsValue").each(function () {
    specsValue += $(this).val() + "&";
    });
    $("#SpecsSelectedValue").val(specsValue);
    //var coockieName1=decodeURIComponent($.cookie(coockieName));
    //$("#OrderItemsContent").val(coockieName1);
    $(sender).closest('form').submit();
    $(sender).attr('disabled','disabled');
    return false;
    }


    function validate(formData, jqForm, options) {
    for (var i = 0; i < formData.length; i++) {
    if (!formData[i].value) {
    msgBox( 'خطا', 'لطفا فیلدهای اجباری را پر نمایید', 'warning');
    return false;
    }
    }
    return true;
    }

    function showResponse(responseText, statusText, xhr, $form) {
    var message = "";

    if (' != null ') {
    message = '';
    }

    if (responseText == '-1') {
    msgBox('خطا', message, 'warning');

    } else if (responseText == '-2') {
    msgBox('خطا', message, 'warning');
    }
    else if (responseText == '0') {
    parent.location.reload(); 
    }
    }

    function doProgressSteps(stepNumber) {
    if (stepNumber == 2) {
    $('#LoginOrRegisterView').parent().addClass("item-login-active");
    } else if (stepNumber == 3) {
    $('#LoginOrRegisterView').parent().addClass("item-login-active");
    $('#paymentView').parent().addClass("item-pay-active");
    var orderId = $('#OrderId').val();
    $('#cartReviewView').attr('onClick', 'RedirectToShoppingCartReview(' + orderId + ')');
    } else if (stepNumber == 4) {
    
    $('#LoginOrRegisterView').parent().addClass("item-login-active");
    
    $('#paymentView').parent().addClass("item-pay-active");
    
    $('#ResultView').parent().addClass("item-print-active");

    var orderId = $('#OrderId').val();
    var paymentTypeId = $('#PaymentTypeId').val();
    $('#paymentView').attr('onClick', 'RedirectToPaymentView(' + orderId + ',' + paymentTypeId + ')');
    $('#paymentView').attr('href', '#');
    }
    }

    function RedirectToShoppingCartReview(orderId) {
    
    window.location.href = '/fa/ShoppingCartItem/ShoppingCartReview?webSiteType=store';
    }

    function RedirectToPaymentView(orderId, paymentTypeId) {
    window.location.href = '/fa/BankAccountsLocalized/ListBankAccounts/?orderId=' + orderId + '&paymentTypeId=' + paymentTypeId;
    }

    function addressFieldsShow(item) {
    var currentDiv = $(item).parent().find('div.continuecontent');
    var currentSpan = $(item).find('a.continuesign');
    currentDiv.slideToggle();
    $("#Address_Address1Fa").val('');
    if (currentSpan.text() == "Add Address") {
    currentSpan.text("...................");
    }
    else {
    currentSpan.text("Add Address");
    }
    }

    function ShowUnavilableMessages()
    {
    msgBox('هشدار', 'اتمام موجودی', 'information');
    return false;
    }

    function CalculateShippingCostAndRelatedCost(shippingCost,productId) {
    var currentTr = $("." + productId);
    currentTr.find('span.shippingCost').html(currencyFormat(parseInt(shippingCost)));
    currentTr.find('input.shippingCostInput').html((parseInt(shippingCost)));
    var count=currentTr.find('.productQuantity :selected').val()

    if(count == null || count.length < 1)
    {
    count=currentTr.find('.productQuantity').val()
    }
    var unitPrice = parseInt(currentTr.find("input.productUnitPrice").val()) * parseFloat(count);

    var tax = parseInt(currentTr.find("input.tax").val());

    unitPrice += parseInt(shippingCost);
    unitPrice -= parseInt(currentTr.find("input.discountAmount").val());

    unitPrice += tax;

    currentTr.find(".ProductAmountSum").html(currencyFormat(unitPrice));
    currentTr.find(".AmountSum").val(unitPrice);
    var totalPrice = 0;
    currentTr.parent().find(".AmountSum").each(function () {
    totalPrice += parseInt($(this).val());
    });

    var totalPriceWithoutTax = 0;

    $(".unitPriceAppliedDiscountWithoutTax").each(function () {
    totalPriceWithoutTax += parseInt($(this).val());

    });

    $(".shippingCostInput").each(function () {
    totalPriceWithoutTax += parseInt($(this).html());
    });

    var disAmount = 0;
    $(".discountAmount").each(function () {
    disAmount += parseInt($(this).val());
    });


    if (0 != 0) {
    $.ajax({
    url: '/fa/Discounts/CalculateDiscount',
    type: 'Post',
    data: {
    id: '0',
    price: totalPriceWithoutTax
    },
    success: function (discountResult) {
    var priceResult = discountResult.substring(0, discountResult.indexOf("&"));
    var discountAmount = discountResult.substring(discountResult.indexOf("&") + 1);
    totalPrice = parseInt(priceResult)+(parseInt(priceResult) * $("#orginalTax").val()) ;

    var disAmount1 = $("#totalDiscountAmount").attr('data-disAmount');
    if(disAmount1 != null && disAmount1.length > 0 && disAmount1 > 0)
    {
    disAmount1 =parseInt(disAmount1) + disAmount;
    $("#totalDiscountAmount").html(currencyFormat(disAmount1));
    $("#totalDiscountAmount").attr('data-disAmount', disAmount1);
    }else{
    $("#totalDiscountAmount").html(currencyFormat(parseInt(disAmount)));
    $("#totalDiscountAmount").attr('data-disAmount',disAmount);
    }
    if($("#priceSumWithoutTax") != null && $("#priceSumWithoutTax").length > 0 )
    {
    $("#priceSumWithoutTax").html(currencyFormat(parseInt(totalPriceWithoutTax)));
    }
    $("#cartTotalPrice").html(currencyFormat(totalPrice));

    $("#TotalPrice").val(totalPrice);
    }
    });
    } else {

    //totalPrice = calculateDiscount(totalPrice);
    var disAmount1 = $("#totalDiscountAmount").attr('data-disAmount');
    if(disAmount1 != null && disAmount1.length > 0 && disAmount1 > 0)
    {
    disAmount1 =parseInt(disAmount1) + disAmount;
    $("#totalDiscountAmount").html(currencyFormat(disAmount1));
    $("#totalDiscountAmount").attr('data-disAmount', disAmount1);
    }else{
    $("#totalDiscountAmount").html(currencyFormat(parseInt(disAmount)));
    $("#totalDiscountAmount").attr('data-disAmount',disAmount);
    }
    $("#cartTotalPrice").html(currencyFormat(totalPrice));
    $("#TotalPrice").val(totalPrice);
    }
    }


    function newDoProgressSteps(stepNumber) {
    if (stepNumber == 4) {
    $(".steps").addClass("steps3");
    $(".bullet.login").addClass("pass tick");
    $(".bullet.or").addClass("pass tick");
    $(".bullet.pi").addClass("pass tick");
    $(".bullet.finish").addClass("pass");
    $("#ShippingView").addClass("pass");
    $("#OrdesReviewView").addClass("pass");
    }
    else if (stepNumber == 3) {
    $(".steps").addClass("steps2");
    $(".bullet.login").addClass("pass tick");
    $(".bullet.or").addClass("pass tick");
    $(".bullet.pi").addClass("pass");
    $("#ShippingView").addClass("pass");
    }else if (stepNumber == 2) {
    $(".bullet.login").addClass("pass tick");
    $(".bullet.or").addClass("pass");
    }
    //var orderId = $('#OrderId').val();
    //var paymentTypeId = $('#PaymentTypeId').val();
    //$('#paymentView').attr('onClick', 'RedirectToPaymentView(' + orderId + ',' + paymentTypeId + ')');
    //$('#paymentView').attr('href', '#');
    }
    var shippingCostSelectedAmount=0;
    function setShippingCostForOrder(shippingCostId, model,item) {

    
    $.ajax({
    url: '/fa/ShippingCosts/GetShippingCostByProductsIdsAndProductsQuantities',
    type: 'Post',
    data: {
    shippingCostId: shippingCostId,
    productsIdsAndCount: model,
    orderAmount : $("#TotalPrice").val()
    },
    success: function (result) {
    try{
    var currencyrateResult = result * parseFloat($(item).attr('data-currencyrate'));
    if(!isNaN(currencyrateResult))
    result = currencyrateResult;
    }catch(ex){}

    
    if($("td.td-transport:not([data-IsRangeShippment])").length>0)
    {
    $("td.td-transport:not([data-IsRangeShippment])").text($(item).parent().text());
    }
    
    var wageFunction="";
    $("input[name=PaymentId]:checked").each(function(){

    wageFunction=$(this).attr('data-onclick');
    var wageData=$(this).attr('data-wage');
    var wageUsepercentage=$(this).attr('data-usepercentage');
    if(wageFunction && wageData && wageUsepercentage )
    {
    wageData = wageData.replace('"', '');
    wageUsepercentage=wageUsepercentage.replace('"', '');
    window[wageFunction](wageUsepercentage,wageData);
    $(this).attr('checked',false);
    }

    });
    if(shippingCostSelectedAmount>0){
    $("#TotalPrice").val((parseInt($("#TotalPrice").val())-shippingCostSelectedAmount));
    }
    shippingCostSelectedAmount=parseInt(result);
    $("#orderShippingsCots").text(currencyFormat(parseInt(result)));
    $("#cartTotalPrice").text(currencyFormat(parseInt(result)+parseInt($("#TotalPrice").val())));
    $("#TotalPrice").val(parseInt(result)+parseInt($("#TotalPrice").val()));
    return false;
    
    applyedDiscount = false;
    var disAmount=$("#totalDiscountAmount").attr('data-disAmount')
    if(disAmount != null && disAmount.length > 0 && disAmount > 0 )
    {
    disAmount =parseInt(disAmount) - parseInt(applyedDiscountAmount);
    var orderdiscountAmount=parseInt($("[data-orderdiscount]").attr("data-orderdiscount"));
    if(!isNaN(orderdiscountAmount)){
    disAmount +=orderdiscountAmount;
    }
    $("#totalDiscountAmount").html(currencyFormat(disAmount));
    $("#totalDiscountAmount").attr('data-disAmount',disAmount);
    }
    },
    error: function (result) {
    CalculateShippingCostAndRelatedCostForOrders(0);
    }
    });
    }

    function CalculateShippingCostAndRelatedCostForOrders(shippingCost) {
    var totalPrice = 0;
    var tax=0;
    if($('#taxAmount')!=null && $('#taxAmount').length>0)
    tax=$('#taxAmount').val();
    $(".AmountSum").each(function () {
    totalPrice += parseInt($(this).val());
    });

    totalPrice= parseInt(totalPrice) + parseInt(tax)+ parseInt(shippingCost);
    var totalPriceWithoutTax = 0;
    $(".unitPriceAppliedDiscountWithoutTax").each(function () {
    totalPriceWithoutTax += parseInt($(this).val());
    });

    var disAmount = 0;
    $(".discountAmount").each(function () {
    disAmount += parseInt($(this).val());
    });
    try{
    var orderdiscountAmount=parseInt($("[data-orderdiscount]").attr("data-orderdiscount"));
    if(!isNaN(orderdiscountAmount)){
    disAmount +=orderdiscountAmount;
    totalPrice -=orderdiscountAmount;
    }
    }catch(ex){}

    if (0 != 0) {
    $.ajax({
    url: '/fa/Discounts/CalculateDiscount',
    type: 'Post',
    data: {
    id: '0',
    price: totalPriceWithoutTax
    },
    success: function (discountResult) {
    var priceResult = discountResult.substring(0, discountResult.indexOf("&"));
    var discountAmount = discountResult.substring(discountResult.indexOf("&") + 1);
    totalPrice = parseInt(priceResult)+(parseInt(priceResult) * $("#orginalTax").val()) ;
    $("#totalDiscountAmount").html(currencyFormat(discountAmount));
    disAmount = parseInt(discountAmount) + disAmount;
    $("#totalDiscountAmount").html(currencyFormat(disAmount));
    $("#totalDiscountAmount").attr('data-disAmount',disAmount);

    $("#cartTotalPrice").html(currencyFormat(totalPrice));
    $("#orderShippingsCots").attr('data-Cost',parseInt(shippingCost));
    $("#orderShippingsCots").text(currencyFormat(parseInt(shippingCost)));
    $("#TotalPrice").val(totalPrice);
    }
    });
    } else {

    //totalPrice = calculateDiscount(totalPrice);
    $("#totalDiscountAmount").html(currencyFormat(disAmount));
    $("#cartTotalPrice").html(currencyFormat(totalPrice));
    $("#orderShippingsCots").attr('data-Cost',parseInt(shippingCost));
    $("#orderShippingsCots").text(currencyFormat(parseInt(shippingCost)));
    $("#TotalPrice").val(totalPrice);
    }
    }

    function NotAvilabel(elem)
    {
    if(elem!=null){
    var featureDesc = $(elem).attr('featureDesc');
    if($("[data-FeatureDescView]")[0]){
    var featureDescTag = $("[data-FeatureDescView]")[0];
    featureDescTag.innerText=featureDesc;
    }
    }
    msgBox('هشدار','اتمام موجودی','information');
    return false;
    }

    function ShoppingCartProductsInValidCount()
    {
    msgBox('هشدار','درخواست بیش از حد مجاز است','information');
    return false;
    }

    function ProductAppliedCountUnitsRate(item, itemType,optionalItems) {
    var id = $(item).find('option:selected').attr('id');
    var quy = parseFloat($(item).val());

    var countUnitSymbol = $(item).find('option:selected').attr('symbol');
    var countUnitRate = $(item).find('option:selected').attr('rate');

    var currentCoockieValue = GetShoppingCartCookiesValues();
    if (currentCoockieValue != null && currentCoockieValue.length > 0) {
    updateShoppingCartCookie(id,quy, itemType,optionalItems,countUnitRate,countUnitSymbol);
    $.get('/fa/ShoppingCartItem/GetShoppingCartItemsForReview'+'?_='+ new Date().getTime() , function (data) {
    $("#cartItems").hide().html(data).fadeIn("slow");
    $.get('/fa/Addresses/GetCustomerAddresses?customerId=' + $("#CustomerId").val()+'&_='+ new Date().getTime() , function(data) {
    $("#customerAddress").hide().html(data).fadeIn("slow");
    });
    });
    }
    }


    function GetTheAddressShippingMethods(addressId) {
    $.get('/fa/ShoppingCartItem/ShippingMethodList?addressId='+addressId+'&_='+ new Date().getTime() , function (data) {
    $("#ShippingMethods").hide().html(data).fadeIn("slow");
    });
    }

    function ApplyWage(usePercentage,wage)
    {
    selectedShippingCost =$("input[name=orderShippingMethod]:checked").val();
    if($("input[name=SelectShippingMethodId]").length > 0)
    {
    selectedShippingCost =$("input[name=SelectShippingMethodId]:checked").val();
    }
    if (selectedShippingCost != null && selectedShippingCost.length > 0) {
    var totalPrice = parseFloat($('#TotalPrice').val());
    var totalPriceWithoutShippingCost=parseFloat($("#TotalPriceWithoutShippingCost").val())
    var result=totalPrice;
    if(usePercentage == true && parseFloat(wage) > 0)
    {
    result= totalPrice +(totalPrice * (parseFloat(wage)/100) );
    
    }else if(usePercentage == false && parseFloat(wage) > 0){
    result= totalPrice + parseFloat(wage);
    
    }
    $("#TotalPrice").html(result);
    $("#cartTotalPrice").html(currencyFormat(result));
    } else {
    msgBox('خطا', 'لطفا روش های حمل را انتخاب نمایید', 'warning');
    return false;
    }

    }

    function SetCookieForDeletedUnAvailableProducts() {
    
    }

    function shippingMethodSelect()
    {
    applayTheDiscountCode();
    
    }
    
    function get_shoppingCart_cookies_array() {
    var cookies = [];
    if (document.cookie && document.cookie != '') {
    var split = document.cookie.split(';');
    for (var i = 0; i < split.length; i++) {
    var name_value = split[i].split("=");
    if ($.trim(name_value[0]).indexOf(coockieName) == 0) {
    name_value[0] = name_value[0].replace(/^ /, '');
    cookies.push(name_value[0]);
    }
    }
    }
    return cookies;
    }

    function GetShoppingCartCookiesValues()
    {
    var cookies = get_shoppingCart_cookies_array();
    var jsonValues = [];
    if (cookies != null) {
    $.each(cookies, function (i,name) {
    var jsonObj = $.parseJSON(decodeURIComponent($.cookie(name)));
    $.each(jsonObj, function (index,item) {
    jsonValues.push(item);
    });
    });
    }
    return jsonValues;
    }
    function RemoveShoppingCartCookies()
    {
    var cookies = get_shoppingCart_cookies_array();
    var jsonValues = [];
    if (cookies != null) {
    $.each(cookies, function (i,name) {
    $.removeCookie(name, { path: '/' });
    });
    }

    }
    function SetShoppingCartCookiesValues(jsonValues)
    {
    RemoveShoppingCartCookies();
    var fromIndex = 0;
    var cookieNumber = 0;
    $.each(jsonValues, function (index, item) {
    if(cookieNumber == 10 )
    {
    msgBox('خطا', 'Maximum number of products added to shopping cart', 'warning');
    return;
    }
    var encodedJsonString = encodeURIComponent(JSON.stringify(jsonValues.slice(fromIndex,index+1)));
    if(encodedJsonString.length > 4000){
    var cookieItemName = coockieName + "-" + cookieNumber;
    var cookieStringValue = JSON.stringify(jsonValues.slice(fromIndex,index));
    $.cookie(cookieItemName, cookieStringValue , { expires: 1, path: '/' });
    fromIndex = index;
    cookieNumber++;
    }
    });
    if(cookieNumber < 10 && fromIndex < jsonValues.length) // برای باقیمانده
    {
    var encodedJsonString = encodeURIComponent(JSON.stringify(jsonValues.slice(fromIndex,jsonValues.length)));
    if(encodedJsonString.length < 4000){
    var cookieItemName = coockieName + "-" + cookieNumber;
    var cookieStringValue = JSON.stringify(jsonValues.slice(fromIndex,jsonValues.length));
    $.cookie(cookieItemName, cookieStringValue, { expires: 1, path: '/' });
    }
    }
    }
    
    function ShoppingCartCheckItems(shoppingCartProductsId) {
    //var jsonObj = GetShoppingCartCookiesValues();
    //var itemsIds = [];
    //$.each(jsonObj, function (shopindex, shopitem) {
    //var exist = false;
    //$.each(shoppingCartProductsId, function (index,item) {
    //if (shopitem.id == item) {
    //exist = true;
    //}
    //});
    //if (!exist) {
    //itemsIds.push(shopitem.id);
    //}
    //});
    //$.each(itemsIds, function (index,item) {
    //$.each(jsonObj, function (shopindex, shopitem) {
    //if (shopitem && shopitem.id == item) {
    //jsonObj.splice(shopindex, 1);
    //}
    //});
    //});
    //SetShoppingCartCookiesValues(jsonObj);
    }
    
