async function main() {
    handlerDefaultEventsForButtons();
    let userId = await handlerAuthUser();
    await handlerLoadDataForDiscussion(userId);
    handlerNavigation();
    handlerAddToFavorites();
    customTextarea();
}

window.addEventListener("load", main);