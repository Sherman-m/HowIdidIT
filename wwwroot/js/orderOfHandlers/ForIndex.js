async function main() {
    handlerDefaultEventsForButtons();
    await handlerAuthUser();
}

window.addEventListener("load", main);