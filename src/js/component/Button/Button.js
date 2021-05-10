import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({ text, onClick, title, disabled }) => (
    <button className="button" onClick={onClick} title={title} disabled={disabled}>{text}</button>
);

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    title: PropTypes.string,
    disabled: PropTypes.bool,
};

Button.defaultProps = {
    title: "",
    disabled: false,
};

export default Button;
