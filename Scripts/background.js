var urlRegex = /https?:\/\/github\.com\/([\w-]+)\/([\w-]+)\/issues(\??.*)/g;

var pageToSaveRegex = /https?:\/\/github.com\/[\w-]+\/[\w-]+\/issues(.+)/;
var pageToLoadRegex = /https?:\/\/github.com\/[\w-]+\/[\w-]+\/issues$/;
var pageToLoadRegexAlternate = /https?:\/\/github.com\/[\w-]+\/[\w-]+\/issues\?_pjax=.*$/;

function keyFromURL(url) {
    username = url.replace(urlRegex, "$1");
    repository = url.replace(urlRegex, "$2");
    return username + "/" + repository;
}

/*
safari.application.addEventListener("beforeNavigate", function(event) {
    redirectedURL = handleURL(event.url);
    if (redirectedURL) {
        event.preventDefault();
        window.location.href = url;
    }
}, false);
*/

safari.application.addEventListener("message", function(event) {
    url = event.message;
    pos = url.indexOf("?");
    querystring = url.substring(pos);
    console.log("Should handle URL? " + url);

    if (url) {
        if (event.name === "save") {
            if (url.match(urlRegex)) {
                querystring = url.replace(urlRegex, "$3");
                window.localStorage.setItem(keyFromURL(url), querystring);
                event.target.page.dispatchMessage("postSave", null);
                console.log("saved: " + url);
            }
        }
        else if (event.name === "replace") {
            if (url.match(pageToLoadRegex) || url.match(pageToLoadRegexAlternate)) {
                querystring = window.localStorage.getItem(keyFromURL(url));
                url = "https://github.com/" + keyFromURL(url) + "/issues" + querystring;
                event.target.page.dispatchMessage("url", url);
                console.log("gotten: " + url);
            }
        }
    }
}, false);
