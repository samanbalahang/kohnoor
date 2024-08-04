//Copyright © 2016 WebOne.Co کپی برداری و یا هرگونه استفاده از این کدها پیگرد قانونی دارد
$(function () {$("div.infiniteScrollLoadingUp").hide();});
$(function () {$("div.infiniteScrollLoadingDown").hide();});
var category1='';
var category2='';
var category3='';
var supplier = '';
var pagesCountToDisplay='7';
var prevPage=1,nextPage=1,pagesize = 10,inCallback = false,currentPage=1,total = '5',
filterGlobalJson ="",hasReachedEndOfInfiniteScroll = false, lastScrollTop = 0,localPath=category1+'-'+category2+'-'+category3,_category1=category1,_category2=category2,_category3=category3,_supplier=supplier;
var moreRowsUrl = '/fa/%D8%B3%D8%A4%D8%A7%D9%84%D8%A7%D8%AA-%D9%85%D8%AA%D8%AF%D8%A7%D9%88%D9%84/%D8%B5%D9%81%D8%AD%D9%87/1/%D8%AA%D8%B9%D8%AF%D8%A7%D8%AF-%D8%AF%D8%B1-%D8%B5%D9%81%D8%AD%D9%87/10';
var infiniteQ=getParameterByName('q');
var endOfRecordsCheckUrl ='';
window.onbeforeunload = function (e) {
var pos = CalculateCurrentPageOffset();
localStorage.setItem("scrollPosition", pos);
var urlPath = window.location.pathname;
urlPath=decodeURIComponent(urlPath);
localStorage.setItem("pageUrl", urlPath);
$('body').hide()
window.scrollTo(0, 0);
};
function addLoadEvent(func) {
var oldonload = window.onload;
if (typeof window.onload != 'function') {
window.onload = func;
} else {
window.onload = function () {
if (oldonload) {
oldonload();
}
func();
}
}
}
function getParameterByName(name, url) {
try{
if (!url) url = window.location.href;
name = name.replace(/[\[\]]/g, "\\$&");
var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
results = regex.exec(url);
if (!results) return null;
if (!results[2]) return '';
return decodeURIComponent(results[2].replace(/\+/g, " "));
}catch(err)
{
return "";
}
}

function RestoreScrollPosition() {
var urlPath = window.location.pathname;
urlPath=decodeURIComponent(urlPath);
var scrollOffset = $(window).scrollTop();
var pos = localStorage.getItem("scrollPosition");
if (pos != null && urlPath.toLowerCase() == decodeURIComponent(localStorage.getItem("pageUrl")).toLowerCase() && pos > scrollOffset) {
$('html, body').animate({
scrollTop: pos
}, 200);
}
localStorage.setItem("scrollPosition", null)
localStorage.setItem("pageUrl", null)
}
$(document).ready(function () {
window.scrollTo(0, 0);
addLoadEvent(RestoreScrollPosition);
});
function CalculateCurrentPageOffset()
{
var pos=null;
var currentPageOffset = $(".infiniteScrollPageContainer:contains('" + currentPage + "')").offset().top;
var scrollOffset =$(window).scrollTop() ;
if(scrollOffset==0)
pos=0;
else
pos = scrollOffset - currentPageOffset;

return pos;
}
var scrollHandler = function () {
var st = $(window).scrollTop();
CheckforUpdatingUrl();

 if (hasReachedEndOfInfiniteScroll==false && st> lastScrollTop && (($(".ScrollableContainer").height()+$(".ScrollableContainer").offset().top-740)<=($(window).height() + $(window).scrollTop())) && ((pagesize * nextPage) < total) ) { loadMoreToInfiniteScrollTable(moreRowsUrl,filterGlobalJson) } else if (hasReachedEndOfInfiniteScroll==false && st < lastScrollTop && (st <=($(".ScrollableContainer").offset().top-200)) && prevPage>1) {
loadMoreToInfiniteScrollTablePrepend(moreRowsUrl,filterGlobalJson);
}
lastScrollTop = st;
}

//function CheckIfIsEndOfRecords(pagenum) {
// $.ajax({
// type: 'GET',
// url: endOfRecordsCheckUrl,
// data: { pageNum: pagenum},
// success: function (result) {
// if (result == "false")
// loadMoreToInfiniteScrollTable(moreRowsUrl,true);
// return false;
// },
// error: function () {
// }
// });
//}

