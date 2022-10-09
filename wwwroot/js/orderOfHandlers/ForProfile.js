async function main() {
    handlerDefaultEventsForButtons();
    await handlerAuthUser();
    customTextarea();
}

window.addEventListener("load", main);