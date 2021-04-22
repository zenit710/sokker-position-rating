import { MESSAGE_TRANSFER_REMINDER_SET_TYPE, STORAGE_REMINDERS_KEY } from "../shared/const";
import { getTransferBidEndDate, getTransferPlayerName } from "../shared/domHelper";
import { getItemFromStore, setItemInStore } from "../shared/storage";

class TransferReminderComponent {
    constructor() {
        this.minuteInput = null;
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

    __onSubmit(event) {
        event.preventDefault();

        const now = new Date();
        const transferBidEnd = getTransferBidEndDate();
        const remindDate = transferBidEnd;
        remindDate.setMinutes(remindDate.getMinutes() - this.minuteInput.value);
        const remindDateTimestamp = remindDate.getTime();

        if (remindDate > now) {
            this.__storeTransfer(remindDateTimestamp, transferBidEnd.getTime());
            this.__setAlarm(remindDateTimestamp);
        } else {
            // TODO render error message
        }
    }

    __renderHeading() {
        const headingContent = document.createElement("div");
        headingContent.className = "h5";
        headingContent.innerText = "Transfer Reminder (Sokker.org Position Rating)";

        const heading = document.createElement("div");
        heading.className = "panel-heading";
        heading.append(headingContent);

        return heading;
    }

    __renderForm() {
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

        return form;
    }

    render() {
        const heading = this.__renderHeading();
        const form = this.__renderForm();

        const panelBody = document.createElement("div");
        panelBody.className = "panel-body";
        panelBody.append(form);

        const panel = document.createElement("div");
        panel.className = "panel panel-default";
        panel.append(heading, panelBody);

        return panel;
    }
}

export default TransferReminderComponent;
