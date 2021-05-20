import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({ children, onClick, title, disabled, type }) => (
    <button className="button" onClick={onClick} title={title} disabled={disabled} type={type}>{children}</button>
);

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    title: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
};

Button.defaultProps = {
    onClick: () => {},
    title: "",
    disabled: false,
    type: "button",
};

export default Button;
