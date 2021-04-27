import { STORAGE_REMINDERS_KEY, MESSAGE_TRANSFER_REMINDER_REMOVE_TYPE } from "./shared/const";
import { getItemFromStore, setItemInStore } from "./shared/storage";
import { getReminderAlarmName } from "./service/ReminderService";
import "../scss/popup-page.scss";

const bindEventListeners = () => {
    document.getElementById("settings-button").addEventListener("click", () => {
        chrome.runtime.openOptionsPage();
    });

    document.getElementById("sokker-button").addEventListener("click", () => {
        chrome.tabs.create({ url: "https://sokker.org" });
    });
};

const removeReminder = async (event, reminder) => {
    const { player, remindDate } = reminder;

    // remove reminder from the store
    const reminders = await getItemFromStore(STORAGE_REMINDERS_KEY) || [];
    const reminderIndex = reminders.findIndex(r => r.player === player && r.remindDate === remindDate);

    if (reminderIndex >= 0) {
        reminders.splice(reminderIndex, 1);
    }

    setItemInStore(STORAGE_REMINDERS_KEY, reminders);

    // remove reminder from the DOM
    const reminderNode = event.target.closest(".active-reminders__reminder");
    const playerNode = reminderNode.parentNode;
    const playerContainer = playerNode.parentNode;

    playerNode.removeChild(reminderNode);

    if (playerNode.childElementCount === 1) {
        playerContainer.removeChild(playerNode);
    }

    // remove reminder alarm
    chrome.runtime.sendMessage({
        type: MESSAGE_TRANSFER_REMINDER_REMOVE_TYPE,
        alarmName: getReminderAlarmName(reminder),
    });

    // change to react components
};

const showReminders = async () => {
    const reminders = await getItemFromStore(STORAGE_REMINDERS_KEY) || [];
    const playerUrls = {};
    const playerReminders = {};
    const playerNodes = [];

    if (reminders.length) {
        reminders.sort((reminderA, reminderB) => reminderA.remindDate - reminderB.remindDate).forEach(reminder => {
            const { player, remindDate, url } = reminder;

            const dateNode = document.createElement("span");
            dateNode.className = "active-reminders__date";
            dateNode.href = url;
            dateNode.innerText = (new Date(remindDate)).toLocaleString();

            const buttonNode = document.createElement("button");
            buttonNode.className = "active-reminders__remove";
            buttonNode.innerText = "X";
            buttonNode.addEventListener("click", (event) => removeReminder(event, reminder));

            const reminderNode = document.createElement("div");
            reminderNode.className = "active-reminders__reminder";
            reminderNode.append(dateNode, buttonNode);

            if (playerReminders[player]) {
                playerReminders[player].push(reminderNode);
            } else {
                playerReminders[player] = [reminderNode];
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
