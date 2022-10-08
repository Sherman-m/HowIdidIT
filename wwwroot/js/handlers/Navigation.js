function handlerNavigation() {
    let topicName = window.sessionStorage.getItem("topicName");
    let topicLink = window.sessionStorage.getItem("topicLink");
    
    let discussionName = window.sessionStorage.getItem("discussionName");
    let discussionLink = window.sessionStorage.getItem("discussionLink")
    
    let currentPage = document.createElement("a");
    currentPage.href = document.URL;
    currentPage.innerText = document.title;
    
    if (topicName && topicName !== currentPage.text) {
        let topicPage = document.createElement("a");
        topicPage.href = topicLink;
        topicPage.innerText = topicName;
        document.getElementById("navigation").append(topicPage, " >> ");
    }

    if (discussionName && discussionName !== currentPage.text) {
        let discussionPage = document.createElement("a");
        discussionPage.href = discussionLink;
        discussionPage.innerText = discussionName;
        document.getElementById("navigation").append(discussionPage, " >> ");
    }
    
    document.getElementById("navigation").append(currentPage);
}