import {
    MESSAGE_TRANSFER_REMINDER_REMOVE_TYPE,
    MESSAGE_TRANSFER_REMINDER_REMOVE_ALL_TYPE,
    MESSAGE_TRANSFER_REMINDER_SET_TYPE,
    STORAGE_REMINDERS_KEY,
} from "@/consts";
import { getReminderAlarmName, clearExpiredReminders } from "@/service/ReminderService";
import { getItemFromStore, setItemInStore } from "@/service/StorageService";

chrome.runtime.onStartup.addListener(clearExpiredReminders);

chrome.runtime.onMessage.addListener((request) => {
    switch (request.type) {
    case MESSAGE_TRANSFER_REMINDER_SET_TYPE:
        chrome.alarms.create(getReminderAlarmName(request), {
            when: request.remindDate,
        });
        break;
    case MESSAGE_TRANSFER_REMINDER_REMOVE_TYPE:
        chrome.alarms.clear(request.alarmName, () => {});
        break;
    case MESSAGE_TRANSFER_REMINDER_REMOVE_ALL_TYPE:
        chrome.alarms.clearAll();
        break;
    }
});

chrome.alarms.onAlarm.addListener(async () => {
    const reminders = await getItemFromStore(STORAGE_REMINDERS_KEY) || [];
    const now = (new Date()).getTime();
    const toRemind = reminders.filter(reminder => reminder.remindDate <= now);

    if (toRemind.length) {
        toRemind.forEach(reminder => {
            const { player, bidEndDate, url } = reminder;
            const endDate = new Date(bidEndDate);
            const notificationId = `${encodeURI(player)}|${encodeURI(url)}`;

            chrome.notifications.create(notificationId, {
                type: "basic",
                title: "Player bid will be end soon!",
                iconUrl: chrome.runtime.getURL("images/logo-128.png"),
                message: `${player} bid ends ${endDate.toLocaleString()}`,
            });
        });

        const remindersLeft = reminders.filter(reminder => reminder.remindDate > now);
        setItemInStore(STORAGE_REMINDERS_KEY, remindersLeft);
    }
});

chrome.notifications.onClicked.addListener(notificationId => {
    const [, url] = notificationId.split("|");

    if (url) {
        chrome.tabs.create({ url });
    }
});
