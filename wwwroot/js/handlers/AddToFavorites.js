function setUnchecked(event) {
    event.currentTarget.className = "btn shadow-none checkbox-unchecked";
}

function addToFavorites(event) {
    let label = document.querySelector("label[for='btn-add-to-favorites']")
    if (event.target.checked) {
        label.removeEventListener("mouseleave", setUnchecked);
        label.className = "btn shadow-none checkbox-checked";
        
        
    } else {
        label.className = "btn shadow-none checkbox-temporary-mark";
        label.addEventListener("mouseleave", setUnchecked);
    }
}

function handlerAddToFavorites() {
    let checkbox = document.getElementById("btn-add-to-favorites");
    checkbox.addEventListener("click", addToFavorites);
}
