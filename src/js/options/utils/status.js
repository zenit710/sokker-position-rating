import { getStatusNode, CLASS_NAMES_STATUS } from "./dom";

const STATUS = {
    success: "success",
    failure: "failure",
};

const showStatus = (message, type) => {
    const $status = getStatusNode();
    $status.innerHTML = message;
    const classNames = [
        CLASS_NAMES_STATUS.base,
        CLASS_NAMES_STATUS.show,
        CLASS_NAMES_STATUS[type],
    ];
    $status.className = classNames.join(" ");
};

const showFailureStatus = (message) => {
    showStatus(message, STATUS.failure);
};

const showSuccessStatus = (message) => {
    showStatus(message, STATUS.success);
};

export {
    showFailureStatus,
    showSuccessStatus,
};
