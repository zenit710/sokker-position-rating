const CLASS_NAME_STATUS_BASE = "status";
const CLASS_NAMES_STATUS = {
    show: `${CLASS_NAME_STATUS_BASE}--show`,
    success: `${CLASS_NAME_STATUS_BASE}--success`,
    failure: `${CLASS_NAME_STATUS_BASE}--failure`,
};

const getForm = () => document.querySelector(".form");

const getFormFields = () => getForm().querySelectorAll(".form__field");

const setFieldValue = (id, value) => document.getElementById(id).value = value;

const getStatusNode = () => document.querySelector(".status");

export {
    CLASS_NAMES_STATUS,
    getForm,
    getFormFields,
    setFieldValue,
    getStatusNode,
};
