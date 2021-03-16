import "../scss/popup-page.scss";

document.getElementById("settings-button").addEventListener("click", () => {
    chrome.runtime.openOptionsPage();
});

document.getElementById("sokker-button").addEventListener("click", () => {
    chrome.tabs.create({ url: "https://sokker.org" });
});
