var urlRegex = /https?:\/\/github\.com\/([\w-]+)\/([\w-]+)\/(pulls|issues)(\??.*)/g;

function keyFromURL(url) {
    username = url.replace(urlRegex, "$1");
    repository = url.replace(urlRegex, "$2");
    return username + "/" + repository;
}

/*
safari.application.addEventListener("beforeNavigate", function(event) {
    console.log(event.url);
    querystring = window.localStorage.getItem(keyFromURL(url));
    url = "https://github.com/" + keyFromURL(url) + "/issues" + querystring;

    if (url) {
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
            querystring = url.replace(urlRegex, "$3$4");
            window.localStorage.setItem(keyFromURL(url), querystring);
        }
        else if (event.name === "replace") {
            querystring = window.localStorage.getItem(keyFromURL(url));
            if (querystring) {
                url = "https://github.com/" + keyFromURL(url) + "/" + querystring;
            }
            event.target.page.dispatchMessage("url", url);
        }
    }
}, false);
