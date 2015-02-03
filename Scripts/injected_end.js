
function handleClick(event) {
    console.log('nope');
    if (event.target instanceof HTMLAnchorElement) {
        console.log("HI there");
        var redirectTo = safari.self.tab.canLoad(event, event.target.href);
        event.preventDefault();
        if (redirectTo) {
            event.target.href = redirectTo;
        }
    }
}

document.addEventListener("click", handleClick, true);

// add handler to all torrent links
var links = document.querySelectorAll("a");
for (i in links){
    if (links[i] && links[i].getAttribute){
        var href = (links[i].getAttribute('href')+"").split('?').shift();
        if (href && href[0] === '/'){
            links[i].removeEventListener("click", torrentClick, false);
            links[i].addEventListener("click", torrentClick, false);
        }
    }
}

