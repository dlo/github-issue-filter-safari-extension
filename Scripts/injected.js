var urlRegex = /https?:\/\/github\.com\/([\w-]+)\/([\w-]+)\/issues(\??.*)/g;

var pageToSaveRegex = /https?:\/\/github.com\/[\w-]+\/[\w-]+\/issues(.+)/;
var pageToLoadRegex = /https?:\/\/github.com\/[\w-]+\/[\w-]+\/issues$/;
var pageToLoadRegexAlternate = /https?:\/\/github.com\/[\w-]+\/[\w-]+\/issues\?_pjax=.*$/;
var originalURL;

function getAllElementsWithAttribute(attribute) {
    var matchingElements = [];
    var allElements = document.getElementsByTagName('*');
    for (var i = 0, n = allElements.length; i < n; i++) {
        if (allElements[i].getAttribute(attribute) !== null) {
            // Element exists with attribute. Add to array.
            matchingElements.push(allElements[i]);
        }
    }
    return matchingElements;
}

function handleURL(e) {
    var url = this.href
    if (url.match(pageToLoadRegex) || url.match(pageToLoadRegexAlternate)) {
        e.preventDefault();
        safari.self.tab.dispatchMessage("save", url);
    }
    else if (url.match(pageToSaveRegex)) {
        originalURL = url;
        safari.self.tab.dispatchMessage("save", url);
    }
}

// add handler to all torrent links
var links = document.querySelectorAll("a");
for (i in links){
    if (links[i] && links[i].getAttribute){
        var href = links[i].getAttribute('href');
        if (href && href[0] === '/'){
            links[i].removeEventListener("click", handleURL, false);
            links[i].addEventListener("click", handleURL, false);
        }
    }
}

safari.self.addEventListener("message", function(event) {
    url = event.message;
    if (event.name === "url") {
        window.location.href = url;
        if (url) {
            var elems = getAllElementsWithAttribute("href");
            for (var i=0; i<elems.length; i++) {
                var elem = elems[i];
                if (elem.href.match(/[\w-]+\/[\w-]+\/issues$/)) {
                    elem.href = url;
                }
            }
        }
    }
    else if (event.name === "postSave") {
        window.location.href = url;
    }
}, false);

