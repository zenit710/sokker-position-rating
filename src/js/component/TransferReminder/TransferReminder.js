import Form from "./Form";
import ActiveReminders from "./ActiveReminders";

export default class TransferReminder {
    constructor() {
        this.panelBody = null;
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

    __removeActiveReminders() {
        const remindersNode = this.panelBody.querySelector(".active-reminders");

        if (remindersNode) {
            this.panelBody.removeChild(remindersNode);
        }
    }

    __renderActiveReminders() {
        this.__removeActiveReminders();

        const activeReminders = new ActiveReminders();

        activeReminders.render().then(element => {
            this.panelBody.append(element);
        });
    }

    render() {
        const heading = this.__renderHeading();
        const form = new Form();
        form.listenOnSuccess(this.__renderActiveReminders.bind(this));

        const panelBody = document.createElement("div");
        panelBody.className = "panel-body";
        panelBody.append(form.render());

        this.panelBody = panelBody;

        this.__renderActiveReminders();

        const panel = document.createElement("div");
        panel.className = "panel panel-default";
        panel.append(heading, panelBody);

        return panel;
    }
}
