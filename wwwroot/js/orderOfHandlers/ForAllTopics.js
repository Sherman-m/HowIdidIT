﻿async function main() {
    window.sessionStorage.clear();
    await handlerLoadTopics();
    handlerDefaultEventsForButtons();
    await handlerAuthUser();
    customTextarea();

    let selectSort = document.getElementById("selectSort");
    selectSort.addEventListener("change", async function(event) {
        event.preventDefault();

        let discList = document.querySelectorAll("tbody > tr");
        for (let disc of discList) {
            disc.remove();
        }

        await handlerLoadAllDiscussions(selectSort);
    });
    
    await handlerLoadAllDiscussions(selectSort);
} 

window.addEventListener("load", main);