import { STORAGE_REMINDERS_KEY } from "../../../shared/const";
import { getTransferPlayerName } from "../../../shared/domHelper";
import { getItemFromStore } from "../../../shared/storage";
import "./ActiveReminder.scss";

export default class ActiveReminders {
    async __getPlayerReminders() {
        const player = getTransferPlayerName();
        const reminders = await getItemFromStore(STORAGE_REMINDERS_KEY);

        return reminders.filter(reminder => reminder.player === player);
    }

    async render() {
        let component = "";
        const playerReminders = await this.__getPlayerReminders();

        const reminders = playerReminders.map(reminder => {
            const li = document.createElement("li");
            li.innerText = (new Date(reminder.remindDate)).toLocaleString();

            return li;
        });

        if (reminders.length) {
            const label = document.createElement("label");
            label.innerText = "Active reminders:";

            const ul = document.createElement("ul");
            ul.append(...reminders);

            const div = document.createElement("div");
            div.className = "active-reminders";
            div.append(label, ul);

            component = div;
        }

        return component;
    }
}
