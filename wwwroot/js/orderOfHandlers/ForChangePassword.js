async function main() {
    handlerDefaultEventsForButtons();
    await handlerChangePassword();
}

window.addEventListener("load", main);