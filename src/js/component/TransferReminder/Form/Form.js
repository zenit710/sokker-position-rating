import { MESSAGE_TRANSFER_REMINDER_SET_TYPE, STORAGE_REMINDERS_KEY } from "../../../shared/const";
import { getTransferBidEndDate, getTransferPlayerName } from "../../../shared/domHelper";
import { getItemFromStore, setItemInStore } from "../../../shared/storage";
import "./Form.scss";

export default class Form {
    constructor() {
        this.minuteInput = null;
        this.form = null;
        this.onSuccess = () => {};
    }

    __removeMessage() {
        const messageNode = this.form.querySelector(".form__message");

        if (messageNode) {
            this.form.removeChild(messageNode);
        }
    }

    __renderMessage(type, message) {
        this.__removeMessage();

        const div = document.createElement("div");
        div.className = `form__message form__message--${type}`;
        div.innerText = message;

        this.form.append(div);
    }

    async __storeTransfer(remindDate, transferBidEndDate) {
        const reminders = await getItemFromStore(STORAGE_REMINDERS_KEY) || [];

        reminders.push({
            player: getTransferPlayerName(),
            url: window.location.href,
            bidEndDate: transferBidEndDate,
            remindDate,
        });

        setItemInStore(STORAGE_REMINDERS_KEY, reminders);
    }

    __setAlarm(remindDate) {
        chrome.runtime.sendMessage({
            type: MESSAGE_TRANSFER_REMINDER_SET_TYPE,
            remindDate: remindDate,
        }, () => {
            console.debug("Transfer reminder was set.");
        });
    }

    async __onSubmit(event) {
        event.preventDefault();

        const now = new Date();
        const transferBidEnd = getTransferBidEndDate();
        const remindDate = transferBidEnd;
        remindDate.setMinutes(remindDate.getMinutes() - this.minuteInput.value);
        const remindDateTimestamp = remindDate.getTime();

        if (remindDate > now) {
            await this.__storeTransfer(remindDateTimestamp, transferBidEnd.getTime());
            this.__setAlarm(remindDateTimestamp);
            this.__renderMessage("success", "Reminder was added!");
            this.onSuccess();
        } else {
            this.__renderMessage("error", "Can't set reminder in the past!");
        }
    }

    render() {
        const submitButton = document.createElement("button");
        submitButton.type = "submit";
        submitButton.className = "btn btn-primary";
        submitButton.innerText = "Remind me";

        const minuteInput = document.createElement("input");
        minuteInput.type = "number";
        minuteInput.className = "form-control";
        minuteInput.min = 0;
        minuteInput.value = 10;
        this.minuteInput = minuteInput;

        const minuteInputAddon = document.createElement("span");
        minuteInputAddon.className = "input-group-addon";
        minuteInputAddon.innerText = "min.";

        const inputGroup = document.createElement("div");
        inputGroup.className = "input-group";
        inputGroup.append(minuteInput, minuteInputAddon);

        const formGroup = document.createElement("div");
        formGroup.className = "form-group";
        formGroup.append(inputGroup);

        const inputLabel = document.createElement("label");
        inputLabel.innerText = "How many minutes before?";

        const form = document.createElement("form");
        form.append(inputLabel, formGroup, submitButton);
        form.addEventListener("submit", this.__onSubmit.bind(this));

        this.form = form;

        return form;
    }

    listenOnSuccess(cb) {
        if (typeof cb === "function") {
            this.onSuccess = cb;
        }
    }
}
