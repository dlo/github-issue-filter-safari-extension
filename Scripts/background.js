var urlRegex = /https?:\/\/github\.com\/([\w-]+)\/([\w-]+)\/(pulls|issues)(\??.*)/g;

var DEBUG = safari.extension.settings.debug;

function keyFromURL(url) {
    username = url.replace(urlRegex, "$1");
    repository = url.replace(urlRegex, "$2");
    return username + "/" + repository;
}

safari.application.addEventListener("message", function(event) {
    url = event.message;
    pos = url.indexOf("?");
    querystring = url.substring(pos);

    if (event.name === "save") {
        if (DEBUG) {
            console.log("Saving: " + url);
        }

        querystring = url.replace(urlRegex, "$3$4");
        window.localStorage.setItem(keyFromURL(url), querystring);
    }
    else if (event.name === "replace") {
        if (DEBUG) {
            console.log("Replacing: " + url);
        }

        querystring = window.localStorage.getItem(keyFromURL(url));
        if (querystring) {
            url = "https://github.com/" + keyFromURL(url) + "/" + querystring;
        }
        event.target.page.dispatchMessage("url", url);
    }
}, false);

