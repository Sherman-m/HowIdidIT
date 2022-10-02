async function main() {
    handlerDefaultEventsForButtons();
    await handlerAuthUser();
    handlerAddToFavorites();
    await handlerLoadCurrentTopic();
    await handlerLoadDiscussionsForCurrentTopic();
    
    window.sessionStorage.setItem("prevPageTitle", document.title);
    window.sessionStorage.setItem("prevPageLink", document.URL);
    handlerNavigation();
}

window.addEventListener("load", main);