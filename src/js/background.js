import { MESSAGE_TRANSFER_REMINDER_SET_TYPE, STORAGE_REMINDERS_KEY } from "./shared/const";
import { getItemFromStore, setItemInStore } from "./shared/storage";

const TRANSFER_REMINDER_ALARM_NAME = "transferReminderAlarm";

chrome.runtime.onMessage.addListener((request) => {
    if (request.type === MESSAGE_TRANSFER_REMINDER_SET_TYPE) {
        chrome.alarms.create(TRANSFER_REMINDER_ALARM_NAME, {
            when: request.remindDate,
        });
    }
});

chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === TRANSFER_REMINDER_ALARM_NAME) {
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
                    iconUrl: "images/logo-128.png",
                    message: `${player} bid ends ${endDate.toLocaleString()}`,
                });
            });

            const remindersLeft = reminders.filter(reminder => reminder.remindDate > now);
            setItemInStore(STORAGE_REMINDERS_KEY, remindersLeft);
        }
    }
});

chrome.notifications.onClicked.addListener(notificationId => {
    const [, url] = notificationId.split("|");

    if (url) {
        chrome.tabs.create({ url });
    }
});
