
console.log('yessir');

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
