import { STORAGE_REMINDERS_KEY } from "./shared/const";
import { getItemFromStore } from "./shared/storage";
import "../scss/popup-page.scss";

const bindEventListeners = () => {
    document.getElementById("settings-button").addEventListener("click", () => {
        chrome.runtime.openOptionsPage();
    });

    document.getElementById("sokker-button").addEventListener("click", () => {
        chrome.tabs.create({ url: "https://sokker.org" });
    });
};

const showReminders = async () => {
    const reminders = await getItemFromStore(STORAGE_REMINDERS_KEY) || [];
    const playerUrls = {};
    const playerReminders = {};
    const playerNodes = [];

    if (reminders.length) {
        reminders.sort((reminderA, reminderB) => reminderA.remindDate - reminderB.remindDate).forEach(reminder => {
            const { player, remindDate, url } = reminder;
            const dateNode = document.createElement("div");
            dateNode.className = "active-reminders__date";
            dateNode.href = url;
            dateNode.innerText = (new Date(remindDate)).toLocaleString();

            if (playerReminders[player]) {
                playerReminders[player].push(dateNode);
            } else {
                playerReminders[player] = [dateNode];
            }

            if (!playerUrls[player]) {
                playerUrls[player] = url;
            }
        });

        Object.keys(playerReminders).forEach(player => {
            const playerLink = document.createElement("a");
            playerLink.className = "active-reminders__player-link";
            playerLink.href = playerUrls[player];
            playerLink.innerText = player;

            const playerNode = document.createElement("div");
            playerNode.className = "active-reminders__player";
            playerNode.append(playerLink, ...playerReminders[player]);

            playerNodes.push(playerNode);
        });

        document.querySelector(".active-reminders").append(...playerNodes);
    }
};

const init = () => {
    showReminders();
    bindEventListeners();
};

init();
