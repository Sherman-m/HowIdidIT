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

function OnInputForElement(el) {
    if (el.scrollHeight < 300) {
        el.style.overflowY = "hidden";
        el.style.height = 0;
        el.style.height = (el.scrollHeight) + "px";
    } else {
        el.style.height = "300px";
        el.style.overflowY = "scroll";
    }
}

function addToFavorites(checkbox) {
    let label = document.querySelector("label[for='isFavorite']")
    if (checkbox.checked) {
        label.removeEventListener("mouseleave", setUnchecked);
        label.className = "btn shadow-none checkbox-checked";
    } else {
        label.className = "btn shadow-none checkbox-temporary-mark";
        label.addEventListener("mouseleave", setUnchecked);
    }
}

function setUnchecked(event) {
    event.target.className = "btn shadow-none checkbox-unchecked";
}

function addButtonAddToFavorites() {
    document.getElementById("buttons-for-topic-discussion-header").innerHTML += '<input type="checkbox" class="btn-check" id="isFavorite">\n' +
        '                   <label class="btn shadow-none checkbox-unchecked" for="isFavorite">\n' +
        '                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16">\n' +
        '                           <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>\n' +
        '                       </svg>\n' +
        '                   </label>' +
        '               </div>'
    return document.getElementById("isFavorite")
}

function clearNotifications() {
    let notifications = document.getElementsByClassName("notification");
    for (let notification of notifications)
        notification.remove();
}

function clearWarnings() {
    let warnings = document.getElementsByClassName("warning");
    for (let warning of warnings)
        warning.remove();
}

function clearForm() {
    clearWarnings();
    clearNotifications();
}