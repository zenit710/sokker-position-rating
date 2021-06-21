import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const BUTTON_SIZE = {
    small: "small",
    normal: "normal",
};

const BUTTON_TYPE = {
    button: "button",
    submit: "submit",
    reset: "reset",
};

const Button = ({ children, onClick, title, disabled, type, size }) => (
    <button
        className={`button button--${size}`}
        onClick={onClick}
        title={title}
        disabled={disabled}
        type={type}
    >{children}</button>
);

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.oneOf([BUTTON_TYPE.button, BUTTON_TYPE.submit, BUTTON_TYPE.reset]),
    size: PropTypes.oneOf([BUTTON_SIZE.small, BUTTON_SIZE.normal]),
};

Button.defaultProps = {
    onClick: () => {},
    title: "",
    disabled: false,
    type: BUTTON_TYPE.button,
    size: BUTTON_SIZE.normal,
};

export default Button;

export {
    BUTTON_SIZE,
    BUTTON_TYPE,
};
