async function main() {
    handlerDefaultEventsForButtons();
    await handlerAuthUser();
    handlerNavigation();
}

window.addEventListener("load", main);