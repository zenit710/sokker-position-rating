class TransferRemindedComponent {
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

export default TransferRemindedComponent;
