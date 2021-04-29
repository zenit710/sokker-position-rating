const {
    STORAGE_REMINDERS_KEY,
    MESSAGE_TRANSFER_REMINDER_SET_TYPE,
    MESSAGE_TRANSFER_REMINDER_REMOVE_TYPE,
} = require("../shared/const");
const { getTransferPlayerName, getTransferBidEndDate } = require("../shared/domHelper");
const { setItemInStore, getItemFromStore } = require("../shared/storage");

const storeReminder = async (remindDate) => {
    const reminders = await getItemFromStore(STORAGE_REMINDERS_KEY) || [];
    const newReminder = {
        player: getTransferPlayerName(),
        url: window.location.href,
        bidEndDate: getTransferBidEndDate().getTime(),
        remindDate: remindDate.getTime(),
    };

    reminders.push(newReminder);

    setItemInStore(STORAGE_REMINDERS_KEY, reminders);

    return newReminder;
};

const setReminderAlarm = (remindDate) => {
    chrome.runtime.sendMessage({
        type: MESSAGE_TRANSFER_REMINDER_SET_TYPE,
        remindDate: remindDate.getTime(),
        url: window.location.href,
    }, () => {
        console.debug("Transfer reminder was set.");
    });
};

const removeReminder = async (reminder) => {
    const { player, remindDate } = reminder;

    // remove reminder from the store
    const reminders = await getItemFromStore(STORAGE_REMINDERS_KEY) || [];
    const reminderIndex = reminders.findIndex(r => r.player === player && r.remindDate === remindDate);

    if (reminderIndex >= 0) {
        reminders.splice(reminderIndex, 1);
    }

    setItemInStore(STORAGE_REMINDERS_KEY, reminders);

    // remove reminder alarm
    chrome.runtime.sendMessage({
        type: MESSAGE_TRANSFER_REMINDER_REMOVE_TYPE,
        alarmName: getReminderAlarmName(reminder),
    });
};

const getAllReminders = async () => await getItemFromStore(STORAGE_REMINDERS_KEY);

const getRemindDate = (minutesBeforeEnd) => {
    const transferBidEnd = getTransferBidEndDate();
    const remindDate = transferBidEnd;
    remindDate.setMinutes(remindDate.getMinutes() - minutesBeforeEnd);

    return remindDate;
};

const getPlayerReminders = async () => {
    const player = getTransferPlayerName();
    const reminders = await getItemFromStore(STORAGE_REMINDERS_KEY);

    return reminders.filter(reminder => reminder.player === player);
};

const groupByPlayer = (reminders) => {
    const playerReminders = {};

    reminders.forEach(reminder => {
        const { player } = reminder;

        if (player in playerReminders) {
            playerReminders[player].push(reminder);
        } else {
            playerReminders[player] = [reminder];
        }
    });

    return playerReminders;
};

const getReminderAlarmName = ({ url, remindDate }) => `alarm|${encodeURI(url)}|${remindDate}`;

export {
    storeReminder,
    setReminderAlarm,
    getAllReminders,
    getRemindDate,
    getPlayerReminders,
    getReminderAlarmName,
    removeReminder,
    groupByPlayer,
};
