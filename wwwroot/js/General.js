function byField(field) {
    return (a, b) => a[field] > b[field] ? 1 : -1;
}

function getUrlSearchParams() {
    return new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
}

function customTextarea() {
    let tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; ++i) {
        tx[i].addEventListener("input", OnInput, false);
    }
}

function OnInput() {
    if (this.scrollHeight < 300) {
        this.style.overflowY = "hidden";
        this.style.height = 0;
        this.style.height = (this.scrollHeight) + "px";
    } else {
        this.style.height = "300px";
        this.style.overflowY = "scroll";
    }
}

function addToFavorites(event) {
    let label = document.querySelector("label[for='isFavorite']")
    if (event.target.checked) {
        label.removeEventListener("mouseleave", setUnchecked);
        label.className = "btn shadow-none checkbox-checked";
    } else {
        label.className = "btn shadow-none checkbox-temporary-mark";
        label.addEventListener("mouseleave", setUnchecked);
    }
}