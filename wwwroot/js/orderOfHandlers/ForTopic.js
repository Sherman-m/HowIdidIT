async function main() {
    handlerDefaultEventsForButtons();
    await handlerAuthUser();
    handlerAddToFavorites();
    await handlerLoadCurrentTopic();
    await handlerLoadTopicsForSelection();
}

window.addEventListener("load", main);