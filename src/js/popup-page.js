import React from "react";
import ReactDOM from "react-dom";
import ReminderList from "./component/ReminderList";
import { getAllReminders } from "./service/ReminderService";
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
    const reminders = await getAllReminders();

    ReactDOM.render(
        <ReminderList reminders={reminders} showLabel={false} />,
        document.querySelector(".active-reminders"),
    );
};

const init = () => {
    showReminders();
    bindEventListeners();
};

init();
