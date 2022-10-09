async function main() {
    handlerDefaultEventsForButtons();
    let userId = await handlerAuthUser();
    await handlerLoadDataForDiscussion(userId);
    handlerNavigation();
    customTextarea();
}

window.addEventListener("load", main);