var urlRegex = /https?:\/\/github\.com\/(\w+)\/(\w+)\/issues(\??.*)/g;

var pageToSaveRegex = /https?:\/\/github.com\/[.^\/]+\/[.^\/]+\/issues\?q=.*/;
var pageToLoadRegex = /https?:\/\/github.com\/[.^\/]+\/[.^\/]+\/issues$/;
var pageToLoadRegexAlternate = /https?:\/\/github.com\/[.^\/]+\/[.^\/]+\/issues\?_pjax=.*$/;

function keyFromURL(url) {
    username = url.replace(urlRegex, "$1");
    repository = url.replace(urlRegex, "$2");
    return username + "/" + repository;
}

function handleURL(url) {
    if (url.match(pageToSaveRegex)) {
        pos = url.indexOf("?");
        querystring = url.substring(pos);
        window.localStorage.setItem(keyFromURL(url), querystring);
    }
    else if (url.match(pageToLoadRegex) || url.match(pageToLoadRegexAlternate)) {
        // Replace with the saved URL if it exists.
        savedQuerystring = window.localStorage.getItem(keyFromURL(url));
        if (savedQuerystring) {
            url = "https://github.com/" + keyFromURL(url) + "/issues" + savedQuerystring;
            return url;
        }
    }

    return null;
}

safari.application.addEventListener("beforeNavigate", function(event) {
    redirectedURL = handleURL(event.url);
    if (redirectedURL) {
        event.preventDefault();
        window.location.href = url;
    }
}, false);

safari.application.addEventListener("message", function(event) {
    params = event.message;

    if (event.name === "set") {
        window.localStorage.setItem(keyFromURL(params.url), params.value);
    }
    else if (event.name === "get") {
        params.value = window.localStorage.getItem(keyFromURL(params.url));
        event.target.page.dispatchMessage("querystring", params);
    }
}, false);
