
    $(document).ready(function () {
        if (document.getElementById("m_imgCaptcha") != null) {
            loadCaptcha();
        }
try
{
$('ul[role=tablist] li a').click(function () {

            $(this).tab('show');
        });

$('div[role=tabpanel].collapse').collapse();

}
catch(error)
{
}
    });

    function addLoadEvent(func) {
        var oldonload = window.onload;
        if (typeof window.onload != 'function') {
            window.onload = func;
        } else {
            window.onload = function () {
                if (oldonload) {
                    try {
                        oldonload();
                    }
                    catch (err) { }
                }
                func();
            }
        }
    }

    $('.shoppingCartPanel a').click(function (event) {
        if ($(this).attr('href') == '#') {
            event.preventDefault();
        }
    });

    function WaitingHelper(invisible, action, wait) {
        if (wait) {
            $(invisible).css('display', 'block');
            $(action).hide();
            $(invisible).show();

        } else {
            $(invisible).css('display', 'none');
            $(action).show();
            $(invisible).hide();
        }
    }

    function RightClickDisabled(tagName)//example:img
    {
        $(tagName).bind('contextmenu', function (e) {
            return false;//disable right click on images
        });
    }

    function QuickContact() {
        jQuery(function ($) {

            var name = $('#quickContactName').val();
            var email = $('#quickContactEmail').val();
            var phone = $('#quickContactPhone').val();
            var message = $('#quickContactmessage').val();
            var subject = $('#subject').val();
            if (message.trim() == "" || phone.trim() == "") {
                ShowMsg('نتیجه', 'لطفاً موارد اجباری را وارد نمایید', "error");
                return false;
                }
                WaitingHelper('#quickContactInvisible', '#quickContactAction', true);
                $.ajax({
                url: '/fa/home/AjaxQuickContact',
                datatype: 'json',
                type: 'POST',
                data: { f_name: name, f_email: email, f_message: message, f_phone: phone, subject: subject },
                success: function (result) {
                WaitingHelper('#quickContactInvisible', '#quickContactAction', false);
                ShowMsg('نتیجه', result, "info");
                },
                error: function () {
                WaitingHelper('#quickContactInvisible', '#quickContactAction', false);
                }
                });
                });
                }
                function SaveProductOrder(name, email, phone, message, captchaText, productName, useCaptcha) {
                if (name.trim() == "" || phone.trim() == "") {
                ShowMsg('نتیجه', 'لطفاً موارد اجباری را وارد نمایید', "error");
                return false;
                }
                WaitingHelper('#orderInvisibleInput', '#orderActionInput', true);

                $.ajax({
                url: '/fa/home/Order?checkCaptcha=' + useCaptcha,
                datatype: 'json',
                type: 'POST',
                data: { Name: name, Email: email, Phone: phone, Message: message, captcha: captchaText, ProductName: productName },
                success: function (result) {
                WaitingHelper('#orderInvisibleInput', '#orderActionInput', false);
                ShowMsg('نتیجه', result, "info");

                },
                error: function () {
                WaitingHelper('#orderInvisibleInput', '#orderActionInput', false);
                }
                });
                }


                function loadCaptcha(id,sId) {
                var imgId = "#m_imgCaptcha";
                if (id != null && id.length>0){
                imgId = "#" + id;
                sId=id;
                }
                else{
                sId=-1;
                }
                $(imgId).attr('src', '/fa/Captcha/GenerateCaptcha?random=' + Math.random().toString()+'&&sessionId='+sId);


                }

                function ShowMsg(title, content, type) {
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

                function IsNullOrEmpty(value) {
                try {
                value = value.toString();
                } catch (e) {
                return false;
                }
                return (value);
                }

                $('#ProvinceId').change(function () {
                var value = $(this).val();
                if (value == "")
                return true;
                $.ajax({
                url: '/fa/Cities/GetProvinceCities',
                type: 'POST',
                data: { provinceId: value },
                success: function (result) {
                var cityddl = $('#CitiesId');
                cityddl.empty();
                cityddl.append(
                $('<option />', {
                value: "",
                text: "نام شهر"
                }));
                $.each(result, function (index, item) {

                cityddl.append(
                $('<option />', {
                value: item.Value,
                text: item.Text
                })
                );
                });
                $('#CitiesId').show();
                }
                });
                return true;
                });

                $('#CitiesId').change(function () {
                var value = $(this).val();
                if (value == "")
                return true;
                $.ajax({
                url: '/fa/Addresses/GetCitiesRegions',
                type: 'POST',
                data: { cityId: value },
                success: function (result) {
                var regionddl = $('#RegionsId');
                regionddl.empty();
                regionddl.append(
                $('<option />', {
                value: "",
                text: "نام منطقه"
                }));
                $.each(result, function (index, item) {

                regionddl.append(
                $('<option />', {
                value: item.Value,
                text: item.Text
                })
                );
                });
                $('#RegionsId').show();
                },
                });
                return true;
                });

                $('#RegionsId').change(function () {
                var value = $(this).val();
                if (value == "")
                return true;
                $.ajax({
                url: '/fa/Addresses/GetRegionsNeighborhoods',
                type: 'POST',
                data: { regionId: value },
                success: function (result) {
                var neighborhoodsddl = $('#NeighborhoodsId');
                neighborhoodsddl.empty();
                neighborhoodsddl.append(
                $('<option />', {
                value: "",
                text: "نام محله"

                }));
                $.each(result, function (index, item) {

                neighborhoodsddl.append(
                $('<option />', {
                value: item.Value,
                text: item.Text
                })
                );
                });
                $('#NeighborhoodsId').show();
                },
                });
                return true;
                });

                function submitForm(item) {
                $(item).closest("form").submit();
                }

                

                function LogOff() {
                $.ajax({
                url: '/fa/User/Account/AjaxLogOff',
                type: 'POST',
                success: function (result) {
                location.reload();
                }
                });
                }

                function DoLike(item, entityName, islike, waitingClass) {
                var currentClass = $(item).attr('class');
                if(waitingClass==null)
                {
                waitingClass='glyph fa fa-spinner fa-pulse';
                }
                $.ajax({
                beforeSend: function () {
                $(item).attr('class', waitingClass);
                },
                url: '/fa/Likes/DoLike',
                type: 'POST',
                data: { id: $(item).attr('id'), isLike: islike, entitiesName: entityName },
                success: function (result) {
                $(item).attr('class', currentClass);
                var likeCount = result.substring(0, result.indexOf(";"));
                var disLikeCount = result.substring(result.indexOf(";") + 1);

                if (result != "-1") {
                if (islike) {
                $(item).find('.likesCount').html(likeCount);
                } else {
                $(item).find('.likesCount').html(disLikeCount);
                }
                $(item).animate({
                opacity: 1,
                }, 'slow');
                }
                else {
                ShowMsg('هشدار', 'شما مجاز به لایک مجدد نیستید', "info");
                }
                }
                });
                }

                function MoneyFormat(a) {
                return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }

                function printTagInnderHTML(tagId) {
                var printContents = document.getElementById(tagId).innerHTML;
                var originalContents = document.body.innerHTML;
                document.body.innerHTML = printContents;
                window.print();
                document.body.innerHTML = originalContents;
                }


                function globalsearch(item, searchCategory) {
                var qValue = $.trim($(item).val());
                if (qValue.length < 1)
                return false;
                var category = $.trim($(searchCategory).val());


                var url = '/fa/%D8%AC%D8%B3%D8%AA%D8%AC%D9%88/_category/_qvalue/%D8%B5%D9%81%D8%AD%D9%87/1/%D8%AA%D8%B9%D8%AF%D8%A7%D8%AF-%D8%AF%D8%B1-%D8%B5%D9%81%D8%AD%D9%87/50';
                qValue = qValue.split(" ").filter(function (v) { return v !== '' }).join("-");
                category = category.split(" ").filter(function (v) { return v !== '' }).join("-");
                var friendlyUrl = url.replace("_qvalue", qValue).replace("_category", category).replace('//', '/');
                window.location.href = friendlyUrl;
                }

                $('#globalsearchInput').keypress(function (e) {
                if (e.which == '13') {
                globalsearch($(this), '#globalSearchCateogry')
                }
                });
                $('.globalsearchInput').keypress(function (e) {
                if (e.which == '13') {
                globalsearch($(this), '.globalSearchCateogry')
                }
                });
                $('.searchFilterInput').keypress(function (e) {
                if (e.which == '13') {
                $('.globalSearchButton').trigger('click');
                }
                });

                function doHrefAction(hrefContainerId) {
                location.href = $('.' + hrefContainerId).attr('href');
                }
                (function ($) {

                $.fn.unveil = function (threshold, callback) {
                try {
                var $w = $(window),
                th = threshold || 0,
                retina = window.devicePixelRatio > 1,
                attrib = retina ? "data-src-retina" : "data-src",
                images = this,
                loaded;

                this.one("unveil",
                function() {
                var source = this.getAttribute(attrib);
                source = source || this.getAttribute("data-src");
                if (source) {
                this.setAttribute("src", source);
                if (typeof callback === "function") callback.call(this);
                }
                });

                function unveil() {
                var inview = images.filter(function() {
                var $e = $(this);
                if ($e.is(":hidden")) return;

                var wt = $w.scrollTop(),
                wb = wt + $w.height(),
                et = $e.offset().top,
                eb = et + $e.height();

                return eb >= wt - th && et <= wb + th;
                });

                loaded = inview.trigger("unveil");
                images = images.not(loaded);
                }

                $w.on("scroll.unveil resize.unveil lookup.unveil", unveil);

                unveil();

                return this;
                }
                catch (err)
                {

                }

                };

                })(window.jQuery || window.Zepto);
                $(document).ready(function () {try{ $("img").unveil(); }catch(err){}});
                var qazy = {};qazy.qazy_image = "data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs";qazy.view_elements = [];qazy.reveal = function(){for(var count = 0; count < qazy.view_elements.length; count++){var offsetParentTop = 0;var temp = qazy.view_elements[count];do{if(!isNaN(temp.offsetTop)){offsetParentTop += temp.offsetTop;}}while(temp = temp.offsetParent)var pageYOffset = window.pageYOffset;var viewportHeight = window.innerHeight;var offsetParentLeft = 0;var temp = qazy.view_elements[count];do{if(!isNaN(temp.offsetLeft)){offsetParentLeft += temp.offsetLeft;}}while(temp = temp.offsetParent);var pageXOffset = window.pageXOffset;var viewportWidth = window.innerWidth;if(offsetParentTop > pageYOffset && offsetParentTop < pageYOffset + viewportHeight){qazy.view_elements[count].src = qazy.view_elements[count].getAttribute("data-qazy-src");qazy.view_elements.splice(count, 1);count--;}else{}}};window.addEventListener("resize", qazy.reveal, false);window.addEventListener("scroll", qazy.reveal, false);qazy.qazy_list_maker = function(){var elements = document.querySelectorAll("img[data-qazy][data-qazy='true']");for(var count = 0; count < elements.length; count++){qazy.view_elements.push(elements[count]);elements[count].setAttribute("data-qazy", "false");var source_url = elements[count].src;elements[count].setAttribute("data-qazy-src", source_url);elements[count].src = elements[count].getAttribute("data-qazy-placeholder") || qazy.qazy_image; }};qazy.intervalObject = setInterval(function(){qazy.qazy_list_maker();qazy.reveal();}, 50);function setQazyImg(img){qazy.qazy_image=img;return true;}
                function JsonSubmitAjaxFormWithModel(sender, resultTagId, waitingButtonId, actionButtonId, captchaId, checkCaptcha, clientValidation, redirectUrl, callbackFunction) {
                if (checkCaptcha == null)
                checkCaptcha = true;
                if (clientValidation == null)
                clientValidation = true;

                var formObject = $(sender).closest("form");

                $(function () {
                var formIsvalidated = false;
                if (clientValidation == true)
                formIsvalidated = $(formObject).valid();
                if (formIsvalidated || clientValidation == false) {
                WaitingHelper(waitingButtonId, actionButtonId, true);
                $.ajax({
                url: $(formObject).attr('action'),
                type: $(formObject).attr('method'),
                data: $(formObject).serialize(),
                success: function (result) {
                $(resultTagId).html(result.Message);
                if (checkCaptcha)
                loadCaptcha(captchaId, captchaId);
                WaitingHelper(waitingButtonId, actionButtonId, false);
                if (redirectUrl != null && redirectUrl.length > 0 && result.Status == '2') {
                window.location.href = redirectUrl;
                } else if (callbackFunction != null && callbackFunction.length > 0) {
                $(resultTagId).html('');
                callbackFunction(result);
                }
                },
                error: function (result) {
                if (checkCaptcha)
                loadCaptcha(captchaId, captchaId);
                WaitingHelper(waitingButtonId, actionButtonId, false);
                $(resultTagId).html(result.Message);
                if (callbackFunction != null && callbackFunction.length > 0)
                callbackFunction(result);
                }
                });
                } else {
                var status = '1';
                var message = 'لطفاً موارد اجباری را وارد نمایید';
                var resultModel = { Status: status, Message: message };
                if (callbackFunction != null && callbackFunction.length > 0) {
                callbackFunction(resultModel);
                }
                else {
                $(resultTagId).html(resultModel.Message);
                }

                }
                });

                }

                function defaultAjaxJsonResult(resultModel) {
                if (resultModel.Message.length > 0)
                alert(resultModel.Message)
                }
                function renderCaptcha() {
                $(".cpatchaImgContainer").each(function (index) {
                var id = $(this).attr('id')
                loadCaptcha(id, id)

                });
                }

                $(document).ready(function () {
                addLoadEvent(renderCaptcha);
                });
                //

                function RegisterViewCall() {
                parent.location.href = "/fa/Account/LoginOrRegister?viewResult=Register";
                }

                $('#basket').click(function (event) {
                if ($(this).attr('href') == '#') {
                event.preventDefault();
                }
                });


                

                


                function appendScript(filepath,attr='',attrValue='') {
                if ($('body script[src="' + filepath + '"]').length > 0)
                return;

                var ele = document.createElement('script');
                ele.setAttribute("type", "text/javascript");
                if(attr.length>0 && attrValue.length>0)
                ele.setAttribute(attr, attrValue);
                ele.setAttribute("src", filepath);
                document.getElementsByTagName("body")[0].appendChild(ele);
                }

                function appendStyle(filepath) {
                if ($('head link[href="' + filepath + '"]').length > 0)
                return;

                var ele = document.createElement('link');
                ele.setAttribute("type", "text/css");
                ele.setAttribute("rel", "Stylesheet");
                ele.setAttribute("href", filepath);
                document.getElementsByTagName("head")[0].appendChild(ele);
                }

                $("form input").on('keypress', function (e) {
                if (e.which == '13') {
                $(this).closest("form").find("[type=button][onclick]").trigger("click");
                }
                });
                function NationalCodeValidation(nationalCode){
                try
                {
                if(nationalCode!="" && nationalCode.length==10){
                var numArray=new Array();
                for (var i = 0; i < nationalCode.length; i++)
                {
                numArray[i] = nationalCode.charAt(i);
                }
                var num2 = numArray[9];
                switch (nationalCode)
                {
                case "0000000000":
                case "1111111111":
                case "22222222222":
                case "33333333333":
                case "4444444444":
                case "5555555555":
                case "6666666666":
                case "7777777777":
                case "8888888888":
                case "9999999999":
                return false;
                }
                var num3 = ((((((((numArray[0] * 10) + (numArray[1] * 9)) + (numArray[2] * 8)) + (numArray[3] * 7)) + (numArray[4] * 6)) + (numArray[5] * 5)) + (numArray[6] * 4)) + (numArray[7] * 3)) + (numArray[8] * 2);
                var num4 = num3 - (Math.floor((num3 / 11)) * 11);
                if ((((num4 == 0) && (num2 == num4)) || ((num4 == 1) && (num2 == 1))) || ((num4 > 1) && (num2 == Math.abs(num4 - 11))))
                {
                return true;
                }
                else
                {
                return false;
                }
                }
                }
                catch (er)
                {
                alert(er.message);
                }
                }


                
