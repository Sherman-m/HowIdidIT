async function main() {
    handlerDefaultEventsForButtons();
    await handlerAuthUser();
    handlerAddToFavorites();
    await handlerLoadCurrentTopic();
    await handlerLoadDiscussionsForCurrentTopic();
}

window.addEventListener("load", main);