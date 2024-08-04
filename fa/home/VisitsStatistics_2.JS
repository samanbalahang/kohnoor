function setCookiejs(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    function getCookiejs(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function checkIsVisitUnique() {
        var cookie = getCookiejs("visitsstatistics");
        if (cookie != "") {
                return false;
        } else {
            setCookiejs("visitsstatistics", "visitsstatistics", 1);
            return true;
        }
    }

function visitsStatistics() {
        var url = document.URL;
        var urlreferrer = document.referrer.replace("www.","").replace("www","").replace("www","").replace("wwww","");
        var isunique = checkIsVisitUnique();
        var browserheight = $(window).height();
        var browserwidth = $(window).width();
        var ProductsId=null;
        var PostsId=null;
        var TimeLinesId=null;
        if($('#VisitsStatisticsProductsId').length){
            ProductsId=$('#VisitsStatisticsProductsId').val();
        }
        if($('#VisitsStatisticsPostsId').length){
            PostsId=$('#VisitsStatisticsPostsId').val();
        }
if($('#VisitsStatisticsTimeLinesId').length){
            TimeLinesId=$('#VisitsStatisticsTimeLinesId').val();
        }
        httpPOST(isunique, browserheight, browserwidth, url, urlreferrer,ProductsId,PostsId,TimeLinesId);

}

        function httpPOST(isunique, browserheight, browserwidth, url, urlreferrer,ProductsId,PostsId,TimeLinesId) {
        var actionurl = '/fa/VisitsStatistics/VisitsStatistics' + "?isunique=" + isunique + "&browserheight=" + browserheight + "&browserwidth=" + browserwidth + "&url=" + url + "&urlreferrer=" + urlreferrer + "&ProductsId=" + ProductsId + "&PostsId=" + PostsId+ "&TimeLinesId=" + TimeLinesId;
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", actionurl, true);
        xhttp.send();
        }

        visitsStatistics();

