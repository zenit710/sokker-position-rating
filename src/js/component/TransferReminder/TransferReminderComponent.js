import Form from "./Form";
import ActiveReminders from "./ActiveReminders";

export default class TransferReminder {
    __renderHeading() {
        const headingContent = document.createElement("div");
        headingContent.className = "h5";
        headingContent.innerText = "Transfer Reminder (Sokker.org Position Rating)";

        const heading = document.createElement("div");
        heading.className = "panel-heading";
        heading.append(headingContent);

        return heading;
    }

    render() {
        const heading = this.__renderHeading();
        const form = new Form();
        const activeReminders = new ActiveReminders();

        const panelBody = document.createElement("div");
        panelBody.className = "panel-body";
        panelBody.append(form.render());

        activeReminders.render().then(element => {
            panelBody.append(element);
        });

        const panel = document.createElement("div");
        panel.className = "panel panel-default";
        panel.append(heading, panelBody);

        return panel;
    }
}
