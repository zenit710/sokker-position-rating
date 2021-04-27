const { STORAGE_REMINDERS_KEY, MESSAGE_TRANSFER_REMINDER_SET_TYPE } = require("../shared/const");
const { getTransferPlayerName, getTransferBidEndDate } = require("../shared/domHelper");
const { setItemInStore, getItemFromStore } = require("../shared/storage");

const storeReminder = async (remindDate, transferBidEndDate) => {
    const reminders = await getItemFromStore(STORAGE_REMINDERS_KEY) || [];
    const newReminder = {
        player: getTransferPlayerName(),
        url: window.location.href,
        bidEndDate: transferBidEndDate,
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

export {
    storeReminder,
    setReminderAlarm,
    getRemindDate,
    getPlayerReminders,
};
