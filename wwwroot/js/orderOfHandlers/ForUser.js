async function main() {
    handlerDefaultEventsForButtons();
    await handlerAuthUser();
    await handlerLoadDataForUser();
    handlerNavigation();
}

window.addEventListener("load", main);