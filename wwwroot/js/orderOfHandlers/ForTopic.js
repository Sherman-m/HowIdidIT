async function main() {
    handlerDefaultEventsForButtons();
    await handlerAuthUser();
    handlerAddToFavorites();
    await handlerLoadCurrentTopic();
    customTextarea();

    let selectSort = document.getElementById("selectSort");
    selectSort.addEventListener("change", async function(event) {
        event.preventDefault();

        let discList = document.querySelectorAll("tbody > tr");
        for (let disc of discList) {
            disc.remove();
        }

        await handlerLoadDiscussionsForCurrentTopic(selectSort);
    });
    
    await handlerLoadDiscussionsForCurrentTopic(selectSort);
    
    window.sessionStorage.setItem("prevPageTitle", document.title);
    window.sessionStorage.setItem("prevPageLink", document.URL);
    handlerNavigation();
}

window.addEventListener("load", main);