function setFavoritesBlock(favoritesBlock) {
    favoritesBlock.className = "content-block";
    favoritesBlock.innerHTML = '<h3 class=\"text-center\">Избранное</h3><hr>\n' +
        '            <div id=\"links-for-favorites\">\n' +
        '               <div id="block-for-topics">' +
        '                   <i>' +
        '                       <U>Разделы</U>' +
        '                   </i>' +
        '                   <ul></ul>' +
        '               </div> ' +
        '               <div id="block-for-discussions">' +
        '                   <i>' +
        '                       <U>Обсуждения</U>' +
        '                   </i>' +
        '                   <ul></ul>' +
        '                </div>' +
        '            </div>';
}

function setSelectedTopicsInFavorites(selectedTopics) {
    let blockForTopics = document.querySelector("#block-for-topics > ul");
    blockForTopics.innerHTML = "";

    for (let favoriteTopic of selectedTopics) {
        let linkOnTopic = document.createElement("a");
        linkOnTopic.href = "/topics/" + favoriteTopic.topicId;
        linkOnTopic.innerText = favoriteTopic.name;

        let row = document.createElement("li");
        row.appendChild(linkOnTopic);
        blockForTopics.appendChild(row);
    }
}

function setSelectedDiscussionsInFavorites(selectedDiscussions) {
    let blockForDiscussions = document.querySelector("#block-for-discussions > ul");
    blockForDiscussions.innerHTML = "";

    for (let selectedDiscussion of selectedDiscussions) {
        let linkOnDiscussion = document.createElement("a");
        linkOnDiscussion.href = "/discussions/" + selectedDiscussion.discussionId;
        linkOnDiscussion.innerText = selectedDiscussion.name;

        let row = document.createElement("li");
        row.appendChild(linkOnDiscussion);
        blockForDiscussions.appendChild(row);
    }
}

function handlerSettingFavoriteBlock(favoritesBlock, selectedTopics, selectedDiscussions) {
    setFavoritesBlock(favoritesBlock);
    setSelectedTopicsInFavorites(selectedTopics);
    setSelectedDiscussionsInFavorites(selectedDiscussions);
}