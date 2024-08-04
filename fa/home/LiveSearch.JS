


function lSAddLoadEvent(func) {var oldonload = window.onload;if (typeof window.onload != 'function') {window.onload = func;} else {window.onload = function () {if (oldonload) {try {oldonload();}catch (err) { }}func();}}}
function lSAppendScript(filepath) {
if ($('body script[src="' + filepath + '"]').length > 0)return;
var ele = document.createElement('script');ele.setAttribute("type", "text/javascript");ele.setAttribute("src", filepath);
document.getElementsByTagName("body")[0].appendChild(ele);}
function lSAppendStyle(filepath) {if ($('head link[href="' + filepath + '"]').length > 0)return;
var ele = document.createElement('link');ele.setAttribute("type", "text/css");ele.setAttribute("rel", "Stylesheet");
ele.setAttribute("href", filepath);document.getElementsByTagName("head")[0].appendChild(ele);}
function initialize(){lSAppendStyle('https://fastcdn.pro/WebDesign.UI.Framework/GlobalShared/Lucene/css/search.css');
lSAppendScript('https://fastcdn.pro/WebDesign.UI.Framework/GlobalShared/Lucene/js/jquery.autocomplete.js');
lSAppendScript('https://fastcdn.pro/WebDesign.UI.Framework/GlobalShared/Lucene/js/limite.js');
lSAppendScript('https://fastcdn.pro/WebDesign.UI.Framework/GlobalShared/Lucene/js/scrooll.js');
    setTimeout(function () {
        $('#lSerchTerm, .lSerchTerm').autocomplete('/fa/Search/ScoredTerms', {
        dir: 'rtl', minChars: 2,
        delay: 5,
        highlightItem: true,
        multiple: false,
        multipleSeparator: " ",
        mustMatch: false,
        matchContains: true,
        autoFill: false,
        scroll: false,
        width: 'auto',
        cacheLength: 0
        });
        $('#lSerchTerm, .lSerchTerm').bind('paste', function (e) {
        setTimeout(function () {
        $('#lSerchTerm, .lSerchTerm').trigger('autocomplete');
        }, 0);
        });
        }, 1000);
        }
        
        lSAddLoadEvent(initialize);



