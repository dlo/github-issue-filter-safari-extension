var urlRegex = /https?:\/\/github\.com\/(\w+)\/(\w+)\/issues(\??.*)/g;

var pageToSaveRegex = /https?:\/\/github.com\/[.^\/]+\/[.^\/]+\/issues\?q=.*/;
var pageToLoadRegex = /https?:\/\/github.com\/[.^\/]+\/[.^\/]+\/issues$/;
var pageToLoadRegexAlternate = /https?:\/\/github.com\/[.^\/]+\/[.^\/]+\/issues\?_pjax=.*$/;

function handleURL(url) {
    params = {
        "url": url,
        "value": querystring
    }

    if (url.match(pageToSaveRegex)) {
        pos = url.indexOf("?");
        querystring = url.substring(pos);
        safari.self.tab.dispatchMessage("set", params)
    }
    else if (url.match(pageToLoadRegex) || url.match(pageToLoadRegexAlternate)) {
        safari.self.tab.dispatchMessage("get", params);
    }
}

newURL = handleURL(document.location.href);
if (newURL) {
    document.location.href = newURL;
}

(function(pushState){
    var pushState = window.history.pushState;
    window.history.pushState = function(state, title, url) {
        console.log("yo");
        newURL = handleURL(e.target.href);
        if (newURL) {
            window.location.href = newURL;
        }
        else {
            return pushState.apply(this, arguments);
        }
    }
})(window.history.pushState);

document.addEventListener("click", function(e) {
    if (e.target.href) {
        newURL = handleURL(e.target.href);
        if (newURL) {
            e.target.href = newURL;
        }
    }
});

safari.self.addEventListener("message", function(event) {
    if (event.name === "querystring") {
        params = event.message;
        if (params) {
            url = "https://github.com/" + keyFromURL(params.url) + "/issues" + params.value;
            window.location.href = url;
        }
    }
}, false);
