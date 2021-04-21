import { MESSAGE_TRANSFER_REMINDER_SET_TYPE } from "./shared/const";

chrome.runtime.onMessage.addListener((request) => {
    if (request.type === MESSAGE_TRANSFER_REMINDER_SET_TYPE) {
        // TODO set alarm which will create notification eventually
    }
});