function CheckforUpdatingUrl() {
try {
var scrollOffset = $(window).height() + $(window).scrollTop();
var nextPageTopOffset = -1;
var currentPageOffset = $(".infiniteScrollPageContainer:contains('" + currentPage + "')").offset().top;
var nextPageSeen = $(".infiniteScrollPageContainer:contains('" + (currentPage + 1) + "')");
if (nextPageSeen.length)
nextPageTopOffset = nextPageSeen.offset().top;
var PrevPageSeen = $(".infiniteScrollPageContainer:contains('" + (currentPage - 1) + "')");
if ( nextPageSeen.length && scrollOffset >= nextPageTopOffset && nextPageTopOffset > 0) {
currentPage++;
UpdateUrl(currentPage, pagesize, UrlFilterGenerator(filterGlobalJson));
BulidPagings(pagesize, pagesCountToDisplay, total, "active");
return;
}
else if (PrevPageSeen.length && scrollOffset < currentPageOffset) {
currentPage--;
UpdateUrl(currentPage, pagesize, UrlFilterGenerator(filterGlobalJson));
BulidPagings(pagesize, pagesCountToDisplay, total, "active");
return;
}
}
catch (err) {
return true;
}
}
function loadMoreToInfiniteScrollTablePrepend(loadMoreRowsUrl, jsonString) {
filterGlobalJson = jsonString;
if (!inCallback) {
inCallback = true;
prevPage--;
$.ajax({
beforeSend: function () {
$("div.infiniteScrollLoadingUp").first().show();
},
type: 'GET',
url: loadMoreRowsUrl,
data: { pageNum: prevPage, itemsPerPage: pagesize, filterItems: filterGlobalJson, isScrolling: true,path:localPath, _category1,_category2,_category3,_supplier,q:infiniteQ},
error: function (XMLHttpRequest, textStatus, errorThrown) {
inCallback = false;
$("div.infiniteScrollLoadingUp").hide();
},
success: (function (data, textstatus) {
$("div.infiniteScrollLoadingUp").hide();
$(".ScrollableContainer").prepend(data);
$(".ScrollableContainer").prepend('<div class="clear page-number"><span class="page-txt">صفحه </span><span class="infiniteScrollPageContainer">' + prevPage + '</span></div>');
window.scrollTo(0, 1);
inCallback = false;
})
});
}
}
function BulidPagings(pageSize, pagesTobeDisplayed, totalItem, currentPageClass) {
total = totalItem
$(".paging1").text('');
var paging = $(".paging1");
pagesTobeDisplayed = parseInt(pagesTobeDisplayed);
var pageNum = 1;
var currentPageFirstNumber = 1;
var currentFirstPage = 1;
var currentLastPage = pagesTobeDisplayed;
currentPageFirstNumber = Math.floor((currentPage - 1) / pagesTobeDisplayed) + 1;
currentFirstPage = (currentPageFirstNumber - 1) * pagesTobeDisplayed + 1;
currentLastPage = currentFirstPage - 1 + pagesTobeDisplayed;
var totalPages = Math.ceil(total / pageSize);
var pageResult = "";
if (currentLastPage > totalPages)
currentLastPage = totalPages;
var aTag;
if (currentFirstPage > pagesTobeDisplayed) {
aTag = document.createElement("a");
pageNum = parseInt(currentFirstPage) - 1;
aTag.setAttribute('class', "next");
aTag.href = BulidUrl(pageNum, pageSize);
$(paging).append(aTag);
}
for (var i1 = currentFirstPage; i1 <=currentLastPage; i1++) { aTag=document.createElement("a"); if (i1==currentPage) { aTag.href="#"; } else { aTag.href=BulidUrl(i1, pageSize); } var spanTag=document.createElement("span"); spanTag.innerHTML=i1; aTag.appendChild(spanTag); var aTagClass=""; if (i1==currentPage) { aTagClass=currentPageClass; } aTag.setAttribute('class', aTagClass); $(paging).append(aTag); } if (currentLastPage < totalPages) { aTag=document.createElement("a"); pageNum=parseInt(currentLastPage) + 1; aTag.setAttribute('class', "previuse"); aTag.href=BulidUrl(pageNum, pageSize); $(paging).append(aTag); } } function BulidUrl(pageNum, pageSize) { var lang="/fa/"; var urlFilter=""; var urlFilters=UrlFilterGenerator(filterGlobalJson); if (urlFilters !=null && urlFilters.length> 0) {
urlFilter = "/#!" + urlFilters;
}
var urlPath = window.location.pathname;
var pageRout = "/صفحه/";
var myRegexp = new RegExp(lang + '(.*)' + pageRout);
var urlPart = myRegexp.exec(decodeURIComponent(urlPath))[1];
var splitedUrlPath = urlPath.split("/");
var routeName = window.location.pathname.split("/")[2];
var pageSizeRout = "/تعداد-در-صفحه/";
var url = lang + urlPart + pageRout + pageNum + pageSizeRout + pageSize + urlFilter;
return url;
}
function UpdateUrl(pageNum, pageSize, urlFilters)
{
var urlPath = window.location.pathname;
urlPath=decodeURIComponent(urlPath);
var pageRout = "صفحه";
var currentPageInUrl=urlPath.match('\/'+pageRout+'\/(.*?)\/');
var pageSizeRout = "/تعداد-در-صفحه/";
var url = BulidUrl(pageNum, pageSize);
if(urlPath.toLowerCase()==url.toLowerCase())
return false;
var netxturl = BulidUrl((pageNum + 1), pageSize);
var prevurl = BulidUrl((pageNum - 1), pageSize);
$("head").find("link[rel=canonical]").attr("href", url);
$("head").find("link[rel=next]").attr("href", netxturl);
$("head").find("link[rel=prev]").attr("href", prevurl);
$(".pagination span.pageNumber").filter(function () {
if ($(this).html() == pageNum)
$(this).parent().addClass("active")
else
$(this).parent().removeClass("active");
});
window.history.pushState("url", pageNum, url);
}
function loadMoreToInfiniteScrollTable(loadMoreRowsUrl, jsonString) {
var flag = $("#filterRecordsEndFlag").val();
if (flag != null && flag.length > 0) {
return false;
}
filterGlobalJson = jsonString;
if ((nextPage > 0 && !inCallback)) {
nextPage++;
inCallback = true;
$.ajax({
beforeSend: function () {
$("div.infiniteScrollLoadingDown").last().show();
},
type: 'GET',
url: loadMoreRowsUrl,
data: { pageNum: nextPage, itemsPerPage: pagesize, filterItems: filterGlobalJson, isScrolling: true,path:localPath,_category1,_category2,_category3,_supplier,q:infiniteQ},
error: function (XMLHttpRequest, textStatus, errorThrown) {
inCallback = false;
$("div.infiniteScrollLoadingDown").hide();
}
, success: (function (data, textstatus) {
$("div.infiniteScrollLoadingDown").hide();
$(".ScrollableContainer").append('<div class="clear page-number"><span class="page-txt">صفحه </span><span class="infiniteScrollPageContainer">' + nextPage + '</span></div>');
$(".ScrollableContainer").append(data);
//UpdateUrl(nextPage, pagesize, UrlFilterGenerator(filterGlobalJson));
inCallback = false;
})
});
}
}
function FiletrRecords(url, jsonString, isRefresh) {
filterGlobalJson = jsonString;
nextPage = 1;
if (isRefresh == true) {
nextPage = '1';
} else {
currentPage = 1;
}
$.ajax({
beforeSend: function () {
$("div#preloader").css('opacity', '1');
$("div#preloader").show();
},
type: 'GET',
url: url,
data: { pageNum: nextPage, itemsPerPage: pagesize, filterItems: filterGlobalJson, isScrolling: false,path:localPath, _category1,_category2,_category3,_supplier,q:infiniteQ },
error: function (XMLHttpRequest, textStatus, errorThrown) {
$("div#preloader").hide();
}
, success: (function (data, textstatus) {
$(".ScrollableContainer").html(data);
$(".ScrollableContainer").prepend('<div class="clear page-number"><span class="page-txt">صفحه </span><span class="infiniteScrollPageContainer">' + nextPage + '</span></div>');
$("div#preloader").hide();
UpdateUrl(nextPage, pagesize, UrlFilterGenerator(jsonString));
})
});
}
function UrlFilterGenerator(jsonString) {
if (jsonString == null || jsonString.length < 1) {
return false;
}
var jsonObj = $.parseJSON(jsonString);
var url = "";
$.each(jsonObj, function (i, item) {
if (item.Key == "fromPrices") {
url += "/fromPrices-" + item.Value;
} else if (item.Key == "toPrices") {
url += "/toPrices-" + item.Value;
} else if (item.Key == "showAvilable") {
} else if (item.Key == "sortValue") {
url += "/sortBy-" + item.Value;
} else if (item.Key == "ascendingSortValue") {
url += "/sort-" + item.Value;
} else if (item.Key == "brand") {
url += "/brand-" + item.Value;
} else if (item.Key == "GetDataFromDatabase") {
} else {
url += "/" + item.Key + "-" + item.Value;
}
});
return url;
}
function showNoMoreRecords() {
hasReachedEndOfInfiniteScroll = true;
}
$(window).scroll(scrollHandler);
