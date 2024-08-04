


    var global = "";

function GetUrlFiltersFromHashUrl() {
var keyValueRegex=/(.*?)-(.*)/
        var jsonResult = [];
        var vars = [], hash;
        if (decodeURIComponent(window.location.href).indexOf('#!') != -1) {

            var hashes = decodeURIComponent(window.location.href).slice(decodeURIComponent(window.location.href).indexOf('#!') + 3).split('/');
for (var i = 0; i < hashes.length; i++) {
if(hashes[i] != null && hashes[i].length >0 ){
jsonResult.push(jsonCreator(keyValueRegex.exec(hashes[i])[1], keyValueRegex.exec(hashes[i])[2]));
}
            }
        }
        var moreRowsUrl = '/fa/ProductsLocalized/AsInfiniteScroll';
        var jsonString = "";
        if (jsonResult != null && jsonResult.length) {
        jsonString = JSON.stringify(jsonResult);
        }
        FiletrRecords(moreRowsUrl, jsonString,true);
        ChooseSelectedFilters(jsonString);
        }

        function ChooseSelectedFilters(jsonString) {
        if(jsonString !=null && jsonString.length < 1)
        {
        return false;
        }
        var jsonObj = $.parseJSON(jsonString);
        $("#selectedFiltersList").html();
        var filters="";

        $.each(jsonObj, function (i, item) {
        if (item.Key == "search") {
        $('#serchedProduct').val(item.Value);}
        if (item.Key == "fromPrices") {
        $('.minprice').html(item.Value);
        } else if (item.Key == "toPrices") {
        $('.maxprice').html(item.Value);
        } else if(item.Key != "showAvilable" && item.Key !="sortBy"&& item.Key !="sort") {
        var id = item.Key.replace(/\s+/g, '')+ item.Value.replace(/\s+/g, '');
        $('#' + id).attr('checked', 'checked');
        var featureType=$('#' + id).attr('color');
        if(featureType == null || featureType.length < 1 )
        {
        filters+='<span class="filterbtn">' + item.Key + ':&nbsp;' + item.Value + '<span onclick=DeleteSelectedFilter("'+id+'"); class="removebtn"></span></span>';
        }
        }
        });
        $("#selectedFiltersList").html(filters);
        }

        function jsonCreator(key, value) {
        filters = {};
        filters["Key"] = key;
        filters["Value"] = value;
        return filters;
        }

        function DeleteSelectedFilter(deleteId)
        {
        $('#' + deleteId).trigger( "click");
        GetFilterItemsValue();
        }

        //این متد جهت گرفتن مقدارهای فیلتر قیمت بعد از تغییر محدوده قیمت می باشد و دیگر فیلرها.
        function GetFilterItemsValue(categorySelected) {
        debugger;
        var jsonResult = [];
        //برای گرفتن مقدرا فیلتر های قیمت
        var fromPrices = $("#amount .minprice").text();
        var miPrice=$("#DefaultMinPrice").val();
        if(miPrice!=null && miPrice.length  > 0){
        var defaultFromPrices = MoneyFormat(miPrice);
        if (fromPrices != defaultFromPrices) {
        jsonResult.push(jsonCreator("fromPrices", fromPrices));
        }
        }
        var toPrices = $("#amount .maxprice").text();

        var maPrice=$("#DefaultMaxPrice").val();
        if(maPrice!=null && maPrice.length > 0){
        var defaultToPrices = MoneyFormat(maPrice);
        if (toPrices != defaultToPrices) {
        jsonResult.push(jsonCreator("toPrices", toPrices));
        }
        }


        //برای گرفتن مقدرا فیلتر های قیمت

        //برای گرفتن مقدار فیلتر نمایش کالاهای  موجود
        var status = $("#status");
        if (status != null && status.length > 0) {
        var showAvilable = false;
        if (status.hasClass('on')) {
        showAvilable = true;
        jsonResult.push(jsonCreator("showAvilable", showAvilable));
        }
        }
        //برای گرفتن مقدار فیلتر نمایش کالاهای  موجود

        //برای گرفتن مقدار مرتب سازی کالاها
        var sortItems = $(".productsSort");
        if (sortItems != null && sortItems.length > 0 && sortItems.val() != null) {
        var selectedValue = $('.productsSort :selected').val();
        if (selectedValue != null && selectedValue.length > 0) {
        jsonResult.push(jsonCreator("sortBy", selectedValue));
        }
        var ascendingSort  = $('.ascendingSort :selected').val();
        if (ascendingSort != null && ascendingSort.length > 0) {
        jsonResult.push(jsonCreator("sort", ascendingSort));
        }
        }


        //برای گرفتن مقدار مرتب سازی کالاها

        //برای گرفتن برندهای انتخاب شده جهت فیلتر
        var selectedBrands = $(".Brands input:checked");//;
        if (selectedBrands != null && selectedBrands.length > 0) {
        selectedBrands.each(function () {
        jsonResult.push(jsonCreator("brand", $(this).attr('barndname') + ";" + $(this).attr('id')));
        });
        }
        //برای گرفتن برندهای انتخاب شده جهت فیلتر

        var serchedProduct = $("#serchedProduct").val();//;
        if (serchedProduct != null && serchedProduct.length > 0) {
        jsonResult.push(jsonCreator("search", serchedProduct));
        }

        $('.filterWithRange_From').each(function () {
        if ($.trim($(this).val()) != '') {
        var values = $(this).val();
        jsonResult.push(jsonCreator("from_"+$(this).attr("data-specfeature"), values));
        }
        });

        $('.filterWithRange_To').each(function () {
        if ($.trim($(this).val()) != '') {
        var values = $(this).val();
        jsonResult.push(jsonCreator("to_"+$(this).attr("data-specfeature"), values));
        }
        });

        $('.filterWithoutColor:checked').each(function () {
        if ($(this).val() != 'همه') {
        var values = $(this).val().split(',');
        jsonResult.push(jsonCreator(values[0], values[1]));
        }
        });
        $('input[data-spectype=BitValue]:checked').each(function () {

        var values = $(this).val().split(',');
        jsonResult.push(jsonCreator(values[0], values[1]));

        });
        $('input[color=ColorType]:checked').each(function () {
        if ($(this).val() != 'همه') {
        var values = $(this).val().split(',');
        jsonResult.push(jsonCreator(values[0], values[1]));
        }
        });
        var jsonString = JSON.stringify(jsonResult);
        var moreRowsUrl = '/fa/ProductsLocalized/AsInfiniteScroll';
        FiletrRecords(moreRowsUrl, jsonString);
        ChooseSelectedFilters(jsonString);
        }
        $('#serchedProduct').keypress(function (e) {
        if (e.which == '13') {
        GetFilterItemsValue();
        }
        });
