async function main() {
    handlerDefaultEventsForButtons();
    await handlerAuthUser();
    handlerAddToFavorites();
    await handlerLoadCurrentTopic();
}

window.addEventListener("load", main);