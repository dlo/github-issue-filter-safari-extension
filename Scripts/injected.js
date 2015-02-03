
safari.extension.addContentScript("alert('hi'); \
var originalOpen = window.XMLHttpRequest.prototype.open; \
window.XMLHttpRequest.prototype.open = function(method, url, async, username, password) { \
    console.log(\"overriden\"); \
    return originalOpen.apply(this, arguments); \
} \
\
document.body.addEventListener('click', function(e) {\
    console.log('yo');\
}, false);\
")

