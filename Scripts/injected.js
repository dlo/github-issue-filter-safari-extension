var pageToLoadRegex = /https?:\/\/github.com\/[\w-]+\/[\w-]+\/issues$/;

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

function saveURL(url) {
    safari.self.tab.dispatchMessage("save", url);
}

(function(pushState) {
    var pushState = window.history.pushState;
    window.history.pushState = function(state, title, url) {
        saveURL(e.target.href);
        return pushState.apply(this, arguments);
    }
})(window.history.pushState);

var originalOpen = window.XMLHttpRequest.prototype.open;
window.XMLHttpRequest.prototype.open = function(method, url, async, username, password) {
    saveURL(url);
    return originalOpen.apply(this, arguments);
}

document.addEventListener("click", function(e) {
    if (e.target.href) {
        saveURL(e.target.href);
    }
});

safari.self.addEventListener("message", function(event) {
    if (event.name === "url") {
        url = event.message;
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
        safari.self.tab.dispatchMessage("replace", document.location.href);
    }
}, false);

safari.self.tab.dispatchMessage("save", document.location.href);

